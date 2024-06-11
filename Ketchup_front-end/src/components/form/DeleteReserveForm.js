import { Box, Typography, DialogTitle } from "@mui/material";
import { deleteReserveAPI } from "../../apis/ReserveAPICalls";

export default function DeleteReserveForm({ onCloseDeleteConfirm, selectedReserve, newReserveAdded, setNewReserveAdded }) {
    const handleDelete = () => {
        try {
            deleteReserveAPI(selectedReserve.id);
            alert("예약이 정상적으로 삭제되었습니다.");
            onCloseDeleteConfirm();
            setNewReserveAdded(!newReserveAdded);
        } catch (error) {
            console.error("예약 삭제 중 에러 발생 handleDelete", error);
            alert("예약 삭제에 실패했습니다.");
        }
    };

    return (
        <>
            <DialogTitle>예약 삭제</DialogTitle>
            <Box p={2}>
                <Typography variant="body1">한 번 삭제하면 다시 복구할 수 없습니다.</Typography>
                <Typography variant="body1">정말로 삭제하시겠습니까?</Typography>
            </Box>
            <Box p={2} display="flex" justifyContent="flex-end">
                <button onClick={() => onCloseDeleteConfirm(true)} className="back-btn">닫기</button>
                <button onClick={handleDelete} className="move-btn" ml={1}>삭제</button>
            </Box>
        </>
    );
};