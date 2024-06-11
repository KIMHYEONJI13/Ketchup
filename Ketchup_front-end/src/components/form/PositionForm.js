import React, { useEffect, useState } from 'react';
import { callAllPositionsAPI, callUpdatePositionAPI } from '../../apis/MemberAPICalls';
import { useDispatch } from 'react-redux';
import ButtonGroup from '../contents/ButtonGroup';



export default function PositionForm({ position, onDialogClickHandler }) {

    const dispatch = useDispatch();
    const [form, setForm] = useState([]);
    console.log(form);

    const positionName = position.positionName;

    useEffect(() => {
        setForm({
            positionName: position.positionName,
            positionLevel: position.positionLevel,
            authority: position.authority,
            positionStatus: position.positionStatus
        });
    }, []);


    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const onClickHandler = async () => {
        await dispatch(callUpdatePositionAPI(position.positionNo, form));

        alert("수정이 완료되었습니다.");

        await dispatch(callAllPositionsAPI());

        onDialogClickHandler();
    }







    return (


        <div style={{ marginLeft: 50 }}>
            <label>현재 직급명 <input value={positionName} style={{ textAlign: 'center', marginLeft: 50, borderWidth: '0px 0px 1px 0px' }}></input></label>
            <br></br>


            <label>수정후 직급레벨 <select style={{ marginLeft: 20, borderWidth: '0px 0px 1px 0px' }} name="positionLevel" onChange={onChangeHandler}>
                <option value="">직급 레벨 선택</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select></label>


            <label>수정후 직급명
                <input
                    defaultValue={positionName}
                    onChange={onChangeHandler}
                    name="positionName"
                    style={{
                        textAlign: 'center',
                        marginLeft: 35,
                        borderWidth: '0px 0px 1px 0px'
                    }}>
                </input>
            </label>


            <label>수정후 관리권한
                <select style={{ marginLeft: 20, borderWidth: '0px 0px 1px 0px' }} name="authority" onChange={onChangeHandler}>
                    <option value="">관리 권한 선택</option>
                    <option value="LV1">LV1</option>
                    <option value="LV2">LV2</option>
                    <option value="LV3">LV3</option>
                </select></label>

            <br></br>
            {/* <button style={{ marginLeft: 330, marginBottom: 20 }} onClick={() => { onDialogClickHandler() }}>취소</button> */}
            {/* <button style={{ marginLeft: 5 }} onClick={onClickHandler}>저장</button> */}

            <div style={{ marginRight: "20px"}}>
                <ButtonGroup
                    buttons={[
                        { label: '취소', styleClass: 'back', onClick: () => { onDialogClickHandler() } },
                        { label: '저장', styleClass: 'move', onClick: onClickHandler }
                    ]}
                />
            </div>

        </div>



    );
}
