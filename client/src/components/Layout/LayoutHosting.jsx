import React from 'react'
import Headerhosting from '../Header/Headerhosting'
import { Outlet } from 'react-router-dom'

const LayoutHosting = () => {
    return (
        <div>
            <Headerhosting />
            <Outlet />
        </div>
    )
}

export default LayoutHosting