const ScheduleBox = ({ dayOfWeek, schedules }) => {
    return (

        <div className="card info-card sales-card">
            <div className="card-body" style={{ width: "200px", height: "250px", overflow: "auto" }}>
                <h5 className="card-titleborder-bottom border-info pb-2">{dayOfWeek}</h5>
                <div className="d-flex flex-column">
                    {schedules.map((schedule, index) => (
                        <h6 key={index} className="card-text mb-2">- {schedule}</h6>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default ScheduleBox;