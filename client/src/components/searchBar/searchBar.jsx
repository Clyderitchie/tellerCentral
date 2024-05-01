import React from "react";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CLIENT } from '../../utils/queries';

import './searchBar.css';
import SearchResults from '../searchResults/searchResults';

function SearchBar({ tellerId }) {

    const [searchInput, setSearchInput] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [clients, setClients] = useState([]);

    // const [searchClient, { loading, data, error }] = useLazyQuery(QUERY_CLIENT);
    const [searchClient, { loading, data, error }] = useLazyQuery(QUERY_CLIENT, {
        onCompleted: (data) => {
            setClients(data?.getClient || []); // Update clients state with new search results
            setShowSearchResults(true); // Show search results
        },
    });

    const handleSearch = (event) => {
        const input = event.target.value;
        setSearchInput(input);
        searchClient({ variables: { searchInput: input }, fetchPolicy: 'cache-and-network' });
    };

    useEffect(() => {
        // Show search results only if there are clients
        setShowSearchResults(clients.length > 0);
    }, [clients]);

    useEffect(() => {
        // Reset search results when searchInput changes (new search) or page refreshes
        setClients([]);
        setShowSearchResults(false);
    }, [searchInput]);

    // const clients = data?.getClient || [];
    // useEffect(() => { }, [clients]);

    // const handleSearch = (event) => {
    //     setSearchInput(event.target.value)
    //     searchClient({ variables: { searchInput: searchInput }, fetchPolicy: 'cache-and-network' });
    //     setShowSearchResults(true);
    // };


    console.log('Search data:', clients);

    return (
        <>
            <div id='search' className="input-group mb-3">
                <button id='searchBtn' className="btn btn-dark" type="submit" onClick={handleSearch}>Search</button>
                <input type="text" className="form-control rounded-end" placeholder="Search" aria-label="Example text with button addon" aria-describedby="button-addon1"
                    value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }} />
            </div>

            {showSearchResults && (
                <div id='searchReturns'>
                    <SearchResults searchInput={searchInput} clients={clients} />
                </div>
            )}
        </>
    )
};

export default SearchBar;