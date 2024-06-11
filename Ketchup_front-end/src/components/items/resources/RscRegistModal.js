import "../../../pages/resources/resource.css";
import InsertResourceForm from "../../form/InsertResourceForm";

function RscRegistModal({ setRegistModal, part, currentPage }) {
    return (
        <div className="modal-back">
            <div className="modal-box">
                    <InsertResourceForm part={part} setRegistModal={setRegistModal} currentPage={currentPage} />
                </div>
        </div>
    );
}

export default RscRegistModal;