import { Box, Container, Grid, IconButton, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import Machin from "../assets/img/machin.svg";
import Logo from "../assets/img/logo.svg";
import { Form, Formik } from 'formik';
import CustomButtons from '../Components/ComonComponent/CustomButtons';
import { String } from '../constants/String';
import { MdEmail } from "react-icons/md";
import { BiSolidUser } from "react-icons/bi";
import * as Yup from "yup";
import { useUserInfoMutation } from '../api/UserInfo';
import { toast } from 'react-hot-toast';
import Loader from '../Components/ComonComponent/Loader';
import { useNavigate } from 'react-router-dom';
import { Regex } from '../constants/Regex';

export default function UserInfor() {

  const [User, { isLoading }] = useUserInfoMutation();
  const navigate = useNavigate();
  const defaultValue = {
    userName: "",
    userEmail: ""
  };
  const validationSchema = Yup.object({
    userName: Yup.string().required(String.user_required).matches(Regex.user_name, String.user_required),
    userEmail: Yup.string().matches(Regex.email_regex, String.email_format)
  });

  const handleSubmit = async (values) => {
    try {
      const response = await User(values);
      const status = response?.data?.statusCode;
      const message = response?.data?.message;
      if (status === 200) {
        toast.success(message)
        const userName = response?.data?.result?.userName;
        localStorage.setItem("username", JSON.stringify(userName));
        navigate("/Company", {
          state: {
            response
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
  }

  return (
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
                  {String.user_tital}
                </Typography>
                <Typography
                  className="login_desc"
                  variant="span"
                  component="span">
                  {String.user_des}
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
                }) => (
                  <Form>
                    <Box className="login_filed">
                      <Box style={{ marginTop: "1rem" }}>

                        <TextField className='user_input' name="userName" autoComplete='off' id="outlined-basic" variant="outlined"
                          sx={{ width: "100%", height: "1.5rem" }}
                          InputProps={{
                            startAdornment: (
                              <IconButton>
                                <BiSolidUser style={{ color: "#E89E46" }} />
                              </IconButton>
                            ),
                          }}
                          onChange={handleChange}
                          value={values.userName}
                          placeholder={String.user_placeholder}
                          error={touched.userName && Boolean(errors.userName)}
                          helperText={touched.userName && errors.userName}

                        />
                        <TextField name="userEmail" autoComplete='off' id="outlined-basic" variant="outlined" sx={{ width: "100%", marginTop: "3.5rem", marginBottom: "2rem" }}
                          InputProps={{
                            startAdornment: (
                              <IconButton >
                                <MdEmail style={{ color: "#E89E46", }} />
                              </IconButton>
                            ),
                          }}
                          onChange={handleChange}
                          value={values.userEmail}
                          error={touched.userEmail && Boolean(errors.userEmail)}
                          helperText={touched.userEmail && errors.userEmail}
                          placeholder={String.email_placeholder}
                        />
                      </Box>
                      <div className="btn-out">
                        {isLoading ? (<Box className="loader">
                          <Loader />
                        </Box>) : (<Box className="login_button">
                          <CustomButtons button_name={String.done} />
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
              <img src={Machin} className="login_img-machin" alt="machin_img" />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}
