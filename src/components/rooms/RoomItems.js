import React from 'react'
import TimeAgo from 'timeago-react';

const RoomItems = ({room}) => {

    const {createdAt,name} = room; 

    return (
        <div>
            <div className="d-flex display-flex justify-content-between align-items-center" > 
                <h4 className="text-disappear"> {name} </h4>
                <TimeAgo  datetime={new Date(createdAt)}  className="font-norml text-black-45"/>
            </div>
            <div className="d-flex align-item-center text-black-70">
                No messages yet    
            </div>
        </div>
    )
}

export default RoomItems;
