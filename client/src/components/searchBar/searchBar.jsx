import React from "react";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CLIENT } from '../../utils/queries';

import './searchBar.css';

function SearchBar({ tellerId }) {

    const [searchInput, setSearchInput] = useState('');
    const [searchClient, { loading, data, error }] = useLazyQuery(QUERY_CLIENT);
    const clients = data?.getClient || {};
    useEffect(() => { }, [clients]);

    // const handleChange = (event) => {
    //     setSearchInput(event.target.value);
    // };

    const handleSearch = (event) => {
        setSearchInput(event.target.value)
        searchClient({ variables: { searchInput: searchInput }, fetchPolicy: 'cache-and-network' });
    };

    console.log('Search data:', clients);

    return (
        <>
            <div id='search' className="input-group mb-3">
                <button id='searchBtn' className="btn btn-dark" type="submit" onClick={handleSearch}>Search</button>
                <input type="text" className="form-control rounded-end" placeholder="Search" aria-label="Example text with button addon" aria-describedby="button-addon1" value={searchInput} onChange={(e) => {setSearchInput(e.target.value)}} />
            </div>

        </>
    )
};

export default SearchBar;