import React from 'react'
import { Button, Divider, Drawer } from 'rsuite'
import { useProfile } from '../../context/profile.context'
import EditAbleInput from '../EditableInput';


const Dashboard = ({onSignOut}) => {

    const {profile} = useProfile();

    const onSave = async (newData) => {
        console.log(newData);
    }

    return (
        <>
            <Drawer.Header>
                <Drawer.Title>
                    DashBoard
                </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
                <h2>Hey , {profile.name}</h2>
                <Divider/>
                <EditAbleInput
                    name = "nickname"
                    initialValue = {profile.name}
                    onSave ={onSave}
                    label = {<h6 className="mb-2">Nickname</h6>}
                />
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
