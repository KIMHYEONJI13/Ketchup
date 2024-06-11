import { Box, Dialog, Typography } from "@mui/material";
import ButtonGroup from "../contents/ButtonGroup";

function NormalDeleteModalForm({ onClose, onDelete }) {

    const handleCancel = () => {
        onClose(); 
    };

    const handleDelete = () => {
        onDelete(); 
        onClose(); 
    };

    return (

        <Dialog open={true}>
            <Box p={6} justifyContent="flex-end" padding="40px" paddingBottom="20px">
                <Typography variant="body1">한 번 삭제하면 다시 복구할 수 없습니다.</Typography>
                <Typography variant="body1">정말 삭제하시겠습니까?</Typography>
                <br />

                <ButtonGroup
                    buttons={[
                        { label: '취소', styleClass: 'back', onClick: handleCancel },
                        { label: '삭제', styleClass: 'move', onClick: handleDelete }
                    ]}
                />
            </Box >
        </Dialog>

    );
}

export default NormalDeleteModalForm;