import { Box, Grid, Typography, Dialog, TextField, DialogContent, DialogTitle, FormControl, Select, MenuItem, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import moment from "moment";
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import CampaignIconOutlined from '@mui/icons-material/CampaignOutlined';
import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined';
import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

export default function ScheduleDetail({ inputChangeHandler, scheduleDetail, closeDetailDialog, handleUpdate, handleDelete, members, dptNo }) {
    const filteredMemberList = Array.isArray(members) ? members.filter(member => member?.department?.depNo === dptNo) : [];
    const [dateError, setDateError] = useState("");
    const [skdNameError, setSkdNameError] = useState("");
    const [touched, setTouched] = useState({
        skdName: false,
        skdStartDttm: false,
        skdEndDttm: false
    });
    const [updateChecked, setUpdateChecked] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [updatedScheduleData, setUpdatedScheduleData] = useState({
        skdName: scheduleDetail?.title,
        skdStartDttm: moment(scheduleDetail?.start).format("YYYY-MM-DD HH:mm"),
        skdEndDttm: moment(scheduleDetail?.end).format("YYYY-MM-DD HH:mm"),
        skdLocation: scheduleDetail?.extendedProps.skdLocation,
        skdMemo: scheduleDetail?.extendedProps.skdMemo,
        authorId: scheduleDetail?.extendedProps.authorId,
        authorName: scheduleDetail?.extendedProps.authorName,
        participants: scheduleDetail?.extendedProps.participants || []
    });

    const handleUpdatedParticipantsChange = (event) => {
        const selectedValues = event.target.value;
        const selectedParticipants = selectedValues.map(value => {
            const member = members.find(member => member?.memberNo === value);
            return { participantMemberNo: member?.memberNo, participantName: member?.memberName };
        });
        setUpdatedScheduleData({
            ...updatedScheduleData,
            participants: selectedParticipants
        });
    };

    useEffect(() => {
        if (scheduleDetail) {
            setUpdatedScheduleData({
                skdName: scheduleDetail.title,
                skdStartDttm: moment(scheduleDetail.start).format("YYYY-MM-DD HH:mm"),
                skdEndDttm: moment(scheduleDetail.end).format("YYYY-MM-DD HH:mm"),
                skdLocation: scheduleDetail.extendedProps.skdLocation,
                skdMemo: scheduleDetail.extendedProps.skdMemo,
                authorId: scheduleDetail?.extendedProps.authorId,
                authorName: scheduleDetail?.extendedProps.authorName,
                participants: scheduleDetail?.extendedProps.participants,
                skdStatus: scheduleDetail?.extendedProps.skdStatus
            });
        }

    }, [scheduleDetail]);

    const validateUpdate = () => {
        const start = moment(updatedScheduleData.skdStartDttm);
        const end = moment(updatedScheduleData.skdEndDttm);

        let valid = true;

        if (updatedScheduleData.skdName.length < 5) {
            setSkdNameError("일정 제목은 공란일 수 없고 공백 포함 최소 5글자 이상이어야 합니다.");
            valid = false;
        } else if (updatedScheduleData.skdName.length > 200) {
            setSkdNameError("일정 제목은 공백 포함 최대 200자까지 입력할 수 있습니다.");
            valid = false;
        } else {
            setSkdNameError("");
        }

        if (!updatedScheduleData.skdStartDttm || !updatedScheduleData.skdEndDttm) {
            setDateError("일정 시작 일시와 종료 일시를 모두 입력해주세요.");
            valid = false;
        } else if (start.isSameOrAfter(end)) {
            setDateError("일정 시작일시는 종료일시보다 이전이어야 합니다.");
            valid = false;
        } else {
            setDateError("");
        }

        return valid;
    };

    const handleConfirmDelete = () => {
        try {
            handleDelete(scheduleDetail);
            closeDetailDialog();
            setConfirmDeleteOpen(false);
        } catch (error) {
            console.error("일정 삭제 중 에러 발생 handleDelete: ", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setUpdatedScheduleData({
            ...updatedScheduleData,
            [name]: value
        });

        setTouched({
            ...touched,
            [name]: value
        });
    };

    const handleAction = () => {
        if (!validateUpdate()) {
            return;
        }

        try {
            handleUpdate(scheduleDetail, updatedScheduleData);
        } catch (error) {
            console.error("일정 수정 중 에러 발생 handleUpdate: ", error);
            alert("일정 수정에 실패했습니다.");
        }
        closeDetailDialog();
    };

    const onCloseConfirmDelete = () => {
        setConfirmDeleteOpen(false);
    };

    useEffect(() => {
        if (touched.skdStartDttm || touched.skdEndDttm || touched.skdName) {
            validateUpdate();
        }
    }, [updatedScheduleData, touched]);

    if (!scheduleDetail) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            {updateChecked ? (
                <>
                    <DialogTitle variant="h4" ml={3} mt={3}>일정 수정</DialogTitle>
                    <DialogContent style={{ height: '58vh', alignContent: 'center' }}>
                        <Box p={3}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Box display={'flex'} alignItems={"center"} justifyContent={'flex-start'}>
                                        <Box display={'flex'} alignItems={'center'}>
                                            <CampaignIconOutlined fontSize='medium' />
                                            <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>일정 제목: </Typography>
                                        </Box>
                                        <TextField sx={{ ml: 2.5, width: "50vw" }} variant="outlined" name="skdName" onChange={handleInputChange} value={updatedScheduleData.skdName} onBlur={() => setTouched({ ...touched, skdName: true })} error={!!skdNameError} helperText={skdNameError} FormHelperTextProps={{ sx: { fontSize: '1rem', mt: 1 } }} />
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems={"center"} justifyContent={"flex-start"}>
                                        <Box display={"flex"} alignItems={"center"}>
                                            <CalendarMonthOutlined fontSize="medium" />
                                            <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>일정: </Typography>
                                            <TextField sx={{ ml: 5.5, width: "18vw" }} type="datetime-local" variant="outlined" name="skdStartDttm" onChange={handleInputChange} value={updatedScheduleData.skdStartDttm} onBlur={() => { setTouched({ ...touched, skdStartDttm: true }) }} error={!!dateError} />
                                            <span style={{ margin: '0 20px' }}>~</span>
                                            <TextField sx={{ width: "23vw" }} type="datetime-local" variant="outlined" name="skdEndDttm" onChange={handleInputChange} value={updatedScheduleData.skdEndDttm} onBlur={() => { setTouched({ ...touched, skdEndDttm: true }) }} error={!!dateError} />
                                        </Box>
                                    </Box>
                                    {dateError && <Typography sx={{ color: "#D3302F", ml: 16, mt: 1 }}>{dateError}</Typography>}
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems={'center'} justifyContent="flex-start">
                                        <Box display="flex" alignItems="center">
                                            <LocationOnOutlined fontSize="medium" />
                                            <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>장소:</Typography>
                                        </Box>
                                        <TextField sx={{ ml: 6.3, width: '50vw' }} variant="outlined" name="skdLocation" onChange={handleInputChange} value={updatedScheduleData.skdLocation} />
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems={'center'} justifyContent="flex-start">
                                        <Box display="flex" alignItems="center">
                                            <ArticleOutlinedIcon fontSize="medium" />
                                            <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>메모:</Typography>
                                        </Box>
                                        <TextField sx={{ ml: 6.3, width: '50vw' }} multiline variant="outlined" name="skdMemo" onChange={handleInputChange} value={updatedScheduleData.skdMemo} />
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems={'center'} justifyContent="flex-start">
                                        <Box display="flex" alignItems="center">
                                            <PersonOutlinedIcon fontSize="medium" />
                                            <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>일정 등록자:</Typography>
                                        </Box>
                                        <Typography variant="body1" sx={{ ml: 3.3, width: '50vw' }}>{updatedScheduleData.authorName}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl>
                                        <Box display="flex" alignItems={'center'} justifyContent="flex-start">
                                            <Box display="flex" alignItems="center">
                                                <PersonOutlinedIcon fontSize="medium" />
                                                <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>참여 인원:</Typography>
                                            </Box>
                                            <Select
                                                multiple
                                                value={updatedScheduleData.participants?.map(participant => participant.participantMemberNo) || []}

                                                onChange={handleUpdatedParticipantsChange}
                                                renderValue={(selected) => {
                                                    const selectedNames = selected.map(memberNo => {
                                                        const member = filteredMemberList?.find(member => member?.memberNo === memberNo);
                                                        return member ? member.memberName : '';
                                                    }).filter(name => name !== '');

                                                    return selectedNames.join(', ');
                                                }}
                                                sx={{ width: '45vw', ml: 1.7 }}
                                            >
                                                {filteredMemberList.map((member) => (
                                                    <MenuItem key={member.memberNo} value={member.memberNo}>
                                                        {member.memberName}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </Box>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems={'center'} justifyContent="flex-start">
                                        <Box display="flex" alignItems="center">
                                            <ArticleOutlinedIcon fontSize="medium" />
                                            <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>일정 상태:</Typography>
                                        </Box>
                                        <FormControl component="fieldset" sx={{ ml: 1.7 }}>
                                            <RadioGroup row aria-label="status" name="skdStatus" value={updatedScheduleData.skdStatus} onChange={handleInputChange}>
                                                <FormControlLabel value="예정" control={<Radio />} label="예정" />
                                                <FormControlLabel value="진행 중" control={<Radio />} label="진행 중" />
                                                <FormControlLabel value="완료" control={<Radio />} label="완료" />
                                                <FormControlLabel value="보류" control={<Radio />} label="보류" />
                                                <FormControlLabel value="막힘" control={<Radio />} label="막힘" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container justifyContent="flex-end" spacing={1}>
                                        <Grid item ml={'auto'}>
                                            <button onClick={closeDetailDialog} className="back-btn">취소</button>
                                        </Grid>
                                        <Grid item>
                                            <button onClick={handleAction} onClose={() => setUpdateChecked(false)} className="grey-btn">저장</button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </DialogContent>
                </>
            ) : (
                <>
                    <DialogTitle variant="h4" ml={3} mt={3}>일정 상세</DialogTitle>
                    <DialogContent style={{ height: '38vh', alignContent: 'center' }}>
                        <Box p={3}>
                            <Grid container spacing={2}>

                                <Grid item xs={12}>
                                    <Box display={'flex'} alignItems={"center"} justifyContent={'flex-start'}>
                                        <Box display={'flex'} alignItems={'center'}>
                                            <CampaignIconOutlined fontSize='medium' />
                                            <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>일정 제목: </Typography>
                                            <Typography sx={{ ml: 2.5 }} variant="body1">{scheduleDetail.title}</Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display={'flex'} alignItems={"center"} justifyContent={'flex-start'}>
                                        <Box display={"flex"} alignItems={"center"}>
                                            <CalendarMonthOutlined fontSize="medium" />
                                            <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>일정: </Typography>
                                            <Typography sx={{ ml: 7.2 }} variant="body1">{moment(scheduleDetail.start).format("YYYY-MM-DD HH:mm")}</Typography>
                                            <span style={{ margin: '0 20px' }}>~</span>
                                            <Typography variant="body1">{moment(scheduleDetail.end).format("YYYY-MM-DD HH:mm")}</Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems={'center'} justifyContent="flex-start">
                                        <Box display="flex" alignItems="center">
                                            <LocationOnOutlined fontSize="medium" />
                                            <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>장소:</Typography>
                                            <Typography sx={{ ml: 7 }} variant="body1">{scheduleDetail.extendedProps.skdLocation}</Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems={'center'} justifyContent="flex-start">
                                        <Box display="flex" alignItems="center">
                                            <ArticleOutlinedIcon fontSize="medium" />
                                            <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>메모:</Typography>
                                            <Typography sx={{ ml: 7.5 }} variant="body1">{scheduleDetail.extendedProps.skdMemo}</Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems={'center'} justifyContent="flex-start">
                                        <Box display="flex" alignItems="center">
                                            <PersonOutlinedIcon fontSize="medium" />
                                            <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>일정 등록자:</Typography>
                                        </Box>
                                        <Typography variant="body1" sx={{ ml: 3.3, width: '50vw' }}>{scheduleDetail.extendedProps.authorName}</Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
    <Box display="flex" alignItems={'center'} justifyContent="flex-start">
        <Box display="flex" alignItems="center">
            <PersonOutlinedIcon fontSize="medium" />
            <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>참여 인원:</Typography>
        </Box>
        <Typography variant="body1" sx={{ ml: 4.9, width: '50vw' }}>
            {scheduleDetail?.extendedProps?.participants?.map(participant => participant.participantName).join(', ') || "참여 인원 없음"}
        </Typography>
    </Box>
</Grid>



                                <Grid item xs={12}>
                                    <Grid container justifyContent="flex-end">
                                        <Grid item>
                                            <button onClick={() => setConfirmDeleteOpen(true)} className="move-btn">삭제</button>
                                        </Grid>
                                        <Grid item ml={'auto'}>
                                            <button style={{ marginRight: "15px" }} onClick={() => setUpdateChecked(true)} onClose={() => setUpdateChecked(false)} className="grey-btn">수정</button>
                                        </Grid>
                                        <Grid>
                                            <button onClick={closeDetailDialog} className="back-btn">닫기</button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Dialog open={confirmDeleteOpen} onClose={onCloseConfirmDelete} fullWidth scroll="paper" sx={{ "& .MuiDialog-container": { alignItems: "flex-start" } }} PaperProps={{ sx: { mt: 0, borderRadius: "10px" } }}>
                                <Box p={2}>
                                    <Typography variant="body1">한 번 삭제하면 다시 복구할 수 없습니다.</Typography>
                                    <Typography variant="body1">정말로 삭제하시겠습니까?</Typography>
                                </Box>
                                <Box p={2} display="flex" justifyContent="flex-end">
                                    <button onClick={onCloseConfirmDelete} className="back-btn">취소</button>
                                    <button onClick={handleConfirmDelete} className="move-btn">삭제</button>
                                </Box>
                            </Dialog>
                        </Box>
                    </DialogContent>
                </>
            )}
        </>
    );
};