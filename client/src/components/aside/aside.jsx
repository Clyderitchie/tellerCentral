import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_TELLER } from '../../utils/queries';
import { Link } from 'react-router-dom';

import './aside.css'

function Aside({ tellerId }) {

    const { data } = useQuery(QUERY_TELLER, {
        variables: { tellerId },
        fetchPolicy: "cache-and-network"
    });

    const teller = data?.getTeller || {};

    console.log('Aside query_teller: ', data);

    return (
        <>
            <div id="aside"  className="container">
                <div className="row">
                    <div className="col-3">
                        <h2 className="mt-1 mb-5">
                            {teller.username}
                        </h2>
                        <ul id="asideList">
                            <li className="asideItem">Customer Information</li>
                            <li className="asideItem">Accounts</li>
                            <li className="asideItem">Loans</li>
                            <li className="asideItem">Services</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )

};

export default Aside;