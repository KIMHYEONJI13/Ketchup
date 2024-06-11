import { request } from "./Api";
import { getNoticelist, getNotice, insertNotice, updateNotice, deleteNotice } from "../modules/NoticeModule";

export function callGetNoticeListAPI({currentPage, title, setTotalItems}) {

    return async (dispatch, getState) => {
        try {
            let endpoint = `/notices?page=${currentPage}`;

            if (title) {
                endpoint += `&title=${title.toLowerCase()}`;
            }

            const result = await request('GET', endpoint);
            const fixedNotices = result?.data?.data?.fixedNotices || [];
            const normalNotices = result?.data?.data?.normalNotices?.content || [];
            const totalItems = result?.data?.data?.normalNotices?.totalElements || {};

            setTotalItems(totalItems); 

            const noticeList = [...fixedNotices, ...normalNotices];

            const noticesWithMemberNames = await Promise.all(noticeList.map(async (notice) => {
                const memberInfoResult = await request('GET', `/members/${notice.memberNo}`);
                return { ...notice, memberName: memberInfoResult.data.memberName, positionName: memberInfoResult.data.position.positionName };
            }));
            
            dispatch(getNoticelist({ noticesWithMemberNames }));
        } catch (error) {
            console.error('Error fetching notice list:', error);
        }
    };
}

export function callGetNoticeAPI(noticeNo) {

    return async (dispatch, getState) => {
        try {
            const noticeResult = await request('GET', `/notices/${noticeNo}`);
            const memberInfoResult = await request('GET', `/members/${noticeResult.data.notice.memberNo}`);

            const noticeWithMemberInfo = {
                ...noticeResult.data,
                memberInfo: memberInfoResult.data
            };

            dispatch(getNotice(noticeWithMemberInfo));
        } catch (error) {
            console.error('Error fetching notice:', error);
        }
    }
}


export const callInsertNoticeAPI = (formData) => {
    const requestURL = `http://localhost:8080/notices`;

    return async (dispatch, getState) => {
        try {
            const response = await fetch(requestURL, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken'),
                }
            });

            const result = await response.json();

            dispatch(insertNotice(result));

            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error('Error inserting notice:', result);
            }
        } catch (error) {
            console.error('Error inserting notice:', error);
        }
    };
};

export function callUpdateNoticeAPI( formData, noticeNo, noticeFileNo ) {
    const requestURL = `http://localhost:8080/notices/${noticeNo}`;

    return async (dispatch, getState) => {
        try {

            noticeFileNo.forEach(id => formData.append('noticeFileNo', id));

            const response = await fetch(requestURL, {
                method: 'PUT',
                body: formData,
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken'),
                }
            });

            if (!response.ok) {
                const errorResult = await response.json();
                throw new Error(errorResult.message || 'Error updating notice');
            }

            const result = await response.json();

            if (result.status === 200) {
                dispatch(updateNotice(result.data));
            } else {
                console.error('Error updating notice: 권한이 없습니다.');
                throw new Error('Error updating notice: 권한이 없습니다.');
            }
        } catch (error) {
            console.error('Error inserting notice:', error);
        }
    };
}


export function callDeleteNoticeAPI( noticeNo ) {

    return async (dispatch, getState) => {
        try {
            const result = await request('DELETE', `/notices/${noticeNo}`);
            dispatch(deleteNotice(result.data));
        } catch (error) {
            console.error('Error deleteNotice :', error);
        }
    }
}