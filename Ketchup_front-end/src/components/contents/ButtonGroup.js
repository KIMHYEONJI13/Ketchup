import '../../style.css';

const ButtonGroup = ({ buttons }) => {
    return (
        <div className="btn-group float-right">
            {buttons.map((button, index) => (
                <button type="button" className={`${button.styleClass}-btn`} key={index} onClick={button.onClick} disabled={button.styleClass === 'disable'}>{button.label}</button>
            ))}
        </div>
    );
};
export default ButtonGroup;