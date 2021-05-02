import React from 'react'
import { Redirect, Route } from 'react-router';

const PublicRoute = ({children , ...routeprop}) => {

    const profile = false;

    if(profile){
        return <Redirect to = "/homepage"/>
    }

    return (
        <Route {...routeprop}>
            {children}
        </Route>
    )
}

export default PublicRoute;
