import { Box, Container, Grid, Link, Paper, Typography } from '@mui/material';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik';
import Logo from "../assets/img/logo.svg";
import { String } from "../constants/String";
import Machin from "../assets/img/machin.svg";
import CustomButtons from '../Comon_Components/CustomButtons';
import { MuiOtpInput } from 'mui-one-time-password-input'
import OtpTimer from 'otp-timer'
import * as Yup from "yup";
import { useResendOtpMutation, useUserVerifyMutation } from '../api/Otp';
import { toast } from 'react-hot-toast';
import Loader from '../Comon_Components/Loader';


export function matchIsNumeric(text) {
    const isNumber = typeof text === 'number';
    const isString = typeof text === 'string';
    return (isNumber || (isString && text !== '')) && !isNaN(Number(text));
}

const validateChar = (value, index) => {
    return matchIsNumeric(value) && value !== ' ';
}


export default function Otp() {

    const location = useLocation();
    const navigate = useNavigate();


    const { state } = location;

    const countryCode = state.countryCode;
    const mobileNo = state.mobileNo;

    const HideMobileNo = `${mobileNo.slice(0, 3)}${String.hide_number}${mobileNo.slice(-2)}`;

    const defaultValue = {
        Otp: state.loginOtp,
    };

    const validationSchema = Yup.object().shape({
        Otp: Yup.string()
            .length(6, String.otp_validation)
            .required(String.otp_required),
    });

    // api

    const [verifyOtp, { isLoading }] = useUserVerifyMutation();
    const [resendOtp, { isLoading: resendOtpLoading }] = useResendOtpMutation();

    const handleSubmit = async (values) => {

        console.log("Entered OTP:", values.Otp);

        const Otp = values.Otp;

        const body = {
            countryCode: countryCode,
            mobileNo: mobileNo,
            loginOtp: Otp
        }

        try {
            const response = await verifyOtp(body);
            console.log(response)
            const status = response?.data?.statusCode;
            const message = response?.data?.message;

            if (status === 200) {
                const token = response?.data?.result?.token;
                localStorage.setItem("token", JSON.stringify(token));
                toast.success(message)
                navigate("/Userinformation")
            }
            else {
                toast.error(message)
            }
        }
        catch (error) {
            console.log(error)
        }

    };
    const ResendOtp = async (setFieldValue) => {

        const body = {
            countryCode: countryCode,
            mobileNo: mobileNo,
        }

        try {
            const response = await resendOtp(body);
            console.log(response)
            const status = response?.data?.statusCode;
            const message = response?.data?.message;

            if (status === 200) {
                const code = response?.data?.result?.loginOtp;

                toast.success(message)

                setFieldValue('Otp', code);
            }

            else {
                toast.error(message)
            }

        }
        catch (error) {
            console.log(error)
        }
    };
 
    return (
        <>
            <Box className="login-container" sx={{ flexGrow: 1 }}>
                <Paper className="login_pepar">
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={6} className="forms_container">
                            <Container className="main">
                                <Box className="logo_img_wrapper">
                                    <img src={Logo} alt="logo" />
                                </Box>
                                <Box className="login_dec_wrapper">
                                    <Typography
                                        className="login_tital"
                                        variant="span"
                                        component="h2">
                                        {String.otp_tital}
                                    </Typography>
                                    <Typography
                                        className="login_desc"
                                        variant="span"
                                        component="span">
                                        {`Code is sent to +${countryCode} ${HideMobileNo} Please Check your message.`}
                                    </Typography>
                                </Box>
                                <Formik initialValues={defaultValue}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}>
                                    {({
                                        values,
                                        handleChange,
                                        errors,
                                        touched,
                                        setFieldValue
                                    }) => (
                                        <Form>
                                            <Box className="login_filed">
                                                <Box className="phon_input">
                                                    <MuiOtpInput
                                                        value={values.Otp}
                                                        onChange={handleChange('Otp')}
                                                        TextFieldsProps={{ placeholder: '-' }}
                                                        // autoFocus
                                                        length={6}
                                                        validateChar={validateChar}
                                                        style={{ fontFamily: 'Poppins' }}
                                                    />

                                                    {touched.Otp && errors.Otp && (
                                                        <div className="error">{errors.Otp}</div>
                                                    )}
                                                </Box>

                                                <div className="btn-out">
                                                    {isLoading || resendOtpLoading ? (<Box className="loader">
                                                        <Loader />
                                                    </Box>) : (
                                                        <>
                                                            <Box className="login_button">
                                                                <CustomButtons button_name={String.next} />
                                                            </Box>

                                                            <Box sx={{ fontFamily: "Poppins", textAlign: "center", marginTop: "1rem" }}>
                                                                <OtpTimer
                                                                    text={<Link className='link' underline="none">{String.resend}</Link>}
                                                                    seconds={60}
                                                                    textColor={"#E89E46"}
                                                                    background={"white"}
                                                                    ButtonText={<Link className='link' href="#" underline="none">{String.resend}</Link>}
                                                                    resend={() => ResendOtp(setFieldValue)}/>
                                                            </Box>
                                                        </>
                                                    )}
                                                </div>
                                            </Box>
                                        </Form>
                                    )}
                                </Formik>
                            </Container>
                        </Grid>
                        <Grid className="login_img" item xs={12} sm={12} md={6}>
                            <Box className="img-wrapper">
                                <img src={Machin} className="login_img-machin" alt="machin_img" />
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </>
    )
}
