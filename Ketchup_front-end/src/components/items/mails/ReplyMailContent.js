import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { callGetMailDetailAPI } from "../../../apis/MailAPICalls";

function ReplyMailContent({replyMailNo, part}) {
    const result = useSelector(state => state.mailReducer);
    const replyContent = result?.maildetail || [];
    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(callGetMailDetailAPI(replyMailNo, part));
    }, []
    );
    
    return (
        <>
        <div>
            <div className="mail-title">
                <h2 className="d-inline">{replyContent.mailTitle}</h2>
            </div>
            <hr />
            <div>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(replyContent.mailContent) }} />
            </div>
        </div>
    </>
    );
}

export default ReplyMailContent;