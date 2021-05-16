import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router';
import { Alert, Button } from 'rsuite';
import {auth, database, storage} from '../../../misc/firebase'
import { groupBy, transformToArrWithId } from '../../../misc/helpers';
import MessageItems from './MessageItems';

const PAGE_SIZE = 15;
const messageRef = database.ref('/messages');

function shouldScrollToBottom(node ,thresold = 30) {
    const percentage = (100 * node.scrollTop) / (node.scrollHeight - node.clientHeight) || 0

    return percentage > thresold;
}

const Messages = () => {

    const {chatId} = useParams();
    const [messages , setMessages] = useState(null);
    const [limit,setLimit] = useState(PAGE_SIZE);
    const chatIsEmpty = messages && messages.length === 0;
    const canShowMessages = messages && messages.length > 0;
    const selfRef = useRef(); 

    const loadMessages = useCallback( (limitToLast) => {
        const node = selfRef.current;
        messageRef.off();
        messageRef.orderByChild('roomId').equalTo(chatId).limitToLast(limitToLast || PAGE_SIZE).on('value' , snap => {
            const data = transformToArrWithId(snap.val());
            setMessages(data);

            if(shouldScrollToBottom(node)){
                node.scrollTop = node.scrollHeight;
            }
        });
        setLimit(p => {return p + PAGE_SIZE})
        },[chatId])
 
    const loadMoreMessages = useCallback(() => {

        const node = selfRef.current;
        const oldHeight = node.scrollHeight;

        loadMessages(limit);

        setTimeout(() => {
            const newHeight = node.scrollHeight;
            node.scrollTop = newHeight - oldHeight;
        }, 3000);

    },[loadMessages,limit])   
        
    useEffect(() =>{

        const node = selfRef.current;

        loadMessages();
        
        setTimeout(() => {
            node.scrollTop = node.scrollHeight;
        },2000);

        return () => {
            messageRef.off('value');
        }

    },[loadMessages]);

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
        const messagesRef = database.ref(`/messages/${msgId}`)
        const {uid } = auth.currentUser;
        let alertMsg ;

        await messagesRef.transaction(msg => {
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

        const isLastMessage = messages[messages.length -1].id === msgId; 
        const updates = {};

        updates[`/messages/${msgId}`] = null;
        
        if(isLastMessage && messages.length > 1 ){
            updates[`rooms/${chatId}/lastMessage`] = {
                ...messages[messages.length - 2],
                msgId : messages[messages.length -2].id
            }
        }

        if(isLastMessage && messages.length === 1){
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


    } , [chatId,messages])

    const renderMessages = () => {

        const groups = groupBy(messages,(item) => {return new Date(item.createdAt).toDateString() });
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
        <ul ref={selfRef} className ="msg-list custom-scroll">
            {messages && messages.length >= PAGE_SIZE &&
             (<li className ="text-center mt-2 mb-2">
                    <Button onClick={loadMoreMessages}  color="blue">
                        LoadMore
                    </Button>    
                </li>)
                
            }
            {chatIsEmpty && <li> No messages yet</li>}
            {canShowMessages && renderMessages()}
        </ul>
    )
}

export default Messages
