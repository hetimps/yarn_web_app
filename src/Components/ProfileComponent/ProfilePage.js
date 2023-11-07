import React, { useEffect, useState } from 'react'
import "../../style/Profile/ProfilePage.scss"
import { Accordion, AccordionDetails, AccordionSummary, Button, FormControlLabel, InputLabel, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as Yup from "yup";
import { Form, useFormik } from 'formik';
import { Regex } from '../../constants/Regex';
import { String } from '../../constants/String';
import { useUserInfoMutation } from '../../api/UserInfo';
import toast from 'react-hot-toast';
import Loader from '../ComonComponent/Loader';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function ProfilePage({ Userdata, UserisFetching, userRefetch }) {
    const [UpdateProfile, { isLoading }] = useUserInfoMutation();
    const [isAccountAccordionExpanded, setAccountAccordionExpanded] = useState(false);
    const [isCompanyAccordionExpanded, setCompanyAccordionExpanded] = useState(false);

    const formik = useFormik({
        initialValues: {
            userName: '',
            mobileNo: '',
            userEmail: '',
        },
        validationSchema: Yup.object().shape({
            userName: Yup.string().required(String.user_required).matches(Regex.user_name, String.user_required),
            userEmail: Yup.string().matches(Regex.email_regex, String.email_format)
        }),


        onSubmit: async (values) => {
            const body = {
                userName: values?.userName,
                userEmail: values?.userEmail
            }
            const response = await UpdateProfile(body)
            const status = response?.data?.statusCode;
            const message = response?.data?.message;
            if (status === 200) {
                setAccountAccordionExpanded(false);
                userRefetch();
            } else {
                toast.error(message)
            }
        },
    });

    const CompanyFormik = useFormik({
        initialValues: {
            companyName: '',
            comapnyAddress: '',
        },
        validationSchema: Yup.object().shape({}),
        onSubmit: async (values) => {
            setCompanyAccordionExpanded(false);
        },
    });

    useEffect(() => {
        if (!UserisFetching) {
            formik.setFieldValue("userName", Userdata?.userName)
            formik.setFieldValue("mobileNo", Userdata?.mobileNo)
            formik.setFieldValue("userEmail", Userdata?.userEmail)
            CompanyFormik.setFieldValue("companyName", Userdata?.companyId?.companyName)
        }
    }, [Userdata, UserisFetching])

    return (
        <div className='profile_conatiner'>
            <div className='yequality'>
                <Accordion className='mainaccordion' expanded={isAccountAccordionExpanded} onChange={() => setAccountAccordionExpanded(!isAccountAccordionExpanded)}>
                    <AccordionSummary
                        sx={{ height: "5px" }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <div className='heading'>
                            <PermIdentityIcon className='accounti' />
                            <Typography className='accountl'>{String.account}</Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <box className="account_container">
                            <>
                                <form onSubmit={formik.handleSubmit} >
                                    <div className='account_form'>
                                        <div className='input_constiner'>
                                            <InputLabel className="namel" >
                                                {String.name}
                                            </InputLabel>
                                            <TextField
                                                autoComplete="off"
                                                placeholder={String.user_placeholder}
                                                error={formik.touched.userName && Boolean(formik.errors.userName)}
                                                helperText={formik.touched.userName && formik.errors.userName}
                                                onChange={formik.handleChange}
                                                value={formik.values.userName}
                                                className='namei' name='userName' />
                                        </div>
                                        <div className='input_constiner'>
                                            <InputLabel className="namel" >
                                                {String.phone_number}
                                            </InputLabel>
                                            <TextField
                                                disabled
                                                error={formik.touched.mobileNo && Boolean(formik.errors.mobileNo)}
                                                helperText={formik.touched.mobileNo && formik.errors.mobileNo}
                                                onChange={formik.handleChange}
                                                value={formik.values.mobileNo}
                                                className='namei' name="mobileNo" />
                                        </div>
                                        <div className='input_constiner'>
                                            <InputLabel className="namel" >
                                                {String.email_address}
                                            </InputLabel>
                                            <TextField
                                                autoComplete="off"
                                                placeholder={String.email_placeholder}
                                                error={formik.touched.userEmail && Boolean(formik.errors.userEmail)}
                                                helperText={formik.touched.userEmail && formik.errors.userEmail}
                                                onChange={formik.handleChange}
                                                value={formik.values.userEmail}
                                                className='namei' name="userEmail" />
                                        </div>
                                        {isLoading ?
                                            <div className='loader'>
                                                <Loader />
                                            </div> : <Button className='save_button' type='submit' variant="contained">{String.save}</Button>}
                                    </div>
                                </form >
                            </>
                        </box>
                    </AccordionDetails>
                </Accordion>

                <Accordion className='companyAccordion' expanded={isCompanyAccordionExpanded} onChange={() => setCompanyAccordionExpanded(!isCompanyAccordionExpanded)} >
                    <AccordionSummary
                        sx={{ height: "5px" }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <div className='heading'>
                            <ErrorOutlineIcon className='accounti' />
                            <Typography className='accountl'>{String.company_information}</Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <box className="comapany_conatiner">
                            <>
                                <form onSubmit={CompanyFormik.handleSubmit} >
                                    <div className='comapany_form'>
                                        <div className='input_constiner'>
                                            <InputLabel className="namel" >
                                                {String.clabel}
                                            </InputLabel>
                                            <TextField
                                                disabled
                                                value={CompanyFormik.values.companyName}
                                                className='namei' name='companyName' />
                                        </div>
                                        <div className='input_constiner'>
                                            <InputLabel className="namel" >
                                                {String.Company_address}
                                            </InputLabel>
                                            <TextField
                                                placeholder={String.Enter_Company_Address}
                                                error={CompanyFormik.touched.comapnyAddress && Boolean(CompanyFormik.errors.comapnyAddress)}
                                                helperText={CompanyFormik.touched.comapnyAddress && CompanyFormik.errors.comapnyAddress}
                                                onChange={CompanyFormik.handleChange}
                                                value={CompanyFormik.values.comapnyAddress}
                                                className='namei' name="comapnyAddress" />
                                        </div>
                                        <Button className='btns' type='submit' variant="contained">{String.save}</Button>
                                    </div>
                                </form>
                            </>
                        </box>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div >
    )
}
