import { Box, Grid, Typography, Button, TextField, DialogContent } from "@mui/material";
import { decodeJwt } from "../../utils/tokenUtils";
import { useState, useEffect } from "react";
import { updateReserveAPI } from "../../apis/ReserveAPICalls";
import moment from "moment";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

export default function ReserveDetail({ selectedReserve, closeDetailDialog, setOpenDeleteConfirm, existingReserves, newReserveAdded, setNewReserveAdded }) {
    console.log("selectedReserve", selectedReserve);
    const token = decodeJwt(window.localStorage.getItem("accessToken"));
    const reserverId = token?.memberNo;
    const [updateChecked, setUpdateChecked] = useState(false);
    const [updatedReserveData, setUpdatedReserveData] = useState({
        rsvNo: selectedReserve.rsvNo,
        reserverId: selectedReserve.extendedProps.reserverId,
        reserverName: selectedReserve.extendedProps.reserverName,
        rsvDescr: selectedReserve.rsvDescr,
        rsvStartDttm: moment(selectedReserve.start).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
        rsvEndDttm: moment(selectedReserve.end).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
        resources: selectedReserve.extendedProps.resources
    });
    const [dateError, setDateError] = useState("");
    const [descrError, setDescrError] = useState("");
    const [touched, setTouched] = useState({
        rsvDescr: false,
        rsvStartDttm: false,
        rsvEndDttm: false
    });

    const reserveNo = selectedReserve.id;

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setUpdatedReserveData({
            ...updatedReserveData,
            [name]: value
        });

        setTouched({
            ...touched,
            [name]: value
        });
    };

    const handleUpdateEvent = () => {
        validate();
        if (dateError || descrError) {
            return;
        }

        try {
            updateReserveAPI(reserveNo, updatedReserveData);
            alert("예약이 성공적으로 수정되었습니다.");
            setNewReserveAdded(!newReserveAdded);
        } catch (error) {
            console.error("예약 수정 실패: ", error);
            alert("예약 수정에 실패했습니다. 관리자에게 문의바랍니다.");
        }
        closeDetailDialog();
    };

    const isReserver = () => {
        return reserverId === selectedReserve.extendedProps.reserverId;
    };

    useEffect(() => {
        if (selectedReserve && selectedReserve.extendedProps) {
            setUpdatedReserveData({
                rsvNo: selectedReserve.rsvNo,
                reserverId: selectedReserve.extendedProps.reserverId,
                reserverName: selectedReserve.extendedProps.reserverName || "unknown",
                rsvDescr: selectedReserve.title,
                rsvStartDttm: moment(selectedReserve.start).format("YYYY-MM-DDTHH:mm"),
                rsvEndDttm: moment(selectedReserve.end).format("YYYY-MM-DDTHH:mm"),
                resources: selectedReserve.extendedProps.resources
            });
        }
    }, [selectedReserve]);

    useEffect(() => {
        if (touched.rsvDescr || touched.rsvStartDttm || touched.rsvEndDttm) {
            validate();
        }
    }, [updatedReserveData, touched]);

    const validate = () => {
        const now = moment();
        const start = moment(updatedReserveData.rsvStartDttm);
        const end = moment(updatedReserveData.rsvEndDttm);

        if (!updatedReserveData.rsvStartDttm || !updatedReserveData.rsvEndDttm) {
            setDateError("예약 시작 일시와 종료 일시를 모두 입력해주세요.");
            return;
        }

        if (start.isBefore(now)) {
            setDateError("예약 시작일시는 과거일 수 없습니다.");
            return;
        }

        if (start.isSameOrAfter(end)) {
            setDateError("예약 시작 일시는 종료일시보다 이전이어야 합니다.");
            return;
        }

        if (selectedReserve.start !== updatedReserveData.rsvStartDttm || selectedReserve.end !== updatedReserveData.rsvEndDttm) {
            const hasConflict = existingReserves.some(reserve => {
                if (reserve.id !== selectedReserve.id) {
                    const rsvStart = moment(reserve.start);
                    const rsvEnd = moment(reserve.end);
                    return start.isBetween(rsvStart, rsvEnd, null, '[)') || end.isBetween(rsvStart, rsvEnd, null, '(]') || (start.isSameOrBefore(rsvStart) && end.isSameOrAfter(rsvEnd));
                }
                return false;
            });
    
            if (hasConflict) {
                setDateError("선택하신 시간에 이미 예약이 등록된 예약건이 있습니다. 다른 시간이나 다른 자원을 선택해주세요.");
                return;
            }
        }

        if (updatedReserveData.rsvDescr.length < 5) {
            setDescrError("사용목적은 공란일 수 없고 공백 포함 최소 5글자 이상이어야 합니다.");
            return;
        }

        if (updatedReserveData.rsvDescr.length > 200) {
            setDescrError("사용목적은 공백 포함 최대 200자까지 입력할 수 있습니다.");
            return;
        }

        setDateError("");
        setDescrError("");
    };

    return (
        <DialogContent style={{ height: '56vh', alignContent: 'center' }}>
            <Box p={3}>
                <Grid container spacing={2}>
                    {updateChecked ? (
                        <>
                            {/* 수정 폼 */}
                            <Grid item xs={12} mb={4}>
                                <Typography variant="h5">{selectedReserve.extendedProps.resources.rscName} 예약 수정</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center" justifyContent="flex-start">
                                    <Box display="flex" alignItems="center">
                                        <CalendarMonthOutlinedIcon fontSize="medium" />
                                        <Typography variant="body1" sx={{ ml: 1 }}>예약일정: </Typography>
                                        <TextField sx={{ ml: 2 }} type="datetime-local" variant="outlined" name="rsvStartDttm" onChange={handleInputChange} defaultValue={updatedReserveData.rsvStartDttm} onBlur={() => setTouched({ ...touched, rsvStartDttm: true })} />
                                        <span style={{ margin: '0 20px' }}>~</span>
                                        <TextField type="datetime-local" variant="outlined" name="rsvEndDttm" onChange={handleInputChange} defaultValue={updatedReserveData.rsvEndDttm} onBlur={() => setTouched({ ...touched, rsvEndDttm: true })} />
                                    </Box>
                                </Box>
                                {dateError && <Typography sx={{ color: 'red', ml: 15, mt: 1 }}>{dateError}</Typography>}
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" alignItems='center' justifyContent="flex-start">
                                    <Box display="flex" alignItems="center">
                                        <ArticleOutlinedIcon fontSize="medium" />
                                        <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>사용목적:</Typography>
                                    </Box>
                                    <TextField sx={{ ml: 2, width: '550px' }} multiline variant="outlined" name="rsvDescr" onChange={handleInputChange} defaultValue={updatedReserveData.rsvDescr} placeholder="사용목적을 작성해주세요. (공란 불가, 공백포함 최소 5글자, 최대 200자)" onBlur={() => setTouched({ ...touched, rsvDescr: true })} />
                                </Box>
                                {descrError && <Typography sx={{ color: "red", ml: 15, mt: 1 }}>{descrError}</Typography>}
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center" justifyContent="flex-start">
                                    <Box display="flex" alignItems="center">
                                        <PersonOutlinedIcon fontSize="medium" />
                                        <Typography variant="body1" sx={{ ml: 1 }}>예약자:</Typography>
                                    </Box>
                                    <Typography variant="body1" sx={{ ml: 3.7 }}>{selectedReserve.extendedProps.reserverName}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container justifyContent="flex-end" spacing={1}>
                                    <Grid item ml={'auto'}>
                                        <button onClick={closeDetailDialog} className="back-btn">닫기</button>
                                    </Grid>
                                    <Grid item>
                                        <button onClick={handleUpdateEvent} onClose={() => setUpdateChecked(false)} className="move-btn">수정</button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
                    ) : (
                        <>
                            {/* 상세보기 폼 */}
                            <Grid item xs={12} mb={4}>
                                <Typography variant="h5" >{selectedReserve.extendedProps.resources.rscName} 예약 상세조회</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center" justifyContent="flex-start">
                                    <Box display="flex" alignItems="center">
                                        <CalendarMonthOutlinedIcon fontSize="medium" />
                                        <Typography variant="body1" sx={{ ml: 1 }}>예약일정:</Typography>
                                    </Box>
                                    <Typography variant="body1" sx={{ ml: 2 }}>
                                        <span>{moment(selectedReserve.start).format("YYYY-MM-DD HH:mm")}</span>
                                        <span style={{ margin: '0 20px' }}>~</span>
                                        <span>{moment(selectedReserve.end).format("YYYY-MM-DD HH:mm")}</span>
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center" justifyContent="flex-start">
                                    <Box display="flex" alignItems="center">
                                        <ArticleOutlinedIcon fontSize="medium" />
                                        <Typography variant="body1" sx={{ ml: 1, whiteSpace: 'nowrap' }}>사용목적:</Typography>
                                    </Box>
                                    <Typography variant="body1" sx={{ ml: 2 }}>{selectedReserve.title}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center" justifyContent="flex-start">
                                    <Box display="flex" alignItems="center">
                                        <PersonOutlinedIcon fontSize="medium" />
                                        <Typography variant="body1" sx={{ ml: 1 }}>예약자:</Typography>
                                    </Box>
                                    <Typography variant="body1" sx={{ ml: 3.7 }}>{selectedReserve.extendedProps.reserverName}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} mt={5}>
                                <Grid container justifyContent="flex-end" spacing={1}>
                                    {isReserver() ? (
                                        <>
                                            <Grid item>
                                                <button onClick={() => setUpdateChecked(true)} className="grey-btn">수정</button>
                                            </Grid>
                                            <Grid item>
                                                <button onClick={() => setOpenDeleteConfirm(true)} className="move-btn">삭제</button>
                                            </Grid>
                                        </>
                                    ) : null}
                                    <Grid item ml={'auto'}>
                                        <button onClick={closeDetailDialog} className="back-btn">닫기</button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
                    )}
                </Grid >
            </Box >
        </DialogContent>
    );
};
