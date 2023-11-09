import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from "@mui/material";
import "../../style/Profile/ProfilePage.scss"
import { String } from '../../constants/String';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState } from "react";
import InformationDrawer from "./InformationDrawer";

export default function ProfilePage({ Userdata, UserisFetching, userRefetch }) {
    const [isUpdateDrawerOpen, setIsUpdateDrawerOpen] = useState(false);
    const toggleUpdateDrawer = () => {
        setIsUpdateDrawerOpen(!isUpdateDrawerOpen);
    };

    const [isUpdateComapnyDrawerOpen, setIsUpdateComapnyDrawerOpen] = useState(false);
    const toggleUpdateComapnyDrawer = () => {
        setIsUpdateComapnyDrawerOpen(!isUpdateComapnyDrawerOpen);
    };
    return (
        <>
        <div className="list">
                <List className='user_list_profile' >
                    <ListItem alignItems="flex-start" className="user_list_item">
                        <div className="user_conatiner">
                            <div className='user_list_content'>
                                <PermIdentityIcon className='accounti' />
                                <ListItemText className='user_list_text'
                                    primary={String.account}
                                    primaryTypographyProps={{
                                        style: { fontWeight: 500, fontSize: '1.1rem' }}}/>
                            </div>
                            <ListItemSecondaryAction className="showmore_icon" >
                                <IconButton edge="end" aria-label="navigate" onClick={() => toggleUpdateDrawer()} >
                                    <KeyboardArrowRightIcon className="icon" />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </div>
                    </ListItem>
                </List>
            </div>

            <div className="list">
                <List className='user_list_profile' >
                    <ListItem alignItems="flex-start" className="user_list_item">
                        <div className="user_conatiner">
                            <div className='user_list_content'>
                                <ErrorOutlineIcon className='accounti' />
                                <ListItemText className='user_list_text'
                                    primary={String.company_information}
                                    primaryTypographyProps={{
                                        style: { fontWeight: 500, fontSize: '1.1rem' }}}/>
                            </div>
                            <ListItemSecondaryAction className="showmore_icon" >
                                <IconButton edge="end" aria-label="navigate"  >
                                    <KeyboardArrowRightIcon className="icon" onClick={() => toggleUpdateComapnyDrawer()} />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </div>
                    </ListItem>
                </List>
            </div>
            <InformationDrawer Userdata={Userdata} UserisFetching={UserisFetching} userRefetch={userRefetch} toggleDrawer={toggleUpdateDrawer} isDrawerOpen={isUpdateDrawerOpen} account={true} />
            <InformationDrawer Userdata={Userdata} UserisFetching={UserisFetching} userRefetch={userRefetch} toggleDrawer={toggleUpdateComapnyDrawer} isDrawerOpen={isUpdateComapnyDrawerOpen} account={false} />
        </>
    )
}