import { useDispatch } from "react-redux";
import ButtonGroup from "../../contents/ButtonGroup";
import { callGetResourcesAPI } from "../../../apis/ResourceAPICalls";
import { useParams } from "react-router-dom";

function RscDetailContent({setModal, setUpdateClick, resourceDetail, currentPage}) {
    const {part} = useParams();
    const dispatch = useDispatch();

    const buttonClick = async (label) => {
        if(label == "수정") {
            setUpdateClick(true);
        }else if(label == "취소") {
            setModal(false);
            await dispatch(callGetResourcesAPI(part, currentPage));
        }
    };

    const detailButtons = [
        {label: "취소", styleClass: "back", onClick: () => buttonClick("취소")},
        {label: "수정", styleClass: "move", onClick: () => buttonClick("수정")}
    ];

    const rscCate = resourceDetail.rscCategory;

    return (
        <>
            <div className="modal-content">
                <h4>{resourceDetail.rscName} 정보</h4>
                <div>
                    <span className="detail-title">{rscCate === '회의실' ? "회의실 명" : "차종"}</span><span className="detail-content">{resourceDetail.rscName}</span>
                    <span className="detail-title">{rscCate === '회의실' ? "위치" : "차량 번호"}</span><span className="detail-content">{resourceDetail.rscInfo}</span>
                    <span className="detail-title">{rscCate === '회의실' ? "수용 가능 인원" : "탑승 가능 인원"}</span><span className="detail-content">{resourceDetail.rscCap}명</span>
                    <span className="detail-title">상태</span><span className="detail-content">{resourceDetail.rscIsAvailable ? "사용 가능" : "사용 불가능"}</span>
                    <span className="detail-title">비고</span><span className="detail-content">{resourceDetail.rscDescr ? resourceDetail.rscDescr : "-"}</span>
                </div>
            </div>
            <ButtonGroup buttons={detailButtons} />
        </>
    );
}

export default RscDetailContent;