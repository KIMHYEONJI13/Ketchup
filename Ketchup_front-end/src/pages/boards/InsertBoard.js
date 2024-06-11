import InsertBoardForm from "../../components/form/InsertBoardForm";

function InsertBoard() {
    return (
        <main id="main" className="main">
      <div className="title">
        <h2>자료실</h2>
      </div>
      <div className="col-lg-12">
        <div className="list">
          <InsertBoardForm />
        </div>
      </div>
    </main>
    );
}   

export default InsertBoard;