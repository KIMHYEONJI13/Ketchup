
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    callSendEmailAPI, callUpdateMyPWAPI, sendCodeAPI
} from '../../apis/MemberAPICalls'


function FindPW() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [verifyEmail, setVerifyemail] = useState(false);
    const [form, setForm] = useState({
        memberNo: '',
        verifyCode: ''
    });

  



    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    const onClickEmailHandler = () => {
        dispatch(callSendEmailAPI(form.memberNo));
        alert("인증번호 발송이 완료되었습니다.")
    };

    const handleCode = async () => {
        const verifyResult = await dispatch(sendCodeAPI(form.memberNo, form.verifyCode))


        if (verifyResult === true) {

            await dispatch(callUpdateMyPWAPI(form.memberNo, '1111'));
            await alert('초기화 완료, 초기 비밀번호는 1111 입니다.');
            await navigate("/login")



        } else {

        }


    }

    return (
        <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">



                <img src="/img/loginLogo.png" class="loginLogo" alt="" style={{ marginTop: 200 }} />

                {verifyEmail ? (
                    <div>
                        <h1 style={{ marginTop: 20 }}>비밀번호 초기화 완료입니다 초기 비밀번호는 1111입니다.</h1>
                        <button
                            onClick={() => { navigate("/main") }}
                            style={{ width: '500px', border: 'none', margin: 0, fontSize: '20px', height: '50px', color: 'white', backgroundColor: "#ED0B0D", marginTop: 40 }}
                        >
                            확인
                        </button>
                    </div>
                ) : (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <input className="form-control"
                                type="text"
                                name='memberNo'
                                placeholder="사번을 입력하세요"
                                autoComplete='off'
                                onChange={onChangeHandler}
                                style={{ width: 300, borderColor: "black", textAlign: 'center', marginTop: 70, borderWidth: '0px 0px 1px 0px', borderRadius: 0 }}
                            />
                            <button onClick={onClickEmailHandler}
                                style={{ marginLeft: '10px', borderRadius: 5, width: 120, borderWidth: 0, height: 40, backgroundColor: 'red', color: 'white', marginTop: 70 }}>인증번호 발송</button>
                        </div>
                        <input className="form-control"
                            type="text"
                            name='verifyCode'
                            placeholder="발송된 이메일 인증번호를 입력해주세요"
                            autoComplete='off'
                            onChange={onChangeHandler}
                            style={{ width: 500, borderColor: "black", textAlign: 'center', marginTop: 20, borderWidth: '0px 0px 1px 0px', borderRadius: 0 }}
                        />
                        <button
                            onClick={handleCode}
                            style={{ width: '500px', border: 'none', margin: 0, fontSize: '20px', height: '50px', color: 'white', backgroundColor: "#ED0B0D", marginTop: 40 }}
                        >
                            확인
                        </button>
                    </div>
                )}


            </div>
        </div>

    );
}

export default FindPW;