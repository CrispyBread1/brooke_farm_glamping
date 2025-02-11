import React from 'react';

const SearchBar = ({updateSearchValue}) => {
    
    return (
      
      <div className="searchbar-div">
        <input type="search" id="searchbar" className="search" maxLength={100} onChange={e => updateSearchValue(e.target.value)} />
            <label htmlFor="searchbar"> Search by Name or Reference</label>
      </div>
    )

};

export default SearchBar