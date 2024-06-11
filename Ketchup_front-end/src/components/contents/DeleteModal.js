import { Box, Dialog, DialogTitle, Typography } from "@mui/material";
import ButtonGroup from "./ButtonGroup";
function DeleteModal({ onClose, onDelete, selectedItems, part }) {
    const handleCancel = () => {
        onClose();
    };

    const handleDelete = async () => {
        onDelete();
        onClose();
    };

    const content = (
        selectedItems.length === 0 ? (
            <>
                {/* <Typography variant = "body1">선택한 자원이 없습니다.</Typography > */}
                <p>선택한 자원이 없습니다.</p>

                <ButtonGroup
                    buttons={[
                        { label: '확인', styleClass: 'move', onClick: handleCancel }
                    ]}
                />
            </>
        ): (
            <>
                <Typography variant = "body1" className="fs-5">
                    <span className = "font-weight-bold">{selectedItems.length}개의 { part === 'conferences' ? "회의실" : "차량" }</span>이 선택되었습니다.
                </Typography >
                <Typography variant="body1">예약 일정이 존재하는 {part === 'conferences' ? "회의실" : "차량"}이 있을 경우 모든 예약 일정이 삭제되며, 예약자에게 알람 메일이 전송됩니다.</Typography>
                <Typography variant="body1">정말 삭제하시겠습니까?</Typography>
                <br />

                <ButtonGroup
                    buttons={[
                        { label: '취소', styleClass: 'back', onClick: handleCancel },
                        { label: '삭제', styleClass: 'move', onClick: handleDelete }
                    ]}
                />
            </>
        )
    );

return (
    <Dialog open={true}>
        <Box p={6} padding="30px 40px 0" width="500px">
            {content}
        </Box >
    </Dialog>
);
}

export default DeleteModal;