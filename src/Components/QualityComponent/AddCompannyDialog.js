import React from 'react'
import "../../style/Compnay.scss"
import { Box, Button, Dialog, DialogContent, DialogTitle, InputLabel, Stack, TextField, } from '@mui/material'
import { MdClear } from "react-icons/md";
import * as Yup from "yup";
import { Regex } from '../../constants/Regex';
import { Form, Formik } from 'formik';
import { String } from '../../constants/String';
import { useAddCompanyMutation} from '../../api/Quality';
import { toast } from 'react-hot-toast';
import Loader from '../ComonComponent/Loader';


export default function AddCompannyDialog({ open, onClose }) {

    const defaultValue = {
        yarnCompanyName: "",

    };

    const validationSchema = Yup.object().shape({
        yarnCompanyName: Yup.string().required(String.company_required).matches(Regex.yarn_name, String.valid_compnay),


    });


    const [Add_Company, { isLoading }] = useAddCompanyMutation();

    const handleSubmit = async (value) => {
        console.log(value)
        try {
            const response = await Add_Company(value)
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
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='cdialog_container'>

                <DialogTitle id="alert-dialog-title" className='cadd_dialog_tital'>
                    <Box sx={{ marginLeft: "20px " }}>
                        <MdClear className="cdialog_close" onClick={onClose} />
                    </Box>

                </DialogTitle>

                <DialogContent className='cdialog_content'>
                    <Formik initialValues={defaultValue} validationSchema={validationSchema} onSubmit={handleSubmit} >
                        {({
                            values,
                            handleChange,
                            errors,
                            touched,
                        }) => (

                            <Form className='invite_form' >
                                <div >
                                    <InputLabel className="label" >
                                        {String.clabel}
                                    </InputLabel>
                                    <TextField

                                        onChange={handleChange}
                                        name='yarnCompanyName'
                                        value={values.yarnCompanyName}
                                        error={touched.yarnCompanyName && Boolean(errors.yarnCompanyName)}
                                        helperText={touched.yarnCompanyName && errors.yarnCompanyName} placeholder={String.company_placeholder} id="outlined-basic" autoComplete='off' sx={{ width: "100%" }} variant="outlined" />
                                </div>



                                <div className='btns'>

                                    {isLoading ? <Loader /> : (<Stack direction="row" spacing={1}>
                                        <Button onClick={onClose} variant="outlined" className='ccancel'>{String.ccancel}</Button>
                                        <Button type='submit' variant="contained" className='cadd' >
                                            {String.cadd}
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
