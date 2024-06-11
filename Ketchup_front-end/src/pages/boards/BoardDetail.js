import { useNavigate, useParams } from "react-router-dom";
import ButtonGroup from "../../components/contents/ButtonGroup";
import Board from "../../components/items/boards/Board";

function BoardDetail() {
    const navigate = useNavigate();
    const { boardNo } = useParams();

    return (
        <main id="main" className="main">
            <div className="title">
                <h2>자료실</h2>
            </div>
            <section className="section dashboard">
                <div className="row">
                    <div className="col-lg-12" style={{marginLeft: '15px'}}>
                        <ButtonGroup buttons={[{ label: '목록', styleClass: 'back', onClick: () => navigate('/boards') }]} />
                    </div>
                    <div style={{ borderBottom: '0.5px solid lightgray' }} />
                    <Board boardNo={boardNo} />
                </div>
            </section>
        </main>
    );
}

export default BoardDetail;