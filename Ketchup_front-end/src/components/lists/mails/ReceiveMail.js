import { useEffect, useState } from "react";
import MailTable from "../../items/mails/MailTable";
import { useNavigate, useParams } from "react-router-dom";
import FormatDateTime from "../../contents/FormatDateTime";
import PaginationButtons from "../../contents/PaginationButtons";

function ReceiveMail({ receiveMail, checkedItems, setCheckedItems, searchParams, isLoading, setIsLoading, currentPage, setCurrentPage }) {
    const { part } = useParams();
    const [sortedMail, setSortedMail] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (receiveMail?.mails) {
            const sorted = [...receiveMail?.mails].sort((a, b) => new Date(b.sendMailTime) - new Date(a.sendMailTime));
            const formattedSortedMail = sorted.map(mail => ({
                ...mail,
                sendMailTime: FormatDateTime(mail.sendMailTime)
            }));
            setSortedMail(formattedSortedMail);
        }
    }, [receiveMail]);

    const columns = [
        ['readTime', '읽음'],
        ['mailTitle', '제목'],
        ['senderName', '발신자'],
        ['sendMailTime', '수신일시']
    ];

    const handleRowClick = (index) => async () => {
        const mailNo = receiveMail?.mails[index]?.mailNo;

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
                pageTotal={receiveMail?.pageTotal} />
            <PaginationButtons
                totalItems={receiveMail?.pageTotal} 
                itemsPerPage={10} 
                currentPage={currentPage} 
                onPageChange={(pageNumber) => setCurrentPage(pageNumber)} />
        </div>
    );
}

export default ReceiveMail;