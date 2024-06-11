import { Button, Grid, Typography, Box, TextField, ListItem, ListItemText, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";
import { decodeJwt } from "../../utils/tokenUtils";
import { insertReserveAPI } from "../../apis/ReserveAPICalls";
import moment from "moment";
import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PropTypes from 'prop-types';

export default function InsertReserveForm({ onInsertCancelHandler, selectedResource, existingReserves, newReserveAdded, setNewReserveAdded, handleInsertReserveSuccess, resetForm }) {
    InsertReserveForm.propTypes = {
        onInsertCancelHandler: PropTypes.func.isRequired,
        selectedResource: PropTypes.object.isRequired,
        existingReserves: PropTypes.array.isRequired,
        handleInsertReserveSuccess: PropTypes.func.isRequired,  // Add this line
        resetForm: PropTypes.func.isRequired,
    };

    const token = decodeJwt(window.localStorage.getItem("accessToken"));
    const reserverId = token?.memberNo;
    const reserverName = token?.memberName;
    const [newReserveData, setNewReserveData] = useState({
        reserverId: reserverId,
        reserverName: reserverName,
        rsvDescr: "",
        rsvStartDttm: "",
        rsvEndDttm: "",
        resources: {}
    });
    const [dateError, setDateError] = useState("");
    const [descrError, setDescrError] = useState("");
    const [touched, setTouched] = useState({
        rsvDescr: false,
        rsvStartDttm: false,
        rsvEndDttm: false
    });

    useEffect(() => {
        if (selectedResource) {
            setNewReserveData(prevData => ({
                ...prevData,
                resources: selectedResource
            }));
        }
    }, [selectedResource]);

    useEffect(() => {
        if (touched.rsvDescr || touched.rsvStartDttm || touched.rsvEndDttm) {
            validate();
        }
    }, [newReserveData, touched]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReserveData({
            ...newReserveData,
            [name]: value
        });
        setTouched({
            ...touched,
            [name]: value
        });
        validate();
    };

    const validate = () => {
        const now = moment();
        const start = moment(newReserveData.rsvStartDttm);
        const end = moment(newReserveData.rsvEndDttm);

        let valid = true;

        if (!newReserveData.rsvStartDttm || !newReserveData.rsvEndDttm) {
            setDateError("예약 시작 일시와 종료 일시를 모두 입력해주세요.");
            valid = false;
        } else if (start.isBefore(now)) {
            setDateError("예약 시작일시는 과거일 수 없습니다.");
            valid = false;
        } else if (start.isSameOrAfter(end)) {
            setDateError("예약 시작일시는 종료일시보다 이전이어야 합니다.");
            valid = false;
        } else {
            setDateError("");
        }

        const hasConflict = existingReserves.some(reserve => {
            const rsvStart = moment(reserve.start);
            const rsvEnd = moment(reserve.end);
            return start.isBetween(rsvStart, rsvEnd, null, '[)') || end.isBetween(rsvStart, rsvEnd, null, '(]') || (start.isSameOrBefore(rsvStart) && end.isSameOrAfter(rsvEnd));
        });

        if (hasConflict) {
            setDateError("선택하신 시간에 이미 예약이 등록된 예약건이 있습니다. 다른 시간이나 다른 자원을 선택해주세요.");
            valid = false;
        } else if (!hasConflict && valid) {
            setDateError("");
        }

        if (newReserveData.rsvDescr.length < 5) {
            setDescrError("사용목적은 공란일 수 없고 공백 포함 최소 5글자 이상이어야 합니다.");
            valid = false;
        } else if (newReserveData.rsvDescr.length > 200) {
            setDescrError("사용목적은 공백 포함 최대 200자까지 입력할 수 있습니다.");
            valid = false;
        } else {
            setDescrError("");
        }

        return valid;
    };

    const handleSubmit = () => {
        setTouched({
            rsvDescr: true,
            rsvStartDttm: true,
            rsvEndDttm: true
        });
        if (validate()) {
            try {
                insertReserveAPI(newReserveData);
                alert("예약이 정상적으로 등록되었습니다.");
                handleInsertReserveSuccess();
            } catch (error) {
                console.error("예약 등록 실패: ", error);
                alert("예약 등록에 실패했습니다. 관리자에게 문의바랍니다.");
            }
            onInsertCancelHandler();
            resetForm();
        }
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <DialogContent style={{ height: '56vh', alignContent: "center" }}>
                <Box p={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} mb={4}>
                            <Typography variant='h5'>{newReserveData.resources.rscName} 예약 등록</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" alignItems={"center"} justifyContent={"flex-start"}>
                                <Box display={"flex"} alignItems={"center"}>
                                    <CalendarMonthOutlined fontSize="medium" />
                                    <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>예약 일정: </Typography>
                                    <TextField sx={{ ml: 2, width: '21vw'}} type="datetime-local" variant="outlined" name="rsvStartDttm" onChange={handleInputChange} value={newReserveData.rsvStartDttm} onBlur={() => setTouched({ ...touched, rsvStartDttm: true })} error={!!dateError} />
                                    <span style={{ margin: '0 25px' }}>~</span>
                                    <TextField  sx={{ width: '21vw'}} type="datetime-local" variant="outlined" name="rsvEndDttm" onChange={handleInputChange} value={newReserveData.rsvEndDttm} onBlur={() => setTouched({ ...touched, rsvEndDttm: true })} error={!!dateError} />
                                </Box>
                            </Box>
                            {dateError && <Typography sx={{ color: "#D3302F", ml: 16, mt: 1 }}>{dateError}</Typography>}
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" alignItems={'center'} justifyContent="flex-start">
                                <Box display="flex" alignItems="center">
                                    <ArticleOutlinedIcon fontSize="medium" />
                                    <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>사용목적:</Typography>
                                </Box>
                                <TextField sx={{ ml: 2.5, width: '45vw' }} multiline variant="outlined" name="rsvDescr" onChange={handleInputChange} value={newReserveData.rsvDescr} placeholder="사용목적을 작성해주세요. (공란 불가, 공백 포함 최소 5글자, 최대 200자)" onBlur={() => setTouched({ ...touched, rsvDescr: true })} error={!!descrError} helperText={descrError} FormHelperTextProps={{ sx: { fontSize: '1rem', mt: 1 } }} />
                            </Box>
                        </Grid>
                        <Grid item={12}>
                            <Box display={"flex"} alignItems={"center"} justifyContent={"flex-start"}>
                                <Box display="flex" alignItems={"center"}>
                                    <PersonOutlinedIcon fontSize="medium" />
                                    <Typography variant="body1" sx={{ ml: 1 }}>예약자: </Typography>
                                </Box>
                                <Typography variant="body1" sx={{ ml: 4 }}>{reserverName}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent="flex-end" spacing={1}>
                                <Grid item ml={'auto'}>
                                    <button onClick={onInsertCancelHandler} className="back-btn">취소</button>
                                </Grid>
                                <Grid item>
                                    <button type="submit" className="move-btn">등록</button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
        </form>
    );
}