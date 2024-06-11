// InsertNoticeForm 컴포넌트
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ButtonGroup from "../../components/contents/ButtonGroup";
import Editor from "../contents/Editor";
import 'react-quill/dist/quill.snow.css';
import { callInsertBoardAPI } from "../../apis/BoardAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";

function InsertBoardForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [files, setFiles] = useState([]);
    const [content, setContent] = useState('');

    const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));
    const memberNo = loginToken.memberNo;
    const departmentNo = loginToken.depNo;
  
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('boardDTO', new Blob([JSON.stringify({ memberNo: memberNo, departmentNo: departmentNo, boardTitle: title, boardContent: content })], { type: 'application/json' }));
        files.forEach(file => formData.append('files', file)); 
    
        try {
            const boardNo = await dispatch(callInsertBoardAPI(formData));
           
            if (boardNo) {
                navigate(`/boards/${boardNo}`);
            } else {
                console.error("Invalid result:", "실패");
            }

        } catch (error) {
            console.error(error);
        }

    };

    const handleChangeFiles = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]); 
        // 기존 파일 목록과 새로 선택된 파일을 합쳐서 업데이트
    };

    const handleDeleteFile = (index) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };

    const buttons = [
        { label: '취소', onClick: () => navigate(-1), styleClass: 'back' },
        { label: '등록', onClick: handleSubmit, styleClass: 'move' }
    ];

    return (
        <div className="card-title">
            <div className="input-container">
                <label htmlFor="title">제목</label>
                <input type="text" id="title" placeholder=" 게시물 제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="input-container">
                <label htmlFor="file">첨부파일</label>
                <div className="file-input">
                    <ul>
                        {files.map((file, index) => (
                            <li style={{ listStyle: 'none' }} key={index}>
                                <span>{file.name}</span> &nbsp;
                                <button onClick={() => handleDeleteFile(index)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>x</button>
                            </li>
                        ))}
                    </ul>
                    <input type="file" id="formFile" multiple onChange={handleChangeFiles} />
                </div>
            </div>
            <div style={{height: '400px'}}>
                <Editor content={content} setContent={setContent} />
            </div>
            <div className="d-flex justify-content-end mt-4">
                <ButtonGroup buttons={buttons} />
            </div>
        </div>
    );
};

export default InsertBoardForm;