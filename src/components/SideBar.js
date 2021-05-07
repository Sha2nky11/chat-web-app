import React from 'react'
import DashboardToggle from './dashboard/DashboardToggle'
import '../styles/utility.scss'
import CreateRoomBtnModal from './CreateRoomBtnModal'

const SideBar = () => {
    return (
        <div className ="h-100 pt-2">
            <div>
                <DashboardToggle/>
                <CreateRoomBtnModal/>
            </div>
            Bottom
        </div>
    )
}

export default SideBar;
