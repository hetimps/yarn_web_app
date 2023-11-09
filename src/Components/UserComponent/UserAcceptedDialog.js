import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, FormGroup } from '@mui/material';
import { Form, Formik } from 'formik';
import { String } from '../../constants/String';
import { useAcceptedCompanyUserMutation } from '../../api/Companyuser';
import toast from 'react-hot-toast';
import Loader from '../ComonComponent/Loader';

export default function UserAcceptedDialog({ open, onClose, acceptedUserId, acceptedUserRole, setAcceptedUserRole }) {
    const [AcceptCompanyUser, { isLoading }] = useAcceptedCompanyUserMutation();
    const [selectedPermission, setSelectedPermission] = useState(null);
    const [ShowAssign, setShowAssign] = useState(false);

    useEffect(() => {
        setSelectedPermission(acceptedUserRole)
    }, [acceptedUserRole, open])

    useEffect(() => {
        if (selectedPermission !== null && selectedPermission !== undefined) {
            setShowAssign(true);
        } else {
            setShowAssign(false);
        }
    }, [selectedPermission]);

    const handleCheckboxChange = (event) => {
        setSelectedPermission(event.target.name);
    }

    const handleSubmit = async () => {
        const body = {
            role: selectedPermission
        }
        try {
            const response = await AcceptCompanyUser({ acceptedUserId, body });
            const status = response?.data?.statusCode;
            const message = response?.data?.message;
            if (status === 200) {
                toast.success(message)
            }
            else {
                toast.error(message)
            }
            response && handleDialogClose();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleDialogClose = () => {
        onClose();
        if (!open) {
            setSelectedPermission(null);
            setShowAssign(false);
            setAcceptedUserRole(null);
        }
    }

    return (
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="adialog_container">
                <DialogTitle id="alert-dialog-title" className="ainvite_dialog_tital">
                    {/* <Box sx={{ marginLeft: "20px " }}>
                        <MdClear className="ainvite_dialog_close" onClick={handleDialogClose} />
                    </Box> */}
                    <Box className="ainvite_dialog_tital_txt">
                        {String.accepted_dialog_tital}
                    </Box>
                </DialogTitle>
                <DialogContent className="ainvite_dialog_content">
                    <Formik initialValues={{}} onSubmit={handleSubmit}>
                        {({ values, handleChange }) => (
                            <Form className="ainvite_form">
                                <div>
                                    <FormGroup>
                                        <FormControlLabel className='checkbox_conatiner' sx={{ justifyContent: "space-between" }}
                                            labelPlacement="start"
                                            label="View"
                                            control={<Checkbox checked={selectedPermission === 'view'} onChange={handleCheckboxChange} name="view" />} />
                                        <FormControlLabel
                                            className='checkbox_conatiner'
                                            labelPlacement="start"
                                            label="Write"
                                            control={<Checkbox checked={selectedPermission === 'write'} onChange={handleCheckboxChange} name="write" />} />
                                        <FormControlLabel
                                            className='checkbox_conatiner'
                                            labelPlacement="start"
                                            label="Admin"
                                            control={<Checkbox checked={selectedPermission === 'admin'} onChange={handleCheckboxChange} name="admin" />} />
                                    </FormGroup>
                                </div>
                                <div className='ainvite_dialog_butto_container'>
                                    {isLoading ? (<Box className="loader">
                                        <Loader />
                                    </Box>) : (
                                        <>
                                            <Button
                                                onClick={handleDialogClose}
                                                className="cancel_dialog_button" variant="outlined" autoFocus>
                                                {String.cancel_dialog_button}
                                            </Button>
                                            <Button
                                                disabled={!ShowAssign}
                                                type="submit" className="ainvite_dialog_button" variant="contained" autoFocus>
                                                {String.accepted_dialog_button}
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
    );
}
