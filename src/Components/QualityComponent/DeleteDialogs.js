import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'
import "../../style/Quality/Drawer_Navbar.scss"
import { String } from '../../constants/String'
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from '../ComonComponent/Loader';
import { Buttons } from '../ComonComponent/CustomButtons';

export default function DeleteDialogs({ open, onClose, tital, text, Action, loading }) {
    return (
        <>
            <Dialog className="dialog" open={open} >
                <Box className="dialog_wraper" >
                    <DialogTitle >
                        <Box className="dialog_tital">
                            <Box sx={{ textAlign: "center" }} >
                                <DeleteIcon className="dialog_delete_icon" />
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
                                <Buttons variant={"outlined"} className={"dialog_cancel"} onClick={onClose}  button_name={String.dialog_cancel_buttons}/> 
                                <Buttons variant={"contained"} className={"ddialog_yes"} onClick={Action}  button_name={String.dialog_cancel_yes}/> 
                            </Box>)}
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    )
}
