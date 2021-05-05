import React from 'react'
import DashboardToggle from './dashboard/DashboardToggle'
import '../styles/utility.scss'

const SideBar = () => {
    return (
        <div className ="h-100 pt-2">
            <div>
                <DashboardToggle/>
            </div>
            Bottom
        </div>
    )
}

export default SideBar;
