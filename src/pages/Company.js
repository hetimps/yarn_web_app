import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import Machin from "../assets/img/machin.svg";
import Logo from "../assets/img/logo.svg";
import { Form, Formik } from 'formik';
import { String } from '../constants/String';
import "../style/Compnay.scss"
import CompanyDialog from '../Components/CompanyComponent/CompanyDialog';
import JoinDialog from '../Components/CompanyComponent/JoinDialog';

export default function Company() {
  const [openAdd, setOpenAdd] = useState(false);
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };
  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const [openJoin, setOpenJoin] = useState(false);
  const handleCloseJoin = () => {
    setOpenJoin(false);
  };

  const handleOpenJoin = () => {
    setOpenJoin(true);
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
                    {String.company_tital}
                  </Typography>
                  <Typography
                    className="login_desc"
                    variant="span"
                    component="span">
                    {String.user_des}
                  </Typography>
                </Box>
                <Formik>
                  <Form>
                    <Box className="login_filed">
                      <div >
                        <Box className="user_btns">
                          <Button onClick={handleOpenAdd} className='user_btn' variant="outlined">{String.add_company}</Button>
                          <Button onClick={handleOpenJoin} className='user_btn' variant="outlined">{String.join_company}</Button>
                        </Box>
                      </div>
                    </Box>
                  </Form>
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
      <CompanyDialog open={openAdd} onClose={handleCloseAdd} />
      <JoinDialog open={openJoin} onClose={handleCloseJoin} />
    </>
  )
}
