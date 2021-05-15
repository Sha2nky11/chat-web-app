import React, { useCallback, useState } from 'react'
import { Alert, Icon, Input, InputGroup } from 'rsuite'
import firebase from 'firebase/app'
import { useParams } from 'react-router'
import { useProfile } from '../../../context/profile.context'
import { database } from '../../../misc/firebase'
import AttachmentBtnModal from './AttachmentBtnModal'


function assembleMessage(profile,chatId) {
    return {
        roomId : chatId,
        author : {
            name : profile.name,
            uid : profile.uid,
            createdAt: profile.createdAt,
            ...(profile.avatar ? { avatar : profile.avatar} : {}),
        },
        createdAt : firebase.database.ServerValue.TIMESTAMP,
        likeCount : 0
     };
}

const Bottom = () => {

    const [input,setInput] = useState('');
    const {chatId} = useParams();
    const {profile} = useProfile();
    const [isloading,setIsLoading] = useState(false);

    const onInputChange = useCallback((val) => {
        setInput(val);
    },[]) 

    const onSendClick = async () => {
        if(input.trim() === 0){
            return;
        }
       const msgData = assembleMessage(profile,chatId); 
       msgData.text = input;

        const updates = {}
        const messageId = database.ref('messages').push().key

        updates[`/messages/${messageId}`] = msgData;
        updates[`/rooms/${chatId}/lastMessage`] = {
            ...msgData,
            msgId : messageId
        }

       setIsLoading(true); 
       try {
           await database.ref().update(updates);
           setInput('');
                setIsLoading(false);
       } catch (error) {
           setIsLoading(false);
           Alert.info(error.message,5000);
       }
    }

    const onKeyDown = (ev) => {
        if(ev.keyCode === 13) {
            ev.preventDefault();
            onSendClick();
        }
    }

    const afterUpload = useCallback( async (files) => {
            setIsLoading(true);

            const updates = {};

            files.forEach(async file => {
                const msgData = assembleMessage(profile,chatId); 
                msgData.file = file;
                const messageId = database.ref('messages').push().key;
                updates[`/messages/${messageId}`] = msgData;
            });
            const lastMsgId = Object.keys(updates).pop();
            updates[`/rooms/${chatId}/lastMessage`] = {
                ...updates[lastMsgId],
                msgId : lastMsgId
            };
            setIsLoading(true); 
            try {
                await database.ref().update(updates);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                Alert.info(error.message,5000);
            }
        },[chatId,profile]); 
    

    return (
        <div>
           <InputGroup>
            <AttachmentBtnModal afterUpload= {afterUpload}/>
             <Input
                 placeholder="Write a mesage here . . . . . ." 
                 value={input} onChange={onInputChange} 
                 onPressEnter={onKeyDown}/>

             <InputGroup.Button 
                appearance="primary" 
                color="blue" 
                onClick={onSendClick}  disabled={isloading}>
                 <Icon icon="send" />
             </InputGroup.Button>
           </InputGroup>
        </div>
    )
}

export default Bottom
