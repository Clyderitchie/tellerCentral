import React from "react";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { QUERY_FIRSTNAME, QUERY_LASTNAME } from '../../utils/queries';

import './searchBar.css';
import SearchResults from '../searchResults/searchResults';

function SearchBar({ tellerId }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [clients, setClients] = useState([]);
    const [getClientByFirstName, { error: firstNameError, loading: firstNameLoading, data: firstNameData }] = useLazyQuery(QUERY_FIRSTNAME);
    const [getClientByLastName, { error: lastNameError, loading: lastNameLoading, data: lastNameData }] = useLazyQuery(QUERY_LASTNAME);

    useEffect(() => {
        if (firstNameData) {
            setClients(firstNameData.getClientByFirstName || []);
        }
    }, [firstNameData]);

    useEffect(() => {
        if (lastNameData) {
            setClients(lastNameData.getClientByLastName || []);
        }
    }, [lastNameData]);

    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            // Search by first name
            getClientByFirstName({ variables: { firstName: searchQuery.trim() } });
            // Search by last name
            getClientByLastName({ variables: { lastName: searchQuery.trim() } });
        } else {
            // Clear search results if search query is empty
            setClients([]);
        }
    };

    return (
        <>
            <div id='search' className="input-group mb-3">
                <button id='searchBtn' className="btn btn-dark" type="submit" onClick={handleSearch}>Search</button>
                <input type="text" className="form-control rounded-end" placeholder="Search" aria-label="Example text with button addon" aria-describedby="button-addon1"
                    value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }} />
            </div>

            <div id='searchReturns'>
                    <SearchResults searchQuery={searchQuery} clients={clients} />
                </div>

            {/* {showSearchResults && (
               
            )} */}
        </>
    )
};

export default SearchBar;