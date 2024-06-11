import { useDispatch } from "react-redux";
import { callGetResourceDetailAPI, callPutResourceAPI } from "../../apis/ResourceAPICalls";
import ButtonGroup from "../contents/ButtonGroup";
import { useState } from "react";

function UpdateResourceForm({ setUpdateClick, resourceDetail, selectRscNo }) {
    const dispatch = useDispatch();
    const [formState, setFormState] = useState({
        rscIsAvailable: resourceDetail.rscIsAvailable,
        rscDescr: resourceDetail.rscDescr
    });

    const buttonClick = (label) => {
        if (label == "저장") {
            submitRscUpdate();
            setUpdateClick(false);
        } else if (label == "취소") {
            setUpdateClick(false);
        }
    };

    const updateButtons = [
        { label: "취소", styleClass: "back", onClick: () => buttonClick("취소") },
        { label: "저장", styleClass: "move", onClick: () => buttonClick("저장") }
    ];

    const onChangeHandler = (e) => {
        const { name, value, type } = e.target;
        setFormState({
            ...formState,
            [name]: type === "radio" ? value === "true" : value
        });
    };

    const rscCate = resourceDetail.rscCategory;

    const submitRscUpdate = async () => {
        const updateRscDto = {
            rscIsAvailable: formState.rscIsAvailable,
            rscDescr: formState.rscDescr
        };

        try {
            await dispatch(callPutResourceAPI({ selectRscNo, updateRscDto }));
            await dispatch(callGetResourceDetailAPI(selectRscNo));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="modal-content">
                <h4>{resourceDetail.rscName} 수정</h4>
                <div className="rsc-form">
                    <span className="detail-title">{rscCate === '회의실' ? "회의실 명" : "차종"}</span><span className="detail-content">{resourceDetail.rscName}</span>
                    <span className="detail-title">{rscCate === '회의실' ? "위치" : "차량 번호"}</span><span className="detail-content">{resourceDetail.rscInfo}</span>
                    <span className="detail-title">{rscCate === '회의실' ? "수용 가능 인원" : "탑승 가능 인원"}</span><span className="detail-content">{resourceDetail.rscCap}명</span>

                    <label htmlFor="rscIsAvailable">상태</label>
                    <div className="rsc-radio">
                        <input
                            type="radio"
                            className="form-check-input border"
                            name="rscIsAvailable"
                            value="true"
                            id="available"
                            checked={formState.rscIsAvailable === true}
                            onChange={onChangeHandler}
                        />
                        <label htmlFor="available">사용 가능</label>
                        <input
                            type="radio"
                            className="form-check-input border"
                            name="rscIsAvailable"
                            value="false"
                            id="unavailable"
                            checked={formState.rscIsAvailable === false}
                            onChange={onChangeHandler}
                        />
                        <label htmlFor="unavailable">사용 불가능</label>
                    </div>

                    <div className="d-flex">
                        <label htmlFor="rscDescr">비고</label>
                        <textarea
                            className="form-control"
                            id="rscDescr"
                            name="rscDescr"
                            value={formState.rscDescr}
                            onChange={onChangeHandler}
                            placeholder={resourceDetail.rscDescr ? `${resourceDetail.rscDescr}` : "-"} /> <br />
                    </div>
                </div>
            </div>
            <ButtonGroup buttons={updateButtons} />
        </>
    );
}

export default UpdateResourceForm;