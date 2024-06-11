import Style from "./AppModal.module.css";
function AppConfirm({confirmModal, setConfirmModal}){
    const onClickCancelHandler = () => {
        setConfirmModal({result: false, isOn: false});
    }
    const onClickOkHandler = () => {
        setConfirmModal({result: true, isOn: false});
    }
    return(
        <div className={Style.confirmModal}>
            <div className={Style.confirmMessage}>
                {confirmModal.message}
            </div>
            <div className={Style.confirmModalBtn}>
                <button className="back-btn" onClick={onClickCancelHandler}>취소</button>
                <button className="move-btn" onClick={onClickOkHandler}>확인</button>
            </div>
        </div>
    )
}
export default AppConfirm;