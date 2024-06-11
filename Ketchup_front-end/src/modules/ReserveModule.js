import { createActions, handleActions } from 'redux-actions';

const initialState = [];

export const GET_RESERVE = 'reserves/GET_RESERVE';
export const POST_RESERVE = 'reserves/POST_RESERVE';
export const DELETE_RESERVE = 'reserves/DELETE_RESERVE';

const actions = createActions({
    [GET_RESERVE]: () => { },
    [POST_RESERVE]: () => { },
    [DELETE_RESERVE]: (rsvNo) => ({ rsvNo })
});

const reserveReducer = handleActions(
    {
        [GET_RESERVE]: (state, { payload }) => {
            return payload;
        },
        [POST_RESERVE]: (state, { payload }) => {
            return payload;
        },
        [DELETE_RESERVE]: (state, { payload: { rsvNo } }) =>  {
            return state.filter(reserve => reserve.id !== rsvNo);
        }
    }, initialState
);

export default reserveReducer;