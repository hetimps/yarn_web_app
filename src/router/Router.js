import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PhonNo from '../pages/PhonNo';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/Phonno" element={<PhonNo/>}></Route>

                <Route path="/" element={<Navigate to="/Phonno" />} />

                <Route path="*" element={<Navigate to="/Phonno" />} />

            </Routes>

        </BrowserRouter >
    )
}
