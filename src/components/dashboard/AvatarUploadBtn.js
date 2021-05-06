import React, { useState } from 'react'
import { Alert, Button, Modal } from 'rsuite';
import AvatarEditor from 'react-avatar-editor'
import { useModalState } from '../../misc/custom-hooks';


const AvatarUploadBtn = () => {

    const fileInputTypes = '.png, .jpeg, .jpg';
    const acceptedFilesTypes = ['image/png','image/jpeg','image/jpg'];
    const isValidType = (files) => {return acceptedFilesTypes.includes(files.type);}
    const [input,setInput] = useState(null);

    const {open,close,isOpen} = useModalState();

    const onFileInputChange = (ev) => {
        const curFiles = ev.target.files;
        if(curFiles.length === 1){
            const file = curFiles[0];

            if(isValidType(file)){
                setInput(file);
                open();
            }
            else {
                Alert.warning(`Inavlid file types ${file.type}`,5000);
            }

        }
    }

    return (
        <div  className="mt-3 text-center">
            <label htmlFor = "avatar-upload" className="d-block cursor-pointer padded">   
                Select an Avatar
                <input  id = "avatar-upload" type="file" className="d-none" accept={fileInputTypes} onChange={onFileInputChange}/>
            </label>
            <Modal show={isOpen} onHide={close}> 
                <Modal.Header> 
                    <Modal.Title>Adjust and upload new Avatar</Modal.Title> 
                </Modal.Header>
                <Modal.Body>
                <div className='d-flex justify-content-center align-items-center h-100'>
                {input&& <AvatarEditor
                    image={input}
                    width={200}
                    height={200}
                    border={10}
                    borderRadius={100}
                    rotate={0}
                />}  
                </div>    
                </Modal.Body>
                <Modal.Footer>
                    <Button block appearance='ghost'>Upload new Avatar</Button>    
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AvatarUploadBtn;
