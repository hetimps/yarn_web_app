import React from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import "../style/PhonNo.scss";
import Logo from "../assets/img/logo.svg";
import { String } from "../constants/String";
import Machin from "../assets/img/machin.svg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useLoginUserMutation } from "../api/PhonNumber";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from '../Components/ComonComponent/Loader';
import CustomButtons from "../Components/ComonComponent/CustomButtons";
import { Regex } from "../constants/Regex";


const PhonNo = () => {

  const defaultValue = {
    phoneNumber: "",
  };


  const isValidLast10Digits = (value) => {
    return Regex.mobile_no.test(value);
  };

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required(String.required)
      .test(String.validation, String.validation, (value) => {
        const last10Digits = value.substr(2);
        return isValidLast10Digits(last10Digits);
      })
  });


  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();
  const handleSubmit = async (values) => {

    const countryCode = document
      .querySelector(".react-tel-input .selected-flag")
      .getAttribute("title");

    let index = countryCode.indexOf("+");
    const PhonCode = countryCode.substring(index + 1).trim();
    console.log(PhonCode);
    const length = PhonCode.length;
    const phoneNumber = values.phoneNumber;
    const Number = (phoneNumber.substr(length));
    console.log(Number);

    const body = {
      countryCode: PhonCode,
      mobileNo: Number
    }

    try {
      const response = await loginUser(body)
      console.log(response)
      const status = response?.data?.statusCode;
      const message = response?.data?.message;

      if (status === 200) {
        const loginOtp = response?.data?.result?.loginOtp;
        const mobileNo = response?.data?.result?.mobileNo;
        const countryCode = response?.data?.result?.countryCode;

        toast.success(message)

        navigate("/Otp", {
          state: {
            "countryCode": countryCode,
            "loginOtp": loginOtp,
            "mobileNo": mobileNo
          }
        })
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

                <Formik
                  initialValues={defaultValue}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}>

                  {({
                    values,
                    handleChange,
                    errors,
                    touched,
                    handleSubmit
                  }) => (
                    <Form
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSubmit(values);
                        }
                      }}
                    >
                      <Box className="login_filed">
                        <Box className="phon_input">

                          <PhoneInput
                            inputProps={{
                              autoFocus: true,
                              name: "phoneNumber",
                              autoComplete: "off",

                            }}

                            countryCodeEditable={false}
                            country="in"
                            value={values.phoneNumber}
                            onChange={(value) => {
                              handleChange("phoneNumber")(value)
                            }}
                            searchable={true}
                            disableDropdown={true}
                          />

                          {touched.phoneNumber && errors.phoneNumber && (
                            <div className="error">{errors.phoneNumber}</div>
                          )}

                        </Box>
                        <div className="btn-out">
                          {isLoading ? (<Box className="loader">
                            <Loader />
                          </Box>) : (<Box className="login_button">
                            <CustomButtons button_name={String.next} />
                          </Box>)}
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
  );
};
export default PhonNo;