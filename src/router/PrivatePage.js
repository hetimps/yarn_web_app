import React from 'react'
import { Navigate } from 'react-router'
import { useLocation } from 'react-router-dom'

export default function PrivatePage({ children }) {
   
    const location = useLocation();

    const {state} = location;

    console.log(state)

    if (!state) {
        return <Navigate to="/Phonno" />
    }
    return (
        <div>
            {children}
        </div>
    )
}


