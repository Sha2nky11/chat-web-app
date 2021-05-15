import React, { useState } from 'react'
import { useParams } from 'react-router';
import { Alert, Button, Icon, Modal, Uploader } from 'rsuite'
import InputGroupButton from 'rsuite/lib/InputGroup/InputGroupButton'
import { useModalState } from '../../../misc/custom-hooks';
import { storage } from '../../../misc/firebase';

const MAX_FILES_SIZE = 1000 * 1024 * 5 ;

const AttachMentBtnModal = ({afterUpload}) => {

    const {isOpen,open,close} = useModalState();
    const [filesList, setFilesList] = useState([]);
    const [isLoading , setIsLoading] = useState(false);
    const {chatId} = useParams();

    const  onChange = (filesArr) => {
        const filtered = filesArr.filter(el => {return el.blobFile.size <= MAX_FILES_SIZE}).slice(0,5);
        setFilesList(filtered);
    }

    const onUpload =  async () => {
        try {
            const uploadPromises = filesList.map((f) => {
                return storage.ref(`/chat/${chatId}`)
                .child(Date.now() + f.name)
                .put(f.blobFile ,{ cacheControl : `public,max-age = ${3600*24*3}`,}) ;
            })

            const uploadSnapshots = Promise.all(uploadPromises);

            const shapePromises = (await uploadSnapshots).map(async snap => {
                return {
                    contentType : snap.metadata.contentType,
                    name : snap.metadata.name,
                    url : await snap.ref.getDownloadURL()
                }
            })

            const files = await Promise.all(shapePromises);
            console.log(files);
            await afterUpload(files);
            setIsLoading(false);
            close();

        } catch (error) {
            setIsLoading(false);
            Alert.error(error.message , 5000);
        }
    }

    return (
        <>
           <InputGroupButton onClick={open}>
                <Icon icon="attachment" />
           </InputGroupButton>
            <Modal show={isOpen} onHide={close}>
                <Modal.Header>
                    <Modal.Title> Upload files </Modal.Title>    
                </Modal.Header>
                <Modal.Body> 
                    <Uploader
                        autoUpload={false}
                        fileList= {filesList}
                        action=""
                        onChange={onChange}
                        multiple
                        listType="picture-text"
                        className = "w-100"
                        disabled = {isLoading}
                    />
                    
                     </Modal.Body>
                <Modal.Footer> 
                    <Button block disabled={isLoading} onClick={onUpload} >
                      Upload
                    </Button>
                    <div className="text-right mt-2">
                    <small> * only files have less than 5 mb are allowed</small>
                    </div>

                </Modal.Footer>
            </Modal>

        </>
    )
}

export default AttachMentBtnModal
