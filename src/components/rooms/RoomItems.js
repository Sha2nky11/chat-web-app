import React from 'react'
import TimeAgo from 'timeago-react';
import ProfileAvatar from '../ProfileAvatar';

const RoomItems = ({room}) => {

    const {lastMessage,createdAt,name} = room; 

    return (
        <div>
            <div className="d-flex display-flex justify-content-between align-items-center" > 
                <h4 className="text-disappear"> {name} </h4>
                <TimeAgo  datetime={lastMessage ? new Date(lastMessage.createdAt) : new Date(createdAt)}  className="font-norml text-black-45"/>
            </div>

            <div className="d-flex align-item-center text-black-70">
            
            {lastMessage ? 
                <> 
                    <div className="d-flex align-items-center ">
                        <ProfileAvatar src ={lastMessage.author.avatar} name={lastMessage.author.name} size="sm"/>    
                    </div>
                    <div className="ml-2">
                        <div className="italic"> {lastMessage.author.name} </div>
                        <span> {lastMessage.text} </span>
                     </div>   
                </>
                :<span> No messages yet </span> }
                  
            </div>
        </div>
    )
}

export default RoomItems;
