import React, { useState, useContext, useEffect } from "react";
import Layout from "../../Layout";
import { Box, Typography, Button } from "@mui/material";
import { fetchCharacters } from "../../services/api";
import CharacterList from "../../components/Character-List";
import { imageMapping } from "../../common/data";
import SearchBar from "../../components/Search-Bar";

const Home = () => {
    const [searchList, setSearchList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isPrevDisabled, setIsPrevDisabled] = useState(true);
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const [isSearchClicked, setIsSearchClicked] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchData();
        console.log(
            "=====================searchList=====================",
            searchList
        );
    }, []);
    // @ts-ignore
    const fetchData = async (page = 1, search = "") => {
        try {
            const response = await fetchCharacters(page, search);
            const updatedSearchList = response.results.map((item) => {
                const matchedImage = imageMapping.find(
                    (mapping) => mapping.name === item.name
                );
                return {
                    ...item,
                    image_url: matchedImage ? matchedImage.image_url : "",
                };
            });
            // @ts-ignore
            setSearchList(updatedSearchList);
            setIsPrevDisabled(!response.previous);
            setIsNextDisabled(!response.next);
            console.log(
                "=======================updatedSearchList=======================",
                updatedSearchList
            );
            console.log(
                "=======================searchList=======================",
                searchList
            );
        } catch (error) {
            console.error("Error fetching characters:", error);
        }
    };

    const handleNextPage = async () => {
        console.log("=======================handling next=======================");
        const nextPage = currentPage + 1;
        fetchData(nextPage, search);
        setCurrentPage(nextPage);
    };

    const handlePrevPage = async () => {
        const prevPage = currentPage - 1;
        fetchData(prevPage, search);
        setCurrentPage(prevPage);
    };
    // @ts-ignore
    const handleSearch = async (searchQuery = "") => {
        setSearch(searchQuery);
        setIsSearchClicked(true);
        setCurrentPage(1);
        try {
            const response = await fetchCharacters(1, searchQuery);
            const updatedSearchList = response.results.map((item) => {
                const matchedImage = imageMapping.find(
                    (mapping) => mapping.name === item.name
                );
                return {
                    ...item,
                    image_url: matchedImage ? matchedImage.image_url : "",
                };
            });

            // @ts-ignore
            setSearchList(updatedSearchList);
            setIsPrevDisabled(!response.previous);
            setIsNextDisabled(!response.next);
        } catch (error) {
            console.error("Error fetching characters:", error);
        }
    };

    const currentCharacters = searchList;

    return (
        <Layout>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/2560px-Star_Wars_Logo.svg.png"
                    alt="Logo"
                    style={{
                        width: "300px",
                        height: "auto",
                        marginBottom: "20px",
                        borderRadius: "50%",
                    }}
                />
            </Box>

            <Box>
                {/*search bar */}
                <SearchBar onSearch={handleSearch} />
                <Box>
                    <Box py={2} px={4}>
                        <Box width="100%">
                            {isSearchClicked ? (
                                <>
                                    <Typography>
                                        Found {searchList.length} results for "{search}"
                                    </Typography>
                                    <CharacterList recommendList={currentCharacters} />
                                </>
                            ) : (
                                <>
                                    <Typography
                                        variant="h5"
                                        component="h1"
                                        my={6}
                                        fontWeight={400}
                                    >
                                        Discover Your Favorite Starwars Characters: Learn More About
                                        Them!
                                    </Typography>
                                    {/* Main Character grid start here */}
                                    <CharacterList recommendList={currentCharacters} />
                                </>
                            )}
                        </Box>
                    </Box>

                    {/* Pagination buttons */}
                    <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
                        <Button
                            onClick={handlePrevPage}
                            disabled={isPrevDisabled}
                            variant="contained"
                            color="primary"
                            sx={{ marginRight: 1 }}
                        >
                            Previous
                        </Button>
                        <Button
                            onClick={handleNextPage}
                            disabled={isNextDisabled}
                            variant="contained"
                            color="primary"
                        >
                            Next
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Layout>
    );
};

export default Home;
