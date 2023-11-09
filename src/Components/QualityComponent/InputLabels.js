import React from 'react'
import "../../style/Quality/AddQualityForm.scss"
import { InputLabel } from '@mui/material'
export default function InputLabels({ name, m }) {
    const style = {
        margin: m || "0rem 0rem 0rem 0rem",
    }
    return (
        <>
            <InputLabel className="label" style={style}>
                {name}
            </InputLabel>
        </>
    )
}
