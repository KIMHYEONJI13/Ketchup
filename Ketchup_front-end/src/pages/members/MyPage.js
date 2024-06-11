import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect,useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';

import { callGetMemberAPI } from '../../apis/MemberAPICalls';
import { Dialog, DialogTitle } from '@mui/material';
import UpdatePWForm from '../../components/form/UpdatePWForm';

function MyPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);
    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    const memberDetail = member?.data;
    const [PWDialogOpen, setPWDialogOpen] = useState(false);




    const onClickBackHandler = () => {
        // 돌아가기 클릭시 메인 페이지로 이동
        navigate("/main");
    }



    const onDialogClickHandler = () => {
        setPWDialogOpen(prevState => !prevState);
    };

    useEffect(
        () => {
           
            if (token) {
                dispatch(callGetMemberAPI({ memberNo: token.memberNo }));
            }

        }, []
    );



    return (
        <main id="main">
            <div

                style={{ backgroundColor: 'white' }}
            >

                {memberDetail && memberDetail?.department?.depName &&

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h1 style={{ marginLeft: '-1400px' }}>내 정보</h1>

                        <label style={{ color: '#878787' }}>사번
                            <input
                                type="text"
                                placeholder="사번"
                                readOnly={true}
                                value={memberDetail.memberNo || ''}
                                style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                            />
                        </label>
                        <label style={{ color: '#878787' }}>이름
                            <input
                                type="text"
                                placeholder="이름"
                                readOnly={true}
                                value={memberDetail.memberName || ''}
                                style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                            />
                        </label>
                        <label style={{ color: '#878787' }}>연락처
                            <input
                                type="text"
                                placeholder="연락처"
                                readOnly={true}
                                value={memberDetail.phone || ''}
                                style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                            />
                        </label>
                        <label style={{ color: '#878787' }}>생년월일<input
                            type="text"
                            placeholder="생년월일"
                            readOnly={true}
                            value={memberDetail.birthDate || ''}
                            style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                        />
                        </label>
                        <label style={{ color: '#878787' }}>성별<input
                            type="text"
                            placeholder="성별"
                            readOnly={true}
                            value={memberDetail.gender || ''}
                            style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                        />
                        </label>
                        <label style={{ color: '#878787' }}>주소<input
                            type="text"
                            placeholder="주소"
                            readOnly={true}
                            value={memberDetail.address || ''}
                            style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                        />
                        </label>
                        <label style={{ color: '#878787' }}>이메일<input
                            type="text"
                            placeholder="이메일"
                            readOnly={true}
                            value={memberDetail.privateEmail || ''}
                            style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                        />
                        </label>
                        <label style={{ color: '#878787' }}>사내메일<input
                            type="text"
                            placeholder="사내메일"
                            readOnly={true}
                            value={memberDetail.companyEmail || ''}
                            style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                        />
                        </label>
                        <label style={{ color: '#878787' }}>부서<input
                            type="text"
                            placeholder="부서명"
                            readOnly={true}
                            value={memberDetail.department.depName || ''}
                            style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                        />
                        </label>
                        <label style={{ color: '#878787' }}>직급<input
                            type="text"
                            placeholder="직급명"
                            readOnly={true}
                            value={memberDetail.position.positionName || ''}
                            style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                        />
                        </label>
                        <label style={{ color: '#878787' }}>계좌번호<input
                            type="text"
                            placeholder="계좌번호"
                            readOnly={true}
                            value={memberDetail.account || ''}
                            style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                        />
                        </label>
                        <label style={{ color: '#878787' }}>사원사진
                            <img src={`/img/${memberDetail.imgUrl}`} width="200" height="150" />
                        </label>

                        <br></br>
                        <span>
                            <button
                                style={{ marginLeft: '600px', borderRadius: 5, width: 120, borderWidth: 0, height: 40 }}
                                onClick={onClickBackHandler}
                            >
                                돌아가기
                            </button>
                            <button
                                style={{ marginLeft: '10px', borderRadius: 5, width: 120, borderWidth: 0, height: 40, backgroundColor: 'red', color: 'white' }}
                                onClick={onDialogClickHandler}
                            >
                                비밀번호수정
                            </button>
                        </span>
                        <Dialog open={PWDialogOpen} onClose={onDialogClickHandler}>
                            <DialogTitle>비밀번호 수정</DialogTitle>
                            <UpdatePWForm myNo={memberDetail.memberNo} onDialogClickHandler={onDialogClickHandler} />
                        </Dialog>



                    </div>


                }
            </div>
        </main>
    );



}

export default MyPage;