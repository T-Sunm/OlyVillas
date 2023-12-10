import React from 'react'
import NavigationProp from '../Header/NavigationProp'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import Modal from '../Modal/Modal'
import SearchModal from '../../pages/Search/SearchModal'

const LayoutMain = () => {
    return (
        <div>
            <NavigationProp />
            <Outlet />
            <Footer />
            <SearchModal />
        </div>
    )
}

export default LayoutMain