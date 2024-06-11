import { useNavigate } from "react-router-dom";
import ButtonGroup from "../../contents/ButtonGroup";
import FormatDate from "../../contents/FormatDate";
import { useEffect, useState } from "react";
import SendCancelModal from "./SendCancelModal";
import MailDeleteModal from "./MailDeleteModal";
import DOMPurify from "isomorphic-dompurify"

function MailContent({ content, part, mailNo }) {
    const navigate = useNavigate();
    const [sendCancelModal, setSendCancelModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [delMailList, setDelMailList] = useState([]);
    const contentFile = content.mailFiles || [];

    useEffect(
        () => {
            if (delMailList.length != 0) {
                setDeleteModal(true);
            }
        }, [delMailList]
    );

    const buttonClick = (label) => {
        if (label === "답장") {
            navigate(`/mails/reply`, { state: { mailNo, content, part } });
        } else if (label === "발송 취소") {
            setSendCancelModal(true);
        } else if (label === "삭제") {
            setDelMailList((prevDelMailList) => [...prevDelMailList, mailNo]);
        }
    };

    const receiveButtons = [
        { label: "삭제", styleClass: "back", onClick: () => buttonClick("삭제") },
        { label: "답장", styleClass: "move", onClick: () => buttonClick("답장") }
    ];

    const NSendButtons = [
        { label: "삭제", styleClass: "back", onClick: () => buttonClick("삭제") },
        { label: "발송 취소", styleClass: "move", onClick: () => buttonClick("발송 취소") }
    ];

    const YSendButtons = [
        { label: "삭제", styleClass: "back", onClick: () => buttonClick("삭제") },
        { label: "발송 취소", styleClass: "disable", disabled: "disable" }
    ];

    const formatDate = FormatDate(content.sendMailTime);

    return (
        <>
            {sendCancelModal && <SendCancelModal setSendCancelModal={setSendCancelModal} part={part} />}
            {deleteModal ? <MailDeleteModal setDeleteModal={setDeleteModal} part={part} delMailList={delMailList} setDelMailList={setDelMailList} /> : null}
            {content.length === 0 ? (
                <div></div>
            ) : (
            <div>
                <div>
                {
                    part === 'receive' ? <ButtonGroup buttons={receiveButtons} /> : content.sendCancelStatus === 'Y' ? <ButtonGroup buttons={YSendButtons} /> : <ButtonGroup buttons={NSendButtons} />
                }
                </div>
                <div className="mail-title">
                    <h4>{content.mailTitle}</h4>
                </div>
                <p className="send-time">{formatDate}</p>
                <div className="r-color">
                    {
                        part === 'receive' ? (
                            <>
                                <span>보낸 사람</span>
                                <span>{content.memberName} {content.memberDepName}</span>
                            </>
                        ) : (
                            <>
                                <span>받는 사람</span>
                                <span>{content.memberName}</span>
                            </>
                        )
                    }
                </div>
                <div className="r-color d-flex">
                    <span>첨부 파일</span>
                    <div>
                        {
                            contentFile.length > 0 ? (
                                contentFile.map((file, index) => (
                                    <a href="#" key={index} className="d-block">
                                        <i className="bi bi-files"></i>
                                        <span>{file.mailFileOriName}</span>
                                    </a>
                                ))
                            ) : (
                                <span>첨부파일 없음</span>
                            )
                        }
                    </div>

                </div>
                <hr />
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.mailContent) }} />
            </div>)}
            {/* 답장 이전 메일 보여 주기 */}
            {/* {
                content.replyMailNo != 0 ? <ReplyMailContent replyMailNo={content?.replyMailNo} part={part} /> : null
            } */}
        </>
    );
}

export default MailContent;