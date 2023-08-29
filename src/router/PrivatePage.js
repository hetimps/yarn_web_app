import React from 'react'
import { Navigate } from 'react-router'


export default function PrivatePage({ children }) {

    const user = JSON.parse(localStorage.getItem("token"))


    if (!user) {
        return <Navigate to="/Phonno" />
    }
    
    return (
        <div>
            {children}
        </div>
    )
}