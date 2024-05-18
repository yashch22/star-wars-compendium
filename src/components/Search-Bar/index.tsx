import React, { useState } from "react";
import { Paper, InputBase, InputAdornment, Button } from "@mui/material";
import SearchIcon from "../../assets/icons/icon-search.svg";

// @ts-ignore
const SearchBar = ({ onSearch }) => {
    const [search, setSearch] = useState("");

    const handleSearchButtonClick = () => {
        onSearch(search);
    };

    return (
        <Paper
            component="form"
            sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: "default",
                backgroundImage:
                    "url('https://media.giphy.com/media/U3qYN8S0j3bpK/giphy.gif')",
                p: 1,
                backgroundColor: "#10141f",
                border: "none",
            }}
        >
            <InputBase
                placeholder="Search for your favourite character here!!!"
                sx={{
                    ml: 1,
                    flex: 1,
                    color: "white",
                    border: "none",
                }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearchButtonClick(); // Call search function on Enter key press
                    }
                }}
                startAdornment={
                    <InputAdornment position="start">
                        <img src={SearchIcon} alt="search icon" width={20} height={20} />
                    </InputAdornment>
                }
            />
            <Button
                onClick={handleSearchButtonClick}
                variant="contained"
                color="primary"
            >
                Search
            </Button>
        </Paper>
    );
};

export default SearchBar;
