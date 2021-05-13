import React from 'react'
import TimeAgo from 'timeago-react';
import ProfileAvatar from '../../ProfileAvatar';


const MessageItems = ({message}) => {

    const {author,createdAt,text} = message;

    return (
        <div className="padded mb=1">
            <div className="d-flex align-items-center font-bolder mb-1"> 
                <ProfileAvatar src = {author.avatar} name = {author.name} className="m1-1" size= "xs" />
                <span className="ml-1">{author.name} </span>
                <TimeAgo  datetime={createdAt}  className="font-norml text-black-45 ml-2" />
            </div>
            <div>
                <span className ="word-breal-all"> {text}</span>
            </div>
        </div>
    )
}

export default MessageItems
