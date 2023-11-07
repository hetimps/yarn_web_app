import { Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import "../../style/Quality/Drawer_Navbar.scss"
import { useNavigate } from 'react-router';
import LogoutIcon from '@mui/icons-material/Logout';
import Dialogs from './Dialogs';
import { String } from '../../constants/String';
import { AppBar } from './Comon_Component';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../Redux/AuthSlice';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function AppBars({ haddings, Userdata }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

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
        setAnchorEl(null);
        setOpenConfirmation(false);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // const UserName = JSON?.parse(localStorage?.getItem("username"))
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
                            {Userdata?.result?.userName}
                        </Typography>

                        <LogoutIcon onClick={handleOpenConfirmation} className='appbar_logout' sx={{ marginLeft: "0.5rem", cursor: "pointer" }} />
                        {/* <Box className='amore_icons'>
                            <IconButton className='amore_icon' onClick={(event) => handleMenuOpen(event)} >
                                <ExpandMoreIcon />
                            </IconButton>
                        </Box>

                        <Menu
                            className="menus_app"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}>

                            <MenuItem className='menu_app' >
                                <PermIdentityIcon className='edit_app' />
                                <span className='menu-text_app'>{"Account"}</span>
                            </MenuItem>

                            <MenuItem className='menu_app' >
                                <ErrorOutlineIcon className='edit_app' />
                                <span className='menu-text_app'>{"Information"}</span>
                            </MenuItem>
                            <MenuItem className='menu_app' onClick={handleOpenConfirmation} >
                                <LogoutIcon className='edit_app' />
                                <span className='menu-text_app'>{"Logout"}</span>
                            </MenuItem>
                        </Menu> */}

                        
                    </Box>
                </Toolbar>
            </AppBar>
            <Dialogs icon={<NewReleasesIcon />} open={openConfirmation} onClose={handleCloseConfirmation} tital={String.dialog_tital} text={String.dialog_desc} Action={handleLogout} />
        </>
    )
}
