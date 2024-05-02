import React from "react";
import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useLazyQuery } from '@apollo/client';
import { QUERY_CLIENT } from '../utils/queries';

import './customerPage.css';

import Nav from '../components/nav/nav';
import Aside from '../components/aside/aside';

function CustomerInfo() {
    const { clientId } = useParams();
    const [clients, setClients] = useState([]);

    const [getClient, { loading, data, error }] = useLazyQuery(QUERY_CLIENT, {
        variables: { clientId },
        onCompleted: (data) => {
            setClients(data.getClient);
        },
    });

    useEffect(() => {
        getClient();
    }, [clientId])

    console.log('CustomerInfo clientId: ', data);

    return (
        <>
            <Nav />
            <Aside />
            <div id='clientInfo'>
                <h1 id='customerInfo'>Customer Information</h1>
                {clients.map(client => (
                    <div key={client._id}>
                        <div id='clientPersonalInfo'>
                            <p>Name: {client.firstName} {client.lastName}</p>
                            <p>Birthday: </p>
                            <p>Address: {client.address}</p>
                            <p>Phone number: {client.phoneNumber} </p>
                            <p>SSN/TIN: {client.tin}</p>
                        </div>
                        <div id='clientAccounts'>
                            <p>Accounts:</p>
                            {client.accounts.map(account => (
                                <ul id='accountInfo'>
                                    <li key={account._id}>
                                        Account Type: {account.accountType}
                                    </li>
                                    <li key={account._id}>
                                        Account balance: {account.balance}
                                    </li>
                                </ul>
                            ))}
                        </div>
                        <div id='loanInfo'>
                            <p>Loans:</p>
                            {client.loans.map(loan => (
                                <ul id='loanAccount'>
                                    <li key={loan._id}>
                                        Loan Type:
                                    </li>
                                </ul>
                            ))}
                        </div>
                        <div id='serviceInfo' >
                            <p>Services</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
};

export default CustomerInfo;