import React from 'react'
import "../../style/Compnay.scss"
import { Box, Button, Dialog, DialogContent, DialogTitle, InputLabel, Stack, TextField, } from '@mui/material'
import * as Yup from "yup";
import { Regex } from '../../constants/Regex';
import { Form, Formik } from 'formik';
import { String } from '../../constants/String';
import { toast } from 'react-hot-toast';
import Loader from '../ComonComponent/Loader';
import { useAddYarnMutation } from '../../api/Yarn';

export default function AddYarnDialog({ open, onClose }) {

    const [Add_Yarn, { isLoading }] = useAddYarnMutation();

    const defaultValue = {
        yarnName: "",
        yarnRate: ""
    };
    const validationSchema = Yup.object().shape({
        yarnName: Yup.string().required(String.yarn_required).matches(Regex.yarn_name, String.valid_name),
        yarnRate: Yup.string().required(String.yarn_rate).matches(Regex.yarn_rate, String.valid_rate),
    });

    const handleSubmit = async (value) => {
        try {
            const response = await Add_Yarn(value)
            const status = response?.data?.statusCode;
            const message = response?.data?.message;
            if (status === 200) {
                onClose();
                toast.success(message)
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
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='ydialog_container'>
                <DialogTitle id="alert-dialog-title" className='invite_dialog_tital'>
                    <Box className="yinvite_dialog_tital_txt">
                        {String.add_yarn_tital}
                    </Box>
                </DialogTitle>

                <DialogContent className='ydialog_content'>
                    <Formik initialValues={defaultValue} validationSchema={validationSchema} onSubmit={handleSubmit} >
                        {({
                            values,
                            handleChange,
                            errors,
                            touched,
                        }) => (
                            <Form className='invite_form' >
                                <div className='ynamewrap'>
                                    <InputLabel className="label" >
                                        {String.yarn_label}
                                    </InputLabel>
                                    <TextField
                                        onChange={handleChange}
                                        name='yarnName'
                                        value={values.yarnName}
                                        error={touched.yarnName && Boolean(errors.yarnName)}
                                        helperText={touched.yarnName && errors.yarnName} className='yinput' placeholder={String.yarn_placeholder} id="outlined-basic" autoComplete='off' sx={{ width: "100%" }} variant="outlined" />
                                </div>
                                <div className='yratewrap'>
                                    <InputLabel className="label " >
                                        {String.rate_label}
                                    </InputLabel>
                                    <TextField
                                        name='yarnRate'
                                        onChange={handleChange}
                                        value={values.yarnRate}
                                        error={touched.yarnRate && Boolean(errors.yarnRate)}
                                        helperText={touched.yarnRate && errors.yarnRate} className='yinput' placeholder={String.rate_placeholder} id="outlined-basic" autoComplete='off' sx={{ width: "100%" }} variant="outlined" />
                                </div>
                                <div className='btns'>
                                    {isLoading ? <Loader /> : (<Stack direction="row" spacing={1}>
                                        <Button onClick={onClose} variant="outlined" className='ycancel'>{String.ycancel}</Button>
                                        <Button type='submit' variant="contained" className='yadd' >
                                            {String.yadd}
                                        </Button>
                                    </Stack>)}
                                </div>
                            </Form>)}
                    </Formik>
                </DialogContent>
            </Dialog>
        </>
    )
}
