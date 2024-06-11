import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callGetNoticeAPI, callUpdateNoticeAPI } from "../../apis/NoticeAPICalls";
import ButtonGroup from "../../components/contents/ButtonGroup";
import Editor from "../contents/Editor";
import { decodeJwt } from "../../utils/tokenUtils";

function UpdateNoticeForm() {
    const { noticeNo } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [files, setFiles] = useState([]);
    const [fix, setFix] = useState(false);
    const [content, setContent] = useState('');
    const [noticeFileNo, setNoticeFileNo] = useState([]); 

    const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));

    const handleFixChange = (e) => {
        const isChecked = e.target.checked;
        setFix(isChecked);
    };

    const handleDeleteFile = (index, file) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);

        if (file.noticeFileNo) {
            setNoticeFileNo((prevIds) => [...prevIds, file.noticeFileNo]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('noticeDTO', new Blob([JSON.stringify({ noticeTitle: title, memberNo: loginToken.memberNo, noticeFix: fix ? 'Y' : 'N', noticeContent: content })], { type: 'application/json' }));
        files.forEach(file => formData.append('files', file)); 
    
        try {
            await dispatch(callUpdateNoticeAPI(formData, noticeNo, noticeFileNo)); 
            navigate(`/notices/${noticeNo}`);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangeFiles = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]); 
        // 기존 파일 목록과 새로 선택된 파일을 합쳐서 업데이트
    };

    const buttons = [
        { label: '취소', onClick: () => navigate(-1), styleClass: 'back' },
        { label: '저장', onClick: handleSubmit, styleClass: 'move' }
    ];

    useEffect(() => {
        dispatch(callGetNoticeAPI(noticeNo));
    }, [dispatch, noticeNo]);

    const notice = useSelector(state => state.noticeReducer.notice);

    useEffect(() => {
        if (notice) {
            setTitle(notice.notice.noticeTitle);
            setContent(notice.notice.noticeContent);
            setFix(notice.notice.noticeFix === 'Y');
            setFiles(notice.notice.noticeFileList || []);
        }
    }, [notice]);

    return (

        <div className="card-title">
            <div className="input-container">
                <label htmlFor="title">제목</label>
                <input type="text" id="title" placeholder=" 공지 제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="input-container">
                <label htmlFor="file">첨부파일</label>
                <div className="file-input">
                    <ul>
                        {files.map((file, index) => (
                            <li style={{ listStyle: 'none' }} key={index}>
                                <span>{file.noticeFileOriName || file.name}</span> &nbsp;
                                <button onClick={() => handleDeleteFile(index, file)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>x</button>
                            </li>
                        ))}
                    </ul>
                    <input type="file" id="formFile" multiple onChange={handleChangeFiles} />
                </div>
            </div>
            <input type="checkbox" id="fix" checked={fix} onChange={handleFixChange} /> &nbsp;
            <label htmlFor="fix">최상단에 공지로 등록</label>
            <div style={{height: '400px'}}>
                <Editor content={content} setContent={setContent} />
            </div>
            <div className="d-flex justify-content-end mt-4">
                <ButtonGroup buttons={buttons} />
            </div>
        </div>
    );

}

export default UpdateNoticeForm;