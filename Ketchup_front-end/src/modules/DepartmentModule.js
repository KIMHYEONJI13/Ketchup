import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */

export const GET_DEPARTMENTS    = 'member/GET_DEPARTMENTS';
export const POST_DEPARTMENTS   = 'member/POST_DEPARTMENTS';
export const PUT_DEPARTMENTS    = 'member/PUT_DEPARTMENTS';
export const DELETE_DEPARTMENTS = 'member/DELETE_DEPARTMENTS';



const actions = createActions({
   
    [GET_DEPARTMENTS]: () => {},
    [POST_DEPARTMENTS]: () => {},
    [PUT_DEPARTMENTS]: () => {},
    [DELETE_DEPARTMENTS]: () => {}
   
});

/* 리듀서 */
const departmentReducer = handleActions(
    {
       
        [GET_DEPARTMENTS]: (state, { payload }) => {
            
            return payload;
        },
        

    },
    {
       
        [POST_DEPARTMENTS]: (state, { payload }) => {
            
            return payload;
        },
        

    },
    {
       
        [PUT_DEPARTMENTS]: (state, { payload }) => {
            
            return payload;
        },
        

    },
    {
       
        [DELETE_DEPARTMENTS]: (state, { payload }) => {
            
            return payload;
        },
        

    },
    initialState
);

export default departmentReducer;