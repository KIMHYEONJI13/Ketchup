import { useState } from "react";
import { callGetResourcesAPI, callPostResourceAPI } from "../../apis/ResourceAPICalls";
import ButtonGroup from "../contents/ButtonGroup";
import { useDispatch } from "react-redux";

function InsertResourceForm({ part, setRegistModal, currentPage }) {
    const dispatch = useDispatch();

    const korPart = part === 'conferences' ? "회의실" : "차량";

    const [rscForm, setRscForm] = useState({
        rscCategory: korPart,
        rscName: '',
        conferenceFloor: 0,
        conferenceRoom: 0,
        vehicleNum: '',
        rscCap: 0,
        rscIsAvailable: '',
        rscDescr: null
    });

    const buttonClick = async (label) => {
        if (label == "취소") {
            setRegistModal(false);
        } else if (label == "등록") {
            await submitRscClick();
        }
    };

    const registButtons = [
        { label: "취소", styleClass: "back", onClick: () => buttonClick("취소") },
        { label: "등록", styleClass: "move", onClick: () => buttonClick("등록") }
    ];

    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        if (['conferenceFloor', 'conferenceRoom', 'rscCap'].includes(name) && isNaN(value)) {
            alert("숫자만 입력할 수 있습니다.");
            return;
        }

        setRscForm({
            ...rscForm,
            [name]: value
        });
    };

    const onRadioChangeHandler = (e) => {
        setRscForm({
            ...rscForm,
            rscIsAvailable: e.target.value === "available"
        });
    };

    const submitRscClick = async () => {
        if(!rscForm.rscName) {
            alert(`${korPart === '회의실' ? "회의실 명" : "차종"}을 입력하세요`);
            return;
        }else if(korPart === '회의실' && (!rscForm.conferenceFloor || rscForm.conferenceFloor <= 0 || !rscForm.conferenceRoom || rscForm.conferenceRoom <= 0)) {
            alert("회의실 위치 정보를 0보다 큰 숫자로 입력하세요");
            return;
        }else if (korPart === '차량' && !rscForm.vehicleNum) {
            alert("차량 번호를 입력하세요");
            return;
        }else if (!rscForm.rscCap || rscForm.rscCap <= 0) {
            alert(`${korPart === '회의실' ? "수용 가능 인원" : "탑승 가능 인원"}을 0보다 큰 숫자로 입력하세요`);
            return;
        }else if (rscForm.rscIsAvailable === '') {
            alert("상태를 선택하세요");
            return;
        }

        const floor = Number(rscForm.conferenceFloor);
        const room = Number(rscForm.conferenceRoom);
        const capacity = Number(rscForm.rscCap);

        const rscInfo = part === 'conferences'
            ? `${floor}층 ${room}호`
            : rscForm.vehicleNum;

        const rscDto = {
            rscCategory: rscForm.rscCategory,
            rscName: rscForm.rscName,
            rscInfo: rscInfo,
            rscCap: capacity,
            rscIsAvailable: rscForm.rscIsAvailable,
            rscDescr: rscForm.rscDescr
        };

        try {
            await dispatch(callPostResourceAPI({ rscDto }));
            dispatch(callGetResourcesAPI(part, currentPage));
            setRegistModal(false);  // 성공적으로 등록된 후 모달 닫기
        } catch (error) {
            console.error(error);
        }
    };

    const rscPart = part === 'conferences';

    return (
        <div className="modal-content">
            {
                part === 'conferences' ? <h5 className="fw-bold">회의실 등록</h5> : <h5 className="fw-bold">차량 등록</h5>
            }
            <div className="rsc-form">
                <label htmlFor="rscName">{rscPart ? "회의실 명" : "차종"}</label>
                <input
                    type="text"
                    name="rscName"
                    value={rscForm.rscName}
                    id="rscName"
                    onChange={onChangeHandler}
                    placeholder={rscPart ? "회의실 명을 입력하세요" : "차종을 입력하세요"} /> <br />
                {rscPart ? (
                    <>
                        <label>위치</label>
                        <div className="rsc-location">
                            <input
                                type="text"
                                className="input-number"
                                name="conferenceFloor"
                                value={rscForm.conferenceFloor}
                                onChange={onChangeHandler}
                                placeholder="00" /><span className="pr-4">층</span>
                            <input
                                type="text"
                                className="input-number"
                                name="conferenceRoom"
                                value={rscForm.conferenceRoom}
                                onChange={onChangeHandler}
                                placeholder="0000" /><span>호</span> <br />
                        </div>
                    </>
                ) : (
                    <>
                        <label>차량 번호</label>
                        <input
                            type="text"
                            name="vehicleNum"
                            value={rscForm.vehicleNum}
                            onChange={onChangeHandler}
                            placeholder="00가 0000" /> <br />
                    </>
                )}
                <label htmlFor="rscCap">{rscPart ? "수용 가능 인원" : "탑승 가능 인원"}</label>
                <input
                    type="text"
                    className="input-number"
                    name="rscCap"
                    value={rscForm.rscCap}
                    id="rscCap"
                    onChange={onChangeHandler}
                    placeholder="00" /><span>명</span> <br />
                <label htmlFor="rscIsAvailable">상태</label>
                <div className="rsc-radio">
                    <input
                        type="radio"
                        className="form-check-input border"
                        name="checkStatus"
                        value="available"
                        id="available"
                        checked={rscForm.rscIsAvailable === true}
                        onChange={onRadioChangeHandler} />
                    <label htmlFor="available">사용 가능</label>
                    <input
                        type="radio"
                        className="form-check-input border"
                        name="checkStatus"
                        value="unavailable"
                        id="unavailable"
                        checked={rscForm.rscIsAvailable === false}
                        onChange={onRadioChangeHandler} />
                    <label htmlFor="unavailable">사용 불가능</label>
                </div>
                <div className="d-flex">
                    <label htmlFor="rscDescr">비고</label>
                    <textarea
                        className="form-control"
                        id="rscDescr"
                        name="rscDescr"
                        value={rscForm.rscDescr}
                        onChange={onChangeHandler}
                        placeholder="추가 사항을 입력하세요" /> <br />
                </div>
            </div>
            <ButtonGroup buttons={registButtons} />
        </div>
    );
}

export default InsertResourceForm;