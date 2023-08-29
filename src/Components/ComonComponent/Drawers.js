
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ThemeProvider } from '@mui/material'
import React from 'react'
import logo from "../../assets/img/logo.svg";
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { useLocation, useNavigate } from 'react-router';
import { createTheme } from '@mui/material/styles';
import "../../style/Quality/Drawer_Navbar.scss"
import { DrawerHeader } from "../ComonComponent/Comon_Component";
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';

export default function Drawers() {

    const navigate = useNavigate();
    const location = useLocation();

    const theme = createTheme();

    const Navigate = (path) => {
        navigate(path)
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Drawer
                    sx={{
                        width: 280,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: 280,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={true}
                    className='drawer'
                >
                    <DrawerHeader>
                        <img src={logo} alt="logo" className="draewr_logo"></img>
                    </DrawerHeader>

                    <List className='draewr_item'>

                        <ListItem disablePadding onClick={() => Navigate("/Quality")} className={`draewr_dashboard_item ${location.pathname === "/Quality" || location.pathname === "/Addquality" || location.pathname === "/Editquality" ? "active" : ""
                            }`}  >
                            <ListItemButton component="a" disableRipple>
                                <ListItemIcon className='draewr_dashboard_icon'  >
                                    <DashboardCustomizeIcon />
                                </ListItemIcon>
                                <ListItemText className='draewr_dashboard_text' primary="Quality" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding onClick={() => Navigate("/User")} className={`draewr_dashboard_item ${location.pathname === "/User" ? "active" : ""
                            }`}   >
                            <ListItemButton component="a" disableRipple >
                                <ListItemIcon className='draewr_dashboard_icon'>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText className='draewr_dashboard_text' primary="User" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding onClick={() => Navigate("/Yarn")} className={`draewr_dashboard_item ${location.pathname === "/Yarn" ? "active" : ""
                            }`}>
                            <ListItemButton component="a" disableRipple >
                                <ListItemIcon className='draewr_dashboard_icon'>
                                    <SportsVolleyballIcon />
                                </ListItemIcon>
                                <ListItemText className='draewr_dashboard_text' primary="Yarn" />
                            </ListItemButton>
                        </ListItem>


                        <ListItem disablePadding onClick={() => Navigate("/Profile")} className={`draewr_dashboard_item ${location.pathname === "/Profile" ? "active" : ""
                            }`} >
                            <ListItemButton component="a" disableRipple >
                                <ListItemIcon className='draewr_dashboard_icon'>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText className='draewr_dashboard_text' primary="Profile" />
                            </ListItemButton>
                        </ListItem>



                        {/* <ListItem disablePadding onClick={()=>Navigate("/kyc")} className={`draewr_dashboard_item ${location.pathname === "/kyc" ? "active" : ""
                            }`} >
                            <ListItemButton component="a" disableRipple >
                                <ListItemIcon className='draewr_dashboard_icon'>
                                    <PersonSearchIcon />
                                </ListItemIcon>
                                <ListItemText className='draewr_dashboard_text' primary="Kyc" />
                            </ListItemButton>
                        </ListItem> */}


                    </List>

                </Drawer>
            </ThemeProvider>

        </>
    )
}
