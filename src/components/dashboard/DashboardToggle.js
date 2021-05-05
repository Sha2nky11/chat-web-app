import React, { useCallback } from 'react'
import { Alert, Button, Drawer, Icon } from 'rsuite'
import { useModalState , useMediaQuery } from '../../misc/custom-hooks'
import { auth } from '../../misc/firebase';
import Dashboard from './Index';

const DashboardToggle = () => {

    const {isOpen,open,close} = useModalState();
    const isMobile = useMediaQuery('(max-width: 992px)');

    const onSignOut = useCallback(() =>{
        auth.signOut();
        Alert.info("Signed out Successfully ....",5000);
        close();
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
