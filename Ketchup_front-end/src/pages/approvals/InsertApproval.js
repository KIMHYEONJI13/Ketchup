import { useRef, useState } from "react";
import Style from "./Approvals.module.css"
import { decodeJwt } from "../../utils/tokenUtils";
import AppLine from "../../components/approvals/AppLine";
import RefLine from "../../components/approvals/RefLine";
import { callGetFormAPI, callInsertAppAPI } from "../../apis/ApprovalAPICalls";
import AppLineModal from "../../components/approvals/AppLineModal";
import RefLineModal from "../../components/approvals/RefLineModal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';
import AppAlert from "../../components/approvals/AppAlert";
import AppConfirm from "../../components/approvals/AppConfirm";
import { Dialog } from "@mui/material";


function InsertApproval() {
    const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [btnref, formref, titleref, conref] = [useRef(null), useRef(null), useRef(null), useRef(null)];

    const [modalControl, setModalControl] = useState({
        appLineModal: false,
        refLineModal: false
    })

    const date = new Date();
    const today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    const onClickModalControl = (e) => {
        setModalControl({
            ...modalControl,
            [e.target.name]: true
        })
    }
    //
    const [file, setFile] = useState('');
    const [formNo, setFormNo] = useState(0);
    const [appTitle, setAppTitle] = useState('');
    const [appContents, setAppContents] = useState('');
    const [formValue, setFormValue] = useState('');

    const [alertModal, setAlertModal] = useState({
        message: '',
        isOn: false,
    }); //alert modal

    const [confirmModal, setConfirmModal] = useState({
        message: '',
        result: false,
        isOn: false
    }) //confirm modal

    const [appLine, setAppLine] = useState([{
        alMember: {
            memberNo: '', memberName: '',
            position: { positionName: '' },
            department: { depName: '' }
        },
        alType: '',
        sequence: ''
    }]);

    const [refLine, setRefLine] = useState([{
        refMember: {
            memberNo: ''
        }
    }]);
    //

    const onChangeAppTitle = (e) => {
        setAppTitle(e.target.value);

    }; //제목

    const onChangeAppContents = (content) => { // 에디터 내용이 변경될 때 호출되는 함수
        setAppContents(content); // appContents state 업데이트
    };//내용

    const onChangeFileUpload = (e) => {
        const filesArray = Array.from(e.target.files);
        const filesList = [...filesArray];
        setFile(filesList);
    }; //파일 업로드

    const onChangeForm = async (e) => {
        const result = await callGetFormAPI(e.target.value);

        if (result.status == 200) {
            setFormNo(result.data.formNo);
            setFormValue(result.data.formContents);
        } else {
            console.log('실패');
        }
    }; //양식 변경

    const onClickCancelHandler = () => {
        // if(appContents !== ''){
        //     setConfirmModal({
        //         message: <>입력한 내용이 존재합니다.<br />작성을 취소하시겠습니까?</>,
        //         result: false,
        //         isOn: true
        //     })
        //     console.log('result 확인',confirmModal.result);

        // }
        navigate(`/approvals`, { replace: false })
    }; //취소

    const onClickInsertApprovalHandler = () => {
        const formData = new FormData();

        formData.append("approval.appMemberNo", loginToken.memberNo);
        formData.append("approval.formNo", formNo);
        formData.append("approval.appTitle", appTitle);
        formData.append("approval.appContents", appContents);

        appLine.forEach((al, index) => {
            formData.append(`appLineDTOList[${index}].alMemberNo`, al.alMember.memberNo);
            formData.append(`appLineDTOList[${index}].alType`, al.alType);
            formData.append(`appLineDTOList[${index}].alSequence`, al.sequence);
        });


        refLine[0].refMember.memberNo !== '' && refLine.forEach((rl, index) => {
            formData.append(`refLineDTOList[${index}].refMemberNo`, rl.refMember.memberNo);
        });

        if (Array.isArray(file)) {
            file.forEach((fileItem) => {
                formData.append(`multipartFileList`, fileItem);
            });
        };

        // formData.forEach((value, key) => {
        //     console.log(key + ': ' + value);
        //   });

        if (appLine[0].alMember.memberNo === '') {
            setAlertModal({message: <>결재선을 지정하지 않았습니다. <br />결재선을 지정해 주세요.</>, isOn: true});
            btnref.current.focus();
            //결재선
        } else if (formNo === 0) {
            setAlertModal({message: <>양식을 선택하지 않았습니다. <br />양식을 선택해 주세요.</>, isOn: true});
            formref.current.focus();
            //양식
        } else if (appTitle.trim() === '') {
            setAlertModal({message: <>제목을 입력하지 않았습니다. <br />제목을 입력해 주세요.</>, isOn: true});
            titleref.current.focus();
            //제목
        } else if (appContents.trim() === '') {
            setAlertModal({message: <>내용을 입력하지 않았습니다. <br />내용을 입력해 주세요.</>, isOn: true});
            conref.current.focus(); // 포커스가 안잡힘
            //내용
        } else {
            try {
                dispatch(callInsertAppAPI({ form: formData }))
                    .then(() => navigate(`/approvals`, { replace: false }));
            } catch {
                setAlertModal({message: <>등록에 실패하였습니다.</>, isOn: true});
            }
        };
    } //등록

    return (
        <main className="main" id="main">
            
            {modalControl.appLineModal ? <AppLineModal setModalControl={setModalControl} appLine={appLine} setAppLine={setAppLine} /> : null}
            {modalControl.refLineModal ? <RefLineModal setModalControl={setModalControl} refLine={refLine} setRefLine={setRefLine} /> : null}
            <h2 style={{marginTop: '20px'}}>기안등록</h2>
            <br />
            <label><h5>결재선</h5></label><button className={Style.lineBtn} name='appLineModal' onClick={onClickModalControl} ref={btnref}>추가</button>
            <AppLine appline={appLine} />

            <label><h5>참조선</h5></label><button className={Style.lineBtn} name='refLineModal' onClick={onClickModalControl}>추가</button>
            <RefLine refline={refLine} />

            <h5>문서정보</h5>
            <table className={Style.appTable}>
                <tbody>
                    <tr>
                        <th width={'12%'}>양식</th>
                        <td width={'38%'}>
                            <select onChange={onChangeForm} className={Style.formSelect} ref={formref}>
                                <option value={0}>양식선택</option>
                                <option value={1}>업무 제안서</option>
                                <option value={2}>출장 신청서</option>
                                <option value={3}>휴가 신청서</option>
                                <option value={4}>지출 품의서</option>
                                <option value={5}>개인정보수정 신청서</option>
                                <option value={6}>기타</option>
                            </select>
                        </td>
                        <th width={'12%'}>기안부서</th>
                        <td width={'38%'}>{loginToken.depName}</td>
                    </tr>
                    <tr>
                        <th >첨부파일</th>
                        <td ><input type="file" multiple="multiple" onChange={onChangeFileUpload}></input></td>
                        <th >기안자</th>
                        <td>{loginToken.memberName}</td>
                    </tr>
                    <tr>
                        <th >제목</th>
                        <td><input type="text" name="appTitle" className={Style.appTitle} onChange={onChangeAppTitle} ref={titleref}></input></td>
                        <th >기안일자</th>
                        <td>{today}</td>
                    </tr>
                </tbody>
            </table>

            <h5>내용</h5>
            <Editor
                apiKey='gpny7ynxol7wh1ohidmu4i9q5rb68uahrrop6uo0m4ixs78c'
                initialValue={formValue}
                onInit={(evt, editor) => conref.current = editor}
                init={{
                    statusbar: false,
                    resize: false,
                    height: 700,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help | ' +
                        'table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onEditorChange={onChangeAppContents}
            />

            <div className={Style.appBtn}>
                <button className="back-btn" onClick={onClickCancelHandler}>취소</button>
                <button className="move-btn" onClick={onClickInsertApprovalHandler}>등록</button>
            </div>

            <Dialog open={alertModal.isOn} onClose={() => setAlertModal({isOn: false})}>
                <AppAlert alertModal={alertModal} setAlertModal={setAlertModal}/>   
            </Dialog>
            {/* <Dialog open={confirmModal.isOn} onClick={() => setConfirmModal({isOn: false})}>
                <AppConfirm confirmModal={confirmModal} setConfirmModal={setConfirmModal} />
            </Dialog> */}

        </main>
    )
}
export default InsertApproval;