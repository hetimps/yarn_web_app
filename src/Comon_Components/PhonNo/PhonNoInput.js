
import { FormHelperText, TextField } from "@mui/material";
import React from "react";

import "../../style/PhonNo.scss"
import { ErrorMessage } from "formik";
export default function CustomInput({placeholder,type,email}) {

  const input_style = {
    width: "25rem",
  };

  return (
    <>
      <TextField
        className='custome_input'
        as={TextField}
        style={input_style}
        autoComplete="off"
        type={type}
        placeholder={placeholder}
        name={email}/>
      <FormHelperText error>
        <ErrorMessage name={email} />
      </FormHelperText>
    </>
  );
}
