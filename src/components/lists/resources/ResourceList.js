import { useState } from "react";
import { Table } from "react-bootstrap";
import RscModal from "../../items/resources/RscModal";

function ResourceList({ list, part, selectedItems, setSelectedItems }) {
    const [modal, setModal] = useState(false);
    const [selectRscNo, setSelectRscNo] = useState(null);

    const openRscDetail = async (index) => {
        setSelectRscNo(list[index].rscNo);
        setModal(true);
    };

    const handleCheckboxChange = (index) => {
        const selectedItem = list[index].rscNo;
        if (selectedItems.includes(selectedItem)) {
            setSelectedItems(selectedItems.filter(item => item !== selectedItem));
        } else {
            setSelectedItems([...selectedItems, selectedItem]);
        }
    };

    return (
        <>
            {modal && <RscModal setModal={setModal} selectRscNo={selectRscNo} />}
            <div class="card-body">
                <Table>
                    <colgroup>
                        <col style={{ width: "7%" }} />
                        <col style={{ width: "8%" }} />
                        <col style={{ width: "17%" }} />
                        <col style={{ width: "17%" }} />
                        <col style={{ width: "17%" }} />
                        <col style={{ width: "17%" }} />
                        <col style={{ width: "17%" }} />
                    </colgroup>
                    <thead>
                        <tr style={{ textAlign: 'center' }}>
                            <th>
                            <input
                                    type="checkbox"
                                    onChange={() => {
                                        const allChecked = list.length === selectedItems.length;
                                        setSelectedItems(allChecked ? [] : list.map(item => item.rscNo));
                                    }}
                                    checked={list.length > 0 && list.length === selectedItems.length}
                                />
                            </th>
                            <th>번호</th>
                            {
                                part === 'conferences' ?
                                    (<>
                                        <th>회의실 명</th>
                                        <th>위치</th>
                                        <th>수용 가능 인원</th>
                                    </>)
                                    :
                                    (<>
                                        <th>차량</th>
                                        <th>차량 번호</th>
                                        <th>탑승 가능 인원</th>
                                    </>)
                            }
                            <th>상태</th>
                            <th>상세</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.length > 0 ? (list.map((rsc, index) =>
                            <tr key={index} className="rsc-tr">
                                <td>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleCheckboxChange(index)}
                                        checked={selectedItems.includes(rsc.rscNo)} />
                                </td>
                                <td>{rsc.rscNo}</td>
                                <td>{rsc.rscName}</td>
                                <td>{rsc.rscInfo}</td>
                                <td>{rsc.rscCap}명</td>
                                <td>{rsc.rscIsAvailable ? "사용 가능" : "사용 불가능"}</td>
                                <td>
                                    <button className="back-btn" onClick={() => openRscDetail(index)}>상세</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colspan="7">등록된 {part === 'conferences' ? "회의실" : "차량"}이 없습니다.</td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default ResourceList;