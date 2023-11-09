import { TextField } from '@mui/material'
import React from 'react'
export default function TextFields({ placeholder, name, width, value, error, onChange, helperText }) {
  const style = {
    width: width || "50%",
  }
  return (
    <>
      <TextField placeholder={placeholder} error={error} helperText={helperText} value={value} onChange={onChange} style={style} className='quality_input' name={name} autoComplete='off' id="outlined-basic" variant="outlined"></TextField>
    </>
  )
}
