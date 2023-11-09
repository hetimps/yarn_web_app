import React, { } from 'react'
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
import EditQuality from '../pages/EditQuality';
import ViewQuality from '../pages/ViewQuality';

export default function Router() {
    return (
        <BrowserRouter>
            <PrivatePage />
            <Routes>
                <Route path="/Phonno" element={<PhonNo />}></Route>
                <Route path="/Otp" element={<Otp />}></Route>
                <Route path="/Userinformation" element={<UserInfor />}></Route>
                <Route path="/Company" element={<Company />}></Route>
                <Route path="/Quality" element={<Quality />}></Route>
                <Route path="/Join" element={<Join />}></Route>
                <Route path="/Quality" element={<Quality />}></Route>
                <Route path="/Profile" element={<Profile />}></Route>
                <Route path="/Yarn" element={<Yarn />}></Route>
                <Route path="/User" element={<User />}></Route>
                <Route path="/Addquality" element={<AddQuality />}></Route>
                <Route path="/Editquality" element={<EditQuality />}></Route>
                <Route path="/Viewquality" element={<ViewQuality />}></Route>
                <Route path="*" element={<Navigate to="/Phonno" />} />
            </Routes>
        </BrowserRouter >
    )
}
