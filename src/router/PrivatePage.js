import React from 'react'
import { Navigate } from 'react-router'
import { useLocation } from 'react-router-dom'

export default function PrivatePage({ children }) {

    const location = useLocation();

    const  state  = location?.state;
    const mobile_no = state?.mobileNo;
    const username = state?.username;


    const user = JSON.parse(localStorage.getItem("token"))


    if (!mobile_no && !user && !username  ) {
        return <Navigate to="/Phonno" />
    }
    
    return (
        <div>
            {children}
        </div>
    )
}