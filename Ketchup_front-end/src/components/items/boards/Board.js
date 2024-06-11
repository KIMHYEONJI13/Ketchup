import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { callDeleteBoardAPI, callGetBoardAPI } from "../../../apis/BoardAPICalls";
import { decodeJwt } from "../../../utils/tokenUtils";
import DOMPurify from "isomorphic-dompurify";
import ButtonGroup from "../../contents/ButtonGroup";
import FormatDate from "../../contents/FormatDate";
import 'bootstrap-icons/font/bootstrap-icons.css';
import NormalDeleteModalForm from "../../form/NormalDeleteModalForm";
import { Dialog } from "@mui/material";
import Comment from "../comment/Comment";

function Board({ boardNo }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const board = useSelector(state => state.boardReducer.board);
    const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));
    
    const [deleteModal, setDeleteModal] = useState(false);
    const [hasComments, setHasComments] = useState(false); 

    const onDialogCloseHandler = () => {
        setDeleteModal(prevState => !prevState);
    };

    useEffect(() => {
        if (boardNo) {
            dispatch(callGetBoardAPI(boardNo));
        }
    }, [dispatch, boardNo]);

    useEffect(() => {
        if (board && board.commentCount > 0) {
            setHasComments(true);
        } else {
            setHasComments(false);
        }
    }, [board]);

    const updateHandler = () => {
        // 작성자인 경우에만 수정 페이지로 이동
        if (!(loginToken && (loginToken.memberNo === board.memberInfo.memberNo))) {
            return;
        } else {
            navigate(`/boards/update/${boardNo}`);
        }
    };

    const deleteHandler = () => {
        if (hasComments) {
            alert('댓글이 있어 게시물을 삭제할 수 없습니다.');
            return;
        }

        dispatch(callDeleteBoardAPI(boardNo))
            .then(() => {
                setDeleteModal(false);
                navigate(`/boards`);
            })
            .catch((error) => {
                console.error('게시물 삭제 중 오류 발생:', error);
            });
    };

    function getIconClass(fileName) {
        const extension = fileName.split('.').pop().toLowerCase();
        switch (extension) {
            case 'pdf':
                return 'bi-file-earmark-pdf';
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                return 'bi-file-earmark-image';
            case 'txt':
            case '.hwp':
                return 'bi-file-earmark-text';
            case 'zip':
                return 'bi-file-earmark-zip';
            case 'xls':
            case 'xlsx':
                return 'bi-file-earmark-excel';
            case 'mp3':
            case 'wav':
                return 'bi-file-earmark-music';
            default:
                return 'bi-file-earmark';
        }
    }

    if (!board) {
        return <div>로딩 중...</div>;
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        {(loginToken && (loginToken.memberNo === board.memberInfo.memberNo)) && (
                            <ButtonGroup
                                buttons={[
                                    { label: '수정', styleClass: 'back', onClick: updateHandler },
                                    { label: '삭제', styleClass: 'move', onClick: () => setDeleteModal(true) }
                                ]}
                            />
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12" style={{ borderBottom: '0.5px solid lightgray' }}>
                        <h2 style={loginToken && loginToken.memberNo !== board.memberInfo.memberNo ? { marginTop: '30px' } : {}}>{board.board.boardTitle}</h2>
                        <div style={{ marginBottom: '30px' }}>
                            <img src={`/img/${board.memberInfo.imgUrl}`} width="30" height="30" alt="profile" />&nbsp;
                            <span className="">{board.memberInfo.memberName}</span>&nbsp;
                            <span>{board.memberInfo.position.positionName}</span>&nbsp;&nbsp;
                            <span>{FormatDate(board.board.boardCreateDttm)}</span>
                            {board.board.boardUpdateDttm && (
                                <span> / 수정일: {FormatDate(board.board.boardUpdateDttm)}</span>
                            )}
                        </div>

                        <div className="card-body">
                            {Array.isArray(board.board.boardFileList) && board.board.boardFileList.map(
                                (item, index) => (
                                    <span
                                        key={index} className={`bi ${getIconClass(item.boardFileName)} me-2`}>&nbsp;
                                        <a style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}
                                            href={`/img/${item.boardFilePath}`} download>
                                            {item.boardFileOriName}
                                        </a>
                                        <br />
                                    </span>))}
                        </div>

                        <div style={{ marginTop: '30px', marginBottom: '100px' }}
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(board.board.boardContent) }}>
                        </div>
                    </div>

                    <div style={{ marginTop: "20px", marginBottom: "20px"}}>
                        <div style={{ border: "1px solid lightgray", borderTopWidth: hasComments ? "0" : '0.1', height: "100%" }}>
                            <Comment boardNo={boardNo} />
                        </div>
                    </div>

                    <div style={{ borderTop: '0.5px solid lightgray', borderBottom: '0.5px solid lightgray' }} >
                        {/* 다음 글 */}
                        {board.nextBoard && (
                            <div onClick={() => navigate(`/boards/${board.nextBoard.boardNo}`)} style={{ marginTop: "20px", cursor: 'pointer' }}>
                                <i className="bi bi-caret-up" />&nbsp;
                                <span>다음글 |  {board.nextBoard.boardTitle}</span>
                            </div>
                        )}

                        {!board.nextBoard && (
                            <div style={{ marginTop: "20px"}}>
                                <i className="bi bi-caret-up" />&nbsp;
                                <span>다음글 |  <span>다음글이 없습니다.</span></span>
                            </div>
                        )}
                        <br />

                        {/* 이전 글 */}
                        {board.previousBoard && (
                            <div onClick={() => navigate(`/boards/${board.previousBoard.boardNo}`)} style={{  marginBottom: "20px", cursor: 'pointer' }}>
                                <i className="bi bi-caret-down" />&nbsp;
                                <span>이전글 |  {board.previousBoard.boardTitle}</span>
                            </div>
                        )}
                        {!board.previousBoard && (
                            <div style={{ marginBottom: "20px"}}>
                                <i className="bi bi-caret-down" />&nbsp;
                                <span>이전글 |  <span>이전글이 없습니다.</span></span>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            <Dialog open={deleteModal} onClose={onDialogCloseHandler}>
                <NormalDeleteModalForm
                    onClose={onDialogCloseHandler}
                    onDelete={deleteHandler}
                />
            </Dialog>
        </>
    );
}

export default Board;