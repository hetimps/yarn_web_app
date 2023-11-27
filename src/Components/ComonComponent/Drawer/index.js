import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ThemeProvider } from '@mui/material'
import React, { useEffect } from 'react'
import logo from "../../../assets/img/logo.svg";
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { useLocation, useNavigate } from 'react-router';
import { createTheme } from '@mui/material/styles';
import "../../../style/Quality/Drawer_Navbar.scss"
import { DrawerHeader } from "./style";
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import { useProfileQuery } from '../../../api/Auth';
import { useState } from 'react';

export default function Drawers() {
    const navigate = useNavigate();
    const location = useLocation();
    const [showUser, setShowUser] = useState(true);
    const { data: Userdata, isFetchings: UserisFetching } = useProfileQuery({}, { refetchOnMountOrArgChange: true });
    const theme = createTheme();

    const Navigate = (path) => {
        navigate(path)
    }
    useEffect(() => {
        if (!UserisFetching) {
            if (Userdata?.result?.role === "view" || Userdata?.result?.role === "write") {
                setShowUser(false)
            } else {
                setShowUser(true)
            }
        }
    }, [Userdata, navigate, UserisFetching, showUser])

    return (
            <ThemeProvider theme={theme}>
                <Drawer
                    sx={{
                    width: 280,
                    flexShrink: 0,
                    '& .MuiDrawer-paper':{
                    width: 280,
                    boxSizing: 'border-box'}}}
                    variant="persistent"
                    anchor="left"
                    open={true}
                    className='drawer'>
                    <DrawerHeader>
                        <img src={logo} alt="logo" className="draewr_logo"></img>
                    </DrawerHeader>
                    <List className='draewr_item'>
                        <ListItem disablePadding onClick={() => Navigate("/Quality")} className={`draewr_dashboard_item ${location.pathname === "/Quality" || location.pathname === "/Addquality" || location.pathname === "/Editquality" || location.pathname === "/Viewquality" ? "active" : ""}`}  >
                            <ListItemButton component="a" disableRipple>
                                <ListItemIcon className='draewr_dashboard_icon'  >
                                    <DashboardCustomizeIcon />
                                </ListItemIcon>
                                <ListItemText className='draewr_dashboard_text' primary="Quality" />
                            </ListItemButton>
                        </ListItem>
                        {showUser && <ListItem disablePadding onClick={() => Navigate("/User")} className={`draewr_dashboard_item ${location.pathname === "/User" ? "active" : "" }`}   >
                            <ListItemButton component="a" disableRipple >
                                <ListItemIcon className='draewr_dashboard_icon'>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText className='draewr_dashboard_text' primary="User" />
                            </ListItemButton>
                        </ListItem>}
                        <ListItem disablePadding onClick={() => Navigate("/Yarn")} className={`draewr_dashboard_item ${location.pathname === "/Yarn" ? "active" : ""}`}>
                            <ListItemButton component="a" disableRipple >
                                <ListItemIcon className='draewr_dashboard_icon'>
                                    <SportsVolleyballIcon />
                                </ListItemIcon>
                                <ListItemText className='draewr_dashboard_text' primary="Yarn" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding onClick={() => Navigate("/Profile")} className={`draewr_dashboard_item ${location.pathname === "/Profile" ? "active" : ""}`} >
                            <ListItemButton component="a" disableRipple >
                                <ListItemIcon className='draewr_dashboard_icon'>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText className='draewr_dashboard_text' primary="Profile" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>
            </ThemeProvider>
    )
}
