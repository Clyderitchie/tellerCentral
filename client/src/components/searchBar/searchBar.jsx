import React from "react";


import './searchBar.css';

function SearchBar({ tellerId }) {

    return (
        <>

            <div id='search' className="input-group mb-3">
                <input id="searchBar" type="text" className="form-control" aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default" placeholder='Search' />
                <div id='searchBtn' className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Search
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Name</a></li>
                        <li><a className="dropdown-item" href="#">Acct</a></li>
                        <li><a className="dropdown-item" href="#">DC</a></li>
                        <li><a className="dropdown-item" href="#">TIN</a></li>
                        <li><a className="dropdown-item" href="#">Phone number</a></li>
                        <li><a className="dropdown-item" href="#">Address</a></li>
                        <li><a className="dropdown-item" href="#">Cust. Number</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
};

export default SearchBar;