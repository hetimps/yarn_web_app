import { Avatar, Badge, Box, IconButton,  Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import "../../style/Quality/Drawer_Navbar.scss"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useNavigate } from 'react-router';
import LogoutIcon from '@mui/icons-material/Logout';
import Dialogs from './Dialogs';
import { String } from '../../constants/String';
import { AppBar } from './Comon_Component';


export default function AppBars({ haddings }) {
    const navigate = useNavigate();
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const handleLogout = () => {
        navigate('/Phonno');
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        
    };

    // dialog
    const handleOpenConfirmation = () => {
        setOpenConfirmation(true);
    };
    const handleCloseConfirmation = () => {
        setOpenConfirmation(false);
    };
    
    const UserName = JSON.parse(localStorage.getItem("username"))
    return (
        <>
            <AppBar position="fixed" open={true} className='appbar'>

                <Toolbar className='appbar_toolbar'>

                    <Box className="appbar_hading_box" >
                        <Typography variant="p" noWrap component="p" className='appbar_heading'>
                            {haddings}
                        </Typography>
                    </Box>

                    <Box className="appbar_right_box">

                        {/* <IconButton size="large" color="inherit" className='appbar_right_noti_icon' >
                            <Badge color="error">
                                <NotificationsNoneIcon />
                            </Badge>
                        </IconButton> */}

                        <Avatar className='appbar_avatar' alt="user_img" src="" />

                        <Typography variant="h6" component="div" className="appbar_username" >
                            {UserName}
                        </Typography>
   
                        <LogoutIcon onClick={handleOpenConfirmation} className='appbar_logout'  sx={{ marginLeft: "0.5rem",cursor:"pointer" }} />
                    </Box>
                </Toolbar>
            </AppBar>

            <Dialogs open={openConfirmation} onClose={handleCloseConfirmation} tital={String.dialog_tital} text={String.dialog_desc} log_out={handleLogout} />
        </>

    )
}
