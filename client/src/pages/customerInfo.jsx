import React from "react";
import { useParams } from "react-router";

import Nav from '../components/nav/nav';
import Aside from '../components/aside/aside';

function CustomerInfo() {
    const { clientId } = useParams()

    console.log('CustomerInfo clientId: ', clientId);

    return (
        <>
        <Nav />
        <Aside />
            Hello {clientId}
        </>
    )
};

export default CustomerInfo;