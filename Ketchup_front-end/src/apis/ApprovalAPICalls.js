import { getApprovals, getApproval, postApproval, putApproval } from "../modules/ApprovalModule";
import { request } from "./Api";

export const callAppListAPI = ({ memberNo, category, status, search, currentPage }) => {
    let requestURL;

    if (currentPage !== undefined || currentPage !== null) {
        requestURL = `/approvals?memberNo=${memberNo}&category=${category}&status=${status}&page=${currentPage}&search=${search}`;
    } else {
        requestURL = `/approvals?memberNo=${memberNo}&category=${category}&status=${status}&search=${search}`;
    }

    return async (dispatch, getState) => {
        const result = await request('GET', requestURL);
        if (result.status == 200) {
            dispatch(getApprovals(result.data));
        }
    }
}; //목록

export const callAppAPI = ({ approvalNo }) => {
    let requestURL = `/approvals/${approvalNo}`;

    return async (dispatch, getState) => {
        const result = await request('GET', requestURL);
        if (result.status == 200) {
            dispatch(getApproval(result.data));
        }
    }
} //상세

export const callInsertAppAPI = ({ form }) => {
    let requestURL = `/approvals`;
    return async (dispatch, getState) => {
        const result = await request('POST', requestURL, form);
        if (result.status === 200 && result.data === '성공') {
            dispatch(postApproval(result));
        } else {
            throw new Error('에러');
        }
    }

} //등록

export const callGetFormAPI = async (formNo) => {
    let requestURL = `/forms/${formNo}`;
    const result = await request('GET', requestURL);
    return result;
} //양식

export const callGetApprovalCountAPI = async (memberNo) => {
    let requestURL = `/approvals/count?memberNo=${memberNo}`;
    const result = await request('GET', requestURL);
    return result;
} // 문서 개수 조회

export const callUpdateApprovalAPI = (appUpdate, approvalNo) => {
    let requestURL = `/approvals/${approvalNo}`;
    return async (dispatch, getState) => {
        const result = await request('PUT', requestURL, appUpdate);
        if (result.status === 200 && result.data === '성공') {
            dispatch(putApproval(result));
        } else {
            throw new Error('에러');
        }
    }
} // 상태 수정