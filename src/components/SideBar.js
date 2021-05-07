import React, { useRef, useState,useEffect } from 'react'
import { Divider } from 'rsuite'
import DashboardToggle from './dashboard/DashboardToggle'
import '../styles/utility.scss'
import CreateRoomBtnModal from './CreateRoomBtnModal'
import ChatRoomList from './rooms/ChatRoomList'

const SideBar = () => {

    const topSideBarRef = useRef();
    const [height,setHeight] = useState(0);

    useEffect(() => {
        if(topSideBarRef.current){
            setHeight(topSideBarRef.current.scrollHeight)
        }
    }, [topSideBarRef])

    return (
        <div className ="h-100 pt-2">
            <div ref={topSideBarRef}>
                <DashboardToggle/>
                <CreateRoomBtnModal/>
                <Divider> Join Conversation </Divider>
                <ChatRoomList aboveElementHeight={height}/>
            </div>
            Bottom
        </div>
    )
}

export default SideBar;
