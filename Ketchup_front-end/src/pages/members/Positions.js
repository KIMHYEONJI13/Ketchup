import { callPositionsAPI, callAddPositionAPI, callDeletePositionAPI, callUpdatePositionStatusAPI, callAllPositionsAPI } from "../../apis/MemberAPICalls"; // addPosition 추가
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Table, ToggleButtonGroup } from "react-bootstrap";
import { Dialog, DialogTitle, Radio, ToggleButton } from "@mui/material";
import ButtonGroup from "../../components/contents/ButtonGroup";
import PositionForm from "../../components/form/PositionForm";
import { useNavigate } from "react-router-dom";
import { decodeJwt } from "../../utils/tokenUtils";

function Positions() {


    const dispatch = useDispatch();
    const positionList = useSelector(state => state.positionReducer);
    const token = decodeJwt(window.localStorage.getItem('accessToken'));

    const [positionDialogOpen, setPositionDialogOpen] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [selectedPositionNos, setSelectedPositionNos] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [newPosition, setNewPosition] = useState({ positionName: "", positionLevel: "", authority: "", positionStatus: "Y" });


    console.log(useSelector(state => state.positionReducer));

    useEffect(() => {
        dispatch(callAllPositionsAPI());
    }, []);


    const onDialogClickHandler = () => {
        setPositionDialogOpen(prevState => !prevState);
    };


    const handleEditClick = (position) => {
        setSelectedPosition(position);
        onDialogClickHandler(); // 다이얼로그 열기
    }


    const handleRadioClick = (positionNo, status) => {
        setSelectedPositionNos(prevState => ({
            ...prevState,
            [positionNo]: status
        }));
    };


    const handleEditModeToggle = () => {
        setIsEditMode(prevState => !prevState);
    }


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPosition(prevState => ({
            ...prevState,
            [name]: value
        }));
    }


    const addPosition = async () => {
        await dispatch(callAddPositionAPI(newPosition));
        setIsEditMode(false);
        await dispatch(callAllPositionsAPI());
    }

    const cancelEdit = () => {
        setIsEditMode(false);
        setNewPosition({ positionName: "", positionLevel: "", authority: "" });
        dispatch(callAllPositionsAPI());

    }

    const deletePosition = async (positionNo) => {
        const confirmed = window.confirm('해당직급 사원이 없을경우에만 삭제 가능합니다.\n정말 삭제하시겠습니까? '); // 사용자에게 확인 다이얼로그 표시

        if (confirmed) { // 사용자가 확인을 눌렀을 때만 삭제 진행
            await dispatch(callDeletePositionAPI(positionNo));
            await dispatch(callAllPositionsAPI());
        }

    }


    return (
        <>
            <main id="main">
                {token?.depNo === 2 &&
                    <div>
                        <br />
                        <h2>직급관리</h2>
                        <ButtonGroup buttons={[{ label: '등록', styleClass: 'move', onClick: handleEditModeToggle }]} />
                        <br />
                        <br />
                        <Table>
                            <thead>
                                <tr>
                                    <th>미사용</th>
                                    <th>사용</th>
                                    <th>직급명</th>
                                    <th>직급레벨</th>
                                    <th>관리권한</th>
                                    <th>직급수정</th>
                                    <th>직급삭제</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(positionList) && positionList.map((position) => (
                                    <tr key={position?.positionNo}>
                                        <td>
                                            <Radio

                                                checked={position.positionStatus === 'N'}
                                                onClick={
                                                    () => dispatch(callUpdatePositionStatusAPI(position.positionNo))
                                                        .then(() => { dispatch(callAllPositionsAPI()) })
                                                } // 누르는 버튼에 따라 false 전달
                                            />
                                        </td>
                                        <td>
                                            <Radio

                                                checked={position.positionStatus === 'Y'}
                                                onClick={
                                                    () => dispatch(callUpdatePositionStatusAPI(position.positionNo))
                                                        .then(() => { dispatch(callAllPositionsAPI()) })
                                                } // 누르는 버튼에 따라 true 전달
                                            />
                                        </td>
                                        <td>{position && position.positionName}</td>
                                        <td>{position && position.positionLevel}</td>
                                        <td>{position && position.authority}</td>
                                        <td><button className="back-btn" style={{ paddingTop: 2, margin: 0, width: '60px', height: '30px', fontSize: "15px", border: "none", backgroundColor: "lightgray" }} onClick={() => handleEditClick(position)}>수정</button></td>
                                        <td><button className="move-btn" style={{ paddingTop: 2, margin: 0, width: '60px', height: '30px', fontSize: "15px", }} onClick={() => deletePosition(position.positionNo)}>삭제</button></td>

                                    </tr>
                                ))}
                                {isEditMode && (
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td >
                                            <input style={{ border: "none", borderBottom: "1px solid black", textAlign: "center" }} type="text" name="positionName" placeholder="직급명" value={newPosition.positionName} onChange={handleInputChange} />
                                        </td>
                                        <td>
                                            <select style={{ border: "none" }} name="positionLevel" value={newPosition.positionLevel} onChange={handleInputChange}>
                                                <option value="">직급 레벨 선택</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select style={{ border: "none" }} name="authority" value={newPosition.authority} onChange={handleInputChange}>
                                                <option value="">관리 권한 선택</option>
                                                <option value="LV1">LV1</option>
                                                <option value="LV2">LV2</option>
                                                <option value="LV3">LV3</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button className="back-btn" style={{ paddingTop: 2, margin: 0, width: '60px', height: '30px', fontSize: "15px" }} onClick={cancelEdit}>취소</button>
                                        </td>
                                        <td>
                                            <button className="move-btn" style={{ paddingTop: 2, margin: 0, width: '60px', height: '30px', fontSize: "15px" }} onClick={addPosition}>추가</button>
                                        </td>
                                    </tr>
                                )}


                            </tbody>
                        </Table>
                        <Dialog open={positionDialogOpen} onClose={onDialogClickHandler}>
                            <DialogTitle>직급 수정</DialogTitle>
                            <PositionForm position={selectedPosition} onDialogClickHandler={onDialogClickHandler} />
                        </Dialog>
                        {/* {isEditMode &&
                        <div>
                            <input style={{ marginLeft: 400 }} type="text" name="positionName" placeholder="직급명" onChange={handleInputChange} />
                            <select style={{ marginLeft: 55 }} name="positionLevel" onChange={handleInputChange}>
                                <option value="">직급 레벨 선택</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <select style={{ marginLeft: 100 }} name="authority" onChange={handleInputChange}>
                                <option value="">관리 권한 선택</option>
                                <option value="LV1">LV1</option>
                                <option value="LV2">LV2</option>
                                <option value="LV3">LV3</option>
                            </select>

                            {/* <div>

                            <ButtonGroup
                                buttons={[
                                    { label: '수정', styleClass: 'back', onClick: cancelEdit },
                                    { label: '삭제', styleClass: 'move', onClick: addPosition }
                                ]}
                            />
                            </div> 
                           <button onClick={cancelEdit}>취소</button>
                                <button onClick={addPosition}>추가</button> 

                        </div>
                    } */}
                    </div>
                }
               {token.depNo !== 2 && 
                <div>
                    <h2 style={{marginLeft: 600, marginTop: 60}}>접근권한이 없습니다.</h2>
                    <img src="images/noAuth.gif"
                        style={{marginLeft: 450}}></img>
                </div>
                
                
                }

            </main>
        </>
    );
}


export default Positions;