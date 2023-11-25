import { Drawer, List, Stack, Toolbar } from '@mui/material'
import React from 'react'

const Sidebar = () => {
    return (
        <Drawer
            variant='permanent'
            sx={{
                width: '300px',
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: "300px", boxSizing: 'border-box' }
            }}
        >
            <Toolbar />
            <Toolbar />
            <List disablePadding>
                <Toolbar>
                    <Stack sx={{ width: "100%" }}
                        direction={"row"}
                        justifyContent={"center"}
                    >
                        <span>Title</span>
                    </Stack>
                </Toolbar>

            </List>
        </Drawer>

    )
}

export default Sidebar