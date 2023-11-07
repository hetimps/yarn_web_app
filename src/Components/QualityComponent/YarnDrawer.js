import { Box, Drawer, IconButton, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from 'react';
import AddYarnDialog from './AddYarnDialog';
export default function YarnDrawer({ isYarnDrawerOpen, toggleYarnDrawer }) {
    const [openAdd, setOpenAdd] = useState(false);
    const handleCloseAddYarn = () => {
        setOpenAdd(false);
    };
    const handleOpenAddYarn = () => {
        setOpenAdd(true);
    };
    return (
        <>
            <Drawer anchor="right" open={isYarnDrawerOpen} onClose={toggleYarnDrawer} className='ydrawer' >
                <div className='yheading' >
                    <div >
                        <Typography
                            className="heading_text"
                            variant="span"
                            component="span">
                            {"Select Yarn"}
                        </Typography>
                    </div>

                    <div className='icons'>
                        <div onClick={handleOpenAddYarn} className='add_icon'>
                            <AddCircleIcon className='add_icon' />
                        </div>

                        <div onClick={toggleYarnDrawer} className='close_icon'>
                            <CloseIcon className='close_icon' />
                        </div>
                    </div>
                </div>
            </Drawer >

            <AddYarnDialog open={openAdd} onClose={handleCloseAddYarn} />
        </>
    )
}
