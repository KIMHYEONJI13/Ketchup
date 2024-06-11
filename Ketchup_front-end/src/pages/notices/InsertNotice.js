import InsertNoticeForm from "../../components/form/InsertNoticeForm";

function InsertNotice() {
  return (
    <main id="main" className="main">
      <div className="title">
        <h2>공지사항</h2>
      </div>
      <div className="col-lg-12">
        <div className="list">
          <InsertNoticeForm />
        </div>
      </div>
    </main>
  );
};

export default InsertNotice;