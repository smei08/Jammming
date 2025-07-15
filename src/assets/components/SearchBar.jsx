import React from "react";

function SearchBar({ songSearch, searchUpdate,handleSearchResult }) {
    console.log('searchbar loading...' + songSearch);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearchResult();
    }

    return (
        <div className="searchbar">
            <form onSubmit={handleSubmit}>
                <input
                    className="input"
                    type='text'
                    value={songSearch}
                    onChange={searchUpdate}
                    placeholder="Search song or artist..."
                ></input>
                <button className="searchbutt" type='submit'>Search</button>
            </form>
        </div>
    );
}

export default SearchBar;