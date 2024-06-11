import { useState } from 'react';
import '../../style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const SearchBar = ({ onSearch, name }) => {
    const [searchValue, setSearchValue] = useState('');
    
    const handleChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // 검색어가 변경될 때 onSearch 함수를 호출하여 검색어를 전달합니다.
        onSearch(searchValue);
        setSearchValue('');
    };

    return (
        <div className="search-bar">
            <form className="search-form d-flex align-items-center" onSubmit={handleSubmit}>
                <input type="text" name="query" placeholder={name} title="Enter search keyword" onChange={handleChange} />
                <button type="submit" title="Search"><i className="bi bi-search"></i></button>
            </form>
        </div>
    );
};
export default SearchBar;