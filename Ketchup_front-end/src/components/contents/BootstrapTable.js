import Table from 'react-bootstrap/Table';
import '../../style.css';


const BootstrapTable = ({ data, columns, onRowClick }) => {
  
  return (
    <div className="card-body">
    <Table className="table">
        <thead>
            <tr style={{ textAlign: 'center' }}>
            {columns.map(([key, label], index) => (
                <th scope='col' style={label === '제목' ? { width: '60%', padding: "10px" } : { padding: "10px" }} key={index}>{label}</th>
            ))}
            </tr>
        </thead>
        <tbody>
        {Array.isArray(data) && data.map((item, index) => (
            <tr key={index} onClick={() => onRowClick(index)} style={{ cursor: 'pointer' }}>
            {columns.map(([key, label], columnIndex) => (
              <td className={label === '제목' ? 'title-cell' : ''}  style={{ textAlign: label === '제목' ? 'left' : 'center' , padding: label === '제목' ? '15px 80px' : '15px'}} key={columnIndex}>
                {key === 'boardNo' ? data.length - index : item[key]}
              </td>
            ))}
          </tr>
            ))}
        </tbody>
    </Table>
    </div>
  );
};

export default BootstrapTable;