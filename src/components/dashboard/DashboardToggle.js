import React from 'react'
import { Button, Drawer, Icon } from 'rsuite'
import { useModalState } from '../../misc/custom-hooks'
import Dashboard from './Index';

const DashboardToggle = () => {

    const {isOpen,open,close} = useModalState();
    console.log(isOpen,open,close);

    return (
        <>
            <Button block color="blue" onClick={open}>
                <Icon icon="dashboard"/>
                DashBoard</Button>
             <Drawer show={isOpen} onHide={close} placement="left">
                <Dashboard/> 
            </Drawer>   
            
        </>
    )
}

export default DashboardToggle;
