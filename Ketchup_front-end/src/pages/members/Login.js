
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    callLoginAPI
} from '../../apis/MemberAPICalls'
import { decodeJwt } from '../../utils/tokenUtils';
import { Dialog, DialogTitle } from '@mui/material';
import UpdatePWForm from '../../components/form/UpdatePWForm';
import { NavigationSharp } from '@mui/icons-material';



function Login() {
    const navigate = useNavigate();
    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    const [verifyEmail, setVerifyemail] = useState(true);
    const [PWDialogOpen, setPWDialogOpen] = useState(false);

    const loginMember = useSelector(state => state.memberReducer);  // API 요청하여 가져온 loginMember 정보

    
    // 폼 데이터 한번에 변경 및 State에 저장    
    const [form, setForm] = useState({
        memberNo: '',
        memberPW: ''
    });

    useEffect(() => {
        console.log(token);

        if (token?.isFirstLogin === 'Y') {
            setPWDialogOpen(true);

        } else if (token) {
            navigate("/main");
        }
        else {
           navigate("/login")
        }
    }

        , [token]);




    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onDialogClickHandler = () => {
        setPWDialogOpen(prevState => !prevState);
    };

    // 로그인 버튼 클릭시 디스패처 실행 및 메인 페이지로 이동
    const onClickLoginHandler = async () => {
        await dispatch(callLoginAPI({ form: form }));


    };

    return (
        <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <img src="/img/loginLogo.png" class="loginLogo" alt="" style={{ marginTop: 200 }} />

                <input className="form-control"
                    type="text"
                    name='memberNo'
                    placeholder="사번을 입력하세요"
                    autoComplete='off'
                    onChange={onChangeHandler}
                    style={{ width: 500, borderColor: "black", textAlign: 'center', marginTop: 70, borderWidth: '0px 0px 1px 0px', borderRadius: 0 }}
                />
                <input className="form-control"
                    type="password"
                    name='memberPW'
                    placeholder="비밀번호를 입력하세요"
                    autoComplete='off'
                    onChange={onChangeHandler}
                    style={{ width: 500, borderColor: "black", textAlign: 'center', marginTop: 20, borderWidth: '0px 0px 1px 0px', borderRadius: 0 }}
                />
                <button

                    style={{ width: '500px', border: 'none', margin: 0, fontSize: '20px', height: '50px', color: 'white', backgroundColor: "#ED0B0D", marginTop: 40 }}
                    onClick={onClickLoginHandler}
                >
                    로그인
                </button>
                <Link style={{ marginTop: "10px", marginLeft: 390, color: "black" }} to="/findPW">비밀번호 찾기</Link>

                <Dialog open={PWDialogOpen}  onClose={onDialogClickHandler} >
                    <DialogTitle>비밀번호 수정</DialogTitle>
                    <UpdatePWForm myNo={token?.memberNo} onDialogClickHandler={onDialogClickHandler} verifyEmail={true} />
                </Dialog>



            </div>
        </div>



    );
}

export default Login;