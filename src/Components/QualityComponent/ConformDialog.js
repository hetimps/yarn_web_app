import React from 'react'


import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

export default function ConformDialog({ open, onClose, tital, back }) {
  return (
    <>
     <Dialog className="cdialog" open={open} >
                <Box className="cdialog_wraper" >

                
                    <DialogContent>
                      
                    <DialogContentText className="cdialog_info">
                            {tital}
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions >
                        <Box className="cdialog_button">
                            <Button variant="outlined" className="cdialog_cancel" onClick={onClose}>{"cancel"}</Button>
                            <Button variant="contained" className="cdialog_yes" onClick={back} autoFocus>
                                {"yes"}
                            </Button>
                        </Box>
                    </DialogActions>

                </Box>
            </Dialog>
    </>
  )
}
