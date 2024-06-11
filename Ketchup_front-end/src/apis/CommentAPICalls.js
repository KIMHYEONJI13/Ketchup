import { request } from "./Api";
import { deleteComment, getCommentlist, getReply, insertComment, insertreply, updateComment } from "../modules/CommentModule";

export function callGetCommentListAPI({ boardNo }) {
    
    return async (dispatch, getState) => {
        try {

            const results = await request('GET', `/boards/${boardNo}/comments`);

            const commentsWithMemberNames = await Promise.all(results.data.map(async (result) => {
                const memberInfoResult = await request('GET', `/members/${result.memberNo}`);

                let parentMemberName = null;
                if (result.parentMemberNo) {
                    const parentMemberInfoResult = await request('GET', `/members/${result.parentMemberNo}`);
                    parentMemberName = parentMemberInfoResult.data.memberName;
                }

                return {
                    ...result
                    , positionName: memberInfoResult.data.position.positionName
                    , parentMemberName: parentMemberName 
                };
            }));
            
            dispatch(getCommentlist(commentsWithMemberNames));
        } catch (error) {
            console.error('Error comment list:', error);
        }
    };
};


export const callInsertCommentAPI = ({ boardNo, commentDTO }) => {

    return async (dispatch, getState) => {
        try {
            const result = await request('POST', `/boards/${boardNo}/comments`, commentDTO);

            if (result.status === 200) {
                dispatch(insertComment(result));
            } else {
                throw new Error('에러');
            }
        } catch (error) {
            console.error('Error inserting comment:', error);
        }
    };
};

export const callInsertReplyAPI = ({ boardNo, parentCommentNo, commentDTO }) => {

    return async (dispatch, getState) => {
        try {
            const result = await request('POST', `/boards/${boardNo}/comments/${parentCommentNo}/replies`, commentDTO);
            
            if (result.status === 200) {
                dispatch(insertreply(result));
            } else {
                throw new Error('에러');
            }
        } catch (error) {
            console.error('Error inserting comment:', error);
        }
    };
};

export const callUpdateCommentAPI = ({ boardNo, commentNo, commentDTO}) => {

    return async (dispatch, getState) => {
        try {
            const result = await request('PUT', `/boards/${boardNo}/comments/${commentNo}`, commentDTO);

            if(result.status === 200) {
                dispatch(updateComment(result));
            } else {
                throw new Error('에러');
            }
        } catch (error) {
            console.error('Error update comment:', error);
        }
    }

}


export function callDeleteCommentAPI({ boardNo, commentNo }) {

    return async (dispatch, getState) => {
        try {
            const result = await request('DELETE', `/boards/${boardNo}/comments/${commentNo}`);
            dispatch(deleteComment(result.data));
        } catch (error) {
            console.error('Error delete comment:', error);
        }
    }
}

// export function callGetReplyAPI({boardNo, commentNo}) {
//     console.log('callGetReplyAPI...');
//     console.log("callGetReplyAPI [ boardNo ] : ", boardNo);
//     console.log("callGetReplyAPI [ commentNo ] : ", commentNo);

//     return async (dispatch, getState) => {
//         try {

//             const results = await request('GET', `/boards/${boardNo}/comments/${commentNo}/replies`);
            
//             // 각 게시물의 작성자 이름을 가져오기 위해 댓글 목록을 순회
//             const commentsWithMemberNames = await Promise.all(results.data.map(async (result) => {
//                 // 각 게시물의 작성자 memberNo를 이용해 memberName을 조회
//                 const memberInfoResult = await request('GET', `/members/${result.memberNo}`);

//                 // 부모 댓글의 작성자 이름인 parentMemberName을 가져오기 위해 부모 댓글의 memberNo가 있는 경우에만 조회
//                 let parentMemberName = null;
//                 if (result.parentMemberNo) {
//                     const parentMemberInfoResult = await request('GET', `/members/${result.parentMemberNo}`);
//                     parentMemberName = parentMemberInfoResult.data.memberName;
//                 }

//                 // 게시물 목록에 작성자 이름을 추가
//                 return {
//                     ...result
//                     , memberName: memberInfoResult.data.memberName
//                     , positionName: memberInfoResult.data.position.positionName
//                     , parentMemberName: parentMemberName // 부모 댓글의 작성자 이름 추가
//                 };
//             }));

//             // 수정된 게시물 목록을 저장
//             dispatch(getReply(commentsWithMemberNames));
         
//         } catch (error) {
//             console.error('Error inserting notice:', error);
//         }
//     };
// }
