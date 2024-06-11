import UpdateNoticeForm from "../../components/form/UpdateNoticeForm";

function UpdateNotice() {

    return (
        <>
            <main id="main" className="main">
                <div className="title">
                    <h2>공지사항</h2>
                </div>
                <div className="col-lg-12">
                    <div className="list">
                        <UpdateNoticeForm />
                    </div>
                </div>
            </main>
        </>
    );
}

export default UpdateNotice;