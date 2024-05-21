import { Box, Button, Grid, Typography, Dialog } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import { getReserveAPI } from "../../apis/ReserveAPICalls";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import ResourceCategorySelect from "./ResourceCategorySelect";
import ReserveDateSelect from "./ReserveDateSelect";
import InsertReserveForm from "../../components/form/InsertReserveForm";
import ReserveDetail from "../../components/form/ReserveDetail";

export default function Reserve() {
    const dispatch = useDispatch();
    const reserves = useSelector(state => state.reserveReducer);
    const [reserveData, setReserveData] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);
    const [searchConditions, setSearchConditions] = useState({
        rscCategory: "",
        rsvDate: ""
    });
    const [selectedReserve, setSelectedReserve] = useState([]);
    const [selectedResource, setSelectedResource] = useState({});
    const [insertReserveDialogOpen, setInsertReserveDialogOpen] = useState(false);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);

    const onDateClickHandler = () => { setInsertReserveDialogOpen(true) };
    const onInsertCancelHandler = () => { setInsertReserveDialogOpen(false) };
    const closeDetailDialog = () => { setDetailDialogOpen(false) };

    const onEventClickHandler = (selected) => {
        console.log("Event clicked", selected);
        console.log("Event's event clicked", selected.event);
        setSelectedReserve(selected.event);
        setDetailDialogOpen(true);
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setSearchConditions({
            ...searchConditions,
            [name]: value
        });
    };

    const convertToCalendarProps = (rsvList) => {
        console.log("rsvList 확인", rsvList);
        if (!Array.isArray(rsvList) || rsvList.length === 0) {
            return [];
        }

        return rsvList.map(reserve => {
            try {
                const resources = reserve.resources || {};
                const { rscNo, rscCategory, rscName, rscInfo, rscCap, rscIsAvailable, rscDescr } = resources;

                return {
                    title: reserve.rsvDescr,
                    start: moment(reserve.rsvStartDttm, 'YYYY-MM-DD A h:mm').toDate(),
                    end: moment(reserve.rsvEndDttm, 'YYYY-MM-DD A h:mm').toDate(),
                    id: reserve.rsvNo,
                    extendedProps: {
                        rsvDescr: reserve.rsvDescr,
                        reserver: reserve.reserver,
                        resources: {
                            rscNo: rscNo,
                            rscCategory: rscCategory,
                            rscName: rscName,
                            rscInfo: rscInfo,
                            rscCap: rscCap,
                            rscIsAvailable: rscIsAvailable,
                            rscDescr: rscDescr
                        }
                    }
                };
            } catch (error) {
                return null;
            }
        })
    };

    const fetchReserves = () => {
        console.log("fetchReserves를 타고 있는지?");
        try {
            const { rscCategory, rsvDate } = searchConditions;
            if (!rsvDate) {
                throw new Error("날짜를 입력해주세요.");
            }
            console.log("API 호출 전 dispatch", { rscCategory, rsvDate });
            dispatch(getReserveAPI(rscCategory, rsvDate));
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            console.error(errorMessage);
        }
    };

    useEffect(() => {
        console.log('reserves 확인', reserves);
        if (Array.isArray(reserves)) {
            const convertedReserves = convertToCalendarProps(reserves);
            setReserveData(convertedReserves);
            const grouped = groupReservesByRsc(convertedReserves);
            setSelectedResource(grouped);
        }
    }, [reserves]);

    const onClickSearch = () => {
        setSearchClicked(true);
    };

    useEffect(() => {
        if (searchClicked) {
            fetchReserves();
        }
    }, [searchClicked]);

    const groupReservesByRsc = (reserveData) => {
        console.log("reserveData 확인", reserveData);
        const groupedReserves = {};
        reserveData.forEach((reserve) => {
            const rscNo = reserve.extendedProps.resources.rscNo;
            if (!groupedReserves[rscNo]) {
                groupedReserves[rscNo] = [];
            }
            groupedReserves[rscNo].push(reserve);
        });
        return groupedReserves;
    };

    const showCalendars = () => {
        const groupedReserves = groupReservesByRsc(reserveData);
        console.log("groupedReserves", groupedReserves);
        return Object.entries(groupedReserves).map(([rscNo, reserveList]) => {
            console.log(`rscNo: ${rscNo}`, reserveList);
            return (
                <Grid item xs={12} md={6} key={rscNo}>
                    <Box overflowX="auto" whiteSpace="nowrap" flex="1 1 100%" ml="15px" mt="15px" >
                        <Typography textAlign="center" variant="h4">{reserveList[0]?.extendedProps.resources.rscName}</Typography>
                        <FullCalendar
                            locale="ko"
                            events={reserveList}
                            initialView="dayGridDay"
                            initialDate={searchConditions.rsvDate}
                            plugins={[
                                dayGridPlugin,
                                timeGridPlugin,
                                interactionPlugin,
                                listPlugin
                            ]}
                            height="50vh"
                            headerToolbar={false}
                            themeSystem='bootstrap'
                            selectable={true}
                            select={onDateClickHandler}
                            eventClick={onEventClickHandler}
                        />
                    </Box>
                </Grid>
            );
        });
    };

    return (
        <main id="main" className="main">
            <Box p={2}>
                <Grid container spacing={2} alignItems="center" mb={8} sx={{ backgroundColor: "rgb(236, 11, 11, 0.17)", borderRadius: "10px" }}>
                    <Grid item xs={12}>
                        <h1 style={{ marginTop: 15 }}>자원예약</h1>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <ResourceCategorySelect value={searchConditions.rscCategory} onChange={(value) => setSearchConditions({ ...searchConditions, rscCategory: value })} />
                    </Grid>
                    <Grid item md={4} xs={10}>
                        <ReserveDateSelect value={searchConditions.rsvDate} onChange={(e) => setSearchConditions({ ...searchConditions, rsvDate: e.target.value })} />
                    </Grid>
                    <Grid item md={2} xs={2} >
                        <Button onClick={onClickSearch}>조회</Button>
                    </Grid>
                </Grid>
                {searchClicked ? (
                    <Grid container spacing={2}>
                        {showCalendars()}
                    </Grid>
                ) : (
                    <Typography fontSize={38}>검색 조건을 입력하여 검색해주세요.</Typography>
                )}
            </Box>

            <Dialog open={insertReserveDialogOpen} onClose={onInsertCancelHandler}>
                <InsertReserveForm
                    onInsertCancelHandler={onInsertCancelHandler}
                    selectedResource={selectedResource}
                />
            </Dialog>

            <Dialog open={detailDialogOpen} onClose={closeDetailDialog}>
                <ReserveDetail
                    closeDetailDialog={closeDetailDialog}
                    selectedReserve={selectedReserve}
                />
            </Dialog>
        </main >
    );
};