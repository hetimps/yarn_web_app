import { Button, IconButton, InputBase } from '@mui/material'
import React from 'react'
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from '@mui/icons-material/Clear';
import "../../style/Quality/Drawer_Navbar.scss"

export default function Search({ setpage, setsearch, setinput, input, isFetching, disabled }) {
    const onKeyDown = (e) => {
        if (e.key === "Enter") {
            setsearch(input);
            setpage(1)
        }
    };

    const handleChange = (e) => {
        if (e.target.value === "") {
            setinput("");
            setsearch("");
        }
        setinput(e.target.value);
    };

    const handleClearSearch = () => {
        setinput("")
        setsearch("")
    }

    const HandleSearch = () => {

        setsearch(input);
        setpage(1);
    }

    return (
        <>
            <InputBase
                placeholder="Search..."
                inputProps={{ "aria-label": "search" }}
                className="appbar_search"
                endAdornment={
                    <div className="appbar_search_right">
                        {input !== "" && (
                            <IconButton onClick={handleClearSearch}>
                                <ClearIcon />
                            </IconButton>
                        )}
                        <Button onClick={HandleSearch} className="appbar_search_button" variant="contained">
                            <SearchIcon className="appbar_search_icon" />
                        </Button>
                    </div>
                }
                value={input}
                onChange={isFetching ? null : handleChange}
                onKeyDown={onKeyDown}
                disabled={disabled} />
        </>
    )
}


