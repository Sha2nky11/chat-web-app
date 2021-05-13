import React, { useCallback } from 'react'
import { Alert, Button, Drawer, Icon } from 'rsuite'
import { useModalState , useMediaQuery } from '../../misc/custom-hooks'
import { auth, database } from '../../misc/firebase';
import Dashboard from './Index';
import {isOfflineForDatabase} from '../../context/profile.context'

const DashboardToggle = () => {

    const {isOpen,open,close} = useModalState();
    const isMobile = useMediaQuery('(max-width: 992px)');

    const onSignOut = useCallback(() =>{
     database.ref(`/status/${auth.currentUser.uid}`).set(isOfflineForDatabase).then(() => {
            auth.signOut();
            Alert.info("Signed out Successfully ....",5000);
            close()
        }).catch(error => {
            Alert.error(error.message,5000);
        })
    },[close]);

    return (
        <>
            <Button block color="blue" onClick={open}>
                <Icon icon="dashboard"/>
                DashBoard</Button>
             <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
                <Dashboard onSignOut= {onSignOut}/> 
            </Drawer>   
            
        </>
    )
}

export default DashboardToggle;
