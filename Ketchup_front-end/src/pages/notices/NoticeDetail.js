import { useNavigate, useParams } from "react-router-dom";
import Notice from "../../components/items/notices/Notice";
import ButtonGroup from "../../components/contents/ButtonGroup";

function NoticeDetail() {
    const navigate = useNavigate();
    const { noticeNo } = useParams();

    return (
        <main id="main" className="main">
            <div className="title">
                <h2>공지사항</h2>
            </div>
            <section className="section dashboard">
                <div className="row">
                    <div className="col-lg-12" style={{marginLeft: '15px'}}>
                        <ButtonGroup buttons={[{ label: '목록', styleClass: 'back', onClick: () => navigate('/notices') }]} />
                    </div>
                    <div style={{ borderBottom: '0.5px solid lightgray' }} />
                    <Notice noticeNo={noticeNo} />
                </div>
            </section>
        </main>
    );
}

export default NoticeDetail;