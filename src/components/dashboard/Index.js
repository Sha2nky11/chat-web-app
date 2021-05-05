import React from 'react'
import { Button, Drawer } from 'rsuite'
import { useProfile } from '../../context/profile.context'


const Dashboard = ({onSignOut}) => {

    const {profile} = useProfile();

    return (
        <>
            <Drawer.Header>
                <Drawer.Title>
                    DashBoard
                </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
                <h2>Hey , {profile.name}</h2>
            </Drawer.Body>
            <Drawer.Footer>
                <Button block color="red" onClick={onSignOut}>
                    Sign Out
                </Button>
            </Drawer.Footer>
        </>
    )
}

export default Dashboard;
