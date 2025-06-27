import React from "react";

function SearchBar({ songSearch, searchUpdate,handleSearchSubmit }) {
    console.log('searchbar loading...' + songSearch);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearchSubmit();
    }

    return (
        <div className="searchbar">
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={songSearch}
                    onChange={searchUpdate}
                    placeholder="Search song or artist..."
                ></input>
                <button type='submit'>Search</button>
            </form>
        </div>
    );
}

export default SearchBar;