import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
// 초기값
const initialState = {
    appLineList: [],
    refLineList: [],
    form: { formName: '' }, 
    member: { department: { depName: '' }, memberName: '' },
    appFileList: [],
    appTitle: '',
    appDate: '',
    appContents: ''
};

// 액션 
const GET_APPROVALS = 'app/GET_APPROVALS';
const GET_APPROVAL = 'app/GET_APPROVAL';
const POST_APPROVAL = 'app/POST_APPROVAL';
const PUT_APPROVAL = 'app/PUT_APPROVAL';

export const { app: { getApprovals, getApproval, postApproval, putApproval }} = createActions({
    [GET_APPROVALS]: (res) => (res),
    [GET_APPROVAL]: (res) => (res),
    [POST_APPROVAL]: (res) => (res),
    [PUT_APPROVAL]: (res) => (res)
});

//리듀서
const approvalReducer = handleActions({
        [GET_APPROVALS]: (state, {payload}) => {return payload},
        [GET_APPROVAL]: (state, {payload}) => {return payload},
        [POST_APPROVAL]: (state, {payload}) => {return payload},
        [PUT_APPROVAL]: (state, {payload}) => {return payload}
    }, initialState);

export default approvalReducer;