import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */

export const GET_POSITIONS = 'member/GET_POSITIONS';
export const POST_POSITIONS = 'member/POST_POSITIONS';
export const PUT_POSITIONS = 'member/PUT_POSITIONS';
export const DELETE_POSITIONS = 'member/DELETE_POSITIONS';



const actions = createActions({

    [GET_POSITIONS]: () => { },
    [POST_POSITIONS]: () => { },
    [PUT_POSITIONS]: () => { },
    [DELETE_POSITIONS]: () => { }

});

/* 리듀서 */
const positionReducer = handleActions(
    {

        [GET_POSITIONS]: (state, { payload }) => {

            return payload;
        },

        [POST_POSITIONS]: (state, { payload }) => {

            return payload;
        },
        [PUT_POSITIONS]: (state, { payload }) => {

            return payload;
        },
        [DELETE_POSITIONS]: (state, { payload }) => {

            return state;
        },



    },
    initialState
);

export default positionReducer;