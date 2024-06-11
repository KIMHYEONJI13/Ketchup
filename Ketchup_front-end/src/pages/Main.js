import { Link, useNavigate } from "react-router-dom";
import BootstrapTable from "../components/contents/BootstrapTable";
import ApprovalBox from "../components/contents/ApprovalBox";
import { useDispatch, useSelector } from "react-redux";
import { decodeJwt } from '../utils/tokenUtils';
import { useEffect, useState } from "react";
import { callGetMemberNameAPI } from "../apis/MemberAPICalls";
import { callGetNoticeListAPI } from "../apis/NoticeAPICalls";
import { getScheduleAPI } from "../apis/ScheduleAPICalls";
import { callGetApprovalCountAPI } from "../apis/ApprovalAPICalls";
import FormatDateTime from "../components/contents/FormatDateTime";
import { BsMegaphone } from "react-icons/bs";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import moment from "moment";
import { Box } from "@mui/material";
import ButtonGroup from "../components/contents/ButtonGroup";
import { Label } from "@mui/icons-material";

function Main() {
    const dispatch = useDispatch();
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // 데이터 로딩 상태를 관리합니다.
    const schedules = useSelector(state => state.scheduleReducer);
    const navigate = useNavigate();
    const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));
    const [approvalCount, setApprovalCount] = useState({});

    // 결재 
    const approvalData = [
        { title: "진행중인 문서", count: approvalCount?.myApp, categoryNo: 1 },
        { title: "완료된 문서", count: approvalCount?.doneApp, categoryNo: 2 },
        { title: "결재 대기 문서", count: approvalCount?.receiveApp, categoryNo: 3 },
        { title: "수신 참조 문서", count: approvalCount?.refApp, categoryNo: 4 }
    ];

    const onClickApp = (categoryNo) => {
        window.localStorage.setItem('category', categoryNo);
    }

    const getEventColor = (skdStatus) => {
        switch (skdStatus) {
            case '예정': return '#F5BF3C';
            case '진행 중': return '#3CB479';
            case '완료': return '#1B9CE3';
            case '보류': return 'grey';
            case '막힘': return '#F2522D';
            default: return '#95A5A6';
        }
    };

    const convertToCalendarProps = (schedules) => {
        try {
            if (schedules && schedules.results && schedules.results.schedule) {
                const events = schedules.results.schedule.map(schedule => ({
                    title: schedule.skdName,
                    start: moment(schedule.skdStartDttm, "YYYY-MM-DD A h:mm").toISOString(),
                    end: moment(schedule.skdEndDttm, "YYYY-MM-DD A h:mm").toISOString(),
                    id: schedule.skdNo,
                    skdStatus: schedule.skdStatus,
                    backgroundColor: getEventColor(schedule.skdStatus),
                    borderColor: getEventColor(schedule.skdStatus)
                }));
                return events;
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    };

    useEffect(() => {
        const currentPage = 1; // 현재 페이지를 1로 설정하거나, 다른 값으로 설정 가능
        const title = ''; // 검색할 제목이 없으면 빈 문자열로 설정
        const setTotalItems = () => { }; // 빈 함수 설정
        dispatch(callGetNoticeListAPI({ currentPage, title, setTotalItems }));

        const fetchSchedules = () => {
            try {
                const token = decodeJwt(window.localStorage.getItem("accessToken"));
                const dptNo = token.depNo;

                if (dptNo) {
                    dispatch(getScheduleAPI(dptNo));
                }
            } catch (error) {
                console.error("fetchSchedules 도중 에러 발생", error);
            }
        };
        const categoryCount = async () => {
            try {
                const result = await callGetApprovalCountAPI(loginToken.memberNo);
                if (result.status === 200) {
                    setApprovalCount(result.data);
                } else {
                    console.log('실패');
                }
            } catch (error) {
                console.error('데이터 가져오기 실패:', error);
            }
        };
        categoryCount();
        fetchSchedules();
    }, [dispatch]);

    useEffect(() => {
        if (!schedules) {
            return;
        }
        setEvents(convertToCalendarProps(schedules));
        setIsLoading(false);
    }, [schedules]);

    useEffect(() => {
        if (loginToken == null) {
            navigate("/login");
        }
    }, []);


    // 공지사항 목록 Redux store에서 가져오기
    const result = useSelector(state => state.noticeReducer);
    const noticeList = result?.noticelist?.noticesWithMemberNames || [];

    const formattedNoticeList = noticeList
        .sort((a, b) => new Date(b.noticeCreateDttm) - new Date(a.noticeCreateDttm)) // 등록일 기준으로 내림차순 정렬
        .slice(0, 3)
        .map(item => ({
            ...item,
            noticeTitle: (
                <>
                    {item.noticeFix === 'Y' && (
                        <span style={{ marginRight: '5px' }}>
                            [ 필독&nbsp;
                            <span style={{ color: '#EC0B0B' }}>
                                <BsMegaphone />
                            </span>
                            &nbsp;]
                        </span>
                    )}
                    {item.noticeTitle}
                </>
            ),
            memberName: `${item.memberName} ${item.positionName}`,
            noticeCreateDttm: FormatDateTime(item.noticeCreateDttm)
        }));

    // 컬럼 제목 목록
    const columns = [
        ['noticeNo', '공지번호'],
        ['noticeTitle', '제목'],
        ['memberName', '작성자'],
        ['noticeCreateDttm', '등록일']
    ];

    const handleRowClick = (index) => {
        const noticeNo = formattedNoticeList[index]?.noticeNo;
        navigate(`/notices/${noticeNo}`);
    };

    const businessHours = {
        daysOfWeek: [1, 2, 3, 4, 5],
        startTime: '09:00',
        endTime: '19:00',
    };

    return (
        <main id="main" className="main">
            {isLoading ? ( // 데이터 로딩 중이면 로딩 스피너를 표시합니다.
                <div>Loading...</div>
            ) : (
                <>
                    {/* 메인 환영 */}
                    <div className="pagetitle col-lg-12">
                        <div id="mainbox" className="p-4 p-md-5 mb-4 rounded text-body-emphasis" style={{ backgroundColor: "rgb(236, 11, 11, 0.17)", marginTop: '80px'}}>
                            <div style={{ display: "flex", margin: -15 }}>
                                <div className="col-lg-6 px-0">
                                    <h1 className="display-1" style={{ fontSize: "45px" }}>안녕하세요, {loginToken.memberName} {loginToken.positionName}님!</h1>
                                    <h2 className="lead my-3" style={{ fontSize: "30px" }}>오늘 하루도 화이팅하세요🤩</h2>
                                </div>
                                {/* <img src="images/ketchupAni.gif" style={{ width: "300px", height: "240px", position: 'absolute', right: 50, bottom: 0 , marginRight: 580 }}></img> */}
                                <img src="images/mainImage.png" style={{ width: "300px", height: "240px", position: 'absolute', right: 50, bottom: 0}}></img>
                            </div>
                        </div>
                    </div>

                    {/* 전자결재 */}
                    <div className="col-lg-12">
                        <div className="row">
                            {approvalData.map(({ title, count, categoryNo }) => (
                                <Link to={`/approvals`} className="col-xxl-3 col-md-6" style={{ textDecorationLine: 'none' }} onClick={() => onClickApp(categoryNo)}>
                                    <ApprovalBox title={title} count={count} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* 공지사항 */}
                    <div className="col-12">
                        <div className="card recent-sales overflow-auto">
                            <h2 className="card-title"
                                style={{ fontWeight: 'bold', fontSize: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '20px', paddingRight: '20px' }}>
                                공지사항

                                <button className="move-btn" style={{ fontSize: '16px', width: '75px' }} onClick={() => navigate('/notices')}>더보기</button>
                            </h2>
                            {noticeList.length === 0 ? (
                                <>
                                    <BootstrapTable data={formattedNoticeList} columns={columns} onRowClick={handleRowClick} />
                                    <span style={{ textAlign: 'center', marginBottom: '20px'}}> 공지가 없습니다.</span>
                                </>
                            ) : (
                                <>
                                    <BootstrapTable data={formattedNoticeList} columns={columns} onRowClick={handleRowClick} />
                                </>
                            )}
                        </div>
                    </div>

                    {/* 일정 */}
                    <div className="col-12">
                        <Box flex="100%" mt="15px">
                            <FullCalendar
                                locale="ko"
                                events={events}
                                allDaySlot={false}
                                height="50vh"
                                initialView="timeGridWeek"
                                eventColor='red'
                                plugins={[
                                    dayGridPlugin,
                                    timeGridPlugin,
                                    interactionPlugin,
                                    listPlugin
                                ]}
                                headerToolbar={{
                                    left: "prev next today",
                                    center: "title",
                                    right: "moreButton"
                                }}
                                customButtons={{
                                    moreButton: {
                                        text: '더보기',
                                        click: function () {
                                            navigate('/calendar');
                                        }
                                    }
                                }}
                                businessHours={businessHours}
                                slotMinTime="08:00"
                            />
                        </Box>
                    </div>
                </>
            )}
        </main>
    );
}

export default Main;