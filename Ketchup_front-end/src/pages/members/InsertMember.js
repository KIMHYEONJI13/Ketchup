import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callRegisterAPI, callDepartmentsAPI, callPositionsAPI, callAllPositionsAPI } from "../../apis/MemberAPICalls";
import { useEffect } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";



function InsertMember() {

    const departments = useSelector(state => state.departmentReducer);
    const positions = useSelector(state => state.positionReducer);



    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedBank, setSelectedBank] = useState('국민');


    const [validationMessage, setValidationMessage] = useState({
        privateEmail: '',
        memberName: '',
        phone: '',
        companyEmail: 'ok!',
        gender: '',
        department: '',
        position: '',


    });


    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({
        memberNo: '',
        memberPW: '1111',
        status: '재직중',
        imgUrl: 'memberFileName'

    });



    const completeHandler = (data) => {
        console.log('컴플리트 핸들러의 데이터는??', data);
        const { address } = data;
        // setAddress(address);
        setForm({
            ...form,
            address: address
        });
        // console.log(form.address);
        setIsOpen(false); // 주소 선택 후에는 주소 입력 폼을 닫음
    };



    const toggleHandler = () => {
        console.log('토글 핸들러');
        setIsOpen((prevOpenState) => !prevOpenState);
    };


    useEffect(() => {

        generateMemberNo();
        dispatch(callDepartmentsAPI());
        dispatch(callPositionsAPI());

    }, []);


    const departmentOptions = () => {
        return departments.map(dep => (
            <option key={dep.depNo} value={dep.depNo}>{dep.depName}</option>
        ));
    };

    const positionOptions = () => {
        return positions.map(position => (
            <option key={position.positionNo} value={position.positionNo}>{position.positionName}</option>
        ));
    };




    const generateMemberNo = () => {
        const today = new Date();
        const year = today.getFullYear().toString().slice(2); // 연도의 마지막 두 자리
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // 월을 두 자리로
        const randomNum = Math.floor(Math.random() * 1000) + 10; // 10에서 100 사이의 랜덤 숫자

        const generatedMemberNo = year + month + randomNum;
        setForm(prevForm => ({
            ...prevForm,
            memberNo: generatedMemberNo,
            memberPW: '1111',
            status: '재직중',
            imgUrl: 'memberFileName',
            memberName: '',
            phone: '',
            birthDate: '',
            gender: '',
            address: '',
            privateEmail: '',
            companyEmail: `${generatedMemberNo}@ketchup.com`,
            department: '',
            position: '',
            account: '',
            memberImage: null // 사원사진 초기화
        }));
    };


    const [imagePreview, setImagePreview] = useState('/img/needFile.png');

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);

            setForm(prevForm => ({
                ...prevForm,
                memberImage: file
            }));
        };

    };



    const onClickRegistHandler = () => {
        dispatch(callRegisterAPI({
            form: form
        }));

        alert("요청이 완료되었습니다.");
        navigate("/members");

    }

    const isValidEmail = (email) => {

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(String(email).toLowerCase());
    };

    const isValidCompanyEmail = (email) => {

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(String(email).toLowerCase());
    };

    const isValidName = (name) => {
        const nameRegex = /^([a-zA-Z]+|[ㄱ-ㅎㅏ-ㅣ가-힣]){2,}$/;
        return nameRegex.test(String(name).toLowerCase());
    };

    const isValidPhone = (phone) => {
        const phoneRegex = /^010[0-9]{8}$/;
        return phoneRegex.test(String(phone));
    }






    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        const final = selectedBank + "  " + value;




        if (name === "privateEmail") {
            if (!isValidEmail(value)) {
                setValidationMessage({
                    ...validationMessage,
                    privateEmail: '이메일의 형식에 맞지 않습니다.'
                })
            }
            else {
                setValidationMessage({
                    ...validationMessage,
                    privateEmail: 'ok!'
                })

            }
        }

        if (name === "companyEmail") {
            if (!isValidCompanyEmail(value)) {
                setValidationMessage({
                    ...validationMessage,
                    companyEmail: '이메일의 형식에 맞지 않습니다.'
                })
            }
            else {
                setValidationMessage({
                    ...validationMessage,
                    companyEmail: 'ok!'
                })

            }
        }

        if (name === "memberName") {
            if (!isValidName(value)) {
                setValidationMessage({
                    ...validationMessage,
                    memberName: '이름은 한글 혹은 영어로만 입력되어야 합니다.(2자~20자)'
                })
            }
            else {
                setValidationMessage({
                    ...validationMessage,
                    memberName: 'ok!'
                })

            }
        }

        if (name === "phone") {
            if (!isValidPhone(value)) {
                setValidationMessage({
                    ...validationMessage,
                    phone: '- 없이 010으로 시작하는 숫자11자리를 입력해주세요.'
                })
            }
            else {
                setValidationMessage({
                    ...validationMessage,
                    phone: 'ok!'
                })

            }
        }

        if (name === "department") {
            if (value === "") {
                setValidationMessage({
                    ...validationMessage,
                    department: '부서를 선택해주세요'
                })
            }
            else {
                setValidationMessage({
                    ...validationMessage,
                    department: 'ok!'
                })

            }
        }

        if (name === "position") {
            if (value === "") {
                setValidationMessage({
                    ...validationMessage,
                    position: '직급을 선택해주세요'
                })
            }
            else {
                setValidationMessage({
                    ...validationMessage,
                    position: 'ok!'
                })

            }
        }


        if (name === "gender") {
            if (value === "") {
                setValidationMessage({
                    ...validationMessage,
                    gender: '성별을 선택해주세요'
                })
            }
            else {
                setValidationMessage({
                    ...validationMessage,
                    gender: 'ok!'
                })

            }
        }




        setForm({
            ...form,
            [e.target.name]: (e.target.name === 'account') ? final : e.target.value
        });



    };


    const bankHandler = async (e) => {
        setSelectedBank(e.target.value);

    };



    return (

        <main id="main">
            {departments.length > 0 && positions.length > 0 &&
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2 style={{ marginLeft: '-1000px' }}>사원 등록</h2>
                    <label style={{ color: '#878787' }}>사번
                        <input
                            readOnly
                            onChange={onChangeHandler}
                            type="text"
                            placeholder="사번"
                            name="memberNo"
                            value={form.memberNo}
                            style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                        />
                    </label>
                    <p></p>

                    <label style={{ color: '#878787' }}>이름
                        <input
                            autoComplete='off'
                            type="text"
                            placeholder="이름"
                            name="memberName"
                            onChange={onChangeHandler}
                            style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                        />
                    </label>
                    <p style={{ color: 'red', marginLeft: 400, fontSize: 13 }}>{validationMessage.memberName}</p>
                    <label style={{ color: '#878787' }}>연락처
                        <input
                            autoComplete='off'
                            type="text"
                            placeholder="연락처"
                            name="phone"
                            onChange={onChangeHandler}
                            style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                        />
                    </label>
                    <p style={{ color: 'red', marginLeft: 400, fontSize: 13 }}>{validationMessage.phone}</p>
                    <label style={{ color: '#878787' }}>생년월일
                        <input
                            autoComplete='off'
                            type="date"
                            placeholder="생년월일"
                            name="birthDate"
                            max="2005-01-01"
                            onChange={onChangeHandler}
                            style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                        />
                    </label>
                    <p></p>
                    <label style={{ color: '#878787' }}>성별
                        <select
                            type="text"
                            name="gender"
                            onChange={onChangeHandler}
                            style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                            defaultValue=""
                        >
                            <option value="">성별을 선택해주세요</option>
                            <option value="M">남</option>
                            <option value="F">여</option>
                        </select>
                    </label>
                    <p></p>

                    <label style={{ color: '#878787' }}>주소
                        <input
                            readOnly
                            autoComplete='off'
                            type="text"
                            placeholder="주소"
                            name="address"
                            value={form.address}
                            onChange={onChangeHandler}
                            style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                        /><button onClick={toggleHandler}>주소 찾기</button>
                    </label>
                    {isOpen && (
                        <div >
                            <DaumPostcodeEmbed
                                style={{ width: '400px', height: '480px' }}
                                onComplete={completeHandler}
                                onClose={() => setIsOpen(false)} // 닫기 버튼을 클릭한 경우에도 주소 입력 폼을 닫음
                            />
                            <br />
                        </div>
                    )}
                    <p></p>

                    <label style={{ color: '#878787' }}>이메일
                        <input
                            autoComplete='off'
                            type="text"
                            placeholder="이메일"
                            name="privateEmail"
                            onChange={onChangeHandler}
                            style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                        />
                    </label>
                    <p style={{ color: 'red', marginLeft: 400, fontSize: 13 }}>{validationMessage.privateEmail}</p>

                    <label style={{ color: '#878787' }}>사내메일
                        <input
                            autoComplete='off'
                            type="text"
                            placeholder="사내메일"
                            name="companyEmail"
                           
                            value= {form.companyEmail}
                            style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                        />
                    </label>
                    <p style={{ color: 'red', marginLeft: 400, fontSize: 13 }}>{validationMessage.companyEmail}</p>

                    <label style={{ color: '#878787' }}>부서
                        <select
                            type="text"
                            name="department"
                            onChange={onChangeHandler}
                            style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                            defaultValue=""
                        >
                            <option value="">부서를 선택해주세요</option>
                            {departmentOptions()}
                        </select>
                    </label>
                    <p style={{ color: 'red', marginLeft: 400, fontSize: 13 }}>{validationMessage.department}</p>
                    <label style={{ color: '#878787' }}>직급
                        <select
                            type="text"
                            name="position"
                            onChange={onChangeHandler}
                            style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                            defaultValue=""
                        >
                            <option value="">직급을 선택해주세요</option>
                            {positionOptions()}
                        </select>
                    </label>
                    <p style={{ color: 'red', marginLeft: 400, fontSize: 13 }}>{validationMessage.position}</p>


                    <label style={{ color: '#878787' }}>계좌번호
                        <select
                            onChange={bankHandler}
                            style={{ borderWidth: '0px', marginBottom: '20px', padding: '1px', width: '70px', textAlign: 'center' }}
                        >
                            <option value="국민">국민</option>
                            <option value="신한">신한</option>
                            <option value="우리">우리</option>
                            <option value="기업">기업</option>
                            <option value="농협">농협</option>
                            <option value="하나">하나</option>
                            <option value="제일">제일</option>
                        </select>
                        <input
                            autoComplete='off'
                            type="text"
                            placeholder="계좌번호"
                            name="account"
                            onChange={onChangeHandler}
                            style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                        />
                    </label>





                    <label style={{ color: '#878787' }}>사원사진
                        <input
                            type="file"
                            onChange={handleImageUpload}
                            accept="image/*"
                            name="memberImage"
                            style={{ display: 'none' }} // 기존 스타일 수정
                        />
                        <img
                            src={imagePreview}
                            alt="사원사진 미리보기"
                            style={{
                                borderWidth: '0px 0px 1px 0px',
                                marginBottom: '20px',
                                padding: '5px',
                                width: '200px',
                                height: '200px',
                                objectFit: 'cover', // 이미지 비율 유지
                                cursor: 'pointer'
                            }}
                        />
                    </label>
                    <span>
                        <button
                            style={{ backgroundColor: 'white', color: 'black', fontSize: '15px', width: 80, height: '35px', padding: '5px', cursor: 'pointer', marginLeft: '600px', borderRadius: 5 }}
                        >
                            취소
                        </button>
                        <button
                            id="registerButton"
                            onClick={onClickRegistHandler}
                            disabled={Object.values(validationMessage).some(msg => msg !== 'ok!')}
                            style={{ backgroundColor: 'red', color: 'white', border: 'none', fontSize: '15px', width: 80, height: '35px', padding: '5px', cursor: 'pointer', marginLeft: '10px', borderRadius: 5 }}
                        >
                            등록
                        </button>
                        {Object.values(validationMessage).some(msg => msg !== 'ok!') && (
                            <p style={{ color: 'red', marginLeft: 700, fontSize: 13 }}>입력값을 확인하세요.</p>
                        )}


                    </span>

                </div>
            }


        </main>
    );
}

export default InsertMember;