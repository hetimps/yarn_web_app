import React from 'react'
import { useLocation } from 'react-router-dom';

export default function EditQuality() {
    const location = useLocation();
    const { state } = location;

    console.log("edit_id", state._id)
    return (
        <div>EditQuality</div>
    )
}
