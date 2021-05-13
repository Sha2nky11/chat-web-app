import React from 'react'
import {Button, Modal} from 'rsuite'
import { useModalState } from '../../../misc/custom-hooks';
import ProfileAvatar from '../../ProfileAvatar';

const ProfileInfoBtnModal = ({profile,...btnprops}) => {

    const shortName = profile.name.split(' ')[0];
    const {isOpen,close,open} = useModalState();
    const {name,avatar,createdAt} = profile;
    const joinedAt = new Date(createdAt).toLocaleDateString() ;

    return (
        <>
            <Button {...btnprops} onClick={open}>
                {shortName}
            </Button >
            <Modal show={isOpen} onHide={close}>
                <Modal.Header> 
                    <Modal.Title>{shortName} profile </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center"> 
                
                <ProfileAvatar src = {avatar} name={name} className="width-200 height-200 font-huge img-fullsize"/>
                <h4 className="mt-2"> {name} </h4>
                <p> member since {joinedAt}</p>
                </Modal.Body>
                <Modal.Footer> 
                    <Button block onClick={close}> 
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ProfileInfoBtnModal
