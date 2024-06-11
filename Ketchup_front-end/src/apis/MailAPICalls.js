import { getReceivemail, getSendmail, getMaildetail, postInsertmail, putDeletemail, putReadtime, putMailcancel, getUnreadmail } from "../modules/MailModule";
import { request } from "./Api";

// 받은 메일
export function callGetReceiveMailAPI(currentPage, searchCondition, searchValue) {
    console.log("getReceivemail api call...");

    return async (dispatch, getState) => {
        let url = `/mails?part=receive&page=${currentPage}`;
        if (searchCondition && searchValue) {
            url += `&search=${searchCondition}&searchvalue=${searchValue}`;
        }
        const result = await request('GET', url);

        const sendMailName = await Promise.all(result?.data?.data?.content.map(async (mail) => {
            const memberInfoResult = await request('GET', `/members/${mail?.senderMem}`);

            let timeString = "";
            if (mail.receivers[0]?.readTime == null) {
                timeString = "안읽음";
            } else {
                timeString = "읽음";
            }

            return { ...mail, senderName: memberInfoResult?.data?.memberName + " " + memberInfoResult.data.position.positionName , readTime: timeString };
        }));

        dispatch(getReceivemail({mails: sendMailName, pageTotal: result?.data?.data?.totalElements}));
    };
}

// 보낸 메일
export function callGetSendMailAPI(currentPage, searchCondition, searchValue) {
    console.log("getSendmail api call...");

    return async (dispatch, getState) => {
        let url = `/mails?part=send&page=${currentPage}`;
        if (searchCondition && searchValue) {
            url += `&search=${searchCondition}&searchvalue=${searchValue}`;
        }
        const result = await request('GET', url);

        const receiveMailName = await Promise.all(result?.data?.data?.content.map(async (mail) => {
            const memberInfos = await Promise.all(mail.receivers.map(async (receiver) => {
                const memberInfoResult = await request('GET', `/members/${receiver.receiverMem}`);

                let readString = '';
                if (receiver.readTime != null) {
                    readString = "읽음";
                } else {
                    readString = "안읽음";
                }

                return { name: memberInfoResult.data.memberName, readTime: readString, dep: memberInfoResult.data.position.positionName };
            }));

            return { ...mail, receiverName: memberInfos };
        }));

        dispatch(getSendmail({mails: receiveMailName, pageTotal: result?.data?.data?.totalElements}));
    };
}

// 메일 상세
export function callGetMailDetailAPI(mailNo, part) {
    console.log("getMailDetail api call...");

    return async (dispatch, getState) => {
        const result = await request('GET', `/mails/${mailNo}`);
        if (part === 'receive') {
            const memberInfoResult = await request('GET', `/members/${result?.data?.senderMem}`);
            const receiveMailDetail = { ...result?.data, memberName: memberInfoResult?.data?.memberName, memberDepName: memberInfoResult?.data?.position?.positionName, memberCompanyEmail: memberInfoResult?.data?.companyEmail };

            dispatch(getMaildetail(receiveMailDetail));
        } else if (part === 'send') {
            const mail = result.data;
            const memberDetails = await Promise.all(mail.receivers.map(async (receiver) => {
                const memberInfoResult = await request('GET', `/members/${receiver.receiverMem}`);
                const formattedName = `${memberInfoResult.data.memberName} ${memberInfoResult.data.position.positionName}`;
                return formattedName;
            }));
            const formattedMemberNames = memberDetails.join(', ');
            const sendMailDetail = { ...mail, memberName: formattedMemberNames };

            dispatch(getMaildetail(sendMailDetail));
        }
    };
}

// 메일 작성
export const callPostInsertMailAPI = ({ formData }) => {
    console.log("postInsertmail api call...");

    const requestURL = `http://localhost:8080/mails`;

    return async (dispatch, getState) => {
        try {
            const result = await fetch(requestURL, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken')
                },
                body: formData
            }).then((response) => response.json());

            dispatch(postInsertmail(result.data));
        } catch (error) {
            console.error('네트워크 오류:', error);
        }
    };
}

// 메일 삭제 = 삭제 상태 수정
export const callPutDeleteMailAPI = (part, mailNos) => {
    console.log("putDeletemail api call...");

    return async (dispatch, getState) => {
        const mailnoParams = mailNos.map(mailNo => `mailno=${mailNo}`).join('&');
        const result = await request('PUT', `/mails?part=${part}&${mailnoParams}`);

        dispatch(putDeletemail(result.data));
    };
}

// 수신자 읽음
export const callPutReadTimeAPI = (mailNo) => {
    console.log("putReadtime api call...");

    const requestURL = `http://localhost:8080/mails/times/${mailNo}`;

    return async (dispatch, getState) => {
        try {
            const response = await fetch(requestURL, {
                'method': 'PUT',
                'headers': {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            });

            const result = await response.json();

            dispatch(putReadtime(result));
        } catch (error) {
            console.error('Error updatetime :', error);
        }
    };
}

// 발송 취소
export function callPutSendMailCancel(mailNo) {
    console.log("putMailcancel api call...");

    return async (dispatch, getState) => {
        const result = await request('PUT', `/mails/${mailNo}`);

        dispatch(putMailcancel(result.data));
    };
}

// 안읽은 메일
export function callGetUnreadMailAPI() {
    console.log("getUnreadmail api call...");

    return async (dispatch, getState) => {
        const result = await request('GET', '/mails/receive/unread');

        dispatch(getUnreadmail(result.data));
    };
}