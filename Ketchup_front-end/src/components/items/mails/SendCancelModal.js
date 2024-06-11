import { useState } from "react";
import "../../../pages/mails/mail.css";
import ButtonGroup from "../../contents/ButtonGroup";
import { useDispatch, useSelector } from "react-redux";
import { callGetMailDetailAPI, callPutSendMailCancel } from "../../../apis/MailAPICalls";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog } from "@mui/material";
import { Box } from "@mui/system";

function SendCancelModal({ setSendCancelModal, part }) {
    const { mailNo } = useParams();
    const result = useSelector(state => state.mailReducer);
    const cancelMail = result.mailcancel || [];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [failedCancellation, setFailedCancellation] = useState(false);

    const buttonClick = async (label) => {
        if (label === "취소") {
            setSendCancelModal(false);
        } else if (label === "발송 취소") {
            const success = await dispatch(callPutSendMailCancel(mailNo));
            if (!success) {
                setFailedCancellation(true);
            }
        } else if (label === "확인") {
            setSendCancelModal(false);
            navigate(`/mails/detail/${mailNo}`, { state: { part } });
            await dispatch(callGetMailDetailAPI(mailNo, part));
        }
    };

    const buttons = [
        { "label": "취소", "styleClass": "back", onClick: () => buttonClick("취소") },
        { "label": "발송 취소", "styleClass": "move", onClick: () => buttonClick("발송 취소") }
    ];

    const confirmButton = [
        { label: "확인", styleClass: "move", onClick: () => buttonClick("확인") }
    ];

    const modalContent = failedCancellation ? (
        cancelMail == 1 ? (
            <p>해당 메일의 발송을 취소했습니다.</p>
        ) : (
            <p>수신자가 해당 메일을 열람하여 발송 취소가 불가능합니다.</p>
        )
    ) : (
        <>
            <p>해당 메일의 발송을 취소하시겠습니까?</p>
            <p>수신자가 메일을 읽지 않았을 경우 취소가 가능합니다.</p>
        </>
    );

    const modalButton = failedCancellation ? (
        <ButtonGroup buttons={confirmButton} />
    ) : (
        <ButtonGroup buttons={buttons} />
    );

    return (

        <Dialog open={true}>
            <Box p={6} justifyContent="flex-end" padding="40px" paddingBottom="20px">
                {modalContent}
                <br />
                {modalButton}
            </Box >
        </Dialog>
        // <div className="modal-back">
        //     <div className="modal-box">
        //         <div className="modal-content">
        //             {modalContent}
        //         </div>
        //         <>
        //             {modalButton}
        //         </>
        //     </div>
        // </div>
    );
}

export default SendCancelModal;