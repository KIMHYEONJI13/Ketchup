import Style from "./AppLine.module.css";

function RefLine({refline}){
    return(
        <div style={{overflowX: 'auto'}}>
            <table className={Style.appTable} >
                <thead>
                    <tr>
                        <th scope='col' width={'133px'} style={{minWidth: '133px', width: '133px'}}>구분</th>
                        {refline.map((index) => (
                            <th width={'133px'} style={{ minWidth: '133px'}}>참조자</th>
                        ))}
                        {refline.length < 8 ? <th></th> : null }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope='row'>성명</th>
                        {refline.map((item) => (
                            <td>{item.refMember.memberName}</td>
                        ))}
                        {refline.length < 8 ? <td></td> : null }
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default RefLine;