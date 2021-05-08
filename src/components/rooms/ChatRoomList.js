import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Loader, Nav } from 'rsuite'
import { useRooms } from '../../context/rooms.context'
import RoomItems from './RoomItems'

const ChatRoomList = ({aboveElemntHeight}) => {

    const rooms = useRooms();
    const location = useLocation();

    return (
        <Nav  
            appearance='default'
            vertical 
            reversed 
            activeKey={location.pathname}
            className ="overflow-y-scroll custom-scroll"
            style={{
                height:`calc(100% - ${aboveElemntHeight}px)`
            }}
            >
            {!rooms && <Loader center vertical content="Loading...." speed="normal" size="md" />}
            {rooms && 
             rooms.map(room => {return (
                <Nav.Item componentClass={Link} to={`/chat/${room.id}`} key={room.id} eventKey={`/chat/${room.id}`}>
                <RoomItems room = {room}/> 
             </Nav.Item>
             )})}
            
        </Nav>
    )
}

export default ChatRoomList;
