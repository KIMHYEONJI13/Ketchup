import { createActions, handleActions } from 'redux-actions';

const initialState = [];

/* action 타입 */
export const { getSchedule, postSchedule, putSchedule, deleteSchedule } = createActions({
    GET_SCHEDULE: () => { },
    POST_SCHEDULE: () => { },
    PUT_SCHEDULE: (skdNo) => ({ skdNo }),
    DELETE_SCHEDULE: (skdNo) => ({ skdNo })
});

/* reducer */
const scheduleReducer = handleActions(
    {
        // 지금 main에서 가지고 있는 fetchEvents 내용 자체가 리듀서에서 처리되어야할 내용임.
        [getSchedule]: (state, { payload }) => {
            return payload;
        },
        [postSchedule]: (state, { payload }) => {
            return payload;
        },
        [putSchedule]: (state, { payload }) => {
            const updatedSchedule = payload;
            return state.map(schedule =>
                schedule.id === updatedSchedule.id ? updatedSchedule : schedule
            );
        },
        [deleteSchedule]: (state, { payload: { skdNo } }) => {
            return state.filter(schedule => schedule.id !== skdNo);
        }
    }, initialState
);

export default scheduleReducer;
