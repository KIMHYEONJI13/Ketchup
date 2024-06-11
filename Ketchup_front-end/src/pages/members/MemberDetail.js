import { useNavigate, useParams } from "react-router-dom";
import Notice from "../../components/items/notices/Notice";
import ButtonGroup from "../../components/contents/ButtonGroup";
import Member from "./Member";

function MemberDetail() {

    /* 로그인 상태 확인 */
    // const loginStatus = !!localStorage.getItem('isLogin');
    const navigate = useNavigate();
    const { memberNo } = useParams();

    return (
        <main id="main" className="main">
            <div className="title">
                <h2>사원 정보</h2>
            </div>
            <section className="section dashboard">
                <div className="row">
                    <div className="col-lg-12" style={{marginLeft: '15px'}}>
                        <ButtonGroup buttons={[{ label: '목록', styleClass: 'back', onClick: () => navigate('/members') }]} />
                    </div>
                    <div style={{ borderBottom: '0.5px solid lightgray' }} />
                    <Member selectMemberNo={memberNo} />
                </div>
            </section>
        </main>
    );
}

export default MemberDetail;