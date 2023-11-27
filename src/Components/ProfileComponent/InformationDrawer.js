import React, { useEffect, useState } from 'react'
import Loader from '../ComonComponent/Loader'
import { Drawer, InputLabel, Paper, Stack, TextField, Typography } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { String } from '../../constants/String';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Regex } from '../../constants/Regex';
import toast from 'react-hot-toast';
import { useUserInfoMutation } from '../../api/UserInformation';
import { Buttons } from '../ComonComponent/CustomButtons';
export default function AccountInfoDrawer({ toggleDrawer, isDrawerOpen, Userdata, UserisFetching, userRefetch, account }) {

    const [UpdateProfile, { isLoading }] = useUserInfoMutation();
    const [userNameState, setUserNameState] = useState(Userdata?.userName);
    const [userEmailState, setUserEmailState] = useState(Userdata?.userEmail);
    const [disabledSave, setDisabledSave] = useState(true);

    useEffect(() => {
        if (!UserisFetching) {
            formik.setFieldValue("userName", Userdata?.userName)
            formik.setFieldValue("mobileNo", Userdata?.mobileNo)
            formik.setFieldValue("userEmail", Userdata?.userEmail)
            CompanyFormik.setFieldValue("companyName", Userdata?.companyId?.companyName)
            setUserNameState(Userdata?.userName)
            setUserEmailState(Userdata?.userEmail)
        }
    }, [Userdata, UserisFetching])

    useEffect(() => {
        if (userNameState !== Userdata?.userName || userEmailState !== Userdata?.userEmail) {
            setDisabledSave(false)
        } else {
            setDisabledSave(true)
        }
    }, [userNameState, Userdata?.userName, Userdata?.userEmail, userEmailState, disabledSave])

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
                userRefetch();
                toggleDrawer()
                toast.success(String.account_update)
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
        onSubmit: async () => {
            toggleDrawer()
        },
    });

    return (
        <Drawer transitionDuration={1000} anchor="right" open={isDrawerOpen} className='adrawer'>
            <Paper className='aheading_paper'>
                <div className='aheading' >
                    <div>
                        <Typography
                            className="aheading_text"
                            variant="span"
                            component="span">
                            {account ? (String.account) : (String.company_information)}
                        </Typography>
                    </div>
                    <div onClick={toggleDrawer} className='aclose_icon'>
                        <HighlightOffIcon />
                    </div>
                </div>
            </Paper>

            {account ? (
                <form onSubmit={formik.handleSubmit}>
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
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    setUserNameState(e.target.value.trim());
                                }}
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
                                className='namei' name='mobileNo' />
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
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    setUserEmailState(e.target.value.trim());
                                }}
                                value={formik.values.userEmail}
                                className='namei' name='userEmail' />
                        </div>
                        <div className='yebtns'>
                            {isLoading ? <Loader /> : (<Stack direction="row" spacing={1}>
                                <Buttons onClick={toggleDrawer} className='yebtn_cancel' variant="outlined" button_name={String.ycancel} />
                                <Buttons disabled={disabledSave} type={'submit'} className='save_button' variant="contained" button_name={String.save} />
                            </Stack>)}
                        </div>
                    </div>
                </form >
            ) : (<form onSubmit={CompanyFormik.handleSubmit}>
                <div className='account_form'>
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
                            className='namei' name='comapnyAddress' />
                    </div>
                    <div className='yebtns'>
                        {isLoading ? <Loader /> : (<Stack direction="row" spacing={1}>
                            <Buttons onClick={toggleDrawer} className='yebtn_cancel' variant="outlined" button_name={String.ycancel} />
                            <Buttons type={'submit'} className='save_button' variant="contained" button_name={String.save} />
                        </Stack>)}
                    </div>
                </div>
            </form >)}
        </Drawer >
    )
}
