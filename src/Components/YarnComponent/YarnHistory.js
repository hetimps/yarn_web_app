import React from 'react'
import "../../style/Compnay.scss"
import { Avatar, Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, InputLabel, List, ListItem, ListItemAvatar, ListItemText, Stack, TextField, Typography, } from '@mui/material'
import * as Yup from "yup";
import { Regex } from '../../constants/Regex';
import { Form, Formik } from 'formik';
import { String } from '../../constants/String';
import { toast } from 'react-hot-toast';
import Loader from '../ComonComponent/Loader';
import { Label } from '@mui/icons-material';
import "../../style/Yarn/YarnTable.scss"
import { useGetYarnActivityQuery, useUpdateYarnMutation } from '../../api/Yarn';
import "../../style/Yarn/YarnTable.scss"
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment/moment';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function YarnHistory({ open, onClose, selectrdYarn }) {

    const { data, isFetching, refetch } = useGetYarnActivityQuery(selectrdYarn?._id);
    const [yarnHistoryData, setYarnHistoryData] = useState([]);

    useEffect(() => {
        if (!isFetching) {
            setYarnHistoryData(data?.result?.data)
        }
    }, [isFetching, data, yarnHistoryData, refetch, open])

    useEffect(() => {
        refetch();
    }, [open, refetch])

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='hydialog_container'>
                <DialogTitle id="alert-dialog-title" className='hyinvite_dialog_tital'>
                    <Box sx={{ marginLeft: "20px " }}>
                        <HighlightOffIcon className="hyinvite_dialog_close" onClick={onClose} />
                    </Box>
                    <Box className="hyinvite_dialog_tital_txt">
                        {String.history_yarn_tital}
                    </Box>
                </DialogTitle>

                <DialogContent className='hydialog_content'>
                    {isFetching ? (
                        <Box className="hyuser_list_loader">
                            <Loader />
                        </Box>
                    ) : (
                        yarnHistoryData?.length === 0 ? (
                            <Typography className='hyno-data-message'>
                                No data available
                            </Typography>
                        ) : (
                            yarnHistoryData.map((history) => {
                                const date = moment(history?.createdAt).format('DD/MM/YYYY');
                                const time = moment(history?.createdAt).format('HH:mm');
                                return (
                                    <List className='hyuser_list' key={history._id}>
                                        <ListItem alignItems="flex-start" className="hyuser_list_item">
                                            <Typography className='hyheading_text' variant="span" component="span">
                                                {history?.updateYarnName}
                                            </Typography>
                                            <Typography className='hyheading_text' variant="span" component="span">
                                                {history?.createdBy?.userName}
                                            </Typography>
                                            <Typography className='hyheading_text' variant="span" component="span">
                                                {history?.updateYarnRate}
                                            </Typography>
                                            <div className='time_date'>
                                                <Typography className='hyheading_text' variant="span" component="span">
                                                    {date}
                                                </Typography>
                                                <Typography className='hyheading_text time' variant="span" component="span">
                                                    {time}
                                                </Typography>
                                            </div>
                                            {history?.isReflect ? (
                                                <div>
                                                    <Checkbox disableRipple checked={true} className='reflected_checkbox' />
                                                    <Typography className='hyheading_text' variant="span" component="span">
                                                        {"Reflected"}
                                                    </Typography>
                                                </div>
                                            ) : null}
                                        </ListItem>
                                    </List>
                                );
                            })
                        )
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}
