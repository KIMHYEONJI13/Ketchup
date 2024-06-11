import '../../style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const SearchBarValue = ({ searchCondition, setSearchCondition, searchValue, setSearchValue, onSearch }) => {
    const handleChange = (e) => {
        if (e.target.name === 'searchCondition') {
            setSearchCondition(e.target.value);
        } else if (e.target.name === 'searchValue') {
            setSearchValue(e.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch();
    };

    
    return (
        <div className="search-bar mail-search">
            <form className="search-form d-flex align-items-center" onSubmit={handleSubmit}>
                <select 
                    className="form-select search-condition" 
                    name="searchCondition" 
                    value={searchCondition} 
                    onChange={handleChange}>
                    <option value="">검색 조건</option>
                    <option value="mailTitle">제목</option>
                </select>
                <input
                    type="text"
                    name="searchValue"
                    placeholder="검색어를 입력하세요"
                    value={searchValue}
                    title="Enter search keyword"
                    onChange={handleChange}
                />
                <button type="submit" title="Search">
                    <i className="bi bi-search"></i>
                </button>
            </form>
        </div>
    );
};

export default SearchBarValue;