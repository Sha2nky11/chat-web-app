import React from 'react'
import { Redirect, Route } from 'react-router';
import { Container, Loader } from 'rsuite';
import { useProfile } from '../context/profile.context';

const PublicRoute = ({children , ...routeprop}) => {

    const {profile,isLoading} = useProfile(); 

    if(isLoading && !profile){
        return(
            <Container>
                <Loader center vertical content="is Loading..." size="md" speed="slow"/>
            </Container>
        );
    }

    if(profile && !isLoading){
        return <Redirect to = "/"/>
    }

    return (
        <Route {...routeprop}>
            {children}
        </Route>
    )
}

export default PublicRoute;
