import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Alert } from 'rsuite';
import {auth, database, storage} from '../../../misc/firebase'
import { groupBy, transformToArrWithId } from '../../../misc/helpers';
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

    const handleAdmin =  useCallback(async (uid) => {
        const adminRef = database.ref(`/rooms/${chatId}/admins`)
        
        let alertMsg ;

        await adminRef.transaction(admins => {
            if (admins) {
                if (admins[uid]) {
                  admins[uid] = null;
                  alertMsg = 'Admin permissions removed';
                } else {
                    admins[uid] = true;
                    alertMsg = 'Admin permission granted'
             }
            }
              return admins;
         })
         Alert.info(alertMsg,5000);


    },[chatId])

    const handleLike = useCallback(async (msgId) => {
        const messageRef = database.ref(`/messages/${msgId}`)
        const {uid } = auth.currentUser;
        let alertMsg ;

        await messageRef.transaction(msg => {
            if (msg) {
                if(msg.likes && msg.likes[uid]){
                    msg.likeCount -=  1;
                    msg.likes[uid] = null;
                    alertMsg = 'Like removed'
                }
                else {
                    msg.likeCount += 1;
                    if(!msg.likes) {
                        msg.likes ={}
                    }
                msg.likes[uid] = true;
                alertMsg = 'Like added'    
                
                }

            }
              return msg;
         })
         Alert.info(alertMsg,5000);

    },[])

    const handleDelete = useCallback(async (msgId,file) => {
        
        // eslint-disable-next-line no-alert
        if(!window.confirm('Delete this message')) {
            return;
        }

        const isLastMessage = message[message.length -1].id === msgId; 
        const updates = {};

        updates[`/messages/${msgId}`] = null;
        
        if(isLastMessage && message.length > 1 ){
            updates[`rooms/${chatId}/lastMessage`] = {
                ...message[message.length - 2],
                msgId : message[message.length -2].id
            }
        }

        if(isLastMessage && message.length === 1){
            updates[`rooms/${chatId}/lastMessage`] = null
        }

        try {
            await database.ref().update(updates);
            Alert.info('Message has been deleted' , 5000);
        } catch (error) {
            // eslint-disable-next-line consistent-return
            return Alert.error(error.message , 5000);
        }
        
        if(file){
            try {
                const fileRef = storage.refFromURL(file.url);
                Alert.info('file has been deleted' , 5000);
                fileRef.delete();
            } catch (error) {
                Alert.error(error.message , 5000);
            }
        }


    } , [chatId,message])

    const renderMessages = () => {

        const groups = groupBy(message,(item) => {return new Date(item.createdAt).toDateString() });
        const items = []; 

        Object.keys(groups).forEach((date) => {
            items.push(<li key={date} className="tesxt-center mb-1 padded"> {date} </li>)
            const msgs = groups[date].map(msg => { return <MessageItems 
                            key ={msg.id} 
                            message={msg} 
                            handleAdmin={handleAdmin} 
                            handleLike={handleLike}
                            handleDelete = {handleDelete}
                            />
            });
            items.push(...msgs);
            // items.concat(msgs);
        });
        return items;
     }

    return (
        <ul className ="msg-list custom-scroll">
            {chatIsEmpty && <li> No messages yet</li>}
            {canShowMessages && renderMessages()}
        </ul>
    )
}

export default Messages
