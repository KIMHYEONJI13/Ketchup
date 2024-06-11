import Table from 'react-bootstrap/Table';
import '../../../style.css';
import '../../../pages/mails/mail.css';

const MailTable = ({ data, columns, onRowClick, part, checkedItems, setCheckedItems, isLoading, searchParams, currentPage, pageTotal }) => {
  const toggleCheckbox = (mailNo) => {
    setCheckedItems(prevState => ({
      ...prevState,
      [mailNo]: !prevState[mailNo]
    }));
  };

  const toggleAllCheckboxes = () => {
    const allChecked = data.length > 0 && data.every(item => checkedItems[item.mailNo]);
    const newCheckedItems = {};

    data.forEach((item) => {
      newCheckedItems[item.mailNo] = !allChecked;
    });

    setCheckedItems(newCheckedItems);
  };

  const getItemNumber = (index) => {
    const itemsPerPage = 10; // 한 페이지에 보여줄 아이템 수
    const startNumber = pageTotal - (currentPage - 1) * itemsPerPage;
    return startNumber - index;
  };

  return (
    <div class="card-body">
      <Table>
        <colgroup>
          <col style={{ width: "8%" }} />
          <col style={{ width: "8%" }} />
          {part === 'receive' ? (
            <>
              <col style={{ width: "8%" }} />
              <col style={{ width: "46%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
            </>
          ) : (
            <>
              <col style={{ width: "44%" }} />
              <col style={{ width: "18%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "10%" }} />
            </>
          )
          }
        </colgroup>
        <thead>
          <tr style={{ textAlign: 'center' }}>
            <th>
              <input
                type="checkbox"
                onChange={toggleAllCheckboxes}
                checked={data.length > 0 && data.every(item => checkedItems[item.mailNo])} />
            </th>
            <th>번호</th>
            {Array.isArray(columns) && columns.map(([key, label], index) => (
              <th key={index}>{label}</th>
            )
            )}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr className="mail-tr">
              <td></td>
            </tr>
          ) :
            (data.length != 0 ? (
              Array.isArray(data) && data.map((item, index) => (
                <tr key={item.mailNo} className={`${part === 'receive' ? (item.readTime !== '읽음' ? 'unreadRow' : '') : ''} mail-tr`}>
                  <td>
                    <input
                      type="checkbox"
                      checked={checkedItems[item.mailNo] || false}
                      onChange={() => toggleCheckbox(item.mailNo)} />
                  </td>
                  {/* <td>{data.length - index}</td> */}
                  <td>{getItemNumber(index)}</td>
                  {columns.map(([key], columnIndex) => (
                    <td key={columnIndex}>
                      {key === 'mailTitle' ?
                        (<span
                          className="mail-cursor ellipsis mail-title"
                          onClick={onRowClick(index)} >{item[key]}</span>)
                        : (
                          key === 'readTime' ? (
                            item[key] === '읽음' ? (
                              <i className="bi bi-envelope-open m-icon"></i>
                            ) : (
                              <i className="bi bi-envelope m-icon"></i>
                            )
                          ) : (key === 'receiverName' ?
                            (<div className="receiver-dropdown">
                            <span className="receiver-list">{item.receiverName.map(receiver => receiver.name).join(', ')}</span>
                            <div className="receiver-dropdown-content">
                              {item.receiverName.map((receiver, receiverIndex) => (
                                <div key={receiverIndex} className="receiver-li d-flex justify-content-between">
                                  <span>{receiver.name}</span>
                                  <span className={receiver.readTime === '읽음' ? null : "un-read-color"}>{receiver.readTime}</span>
                                </div>
                              ))}
                            </div>
                          </div>) : (key === 'sendCancelStatus' ? (
                              item[key] === 'Y' ? 
                                "발송 취소" : "-"
                             ) : item[key]))
                        )
                      }
                    </td>
                  ))}
                </tr>
            ))) : (
              searchParams.value ? (
                <tr className="mail-tr">
                  <td colSpan="7">
                    <p>'{searchParams.value}'에 해당하는 메일이 존재하지 않습니다.</p>
                    <img src="/img/searchConditionRequired.png" alt="검색 결과 없음" />
                  </td>
                </tr>
              ) : (
              <tr className="mail-tr">
                <td colSpan="7">
                  {part === 'receive' ? "받은 메일이 없습니다." : "보낸 메일이 없습니다."}
                </td>
              </tr>
              )
            )
            )
          }
        </tbody>
      </Table>
    </div>
  );
};

export default MailTable;