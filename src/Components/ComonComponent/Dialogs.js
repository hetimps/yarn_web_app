import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'
import "../../style/Quality/Drawer_Navbar.scss"
import { String } from '../../constants/String'
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import Loader from './Loader';

export default function Dialogs({ open, onClose, tital, text, Action, loading }) {
    return (
        <>
            <Dialog className="dialog" open={open} >
                <Box className="dialog_wraper" >
                    <DialogTitle >
                        <Box className="dialog_tital">
                            <Box sx={{ textAlign: "center" }} >
                                <NewReleasesIcon className="dialog_logout_icon" />
                            </Box>
                        </Box>
                    </DialogTitle>
                    <DialogContent>
                        <Box className="dialog_tital_txt">
                            {tital}
                        </Box>
                        <DialogContentText className="dialog_info">
                            {text}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions >
                        {loading ?
                            <Loader />
                            : (<Box className="dialog_button">
                                <Button variant="outlined" className="dialog_cancel" onClick={onClose}>{String.dialog_cancel_buttons}</Button>
                                <Button variant="contained" className="dialog_yes" onClick={Action} autoFocus>
                                    {String.dialog_cancel_yes}
                                </Button>
                            </Box>)}
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    )
}
