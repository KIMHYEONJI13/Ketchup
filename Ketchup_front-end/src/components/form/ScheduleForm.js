import React from 'react';
import { Grid, TextField, Box, Typography, DialogContent, Select, MenuItem, InputLabel, FormControl, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import CampaignIconOutlined from '@mui/icons-material/CampaignOutlined';
import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined';
import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ButtonGroup from '../contents/ButtonGroup';

export default function ScheduleForm({ newScheduleData, onInsertCancelHandler, handleSubmit, handleInputChange, skdNameError, setTouched, dateError, touched, members, handleParticipantsChange, dptNo }) {
    const filteredMemberList = Array.isArray(members) ? members.filter(member => member?.department?.depNo === dptNo) : [];
    const buttons = [
        { label: '취소', onClick: onInsertCancelHandler, styleClass: 'back' },
        { label: '등록', onClick: () => handleSubmit(newScheduleData), styleClass: 'move' }
    ];

    return (
        <DialogContent style={{ height: '58vh', alignContent: "center" }}>
            <Box p={3}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box display={"flex"} alignItems={"center"} justifyContent={'flex-start'}>
                            <Box display={"flex"} alignItems={"center"}>
                                <CampaignIconOutlined fontSize='medium' />
                                <Typography variant='body1' sx={{ ml: 1 }} flexShrink={0}>일정 제목: </Typography>
                                
                            </Box>
                            <TextField sx={{ ml: 2.2, width: "50vw" }} variant='outlined' name='skdName' onChange={handleInputChange} value={newScheduleData.skdName} onBlur={() => setTouched({ ...touched, skdName: true })} />
                        </Box>
                        {skdNameError && <Typography sx={{ color: "red", ml: 15, mt: 1 }}>{skdNameError}</Typography>}
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" alignItems={"center"} justifyContent={"flex-start"}>
                            <Box display={"flex"} alignItems={"center"}>
                                <CalendarMonthOutlined fontSize="medium" />
                                <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>일정: </Typography>
                                <TextField sx={{ ml: 5.5, width: "18vw" }} type="datetime-local" variant="outlined" name="skdStartDttm" onChange={handleInputChange} value={newScheduleData.skdStartDttm} onBlur={() => setTouched({ ...touched, skdStartDttm: true })} />
                                <span style={{ margin: '0 20px' }}>~</span>
                                <TextField sx={{ width: "23vw" }} type="datetime-local" variant="outlined" name="skdEndDttm" onChange={handleInputChange} value={newScheduleData.skdEndDttm} onBlur={() => setTouched({ ...touched, skdEndDttm: true })} />
                            </Box>
                        </Box>
                        {dateError && <Typography sx={{ color: "red", ml: 15, mt: 1 }}>{dateError}</Typography>}
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" alignItems={'center'} justifyContent="flex-start">
                            <Box display="flex" alignItems="center">
                                <LocationOnOutlined fontSize="medium" />
                                <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>장소:</Typography>
                            </Box>
                            <TextField sx={{ ml: 5.5, width: '50vw' }} variant="outlined" name="skdLocation" onChange={handleInputChange} value={newScheduleData.skdLocation} />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" alignItems={'center'} justifyContent="flex-start">
                            <Box display="flex" alignItems="center">
                                <ArticleOutlinedIcon fontSize="medium" />
                                <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>메모:</Typography>
                            </Box>
                            <TextField sx={{ ml: 5.5, width: '50vw' }} multiline variant="outlined" name="skdMemo" onChange={handleInputChange} value={newScheduleData.skdMemo} />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" alignItems={'center'} justifyContent="flex-start">
                            <Box display="flex" alignItems="center">
                                <PersonOutlinedIcon fontSize="medium" />
                                <Typography variant="body1" sx={{ ml: 1 }} flexShrink={0}>일정 등록자:</Typography>
                            </Box>
                            <Typography variant="body1" sx={{ ml: 3.3, width: '50vw' }}>{newScheduleData.authorName}</Typography>
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
                                    value={newScheduleData.participants?.map(participant => participant.participantMemberNo) || []}
                                    onChange={handleParticipantsChange}
                                    renderValue={(selected) => {
                                        const selectedNames = selected?.map(memberNo => {
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
                                <RadioGroup row aria-label="status" name="skdStatus" value={newScheduleData.skdStatus} onChange={handleInputChange}>
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
                        <Box justifyContent={'flex-end'}>
                            <Box>
                                <ButtonGroup buttons={buttons} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </DialogContent >
    );
}