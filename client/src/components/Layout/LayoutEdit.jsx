import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navigation from '../Header/Navigation'
import Sidebar from '../Sidebar/Sidebar'


const LayoutEdit = () => {

    return (
        <div>
            <Navigation />
            <div className='flex px-[80px]'>
                <div className='w-[30%]'>
                    <Sidebar />
                </div>
                <div className='w-[70%] mt-[2rem] px-[80px]'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default LayoutEdit