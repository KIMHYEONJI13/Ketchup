import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { callMembersAPI } from '../../../apis/MemberAPICalls';
import { red } from '@mui/material/colors';
import { Box, Grid, Checkbox } from '@mui/material';
import { decodeJwt } from '../../../utils/tokenUtils';
import SearchBar from '../../contents/SearchBar';

const SubscriptionList = ({ subscribedMembers, setSubscribedMembers, selectedStatus, setSelectedStatus }) => {
    const dispatch = useDispatch();
    const token = decodeJwt(window.localStorage.getItem("accessToken"));
    const dptNo = token?.depNo;

    const schedules = useSelector(state => state.scheduleReducer);
    const scheduleList = schedules?.results?.schedule || [];

    const members = useSelector(state => state.memberReducer);
    const filteredMemberList = useMemo(() => {
        return Array.isArray(members)
            ? members.filter(member => member?.department?.depNo === dptNo)
            : [];
    }, [members, dptNo]);

    const [searchKeyword, setSearchKeyword] = useState('');
    const [allMemberChecked, setAllMemberChecked] = useState(false);
    const [allStatusChecked, setAllStatusChecked] = useState(false);

    useEffect(() => {
        dispatch(callMembersAPI());
    }, [dispatch]);

    useEffect(() => {
        const initialSubscribedMembers = filteredMemberList.map(member => member.memberNo);
        setSubscribedMembers(initialSubscribedMembers);
    }, [filteredMemberList, setSubscribedMembers]);

    useEffect(() => {
        setAllMemberChecked(
            filteredMemberList.length > 0 &&
            filteredMemberList.every(member => subscribedMembers.includes(member.memberNo))
        );
    }, [filteredMemberList, subscribedMembers]);

    useEffect(() => {
        setAllStatusChecked(
            scheduleStatuses.length > 0 &&
            scheduleStatuses.every(status => selectedStatus.includes(status))
        );
    }, [selectedStatus]);

    const handleSearch = (searchKeyword) => {
        setSearchKeyword(searchKeyword);
    };

    const handleSubscribeChange = (memberNo) => {
        if (subscribedMembers.includes(memberNo)) {
            setSubscribedMembers(subscribedMembers.filter(id => id !== memberNo));
        } else {
            setSubscribedMembers([...subscribedMembers, memberNo]);
        }
    };

    const handleStatusChange = (status) => {
        if (selectedStatus.includes(status)) {
            setSelectedStatus(selectedStatus.filter(s => s !== status));
        } else {
            setSelectedStatus([...selectedStatus, status]);
        }
    };

    const handleAllMemberCheckChange = () => {
        if (allMemberChecked) {
            setSubscribedMembers([]);
        } else {
            setSubscribedMembers(filteredMemberList.map(member => member.memberNo));
        }
        setAllMemberChecked(!allMemberChecked);
    };

    const handleAllStatusCheckChange = () => {
        if (allStatusChecked) {
            setSelectedStatus([]);
        } else {
            setSelectedStatus(scheduleStatuses);
        }
        setAllStatusChecked(!allStatusChecked);
    };

    const filteredList = useMemo(() => {
        if (!searchKeyword) {
            return filteredMemberList;
        }
        const matchedMember = filteredMemberList.find(member =>
            member.memberName === searchKeyword
        );
        return matchedMember ? [matchedMember] : [];
    }, [searchKeyword, filteredMemberList]);

    const filterTableByMembers = (filteredList) => (
        <div style={{ maxHeight: '343px', overflowY: 'scroll' }}>
            <Table>
                <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                    <tr>
                        <th>
                            <Checkbox
                                checked={allMemberChecked}
                                onChange={handleAllMemberCheckChange}
                                sx={{ color: red[800], '&.Mui-checked': { color: red[600] } }}
                            />
                        </th>
                        <th style={{ textAlign: 'center', padding: '20px 0' }}>프로필 사진</th>
                        <th style={{ textAlign: 'center', padding: '20px 0' }}>직급</th>
                        <th style={{ textAlign: 'center', padding: '20px 0' }}>이름</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredList.map((member) => (
                        <tr key={member.memberNo}>
                            <td>
                                <Checkbox
                                    checked={subscribedMembers.includes(member.memberNo)}
                                    onChange={() => handleSubscribeChange(member.memberNo)}
                                    sx={{ color: red[800], '&.Mui-checked': { color: red[600] } }}
                                />
                            </td>
                            <td>
                                <img src={`/img/${member.imgUrl}`} width={30} height={30} alt='memberImg' />
                            </td>
                            <td>{member.position.positionName}</td>
                            <td>{member.memberName}</td>
                        </tr>
                    ))}
                    {filteredList.length === 0 && (
                        <tr>
                            <td colSpan={4}>
                                <h6>검색 결과가 없습니다.</h6>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );

    const scheduleStatuses = ["예정", "진행 중", "완료", "보류", "막힘"];
    const scheduleStatusColors = ["#F5BF3C", "#3CB479", "#1B9CE3", 'grey', "#F2522D"];

    const filterTablebyStatus = () => (
        <Table>
            <thead>
                <tr>
                    <th>
                        <Checkbox
                            checked={allStatusChecked}
                            onChange={handleAllStatusCheckChange}
                            sx={{ color: red[800], '&.Mui-checked': { color: red[600] } }}
                        />
                    </th>
                    <th style={{ textAlign: 'center', padding: '20px 0' }}>일정 상태</th>
                    <th style={{ textAlign: 'center', padding: '20px 0' }}>구분색</th>
                </tr>
            </thead>
            <tbody>
                {scheduleStatuses.map((status, index) => (
                    <tr key={status}>
                        <td>
                            <Checkbox
                                checked={selectedStatus.includes(status)}
                                onChange={() => handleStatusChange(status)}
                                sx={{ color: red[800], '&.Mui-checked': { color: red[600] } }}
                            />
                        </td>
                        <td>{status}</td>
                        <td style={{ textAlign: 'center' }}>
                            <Box
                                component="span"
                                sx={{
                                    display: 'inline-block',
                                    width: 20,
                                    height: 20,
                                    borderRadius: '50%',
                                    backgroundColor: scheduleStatusColors[index],
                                }}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );

    return (
        <Box p={3} mt={4} display="flex" justifyContent="space-between" width="81.3vw">
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                        <h5 style={{ marginRight: '16px' }}>참여 인원별 일정</h5>
                        <SearchBar onSearch={handleSearch} name={'이름으로 검색'} />
                    </Grid>
                    {filterTableByMembers(filteredList)}
                </Grid>
                <Grid item xs={12} md={6}>
                    <h5 style={{ marginBottom: 25 }}>진행상태별 일정</h5>
                    {filterTablebyStatus()}
                </Grid>
            </Grid>
        </Box >
    );
};

export default SubscriptionList;
