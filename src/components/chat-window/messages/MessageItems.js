import React from 'react'
import TimeAgo from 'timeago-react';
import Presence from '../../Presence';
import ProfileAvatar from '../../ProfileAvatar';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';


const MessageItems = ({message}) => {

    const {author,createdAt,text} = message;

    return (
        <div className="padded mb=1">
            <div className="d-flex align-items-center font-bolder mb-1"> 
                <Presence uid = {author.uid}/>
                <ProfileAvatar src = {author.avatar} name = {author.name} className="ml-1" size= "xs" />
                <ProfileInfoBtnModal profile ={author} appearance ="link" className="p-0 ml-2 text-black" />
                <TimeAgo  datetime={createdAt}  className="font-norml text-black-45 ml-2" />
            </div>
            <div>
                <span className ="word-breal-all"> {text}</span>
            </div>
        </div>
    )
}

export default MessageItems
