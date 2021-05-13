import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import {database} from '../../../misc/firebase'
import { transformToArrWithId } from '../../../misc/helpers';
import MessageItems from './MessageItems';

const Messages = () => {

    const {chatId} = useParams();
    const [message , setMessage] = useState(null);
    const chatIsEmpty = message && message.length === 0;
    const canShowMessages = message && message.length > 0;
 
    useEffect(() =>{
        const messageRef = database.ref('/messages');
        messageRef.orderByChild('roomId').equalTo(chatId).on('value' , snap => {
            const data = transformToArrWithId(snap.val());
            setMessage(data);
        });

        return () => {
            messageRef.off('value');
        }

    },[chatId]);

    return (
        <ul className ="msg-list custom-scroll">
            {chatIsEmpty && <li> No messages yet</li>}
            {canShowMessages && message.map(msg => {
                return <MessageItems key ={msg.id} message={msg}/>
            })}
        </ul>
    )
}

export default Messages
