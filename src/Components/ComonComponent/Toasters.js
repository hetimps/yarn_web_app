import React from 'react'
import { Toaster } from 'react-hot-toast'

export default function Toasters() {
    const toasterStyles = {
        fontFamily: 'Poppins,sans-serif', 
    };

    return (
            <Toaster toastOptions={{
                // duration: 10000,
                style: toasterStyles, success: {
                    iconTheme: {
                        primary: "#E89E46",
                        secondary: "white",
                    },
                },
                error: {
                    iconTheme: {
                        primary: "#E89E46",
                        secondary:"white",
                    },
                }
            }}
                position="top-right"
                reverseOrder={false}/>
    )
}
