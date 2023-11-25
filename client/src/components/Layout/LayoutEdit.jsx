import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navigation from '../Header/Navigation'
import { AppBar, Box, CssBaseline, Toolbar, Typography } from '@mui/material'
import Sidebar from '../Sidebar/Sidebar'


const LayoutEdit = () => {
    return (
        <div>

            <Box sx={{ display: "flex", height: "" }} >
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Navigation />
                </AppBar>
                <Box
                    component={"nav"}
                    sx={{
                        paddingTop: "100px",
                        width: "300px",
                        flexShrink: 0,
                    }}
                >

                    <Sidebar />
                </Box>

                <Box
                    component={"main"}
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: "calc(100% - 300px)",
                        minHeight: "90vh",
                        backgroundColor: "gray"
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </div>
    )
}

export default LayoutEdit