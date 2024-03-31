import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_TELLER } from '../utils/queries';

import Auth from '../utils/auth';
import Nav from '../components/nav/nav';
import Aside from '../components/aside/aside';

function Home() {
    const tellerId = Auth.getProfile().data._id;
    console.log("Home data: ", tellerId)
    return (
        <>
            <Nav/>
            <Aside tellerId={tellerId}/>
        </>
    )
}

export default Home;