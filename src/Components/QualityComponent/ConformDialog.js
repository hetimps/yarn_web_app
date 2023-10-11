import React from 'react'


import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import Loader from '../ComonComponent/Loader'

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
                                <Button variant="outlined" className="cdialog_cancel" onClick={onClose}>{"cancel"}</Button>
                                <Button variant="contained" className="cdialog_yes" onClick={back} autoFocus>
                                    {"yes"}
                                </Button>
                            </Box>)}
                    </DialogActions>

                </Box>
            </Dialog>
        </>
    )
}
