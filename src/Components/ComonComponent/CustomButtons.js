import { Button } from '@mui/material'
import React from 'react'
import "../../style/PhonNo/PhonNo.scss"
export function Buttons({ onClick, className, variant, button_name,startIcon,type,disabled}) {
    return (
        <Button onClick={onClick} className={className} variant={variant} startIcon={startIcon} type={type} disabled={disabled}>{button_name}</Button>
    )
}

