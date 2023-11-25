import React from 'react'
import Navigation from '../Header/Navigation'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

const Layout2 = () => {
    return (
        <div>
            <Navigation />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout2