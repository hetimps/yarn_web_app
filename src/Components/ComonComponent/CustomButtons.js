
import { Button} from '@mui/material'
import React from 'react'
import "../../style/PhonNo.scss"

export default function CustomButtons({ button_name }) {
    const Button_style = {
        width:"20rem",
        background: "#E89E46",
        height:"55px",
    }
    return (
        <Button type='submit' className='buttoms_login' style={Button_style} variant="contained" >
            {button_name}
        </Button>
    )
}

