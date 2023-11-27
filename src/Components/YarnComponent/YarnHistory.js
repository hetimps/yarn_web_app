import React from 'react'
import "../../style/Company/Company.scss"
import { Box,  Checkbox, Dialog, DialogContent, DialogTitle, List, ListItem, Typography} from '@mui/material'
import { String } from '../../constants/String';
import Loader from '../ComonComponent/Loader';
import { useGetYarnActivityQuery } from '../../api/Yarn';
import "../../style/Yarns/YarnTable.scss"
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
                               {String.no_data_available}
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
                                                        {String.reflected}
                                                    </Typography>
                                                </div>
                                            ) : null}
                                        </ListItem>
                                    </List>
                                )
                            })
                        )
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}
