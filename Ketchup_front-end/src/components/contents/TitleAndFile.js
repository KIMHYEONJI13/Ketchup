// TitleAndFile 컴포넌트
import { useState } from "react";
import '../../style.css';

const TitleAndFile = ({ onTitleChange, onFileChange }) => { 

    const [title, setTitle] = useState("");
    const [files, setFiles] = useState([]);

    const handleTitleChange = (e) => { 
        setTitle(e.currentTarget.value); 
        onTitleChange(e.currentTarget.value);
    };

    const handleFileChange = e => {
        const fileList = Array.from(e.target.files);
        if (fileList.length > 5) {
            alert("파일은 최대 5개까지 등록할 수 있습니다.");
            return;
        }
        setFiles(fileList);
        onFileChange(fileList);
    };

    return (
        <>
            <div className="input-container">
                <label htmlFor="title">제목</label>
                <input type="text" id="title" placeholder="제목을 입력하세요" onChange={handleTitleChange} />
            </div>
            <div className="input-container">
                <label htmlFor="file">첨부파일</label>
                <div className="file-input">
                    <input type="file" id="file" name="file" multiple onChange={handleFileChange} />
                    {files.map((file, index) => (
                        <div key={index} className="file-name">{file.name}</div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default TitleAndFile;
