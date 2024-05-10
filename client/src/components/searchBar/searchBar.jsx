import React from "react";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { QUERY_FIRSTNAME, QUERY_LASTNAME, QUERY_TIN } from '../../utils/queries';

import './searchBar.css';
import SearchResults from '../searchResults/searchResults';

function SearchBar({ tellerId }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [clients, setClients] = useState([]);
    const [getClientByFirstName, { error: firstNameError, loading: firstNameLoading, data: firstNameData }] = useLazyQuery(QUERY_FIRSTNAME);
    const [getClientByLastName, { error: lastNameError, loading: lastNameLoading, data: lastNameData }] = useLazyQuery(QUERY_LASTNAME);
    const [getClientByTin, { error: tinError, loading: tinLoading, data: tinData }] = useLazyQuery(QUERY_TIN);

    useEffect(() => {
        if (firstNameData) {
            setClients(firstNameData.getClientByFirstName || []);
        }
    }, [firstNameData]);

    useEffect(() => {
        if (lastNameData) {
            setClients(clients => [...clients, ...(lastNameData.getClientByLastName || [])]);
        }
    }, [lastNameData]);

    useEffect(() => {
        if(tinData) {
            setClients(clients => [...clients, ...(tinData.getClientByTin || [])]);
        }
    }, [tinData]);

    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            // Search by first name
            getClientByFirstName({ variables: { firstName: searchQuery.trim() } });
            // Search by last name
            getClientByLastName({ variables: { lastName: searchQuery.trim() } });
            // Search by tin
            getClientByTin({ variables: { tin: searchQuery.trim() } });
        } else {
            // Clear search results if search query is empty
            setClients([]);
        }
    };

    // console.log('Search data returned: ', tinData)

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
        </>
    )
};

export default SearchBar;