import { request } from "./Api";
import { getBoardlist, getBoard, insertBoard, updateBoard, deleteBoard } from "../modules/BoardModule";

export function callGetBoardListAPI({ depNo, title, currentPage, setTotalItems  }) {

    return async (dispatch, getState) => {
        try {
            let endpoint = `/boards?depNo=${depNo}&page=${currentPage}`;

            if (title) {
                endpoint += `&title=${title}`;
            }

            const result = await request('GET', endpoint);
            const boardList = result?.data?.data?.content || [];
            const totalItems = result?.data?.data?.totalElements || {};
            
            setTotalItems(totalItems); 

            const boardsWithMemberNames = await Promise.all(boardList.map(async (board) => {
                const memberInfoResult = await request('GET', `/members/${board.memberNo}`);
                return { ...board, memberName: memberInfoResult.data.memberName, positionName: memberInfoResult.data.position.positionName };
            }));

            dispatch(getBoardlist(boardsWithMemberNames));
        } catch (error) {
            console.error('Error fetching board list:', error);
        }
    };
};

export function callGetBoardAPI(boardNo) {

    return async (dispatch, getState) => {
        try {
            const boardResult = await request('GET', `/boards/${boardNo}`);
            const memberInfoResult = await request('GET', `/members/${boardResult.data.board.memberNo}`);

            const boardWithMemberInfo = {
                ...boardResult.data,
                memberInfo: memberInfoResult.data
            };

            dispatch(getBoard(boardWithMemberInfo));
        } catch (error) {
            console.error('Error fetching notice:', error);
        }
    };
};


export const callInsertBoardAPI = (formData) => {
    const requestURL = `http://localhost:8080/boards`;

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

            dispatch(insertBoard(result));

            if (result.status === 200) {
                return result.data;
            } else {
                console.error('Error updating notice: 권한이 없습니다.');
                throw new Error('Error inserting notice:', result);
            }
        } catch (error) {
            console.error('Error inserting notice:', error);
        }
    };
};

export function callUpdateBoardAPI(formData, boardNo, boardFileNo) {
    const requestURL = `http://localhost:8080/boards/${boardNo}`;

    return async (dispatch, getState) => {
        try {
            boardFileNo.forEach(id => formData.append('boardFileNo', id));

            const response = await fetch(requestURL, {
                method: 'PUT',
                body: formData,
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken'),
                }
            });

            const result = await response.json();

            if (result.status === 200) {
                dispatch(updateBoard(result.data));
            } else {
                throw new Error('Error updating board: 권한이 없습니다.');
            }
        } catch (error) {
            console.error('Error inserting board:', error);
        }
    };
};

export function callDeleteBoardAPI(boardNo) {

    return async (dispatch, getState) => {
        try {
            const result = await request('DELETE', `/boards/${boardNo}`);
            dispatch(deleteBoard(result.data));
        } catch (error) {
            console.error('Error deleteNotice :', error);
        }
    };
};