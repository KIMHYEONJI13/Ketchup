import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ButtonGroup from "../../components/contents/ButtonGroup";
import Editor from "../contents/Editor";
import { callGetBoardAPI, callUpdateBoardAPI } from "../../apis/BoardAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";

function UpdateBoardForm() {
    const { boardNo } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [files, setFiles] = useState([]);
    const [content, setContent] = useState('');
    const [boardFileNo, setBoardFileNo] = useState([]); 

    const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));
    const memberNo = loginToken.memberNo;
    const departmentNo = loginToken.depNo;

    const handleDeleteFile = (index, file) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);

        if (file.boardFileNo) {
            setBoardFileNo((prevIds) => [...prevIds, file.boardFileNo]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('boardDTO', new Blob([JSON.stringify({ boardTitle: title, memberNo: memberNo, departmentNo: departmentNo, boardContent: content })], { type: 'application/json' }));
        files.forEach(file => formData.append('files', file));

        try {
            await dispatch(callUpdateBoardAPI(formData, boardNo, boardFileNo));
            navigate(`/boards/${boardNo}`);
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
        dispatch(callGetBoardAPI(boardNo));
    }, [dispatch, boardNo]);

    const board = useSelector(state => state.boardReducer.board);

    useEffect(() => {
        if (board) {
            setTitle(board.board.boardTitle);
            setContent(board.board.boardContent);
            setFiles(board.board.boardFileList || []);
        }
    }, [board]);

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
                                <span>{file.boardFileOriName || file.name}</span> &nbsp;
                                <button onClick={() => handleDeleteFile(index, file)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>x</button>
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

}

export default UpdateBoardForm;