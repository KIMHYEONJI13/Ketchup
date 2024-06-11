import { callDepartmentsAPI, callAllDepartmentsAPI, callMembersAPI, callAddDepartmentAPI, callDeleteDepartmentAPI, callUpdateDepartmentStatusAPI } from "../../apis/MemberAPICalls";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Table, ToggleButtonGroup } from "react-bootstrap";
import { Dialog, DialogTitle, Radio, ToggleButton } from "@mui/material";
import ButtonGroup from "../../components/contents/ButtonGroup";
import DepartmentForm from "../../components/form/DepartmentForm";
import { decodeJwt } from "../../utils/tokenUtils";




function Departments() {
    const dispatch = useDispatch();
    const departmentsList = useSelector(state => state.departmentReducer);
    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    const memberList = useSelector(state => state.memberReducer);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [departmentDialogOpen, setDepartmentDialogOpen] = useState(false);




    const [isEditMode, setIsEditMode] = useState(false);
    const [newDepartment, setNewDepartment] = useState({
        status: 'Y'

    });








    useEffect(
        () => {
            dispatch(callAllDepartmentsAPI());
            dispatch(callMembersAPI());
        }, []

    );

    const cancelEdit = () => {
        setIsEditMode(false);
        dispatch(callAllDepartmentsAPI());
    }

    const onDialogClickHandler = () => {
        setDepartmentDialogOpen(prevState => !prevState);
    };

    const handleEditModeToggle = () => {
        setIsEditMode(prevState => !prevState);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDepartment(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const addDepartment = async () => {
        await dispatch(callAddDepartmentAPI(newDepartment));
        setIsEditMode(false);
        await dispatch(callAllDepartmentsAPI());
    }

    const deleteDepartment = async (depNo) => {
        const confirmed = window.confirm('해당부서 사원이 없을경우에만 삭제 가능합니다.\n정말 삭제하시겠습니까? ');

        if (confirmed) {
            await dispatch(callDeleteDepartmentAPI(depNo));
            await dispatch(callAllDepartmentsAPI());
        }
    }

    const handleEditClick = (department) => {
        setSelectedDepartment(department);
        onDialogClickHandler(); // 다이얼로그 열기
    }



    return (
        <>
            <main id="main">
                {token?.depNo === 2 &&
                    <div >
                        <br></br>
                        <h2>부서관리</h2>
                        <ButtonGroup buttons={[{ label: '등록', styleClass: 'move', onClick: handleEditModeToggle }]} />
                        <Table>
                            <thead>
                                <tr>
                                    <th>미사용</th>
                                    <th>사용</th>

                                    <th>부서명</th>
                                    <th>팀장</th>
                                    <th>인원수</th>
                                    <th>부서수정</th>
                                    <th>부서삭제</th>

                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(departmentsList) && departmentsList?.filter((department) => department.depName !== '대표')
                                .map((department) => (
                                    <tr key={department.depNo} >
                                        <td>
                                            <Radio
                                                checked={department.status === 'N'}
                                                onClick={
                                                    () => dispatch(callUpdateDepartmentStatusAPI(department.depNo))
                                                        .then(() => { dispatch(callAllDepartmentsAPI()) })
                                                }
                                            />
                                        </td>
                                        <td>
                                            <Radio
                                                checked={department.status === 'Y'}
                                                onClick={
                                                    () => dispatch(callUpdateDepartmentStatusAPI(department.depNo))
                                                        .then(() => { dispatch(callAllDepartmentsAPI()) })
                                                }
                                            />
                                        </td>

                                        <td>{department.depName}</td>
                                        <td>{department.leader}</td>
                                        <td>{department.memberCount}</td>
                                        <td><button className="back-btn"
                                            style={{
                                                paddingTop: 2,
                                                margin: 0,
                                                width: '60px',
                                                height: '30px',
                                                fontSize: "15px",
                                                border: "none",
                                                backgroundColor: "lightgray"
                                            }}
                                            onClick={() => handleEditClick(department)}
                                        >수정</button></td>

                                        <td><button className="move-btn"
                                            style={{
                                                paddingTop: 2,
                                                margin: 0,
                                                width: '60px',
                                                height: '30px',
                                                fontSize: "15px",
                                            }}
                                            onClick={() => deleteDepartment(department.depNo)}
                                        >
                                            삭제</button></td>
                                    </tr>
                                ))}
                                {isEditMode &&
                                    <tr>

                                        <td></td>
                                        <td></td>
                                        <td><input style={{ border: "none", borderBottom: "1px solid black", textAlign: "center" }} type="text" name="depName" placeholder="부서명을 입력해주세요" onChange={handleInputChange} /></td>
                                        <td><input style={{ border: "none", borderBottom: "1px solid black", textAlign: "center" }} type="text" name="leader" placeholder="팀장을 입력해주세요" onChange={handleInputChange} /></td>
                                        <td><button className="back-btn"
                                            style={{
                                                paddingTop: 2,
                                                margin: 0,
                                                width: '60px',
                                                height: '30px',
                                                fontSize: "15px",
                                                border: "none",
                                                backgroundColor: "lightgray"
                                            }} onClick={cancelEdit}>취소</button></td>
                                        <td><button className="move-btn"
                                            style={{
                                                paddingTop: 2,
                                                margin: 0,
                                                width: '60px',
                                                height: '30px',
                                                fontSize: "15px",
                                            }} onClick={addDepartment}>추가</button></td>
                                    </tr>
                                }


                            </tbody>

                        </Table>

                        <Dialog open={departmentDialogOpen} onClose={onDialogClickHandler}>
                            <DialogTitle>부서명 수정</DialogTitle>
                            <DepartmentForm department={selectedDepartment} onDialogClickHandler={onDialogClickHandler} />
                        </Dialog>

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

export default Departments;