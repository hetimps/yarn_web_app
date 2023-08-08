import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Loader from '../Comon_Components/Loader';
import { Form, Formik } from 'formik';
import Logo from "../assets/img/logo.svg";
import { String } from "../constants/String";
import Machin from "../assets/img/machin.svg";
import CustomButtons from '../Comon_Components/CustomButtons';
import { MuiOtpInput } from 'mui-one-time-password-input'

export default function Otp() {

    const location = useLocation();

    const { state } = location;

    console.log("mobile no", state.mobileNo)
    const [otp, setOtp] = React.useState('')

    const handleChange = (newValue) => {
      setOtp(newValue)
      console.log(setOtp)
    }


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
                                        component="h2"
                                    >
                                        {String.Tital}
                                    </Typography>
                                    <Typography
                                        className="login_desc"
                                        variant="span"
                                        component="span"
                                    >
                                        {String.des}
                                    </Typography>
                                </Box>
                                <Formik>

                                    {({
                                        values,
                                        handleChange,
                                        errors,
                                        touched,
                                        isSubmitting,
                                    }) => (
                                        <Form
                                        >
                                            <Box className="login_filed">
                                                <Box className="phon_input">

                                                <MuiOtpInput value="234556" />

                                                    <div className="error">{errors.phoneNumber}</div>

                                                </Box>


                                                <div className="btn-out">
                                                    <Box className="login_button">

                                                        <CustomButtons button_name={String.next} />

                                                    </Box>
                                                </div>
                                            </Box>
                                        </Form>
                                    )}
                                </Formik>
                            </Container>
                        </Grid>
                        <Grid className="login_img" item xs={12} sm={12} md={6}>
                            <Box className="img-wrapper">
                                <img
                                    src={Machin}
                                    className="login_img-machin"
                                    alt="machin_img"
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </>
    )
}
