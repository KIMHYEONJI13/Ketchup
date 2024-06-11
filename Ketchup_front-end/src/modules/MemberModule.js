import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_MEMBER     = 'member/GET_MEMBER';
export const GET_MEMBERS    = 'member/GET_MEMBERS';
export const POST_LOGIN     = 'member/POST_LOGIN';
export const POST_REGISTER  = 'member/POST_REGISTER';
export const PUT_MEMBERS    = 'member/PUT_MEMBERS';


const actions = createActions({
    [GET_MEMBER]: () => {},
    [GET_MEMBERS]: () => {},
    [POST_LOGIN]: () => {},
    [POST_REGISTER]: () => {},
    [PUT_MEMBERS]: () => {},
});

/* 리듀서 */
const memberReducer = handleActions(
    {
        [GET_MEMBER]: (state, { payload }) => {
            
            return payload;
        },
        [GET_MEMBERS]: (state, { payload }) => {
            
            return payload;
        },
        [POST_LOGIN]: (state, { payload }) => {
            
            return payload;
        },
        [POST_REGISTER]: (state, { payload }) => {
            
            return payload;
        },
        [PUT_MEMBERS]: (state, { payload }) => {
            
            return {...state, payload}
        }
       

    },
    initialState
);

export default memberReducer;