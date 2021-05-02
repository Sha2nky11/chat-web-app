import React from 'react'
import { Redirect, Route } from 'react-router';

const PrivateRoute = ({children , ...routeprop}) => {

    const profile = false;

    if(!profile){
        return <Redirect to = "/signin"/>
    }

    return (
        <Route {...routeprop}>
            {children}
        </Route>
    )
}

export default PrivateRoute;
