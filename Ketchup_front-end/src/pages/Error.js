import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Error() {
    const navigate = useNavigate();

    const onClickHandler = () => navigate('/main');

    return (
        <>
            <Box height={'650px'} display="flex" flexDirection="column" justifyContent="center" alignItems="center" margin={'auto'}>
                {/* <img src="/img/searchConditionRequired.png" alt="searchConditionRequired" style={{ display: "block", margin: "0 auto", maxWidth: "100%", height: "auto" }} /> */}
                <img style={{ width: '200px', height: '80px' }} src="/img/logo.png" alt="Logo" />
                <br />
                <Typography fontSize={30} textAlign={'center'}>원하시는 페이지를 찾을 수 없습니다.</Typography>
                <Typography fontSize={20} textAlign={'center'}>찾으려는 페이지의 주소가 잘못 입력되었거나,</Typography>
                <Typography fontSize={20} textAlign={'center'}>주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다.</Typography>
                <Typography fontSize={20} textAlign={'center'}>입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주세요.</Typography>
                <div style={{ marginTop: '30px'}}>
                    <button className='move-btn' style={{ width: '200px', height: '50px'}} onClick={onClickHandler}>메인으로 이동하기</button>
                </div>
            </Box>
        </>
    );
}

export default Error;