import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { decodeJwt } from "../../utils/tokenUtils";
import { callInsertCommentAPI, callInsertReplyAPI } from "../../apis/CommentAPICalls";

function InsertCommentForm({ boardNo, onCommentSubmit, replyTo, replyName }) {
    const dispatch = useDispatch(); 
    const inputRef = useRef(null);

    const [commentContent, setCommentContent] = useState('');

    const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));
    const memberNo = loginToken.memberNo;
   
    useEffect(() => {
        if (replyName) {
            setCommentContent(`@${replyName} `);
        } else {
            setCommentContent('');
        }
    }, [replyTo, replyName]);

    const handleInputChange = (e) => {
        const newContent = e.target.value;
        if (replyName && !newContent.startsWith(`@${replyName} `)) {
            setCommentContent(`@${replyName} ` + newContent.replace(`@${replyName} `, ''));
        } else {
            setCommentContent(newContent);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedContent = commentContent.trim();
        if (trimmedContent === '') {
            alert("댓글을 입력해주세요");
            return;
        }

        try {
            if (replyName) {
                const commentContentToSend = removeReplyTo(trimmedContent);
                const commentDTO = { memberNo, commentContent: commentContentToSend };
                await dispatch(callInsertReplyAPI({ boardNo, parentCommentNo: replyTo, commentDTO }));
            } else {
                const commentDTO = { memberNo, commentContent: trimmedContent };
                await dispatch(callInsertCommentAPI({ boardNo, commentDTO }));
            }
            onCommentSubmit();
        } catch (error) {
            console.error('Error inserting comment:', error);
        }
        
        setCommentContent('');
        
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const removeReplyTo = (content) => {
        return content.replace(`@${replyName} `, '');
    };

    return (
        <div style={{ borderTop: '1px solid lightgray', marginBottom: "10px", position: "relative" }}>
            <form onSubmit={handleSubmit}>
                <div style={{ marginTop: '10px', marginLeft: "10px", width: "100%", position: "relative" }}>
                    <input
                        ref={inputRef}
                        style={{ 
                            height: "35px", 
                            width: '92%', 
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
                    <button type="submit" className="move-btn" style={{ marginLeft: "1%" }}>등록</button>
                </div>
            </form>
        </div>
    );
}

export default InsertCommentForm;
