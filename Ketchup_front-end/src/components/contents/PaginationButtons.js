import '../../style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const PaginationButtons = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handleClick = (pageNumber) => {
        onPageChange(pageNumber);
    };

    return (
        <div id="paging-btn">
            {totalItems > 0 && (
                <>
                    <button
                        onClick={() => handleClick(1)} disabled={currentPage === 1}
                    >
                        &lt;&lt;
                    </button>
                    <button
                        onClick={() => handleClick(currentPage > 1 ? currentPage - 1 : 1)} disabled={currentPage === 1}
                    >
                        &lt;
                    </button>
                </>
            )}
            <div>
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => handleClick(number)}
                        className={currentPage === number ? "selected" : ""}
                    >
                        {number}
                    </button>
                ))}
            </div>
            {totalItems > 0 && (
                <>
                    <button
                        onClick={() => handleClick(currentPage < totalPages ? currentPage + 1 : totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        &gt;
                    </button>
                    <button
                        onClick={() => handleClick(totalPages)} disabled={currentPage === totalPages}
                    >
                        &gt;&gt;
                    </button>
                </>
            )}
        </div>
    );
};

export default PaginationButtons;
