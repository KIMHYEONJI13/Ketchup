import Style from "./AppLine.module.css";


function AppLine({ appline }) {
    return (
        <div style={{overflowX: 'auto'}}>
            <table className={Style.appTable}>
                <thead>
                    <tr>
                        <th width={'133px'} style={{ minWidth: '133px'}}>구분</th>
                        {appline.map((index) => (
                            <th width={'133px'} style={{ minWidth: '133px'}}>결재자</th>
                        ))}
                        {appline.length < 8 ? <th></th> : null }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope='row'>직급</th>
                        {appline.map((item) => (
                            <td>{item.alMember.position.positionName}</td>
                        ))}
                        {appline.length < 8 ? <td></td> : null }
                    </tr>
                    <tr>
                        <th scope='row'>성명</th>
                        {appline.map((item) => (
                            <td>{item.alMember.memberName}</td>
                        ))}
                        {appline.length < 8 ? <td></td> : null }
                    </tr>
                    {('alDate' in appline[0]) ? (
                        <tr>
                            <th scope='row'>결재일자</th>
                            {appline.map((item) => (
                                <td>{item.alDate? item.alDate: '-'}</td>
                            ))}
                            {appline.length < 8 ? <td></td> : null }
                        </tr>
                    ) : null}
                </tbody>
            </table>
        </div>
    )
}

export default AppLine;