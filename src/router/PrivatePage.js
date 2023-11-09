import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useProfileQuery } from '../api/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../Redux/AuthSlice';

export default function PrivatePage({ children }) {
    const data = useSelector((state) => state.currentUser.currentUser)
    const { data: Userdata } = useProfileQuery({}, { skip: !!data });
    const dispatch = useDispatch()
    const location = useLocation();
    const navigate = useNavigate();
    const state = location?.state;
    const mobile_no = state?.mobileNo;
    const otp = state?.response?.data?.result?.loginOtp;
    const username = state?.response?.data?.result?.userName;
    const company_name = state?.response?.data?.result?.companyName;
    const isCreatedCompany = state?.response?.data?.result?.isCreatedCompany;
    const requestStatus = state?.response?.data?.result?.requestStatus;
    const isJoinedCompany = state?.response?.data?.result?.isJoinedCompany;
    const isJoinedCompanyCustome = state?.isJoinedCompanyCustome;
    const user = JSON.parse(localStorage.getItem("token"))

    useEffect(() => {
        if (user && data) {
            // When we have token and user data in state
            if (data?.isCreatedCompany) {
                navigate("/Quality")
                return
            }
            if (data?.isJoinedCompany) {
                if (data?.requestStatus === "approved" && data?.isJoinedCompany) {
                    navigate("/Quality")
                    return
                } else {
                    navigate("/Join")
                    return
                }
            }
            navigate("/Phonno")
        } else if (user && !data) {
            // When we have token but not user data in state
            if (!Userdata) return
            dispatch(setCurrentUser(Userdata?.result))
            if (Userdata?.result?.isCreatedCompany) {
                ['/Phonno', '/Otp', '/Userinformation', '/Company', '/Join'].includes(location.pathname) && navigate("/Quality")
                // navigate("/Quality")
                return
            }
            if (Userdata?.result?.isJoinedCompany) {
                if (Userdata?.result?.requestStatus === "approved" && Userdata?.result?.isJoinedCompany) {
                    navigate("/Quality")
                    return
                } else {
                    navigate("/Join")
                    return
                }
            }
            navigate("/Phonno")
        } else {
            // When you don't have token and user data in state
            navigate("/Phonno")
        }
    }, [Userdata])

    useEffect(() => {
        if (!mobile_no && location?.pathname === "/Otp") {
            navigate("/Phonno")
        }
        else if (!otp && location?.pathname === "/Userinformation") {
            navigate("/Otp")
        } else if (!username && location?.pathname === "/Company") {
            navigate("/Userinformation")
        } else if ((!company_name && location?.pathname === "/Quality") && (!isCreatedCompany && location?.pathname === "/Quality") && (!requestStatus === "approved" && location?.pathname === "/Quality")) {
            navigate("/Company")
        }
        // else if ((!isJoinedCompany && location?.pathname === "/Join") && (!isJoinedCompanyCustome && location?.pathname === "/Join")) {
        //     navigate("/Company")
        // }
    }, [navigate])

    return (
        <div>
            {children}
        </div>
    )
}