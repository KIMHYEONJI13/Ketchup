import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { decodeJwt } from "../../utils/tokenUtils";
import { callUpdateCommentAPI } from "../../apis/CommentAPICalls";

function UpdateCommentForm({ boardNo, comment, handleEditCancel, onCommentUpdated }) {
    const dispatch = useDispatch(); 
    const inputRef = useRef(null);

    const [commentContent, setCommentContent] = useState(comment.commentContent);

    const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));
    const memberNo = loginToken.memberNo;

    const handleInputChange = (e) => {
        setCommentContent(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedContent = commentContent.trim();
        if (trimmedContent === '') {
            alert("댓글을 입력해주세요");
            return;
        }

        try {
            const updatedComment = { memberNo, commentContent: trimmedContent };
            await dispatch(callUpdateCommentAPI({ boardNo, commentNo: comment.commentNo, commentDTO: updatedComment }));
            onCommentUpdated(); 
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    return (
        <div style={{ borderTop: '1px solid lightgray', marginBottom: "10px", position: "relative" }}>
            <form onSubmit={handleSubmit}>
                <div style={{ marginTop: '10px', marginLeft: "10px", width: "100%", position: "relative" }}>
                    <input
                        ref={inputRef}
                        style={{ 
                            height: "35px", 
                            width: '91%', 
                            border: '1px solid lightgray', 
                            borderRadius: '5px', 
                            padding: '5px', 
                            background: 'transparent', 
                            position: 'relative', 
                            zIndex: 2, 
                            color: 'black' 
                        }}
                        placeholder={"댓글을 입력해주세요."}
                        value={commentContent}
                        onChange={handleInputChange}
                    />                    
                    <button type="button" className="grey-btn" onClick={handleEditCancel} style={{ width: '50px', marginLeft: "1%" }}>취소</button>
                    <button type="submit" className="move-btn" style={{  width: '50px', marginLeft: "1%" }}>수정</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateCommentForm;
