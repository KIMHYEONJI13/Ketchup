import { useEffect, useState } from "react";
import "./mail.css";
import ReceiveMail from "../../components/lists/mails/ReceiveMail";
import SendMail from "../../components/lists/mails/SendMail";
import { useNavigate, useParams } from "react-router-dom";
import SearchBarValue from "../../components/contents/SearchBarValue";
import MailDeleteModal from "../../components/items/mails/MailDeleteModal";
import { Dialog } from "@mui/material";
import { callGetReceiveMailAPI, callGetSendMailAPI } from "../../apis/MailAPICalls";
import { useDispatch, useSelector } from "react-redux";

function Mail() {
    const { part } = useParams();

    const result = useSelector(state => state.mailReducer);
    const partMail = part === 'receive' ? 'receivemail' : 'sendmail';
    const mails = result?.[partMail];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [sendMailNos, setSendMailNos] = useState([]);
    const [receiveMailNos, setReceiveMailNos] = useState([])
    const [deleteModal, setDeleteModal] = useState(false);
    const [searchCondition, setSearchCondition] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useState({ condition: '', value: '' });
    const [listDel, setListDel] = useState(false);

    const receiveHandler = () => {
        navigate('/mails/receive');
        setSearchParams({ condition: '', value: '' });
    };

    const sendHandler = () => {
        navigate('/mails/send');
        setSearchParams({ condition: '', value: '' });
    };

    const insertHandler = () => navigate('/mails/insert');

    const openDeleteModal = () => {
        setDeleteModal(true);
        setListDel(true);
    };

    const onDialogCloseHandler = () => {
        setDeleteModal(prevState => !prevState);
    };

    const handleSearch = () => {
        if (searchCondition === '') {
            alert("검색 조건을 선택하세요");
            return;
        } else if (searchValue === '') {
            alert("검색어를 입력하세요");
            return;
        }

        setSearchParams({ condition: searchCondition, value: searchValue });
        setCurrentPage(1);
        
        setSearchCondition('');
        setSearchValue('');
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                if (part === 'receive') {
                    await dispatch(callGetReceiveMailAPI(currentPage, searchParams.condition, searchParams.value));
                } else if (part === 'send') {
                    await dispatch(callGetSendMailAPI(currentPage, searchParams.condition, searchParams.value));
                }
            setIsLoading(false);
            } catch (error) {
                console.error("메일 조회에 실패했습니다.", error);
            }
        };
    
        fetchData();
    }, [dispatch, part, currentPage, searchParams]);

    const delMailList = part === 'receive' ?
        Object.keys(receiveMailNos).filter(key => receiveMailNos[key]).map(Number)
        : Object.keys(sendMailNos).filter(key => sendMailNos[key]).map(Number);

    const setDelMailList = part === 'receive' ? setReceiveMailNos : setSendMailNos;

    return (
        <>
            <main id="main" className="main">
                <div className="title">
                    <h2>메일</h2>
                    <SearchBarValue
                        searchCondition={searchCondition}
                        setSearchCondition={setSearchCondition}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        onSearch={handleSearch} />
                </div>
                <div className="my-3 d-flex justify-content-between">
                    <div className="mail-btn">
                        <button
                            className={`${part == "receive" ? 'focus-btn ps-0 me-4 fs-5' : 'non-focus-btn ps-0 me-4 fs-5'}`}
                            onClick={() => receiveHandler()}>받은 메일함</button>
                        <button
                            className={`${part == "send" ? 'focus-btn fs-5' : 'non-focus-btn fs-5'}`}
                            onClick={() => sendHandler()}>보낸 메일함</button>
                    </div>
                    <div>
                        <button className="back-btn" onClick={openDeleteModal}>삭제</button>
                        <button className="move-btn" onClick={insertHandler}>메일 쓰기</button>
                    </div>
                </div>
                {
                    part === "receive" ?
                        <ReceiveMail
                            receiveMail={mails}
                            checkedItems={receiveMailNos}
                            setCheckedItems={setReceiveMailNos}
                            searchParams={searchParams}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                        :
                        <SendMail
                            sendMail={mails}
                            checkedItems={sendMailNos}
                            setCheckedItems={setSendMailNos}
                            searchParams={searchParams}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    
                }
            </main>
            <Dialog open={deleteModal} onClose={onDialogCloseHandler}>
                <MailDeleteModal
                    setDeleteModal={setDeleteModal}
                    part={part}
                    delMailList={delMailList}
                    setDelMailList={setDelMailList}
                    currentPage={currentPage}
                    listDel={listDel} />
            </Dialog>
        </>
    );
}

export default Mail;