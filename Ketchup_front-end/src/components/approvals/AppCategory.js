import { useEffect, useState } from 'react';
import AppCatCss from './AppCategory.module.css';
import { callGetApprovalCountAPI } from '../../apis/ApprovalAPICalls';
import { decodeJwt } from "../../utils/tokenUtils";

function AppCategory({ category, setCategory, setCurrentPage, setStatus, setSearch, appList}) {
    const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));
    const [approvalCount, setApprovalCount] = useState();
    const approvalData = [
        { title: "진행중인 문서", count: approvalCount?.myApp, categoryNo: 1 },
        { title: "완료된 문서", count: approvalCount?.doneApp, categoryNo: 2 },
        { title: "결재 대기 문서", count: approvalCount?.receiveApp, categoryNo: 3 },
        { title: "수신 참조 문서", count: approvalCount?.refApp, categoryNo: 4 }
    ];

    useEffect(() => {
        const categoryCount = async () => {
            try {
                const result = await callGetApprovalCountAPI(loginToken.memberNo);
                if (result.status === 200) {
                    setApprovalCount(result.data);
                } else {
                    console.log('실패');
                }
            } catch (error) {
                console.error('데이터 가져오기 실패:', error);
            }
        };
        categoryCount();
    }, [appList]);

    const onClickHandler = (categoryNo) => {
        setCategory(categoryNo);
        setCurrentPage(1);
        setStatus('전체');
        setSearch('');
    }

    return (
        <div className={AppCatCss.appCategory}>
            {approvalData.map(({ title, count, categoryNo }) => (
                <div className={category == categoryNo ? AppCatCss.selectedCategoryBox : AppCatCss.categoryBox}
                    onClick={() => onClickHandler(categoryNo)} key={categoryNo}>
                    <h5 className={AppCatCss.title}>{title}</h5>
                    <div className={AppCatCss.count}>
                        <h3>{count}</h3>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AppCategory;