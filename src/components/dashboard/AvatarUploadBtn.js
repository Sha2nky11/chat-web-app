import React, { useState, useRef } from 'react'
import { Alert, Button, Modal } from 'rsuite';
import AvatarEditor from 'react-avatar-editor'
import { useModalState } from '../../misc/custom-hooks';
import { database, storage } from '../../misc/firebase';
import { useProfile } from '../../context/profile.context';
import ProfileAvatar from '../ProfileAvatar';
import '../../styles/main.scss'
import {getUserUpdates} from '../../misc/helpers'


const AvatarUploadBtn = () => {

    const fileInputTypes = '.png, .jpeg, .jpg';
    const acceptedFilesTypes = ['image/png','image/jpeg','image/jpg'];
    const isValidType = (files) => {return acceptedFilesTypes.includes(files.type);}
    const [img,setImg] = useState(null);
    const [isLoading,setisLoading] = useState(false);
    const {profile} = useProfile();
    const {open,close,isOpen} = useModalState();
    const avatarEditorRef = useRef();

    const getBlob = (canvas) => {
        return new Promise((resolve,reject) => {
            canvas.toBlob(blob => {
                if(blob){
                    resolve(blob);
                }
                else{
                    reject(new Error('File Processing Error'));
                }
            } );
        })
    }

    const onFileInputChange = (ev) => {
        const curFiles = ev.target.files;
        if(curFiles.length === 1){
            const file = curFiles[0];

            if(isValidType(file)){
                setImg(file);
                open();
            }
            else {
                Alert.warning(`Inavlid file types ${file.type}`,5000);
            }

        }
    }

    const onUploadClick = async () => {
        setisLoading(true);
        const canvas = avatarEditorRef.current.getImageScaledToCanvas();
        try {
            const blob = await getBlob(canvas);
            const avatarFileRef = storage.ref(`profiles/${profile.uid}`).child('avatar');
            const avatarUploadResult = await avatarFileRef.put(blob,{
                cacheControl:`public,max-age=${3600*24*3}`  
            });
            const downloadUrl = await avatarUploadResult.ref.getDownloadURL();
            const updates =  await getUserUpdates(profile.uid,'avatar',downloadUrl,database);
            await database.ref().update(updates);
            setisLoading(false);
            Alert.success('Avatar has been upoaded',5000);
            
        } catch ( err) {
            setisLoading(false);
            Alert.error(err.message,5000);
        }
        
    }

    return (
        <div  className="mt-3 text-center">
            <ProfileAvatar src = {profile.avatar} name = {profile.name} className="width-200 height-200 font-huge img-fullsize"/>
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
                {img && <AvatarEditor
                    ref={avatarEditorRef}
                    image={img}
                    width={200}
                    height={200}
                    border={10}
                    borderRadius={100}
                    rotate={0}
                />}  
                </div>    
                </Modal.Body>
                <Modal.Footer>
                    <Button block appearance='ghost' onClick={onUploadClick} disabled={isLoading}>Upload new Avatar</Button>    
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AvatarUploadBtn;
