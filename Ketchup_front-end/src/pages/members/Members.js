import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { decodeJwt } from "../../utils/tokenUtils";
import { callPageMembersAPI } from "../../apis/MemberAPICalls";
import { Table } from "react-bootstrap";
import PaginationButtons from "../../components/contents/PaginationButtons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ButtonGroup from "../../components/contents/ButtonGroup";
import SearchBar from "../../components/contents/SearchBar";



function Members() {
    const dispatch = useDispatch();
    const members = useSelector(state => state.memberReducer);
    const memberList = members?.data;
    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    const itemsPerPage = 10; // 페이지당 아이템 수
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
    const [searchKeyword, setSearchKeyword] = useState(''); // 추가
    const [loading, setLoading] = useState(true);

    const handleRowClick = (memberNo) => {



        console.log('handleRowClick [ memberNo ] : ', memberNo);

        navigate(`/members/${memberNo}`);
    };



    const navigate = useNavigate();

    const buttons = [
        { label: '등록', styleClass: 'move' },
    ];

    const handleSearch = (searchKeyword) => {
        setLoading(true);
        setSearchKeyword(searchKeyword);
        dispatch(callPageMembersAPI(currentPage, searchKeyword)).finally(() => setLoading(false));

    }

    useEffect(
        () => {
            if (token !== null) {
                setLoading(true);
                dispatch(callPageMembersAPI(currentPage, searchKeyword)).finally(() => setLoading(false));

            }

        }, [currentPage]

    );


    if (loading) {
        return <div>로딩 중...</div>;
      }



    return (

        <>

            <main id="main">


                <br></br><br></br>
                <div style={{ display: "flex", margin: -15 }}>
                    <h2 style={{marginLeft: 20}}>사원목록</h2>
                    <SearchBar onSearch={handleSearch} value={searchKeyword} name={'이름으로 검색'} />
                    
                </div>
                {token?.depName === "인사팀" &&
                    <Link to="/members/insert">
                        <ButtonGroup buttons={buttons} />
                    </Link>
                }
                <Table style={{marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>사진</th>
                            <th>부서</th>
                            <th>직급</th>
                            <th>이름</th>
                            <th>연락처</th>
                            <th>이메일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(memberList?.content) && memberList?.content?.map((member) => (
                            <tr key={member.memberNo} onClick={() => handleRowClick(member.memberNo)}>
                                <td>
                                    <img src={`/img/${member.imgUrl}`} width="30" height="30" alt="member" />
                                </td>
                                <td>{member.department.depName}</td>
                                <td>{member.position.positionName}</td>
                                <td>{member.memberName}</td>
                                <td>{member.phone}</td>
                                <td>{member.privateEmail}</td>
                            </tr>
                        ))}
                        {Array.isArray(memberList?.content) && memberList.content.length === 0 &&


                            <td colSpan={6}>
                                <h2>검색결과가 없습니다.</h2>
                                <img src="/img/searchConditionRequired.png" alt="searchConditionRequired" style={{ display: "block", margin: "0 auto", maxWidth: "100%", height: "auto" }} />
                            </td>

                        }

                    </tbody>

                </Table>
                <PaginationButtons
                    totalItems={members?.data?.totalElements}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={(pageNumber) => setCurrentPage(pageNumber)} // 페이지 변경 핸들러 전달
                />


            </main>

        </>

    );
}

export default Members;
