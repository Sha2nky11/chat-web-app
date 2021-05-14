import React ,{memo} from 'react'
import { useParams } from 'react-router';
import { Alert, Button, Drawer } from 'rsuite'
import { useCurrentRoom } from '../../../context/current-room.context';
import { useMediaQuery, useModalState } from '../../../misc/custom-hooks'
import { database } from '../../../misc/firebase';
import EditAbleInput from '../../EditableInput';

const EditRoomBtnModal = () => {

    const {isOpen,open,close} = useModalState();
    const name = useCurrentRoom(v => {return v.name});
    const description = useCurrentRoom(v => {return v.description});
    const {chatId} = useParams();
    const isMobile = useMediaQuery('(max-width : 992px)');

    const updateData = (key ,value) => {
        database.ref(`rooms/${chatId}`).child(key).set(value).then(() => {
            Alert.success("Successfully Updated", 5000);
        }).catch(error => {
            Alert.error(error.message , 5000);
        })
    }

    const onNameSave = (newName) => {
        updateData('name' , newName);
    } 

    const onDescriptionSave = (newDesc) => {
        updateData('description' , newDesc);
    }

    return (
        <div>
            <Button className="br-circle" size="sm" color="red" onClick={open} >
                A
            </Button>
            <Drawer full={isMobile} show={isOpen} onHide={close} placement="right">
                <Drawer.Header>
                    <Drawer.Title> Edit Room </Drawer.Title>    
                </Drawer.Header>
                <Drawer.Body>
                    <EditAbleInput
                        initialValue = {name}
                        onSave = {onNameSave }
                        label = {<h6 className ="mb-2"> Name </h6>}
                        emptyMsg = "Name cannot be empty"
                        
                    />  
                    <EditAbleInput
                        componentClass = "textarea"
                        rows = {5}
                        initialValue ={description}
                        onSave = {onDescriptionSave}
                        label =  {<h6 className ="mb-2"> Description  </h6>}
                        emptyMsg = "Description cannot be empty"
                        wrapperClassName = "mt-3"
                        
                    />  
                </Drawer.Body>
                <Drawer.Footer>
                    <Button block onClick={close}> Close </Button>
                </Drawer.Footer>
            </Drawer>
        </div>
    )
}

export default memo(EditRoomBtnModal);
