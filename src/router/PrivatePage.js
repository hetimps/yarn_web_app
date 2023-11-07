// import React, { useEffect } from 'react'

// import { useLocation, useNavigate } from 'react-router-dom'

// export default function PrivatePage({ children }) {

//     const location = useLocation();

//     const state = location?.state;
//     const mobile_no = state?.mobileNo;
//     const otp = state?.response?.data?.result?.loginOtp;

//     const username = state?.response?.data?.result?.userName;

//     const isCreatedCompany = state?.response?.data?.result?.isCreatedCompany;

//     const isJoinedCompanyDirect = state?.response?.data?.result?.isJoinedCompany;

//     const isJoinedCompany = state?.isJoinedCompany;

//     console.log(isJoinedCompany, "isJoinedCompany")

//     console.log(isCreatedCompany, "isCreatedCompany")

//     const navigate = useNavigate();

//     const user = JSON.parse(localStorage.getItem("token"))

//     useEffect(() => {

        

//         if (!mobile_no && location?.pathname === "/Otp") {
//             navigate("/Phonno")
//         } else if (!otp && location?.pathname === "/Userinformation") {
//             navigate("/Otp")
//         }
//         else if (!username && location?.pathname === "/Company") {
//             navigate("/Userinformation")
//         } else if (!isCreatedCompany && location?.pathname === "/Quality") {
//             navigate("/Company")
//         } else if ((!isJoinedCompanyDirect && location?.pathname === "/Join") && (!isJoinedCompany && location?.pathname === "/Join")) {
//             navigate("/Company")
//         }

//     }, [navigate, user, mobile_no, location?.pathname, otp, username])

//     return (
//         <div>
//             {children}
//         </div>
//     )
// }


import React from 'react'
import { Navigate } from 'react-router'
import { useLocation } from 'react-router-dom'

export default function PrivatePage({ children }) {

    const location = useLocation();

    const state = location?.state;
    const mobile_no = state?.mobileNo;
    const username = state?.username;


    const user = JSON.parse(localStorage.getItem("token"))

    // if (user) {
    //     return <Navigate to="/Quality" />; 
    // }

    if (!mobile_no && !user && !username) {
        return <Navigate to="/Phonno" />
    }

    return (
        <div>
            {children}
        </div>
    )
}