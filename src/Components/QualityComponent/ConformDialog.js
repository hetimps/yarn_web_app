import React from 'react'
import { Box, Dialog, DialogActions, DialogContent, DialogContentText} from '@mui/material'
import Loader from '../ComonComponent/Loader'
import { String } from '../../constants/String'
import { Buttons } from '../ComonComponent/CustomButtons'

export default function ConformDialog({ open, onClose, heading, tital, back, isLoading }) {
    return (
        <>
            <Dialog className="cdialog" open={open} >
                <Box className="cdialog_wraper" >
                    <DialogContent>
                        <Box className="cdialog_tital_heading">
                            {heading}
                        </Box>
                        <DialogContentText className="cdialog_info">
                            {tital}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions >
                        {isLoading ?
                            <Loader />
                            : (<Box className="cdialog_button">
                                <Buttons variant={"outlined"} className={"cdialog_cancel"} onClick={onClose}  button_name={String.dialog_cancel_buttons} /> 
                                <Buttons variant={"contained"} className={"cdialog_yes"} onClick={back}  button_name={String.dialog_cancel_yes} /> 
                            </Box>)}
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    )
}
