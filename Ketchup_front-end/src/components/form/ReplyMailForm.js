import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callMembersAPI } from "../../apis/MemberAPICalls";
import ReactQuill from "react-quill";
import { callPostInsertMailAPI } from "../../apis/MailAPICalls";
import { useNavigate } from "react-router-dom";

function MailForm({ content, mailNo, part }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const quillRef = useRef();

    // const [mailForm, setMailForm] = useState({
    //     mailTitle: `RE:${content.mailTitle}`,
    //     mailContent: '',
    //     replyMailNo: content.mailNo,
    //     receivers: [{ receiverMem: content.senderMem }]
    // });
    const [mailTitle, setMailTitle] = useState(`RE:${content.mailTitle}`);
    const [mailContent, setMailContent] = useState('');
    const [receivers] = useState([{ receiverMem: content.senderMem }]);
    const [mailFile, setMailFile] = useState([]);

    const handleFileChange = (e) => {
        setMailFile([...e.target.files]);
    };

    const goBackList = () => {
        navigate(`/mails/detail/${mailNo}`, { state: { part } });
    };

    // const submitMailClick = async () => {
    //     const formData = new FormData();

    //     const mailDto = {
    //         mailTitle: mailForm.mailTitle,
    //         mailContent: mailForm.mailContent.ops[0].insert,
    //         replyMailNo: mailForm.replyMailNo,
    //         receivers: mailForm.receivers
    //     };

    //     if (mailForm.mailContent && mailForm.mailContent.ops && mailForm.mailContent.ops.length > 0) {
    //         mailDto.mailContent = mailForm.mailContent.ops[0].insert;
    //     }

    //     formData.append('mailDto', new Blob([JSON.stringify(mailDto)], { type: 'application/json' }));
    //     mailFile.forEach(file => formData.append('mailFile', file));

    //     try {
    //         await dispatch(callPostInsertMailAPI({ formData }));
    //         navigate(`/mails/send`);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const submitMailClick = async () => {
        if (!mailContent) {
            alert("메일 내용을 입력하세요.");
            return;
        }

        const formData = new FormData();

        const mailDto = {
            mailTitle,
            mailContent,
            replyMailNo: content.mailNo,
            receivers
        };

        formData.append('mailDto', new Blob([JSON.stringify(mailDto)], { type: 'application/json' }));
        mailFile.forEach(file => formData.append('mailFile', file));

        try {
            await dispatch(callPostInsertMailAPI({ formData }));
            navigate(`/mails/send`);
        } catch (error) {
            console.error("메일 전송 중 오류가 발생했습니다:", error);
        }
    };

    return (
        <>
            <div className="input-container">
                <label htmlFor="title">제목</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={mailTitle}
                    readOnly />
            </div>
            <div className="input-container d-flex">
                <label>받는 사람</label>
                <div className="mt-3 d-inline selected-recipient">
                    <span>{`${content.memberName}(${content.memberDepName}) ${content.memberCompanyEmail}`}</span>
                </div>
            </div>
            <div className="input-container">
                <label htmlFor="mailFile">첨부파일</label>
                <div className="file-input">
                    <input type="file" id="mailFile" multiple onChange={handleFileChange} />
                </div>
            </div>
            <div>
            <ReactQuill
                    style={{ height: "300px", margin: "4px" }}
                    ref={quillRef}
                    theme="snow"
                    value={mailContent}
                    onChange={setMailContent}
                    modules={{
                        toolbar: [
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            [{ 'align': [] }],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            [{ 'color': [] }, { 'background': [] }],
                            ['link'],
                            ['image', 'video'],
                            ['clean']
                        ]
                    }}
                    placeholder="내용을 입력하세요."
                />
            </div>
            <div className="d-flex justify-content-end mt-4">
                <button className="back-btn" onClick={goBackList}>취소</button>
                <button type="submit" onClick={submitMailClick} className="move-btn">전송</button>
            </div>
        </>
    );
}

export default MailForm;