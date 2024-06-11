import Style from "./AppModal.module.css";
function AppAlert({alertModal, setAlertModal}){
    const onClickHandler = () => {
        setAlertModal({isOn: false});
    }
    return(
        <div className={Style.alertModal}>
            <div className={Style.alertMessage}>
                {alertModal.message}
            </div>
            <button className="move-btn" onClick={onClickHandler}>확인</button>
        </div>
    )
}
export default AppAlert;