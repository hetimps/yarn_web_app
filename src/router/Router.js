import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PhonNo from '../pages/PhonNo';
import Otp from '../pages/Otp';
import PrivatePage from './PrivatePage';
import UserInfor from '../pages/UserInfor';
import Company from '../pages/Company';
import Quality from '../pages/Quality';
import Join from '../pages/Join';
import Profile from '../pages/Profile';
import Yarn from '../pages/Yarn';
import User from '../pages/User';
import AddQuality from '../pages/AddQuality';


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/Phonno" element={<PhonNo/>}></Route>
                <Route path="/Otp" element={<PrivatePage><Otp /></PrivatePage>}></Route>
                <Route path="/Userinformation" element={<PrivatePage><UserInfor /></PrivatePage>}></Route>
                <Route path="/Company" element={<PrivatePage><Company /></PrivatePage>}></Route>
                <Route path="/Quality" element={<PrivatePage><Quality /></PrivatePage>}></Route>
                <Route path="/Join" element={<PrivatePage><Join /></PrivatePage>}></Route>
                <Route path="/Quality" element={<PrivatePage><Quality /></PrivatePage>}></Route>
                <Route path="/Profile" element={<PrivatePage><Profile /></PrivatePage>}></Route>
                <Route path="/Yarn" element={<PrivatePage><Yarn /></PrivatePage>}></Route>
                <Route path="/User" element={<PrivatePage><User /></PrivatePage>}></Route>
                <Route path="/Addquality" element={<PrivatePage><AddQuality/></PrivatePage>}></Route>
                <Route path="*" element={<Navigate to="/Phonno" />} />

            </Routes>
        </BrowserRouter >
    )
}
