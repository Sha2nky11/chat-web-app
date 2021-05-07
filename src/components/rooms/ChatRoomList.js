import React from 'react'
import { Nav } from 'rsuite'
import RoomItems from './RoomItems'

const ChatRoomList = ({aboveElemntHeight}) => {
    return (
        <Nav 
            appearance 
            vertical 
            reversed 
            className ="overflow-y-scroll custom-scroll"
            style={{
                height:`calc(100% - ${aboveElemntHeight}px)`
            }}
            >
            <Nav.Item>
               <RoomItems/> 
            </Nav.Item>
        </Nav>
    )
}

export default ChatRoomList;
