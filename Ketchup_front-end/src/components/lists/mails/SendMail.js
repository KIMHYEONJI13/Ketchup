import { useEffect, useState } from "react";
import MailTable from "../../items/mails/MailTable";
import { useNavigate, useParams } from "react-router-dom";
import FormatDateTime from "../../contents/FormatDateTime";
import PaginationButtons from "../../contents/PaginationButtons";

function SendMail({ sendMail, checkedItems, setCheckedItems, searchParams, isLoading, setIsLoading, currentPage, setCurrentPage }) {
    const { part } = useParams();
    const [sortedMail, setSortedMail] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (sendMail?.mails) {
            const sorted = [...sendMail?.mails].sort((a, b) => new Date(b.sendMailTime) - new Date(a.sendMailTime));
            const formattedSortedMail = sorted.map(mail => ({
                ...mail,
                sendMailTime: FormatDateTime(mail.sendMailTime)
            }));
            setSortedMail(formattedSortedMail);
        }
    }, [sendMail]);

    const columns = [
        ['mailTitle', '제목'],
        ['receiverName', '수신자'],
        ['sendMailTime', '발송 일시'],
        ['sendCancelStatus', '발송 취소']
    ];

    const handleRowClick = (index) => () => {
        const mailNo = sendMail?.mails[index]?.mailNo;

        navigate(`/mails/detail/${mailNo}`, { state: { part } });
    };

    return (
        <div>
            <MailTable
                data={sortedMail}
                columns={columns}
                onRowClick={handleRowClick}
                part={part}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                searchParams={searchParams}
                currentPage={currentPage}
                pageTotal={sendMail?.pageTotal} />
            <PaginationButtons
                totalItems={sendMail?.pageTotal} 
                itemsPerPage={10} 
                currentPage={currentPage} 
                onPageChange={(pageNumber) => setCurrentPage(pageNumber)} />
        </div>
    );
}

export default SendMail;