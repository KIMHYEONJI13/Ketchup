import { createActions, handleActions } from "redux-actions";

const initialState =  {
    commentList: [], 
    commentNo: 0,                  //댓글 번호
    boardNo: 0,                    //게시물번호
    memberNo: '',                  //사번 (댓글 작성자)
    commentContent: '',            //댓글 내용
    parentCommentNo: 0,            // 부모 댓글 번호 (null이면 최상위 댓글)
    parentMemberNo: ''             // 부모 댓글의 작성자 사번
};

const GET_COMMENTLIST = 'comment/GET_COMMENTLIST';
const GET_COMMENT = 'comment/GET_COMMENT';
const GET_REPLY = 'comment/GET_REPLY';
const INSERT_COMMENT = 'comment/INSERT_COMMENT';
const UPDATE_COMMENT = 'comment/UPDATE_COMMENT';
const DELETE_COMMENT = 'comment/DELETE_COMMENT';
const INSERT_REPLY = 'comment/INSERT_REPLY';

export const { comment: { getCommentlist, getComment, getReply, insertComment, updateComment, deleteComment, insertreply } } = createActions({
    [GET_COMMENTLIST]: (res) => ({ commentlist: res }),
    [GET_COMMENT]: (res) => ({ comment: res }),
    [GET_REPLY]: (res) => ({ reply: res }),
    [INSERT_COMMENT]: (res) => ({ insert: res }),
    [UPDATE_COMMENT]: (res) => ({ update: res }),
    [DELETE_COMMENT]: (res) => ({ delete: res }),
    [INSERT_REPLY]: (res) => ({insertreply: res})
});

const commentReducer = handleActions (
    {
        [GET_COMMENTLIST]: (state, {payload}) => {
            return payload;
        },
        [GET_COMMENT]: (state, {payload}) => {
            return payload;
        },
        [GET_REPLY]: (state, {payload}) => {
            return payload;
        },
        [INSERT_COMMENT]: (state, {payload}) => {
            return payload;
        },
        [UPDATE_COMMENT]: (state, {payload}) => {
            return payload;
        },
        [DELETE_COMMENT]: (state, {payload}) => {
            return payload;
        },
        [INSERT_REPLY]: (state, {payload}) => {
            return payload;
        }
    }, 
    initialState
);

export default commentReducer;