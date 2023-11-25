import React from 'react'
import NavigationProp from '../Header/NavigationProp'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

const LayoutMain = () => {
    return (
        <div>
            <NavigationProp />
            <Outlet />
            <Footer />
        </div>
    )
}

export default LayoutMain