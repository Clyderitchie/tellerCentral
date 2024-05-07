import React from "react";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { QUERY_FIRSTNAME, QUERY_LASTNAME } from '../../utils/queries';

import './searchBar.css';
import SearchResults from '../searchResults/searchResults';

function SearchBar({ tellerId }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [getClientByFirstName, { error, loading, data }] = useLazyQuery(QUERY_FIRSTNAME)
    const clients = data?.getClientByFirstName || [];
    console.log('Search Bar data: ', clients);

    if (loading) {
        return <div>Loading...</div>
    }

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        getClientByFirstName({ variables: { firstName: searchQuery } })
    };

    return (
        <>
            <div id='search' className="input-group mb-3">
                <button id='searchBtn' className="btn btn-dark" type="submit" onClick={handleSearch}>Search</button>
                <input type="text" className="form-control rounded-end" placeholder="Search" aria-label="Example text with button addon" aria-describedby="button-addon1"
                    value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }} />
            </div>

            {/* {showSearchResults && (
                <div id='searchReturns'>
                    <SearchResults searchQuery={searchQuery} clients={clients} />
                </div>
            )} */}
        </>
    )
};

export default SearchBar;