// // import { Box, Container, Grid, Paper, Typography } from "@mui/material";
// // import "../style/PhonNo.scss"
// // import Logo from '../assets/img/logo.svg'
// // import { String } from "../constants/String";
// // import Machin from "../assets/img/machin.svg"
// // import CustomButtons from "../Comon_Components/CustomButtons";
// // import PhoneInput from "react-phone-input-2";
// // import 'react-phone-input-2/lib/style.css'
// // import { Form, Formik } from "formik";
// // import * as Yup from "yup";

// // const defaultValue = {
// //   phoneNumber: "",
// // };


// // const validationSchema = Yup.object().shape({

// // });


// // const PhonNo = () => {

// //   const handleSubmit = (values) => {

// //     console.log("Submitted phone number:", values.phoneNumber);

// //   };
// //   return (
// //     <>
// //       <Box className="login-container" sx={{ flexGrow: 1 }}>

// //         <Paper className="login_pepar">

// //           <Grid container spacing={0}>

// //             <Grid item xs={12} sm={12} md={6} className="forms_container" >

// //               <Container >
// //                 <Box className="logo_img_wrapper">
// //                   <img src={Logo} alt="logo" />
// //                 </Box>
// //                 <Box className="login_dec_wrapper">
// //                   <Typography
// //                     className="login_tital"
// //                     variant="span"
// //                     component="h2"
// //                   >
// //                     {String.Tital}
// //                   </Typography>
// //                   <Typography
// //                     className="login_desc"
// //                     variant="span"
// //                     component="span"
// //                   >
// //                     {String.des}
// //                   </Typography>
// //                 </Box>
// //                 <Formik initialValues={defaultValue}
// //                   validationSchema={validationSchema}
// //                   onSubmit={ handleSubmit}
// // >

// //                   <Form>
// //                     <Box className="login_filed">

// //                       <Box className="phon_input">


// //                         <PhoneInput

// //                           inputProps={{
// //                             required: true,
// //                             autoFocus: true,
// //                             name: "phoneNumber",
// //                           }}
// //                           value={""}
// //                         />
// //                       </Box>

// //                       <Box className="login_button">
// //                         <CustomButtons
// //                           type="submit"
// //                           button_name={String.next}
// //                         />
// //                       </Box>
// //                     </Box>
// //                   </Form>
// //                 </Formik>

// //               </Container>

// //             </Grid>

// //             <Grid className="login_img" item xs={12} sm={12} md={6}  >
// //               <Box className="img-wrapper">
// //                 <img
// //                   src={Machin}
// //                   className="login_img-machin"
// //                   alt="machin_img"
// //                 />
// //               </Box>
// //             </Grid>
// //           </Grid>
// //         </Paper>
// //       </Box>
// //     </>
// //   );
// // };
// // export default PhonNo;

import React from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import "../style/PhonNo.scss";
import Logo from '../assets/img/logo.svg';
import { String } from "../constants/String";
import Machin from "../assets/img/machin.svg";
import CustomButtons from "../Comon_Components/CustomButtons";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { Form, Formik } from "formik";
import * as Yup from "yup";

const defaultValue = {
  phoneNumber: "91",
};

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("enter valid number").min(12, "enter valid number")
});

const PhonNo = () => {
  const handleSubmit = (values) => {
    console.log("Submitted phone number:", values.phoneNumber);
  };

  return (
    <>
      <Box className="login-container" sx={{ flexGrow: 1 }}>
        <Paper className="login_pepar">
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={6} className="forms_container">
              <Container>
                <Box className="logo_img_wrapper">
                  <img src={Logo} alt="logo" />
                </Box>
                <Box className="login_dec_wrapper">
                  <Typography className="login_tital" variant="span" component="h2">
                    {String.Tital}
                  </Typography>
                  <Typography className="login_desc" variant="span" component="span">
                    {String.des}
                  </Typography>
                </Box>
                <Formik
                  initialValues={defaultValue}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ values, handleChange, errors, touched, isSubmitting }) => (
                    <Form>
                      <Box className="login_filed">
                        <Box className="phon_input">
                          <PhoneInput
                            inputProps={{
                              // required: true,
                              autoFocus: true,
                              name: "phoneNumber",
                              placeholder: "Enter your phone number",

                            }}
                            value={values.phoneNumber}
                            onChange={handleChange("phoneNumber")}
                          />
                          {touched.phoneNumber && errors.phoneNumber && (
                            <div className="error">{errors.phoneNumber}</div>
                          )}
                        </Box>
                        <Box className="login_button">
                          <CustomButtons type="submit" button_name={String.next} />
                        </Box>
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
  );
};

export default PhonNo;


