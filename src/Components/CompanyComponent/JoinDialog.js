import React from 'react'
import "../../style/Compnay.scss"
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material'
import { Form, Formik } from 'formik';
import { MdClear } from "react-icons/md";
import { String } from '../../constants/String';
import * as Yup from "yup";
import { Regex } from '../../constants/Regex';
import { useAddCompanyMutation } from '../../api/Compnay';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loader from '../ComonComponent/Loader';

export default function CompanyDialog({ open, onClose }) {

    const navigaet = useNavigate();

    const defaultValue = {
        companyName: "",
    };

    const validationSchema = Yup.object().shape({
        companyName: Yup.string().required(String.add_company_required).matches(Regex.company_name, String.add_company_required),
    });

    const [Add_Company, { isLoading }] = useAddCompanyMutation();
    const handleSubmit = async (values) => {
        console.log(values)
        try {
            const response = await Add_Company(values)
            console.log(response)
            const status = response?.data?.statusCode;
            const message = response?.data?.message;

            if (status === 200) {
                toast.success(message)
                navigaet("/Quality")
            }
            else {
                toast.error(message)
            }
        }
        catch (error) {
            console.log(error)
        }

    }


    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='dialog_container'>
                <DialogTitle id="alert-dialog-title" className='invite_dialog_tital'>

                    <Box className="invite_dialog_tital_txt">
                        {String.add_tital}
                    </Box>
                    <Box sx={{ marginLeft: "20px " }}>
                        <MdClear className="invite_dialog_close" onClick={onClose} />
                    </Box>

                </DialogTitle>

                <DialogContent className='invite_dialog_content'>
                    <Formik initialValues={defaultValue} validationSchema={validationSchema} onSubmit={handleSubmit}  >
                        {({
                            values,
                            handleChange,
                            errors,
                            touched,
                        }) => (
                            <Form className='invite_form' >

                                <TextField className="company_input"
                                    onChange={handleChange}
                                    value={values.companyName}
                                    error={touched.companyName && Boolean(errors.companyName)}
                                    helperText={touched.companyName && errors.companyName} placeholder={String.add_placeholder} name="companyName" autoComplete='off' id="outlined-basic" variant="outlined" sx={{ width: "100%" }} />

                                <div className='invite_dialog_butto_container'>
                                    {isLoading ? (<Box className="loader">
                                        <Loader />
                                    </Box>) : (<Button disableRipple type="submit" className="invite_dialog_button" variant="contained" autoFocus>
                                        {String.add_button}
                                    </Button>)}
                                </div>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </>
    )
}
