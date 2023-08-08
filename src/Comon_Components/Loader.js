import React from 'react'
import { ColorRing } from 'react-loader-spinner'



export default function Loader() {
    return (
        <ColorRing
            visible={true}
            height="50"
            width="50"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#E89E46", "#E89E46", "#E89E46", "#E89E46", "#E89E46"]}
        />
    )
}
