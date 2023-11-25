import React, { useEffect } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation } from 'react-query'
import { createUser } from '../../utils/api'

const Layout = ({ children }) => {

  return (
    <>
      <div style={{ backgroundColor: "#DFCAC5" }}>
        <Header />
        {children}
      </div>
      <Footer />
    </>

  )
}

export default Layout