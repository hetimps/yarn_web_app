import { useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

const AuthHandler = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();



    useEffect(() => {
        console.log(pathname === "/Phonno", "Called");
        if (localStorage.getItem("token") && (pathname === '/Company' || pathname === "/Userinformation" || pathname === "/Otp" || pathname === "/Phonno")) {
            console.log("called")
            navigate('/Quality');
        }
    }, [pathname]);

    return null;
};

export default AuthHandler;