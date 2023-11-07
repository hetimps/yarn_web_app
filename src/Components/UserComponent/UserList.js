import React, { useEffect, useState } from 'react'
import { Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Search from '../ComonComponent/Search'
import "../../style/User/UserList.scss";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import Loader from '../ComonComponent/Loader';
import { useGetCompanyUserQuery, useRejectedCompanyUserMutation } from '../../api/Companyuser';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ConformDialog from '../QualityComponent/ConformDialog';
import { String } from '../../constants/String';
import toast from 'react-hot-toast';
import UserAcceptedDialog from './UserAcceptedDialog';
import { useNavigate } from 'react-router-dom';
import { useProfileQuery } from '../../api/Auth';


export default function UserList({ Userdata, UserisFetching }) {
    const [requestedUser, setRequestedUser] = useState([]);
    const [acceptedUser, setAcceptedUser] = useState([]);
    const [search, setsearch] = useState("");
    const [input, setinput] = useState("");
    const [page, setPage] = useState(1);
    const [rejectedUserId, setrejectedUserId] = useState();
    const [acceptedUserId, setAcceptedUserId] = useState();
    const [acceptedUserRole, setAcceptedUserRole] = useState(null);
    const [openRejectedConfirmation, setOpenRejectedConfirmation] = useState(false);

    // const { data: Userdata, isFetchings: UserisFetching, refetch: userRefetch } = useProfileQuery({}, { refetchOnMountOrArgChange: true });
    const { data, isFetching, refetch } = useGetCompanyUserQuery({ status: "requested", search: search, page }, { refetchOnMountOrArgChange: true });
    const { data: acceptedData, isFetching: acceptedFetching, refetch: acceptedrefetch } = useGetCompanyUserQuery({ status: "accepted", search: search, page }, { refetchOnMountOrArgChange: true, });
    const navigate = useNavigate();

    useEffect(() => {
        if (!UserisFetching) {
            Userdata?.result?.requestStatus === "rejected" && navigate("/Company")
            if (Userdata?.result?.role === "view" || Userdata?.result?.role === "write") {
                navigate("/Quality")
            }
        }
    }, [Userdata, navigate, UserisFetching])

    const [RejectCompanyUser, { isLoading }] = useRejectedCompanyUserMutation();

    useEffect(() => {
        if (!isFetching && data) {
            setRequestedUser(data?.result[0]?.data);
        }
    }, [data?.result, requestedUser, isFetching, data]);

    useEffect(() => {
        if (!acceptedFetching && acceptedData) {
            setAcceptedUser(acceptedData?.result[0]?.data);
        }
    }, [data?.result, acceptedData, acceptedFetching, acceptedUser])

    useEffect(() => {
        refetch();
        acceptedrefetch();
    }, [refetch, acceptedrefetch])

    function calculateTimeAgo(updatedAt) {
        const currentTime = new Date();
        const updatedAtTime = new Date(updatedAt);
        const timeDifference = currentTime - updatedAtTime;
        const minutesAgo = Math.floor(timeDifference / (1000 * 60)); // Convert milliseconds to minutes
        const hoursAgo = Math.floor(minutesAgo / 60); // Convert minutes to hours
        if (minutesAgo < 60) {
            return `${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`;
        } else {
            return `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`;
        }
    }

    const handleOpenRejectedConfirmation = (id) => {
        setOpenRejectedConfirmation(true);
        setrejectedUserId(id)
    };
    const handleCloseRejectedConfirmation = () => {
        setOpenRejectedConfirmation(false);
    };

    const RejectedUser = async () => {
        const response = await RejectCompanyUser(rejectedUserId);
        const status = response?.data?.statusCode;
        const message = response?.data?.message;
        if (status === 200) {
            toast.success(message)
        }
        else {
            toast.error(message)
        }
        response && handleCloseRejectedConfirmation();
    }
    const [userAcceptedDialog, setUserAcceptedDialog] = useState(false);

    const userAcceptedDialogClose = () => {
        setUserAcceptedDialog(false);
    };

    const userAcceptedDialogOpen = (id, role) => {
        setUserAcceptedDialog(true);
        setAcceptedUserId(id);
        setAcceptedUserRole(role)
    };

    return (
        <>
            <Box className="user_List">
                <div className='user_invite_buttons_container'>
                    <div>
                    </div>
                    <div className='user__search_container_wraper'>
                        <Box className="user_invite_search_container">
                            <>
                                {/* {(data?.result && (requestedUser?.length !== 0 || acceptedUser?.length !== 0)) && (
                                    <Search
                                        setinput={setinput}
                                        input={input}
                                        setsearch={setsearch}
                                        setpage={setPage} />)} */}

                                {((requestedUser === undefined && input === "") || (acceptedUser === undefined && input === "")) ? (null) : (
                                    <>
                                        <Search
                                            setinput={setinput}
                                            input={input}
                                            setsearch={setsearch}
                                            setpage={setPage} />
                                    </>
                                )}
                            </>
                        </Box>
                    </div>
                </div>

                {(isFetching && acceptedFetching) ? (
                    <Box className="user_list_loader">
                        <Loader />
                    </Box>
                ) : (
                    <>
                        {!data?.result || (requestedUser === undefined && acceptedUser === undefined) ? (
                            // {!data?.result || (requestedUser?.length === 0 && acceptedUser?.length === 0) ? (
                            <Typography className='no-data-message'>
                                {String.no_data_available}
                            </Typography>
                        ) :
                            (
                                <>
                                    {requestedUser?.length > 0 &&
                                        <Typography className='user_invite_count'>
                                            {String.pending_request}
                                        </Typography>}

                                    {requestedUser?.map((user) =>
                                        <List className='user_list' >
                                            <ListItem alignItems="flex-start" className="user_list_item">
                                                <ListItemAvatar>
                                                    <Avatar className='user_list_img' alt="use_img" />
                                                </ListItemAvatar>

                                                <div className='user_list_content'>
                                                    <ListItemText className='user_list_text'
                                                        primary={user?.userId?.userName}
                                                        primaryTypographyProps={{
                                                            style: { fontWeight: 500, fontSize: '1rem' },
                                                        }} />

                                                    <div className='time_container'>
                                                        <div >
                                                            <AccessTimeIcon className='watch_icon' />
                                                        </div>

                                                        <ListItemText className='user_list_text user_list_text_time'
                                                            primary={calculateTimeAgo(user?.userId?.updatedAt)}
                                                            primaryTypographyProps={{
                                                                style: { fontWeight: 100, fontSize: '0.8rem', color: "grey" },
                                                            }} />
                                                    </div>
                                                </div>

                                                <ListItemSecondaryAction >
                                                    <IconButton edge="end" aria-label="navigate" onClick={() => userAcceptedDialogOpen(user?._id)} >
                                                        <CheckCircleOutlineIcon className='user_list_icon_right' />
                                                    </IconButton>

                                                    <IconButton edge="end" aria-label="navigate" onClick={() => handleOpenRejectedConfirmation(user?._id)} >
                                                        <HighlightOffIcon className='user_list_icon_cancel' />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        </List>
                                    )}

                                    {acceptedUser?.length > 0 && <Typography className='user_invite_count' sx={{ marginTop: "2rem " }}>
                                        {String.all_user}
                                    </Typography>}

                                    {acceptedUser?.map((user) =>
                                        <List className='user_list' >
                                            <ListItem alignItems="flex-start" className="user_list_item">
                                                <ListItemAvatar>
                                                    <Avatar className='user_list_img' alt="use_img" />
                                                </ListItemAvatar>

                                                <div className='user_list_content'>
                                                    <ListItemText className='user_list_text'
                                                        primary={user?.userId?.userName}
                                                        primaryTypographyProps={{
                                                            style: { fontWeight: 500, fontSize: '1rem' }}} />

                                                    <div className='time_container'>
                                                        <div >
                                                            <AccessTimeIcon className='watch_icon' />
                                                        </div>

                                                        <ListItemText className='user_list_text user_list_text_time'
                                                            primary={calculateTimeAgo(user?.userId?.updatedAt)}
                                                            primaryTypographyProps={{
                                                                style: { fontWeight: 100, fontSize: '0.8rem', color: "grey" }}} />
                                                    </div>
                                                </div>

                                                <ListItemSecondaryAction >
                                                    <IconButton edge="end" aria-label="navigate" onClick={() => userAcceptedDialogOpen(user?._id, user?.userId?.role)} >
                                                        <EditIcon className='user_list_icon_edit' />
                                                    </IconButton>

                                                    <IconButton edge="end" aria-label="navigate" onClick={() => handleOpenRejectedConfirmation(user?._id)} >
                                                        <HighlightOffIcon className='user_list_icon_cancel' />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        </List>
                                    )}
                                </>
                            )
                        }
                    </>
                )}
            </Box >
            <UserAcceptedDialog open={userAcceptedDialog} onClose={userAcceptedDialogClose} acceptedUserId={acceptedUserId} acceptedUserRole={acceptedUserRole} setAcceptedUserRole={setAcceptedUserRole} />
            <ConformDialog open={openRejectedConfirmation} onClose={handleCloseRejectedConfirmation} heading={String.reject_conformgialog_heading} tital={String.reject_conformgialog_tital} isLoading={isLoading} back={RejectedUser} />
        </>
    )
}


