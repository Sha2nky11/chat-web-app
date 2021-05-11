import React, { useCallback, useState } from 'react'
import { Alert, Icon, Input, InputGroup } from 'rsuite'
import firebase from 'firebase/app'
import { useParams } from 'react-router'
import { useProfile } from '../../../context/profile.context'
import { database } from '../../../misc/firebase'


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
        const messageId = (await database.ref('messages').push()).key

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

    return (
        <div>
           <InputGroup>
             <Input placeholder="Write a mesage here . . . . . ." value={input} onChange={onInputChange} onPressEnter={onKeyDown}/>
             <InputGroup.Button appearance="primary" color="blue" onClick={onSendClick}  disabled={isloading}>
                 <Icon icon="send" />
             </InputGroup.Button>
             <Icon />
           </InputGroup>
        </div>
    )
}

export default Bottom
