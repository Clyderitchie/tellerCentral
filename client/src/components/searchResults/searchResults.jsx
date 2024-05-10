import React from 'react';
import { Link } from 'react-router-dom';
import { QUERY_CLIENT } from '../../utils/queries';

import './result.css';

function SearchResults({ searchQuery, clients }) {

    const filteredClients = clients.filter(client => {
        return client.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        client.lastName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        client.tin.includes(searchQuery);
    });

    return (
        <>

            <div className="container mt-1">
                <div className="row">
                    <div id='colHeaders' className='col-10'>
                        <h4>Name</h4> <h4>Address</h4>
                    </div>
                    <div id='resultBorder' className="col-10 mt-3">
                        {filteredClients.map((client) => (
                            <Link id='returnedItems' to={`/customers/${client._id}`} key={client._id}>
                                <li id='clientName' >
                                    <h5>{client.firstName} {client.lastName}</h5>
                                </li>
                                <li id='clientAddress'>
                                    <h5>{client.address}</h5>
                                </li>
                            </Link>
                        ))}
                    </div>

                </div>
            </div>

        </>
    )
};

export default SearchResults;