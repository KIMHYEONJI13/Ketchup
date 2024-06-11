import { createActions, handleActions } from "redux-actions";

const initialState =  {
    memberNo: '',
    noticeContent: '',
    noticeCreateDttm: 0,
    noticeFix: '',
    noticeNo: 0,
    noticeTitle: '',
    noticeUpdateDttm: ''
};

const GET_NOTICELIST = 'notice/GET_NOTICELIST';
const GET_NOTICE = 'notice/GET_NOTICE';
const INSERT_NOTICE = 'notice/INSERT_NOTICE';
const UPDATE_NOTICE = 'notice/UPDATE_NOTICE';
const DELETE_NOTICE = 'notice/DELETE_NOTICE';

export const { notice: { getNoticelist, getNotice, insertNotice, updateNotice, deleteNotice } } = createActions({
    [GET_NOTICELIST]: (res) => ({ noticelist: res }),
    [GET_NOTICE]: (res) => ({ notice: res }),
    [INSERT_NOTICE]: (res) => ({ insert: res }),
    [UPDATE_NOTICE]: (res) => ({ update: res }),
    [DELETE_NOTICE]: (res) => ({ delete: res })
});

const noticeReducer = handleActions (
    {
        [GET_NOTICELIST]: (state, {payload}) => {
            return payload;
        },
        [GET_NOTICE]: (state, {payload}) => {
            return payload;
        },
        [INSERT_NOTICE]: (state, {payload}) => {
            return payload;
        },
        [UPDATE_NOTICE]: (state, {payload}) => {
            return payload;
        },
        [DELETE_NOTICE]: (state, {payload}) => {
            return payload;
        }
    }, 
    initialState
);

export default noticeReducer;