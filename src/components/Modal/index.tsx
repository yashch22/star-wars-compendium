import React, { useState, useEffect } from "react";
import { character, PlanetDataType, ModalProps } from "../../common/types";
import {
    Modal,
    Typography,
    Box,
    IconButton,
    Grid,
    Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HeightIcon from "@mui/icons-material/Height";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EventIcon from "@mui/icons-material/Event";
import BirthdayIcon from "@mui/icons-material/Cake";
import PublicIcon from "@mui/icons-material/Public";
import LandscapeIcon from "@mui/icons-material/Landscape";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

import dayjs from "dayjs";

const CharacterModal: React.FC<ModalProps> = ({
    characterInfo,
    open,
    onClose,
}) => {
    const [modalStyle, setModalStyle] = useState({
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    });

    const [planetData, setPlanetData] = useState<PlanetDataType | null>(null);

    useEffect(() => {
        const handleResize = () => {
            setModalStyle({
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const fetchPlanetData = async () => {
            try {
                const response = await fetch(characterInfo.homeworld);
                const data = await response.json();
                const planetInfo: PlanetDataType = {
                    name: data.name,
                    terrain: data.terrain,
                    climate: data.climate,
                    population: data.population,
                };
                setPlanetData(planetInfo);
            } catch (error) {
                console.error("Error fetching planet data:", error);
            }
        };

        if (characterInfo.homeworld) {
            fetchPlanetData();
        }
    }, [characterInfo.homeworld]);

    const formattedDate = dayjs(characterInfo.created).format("DD-MM-YYYY");

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    ...modalStyle,
                    bgcolor: "#f5f5f5",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: "12px",
                    width: { xs: "90%", md: "60%" },
                    fontFamily: "Montserrat, sans-serif",
                    maxHeight: "80vh",
                    overflowY: "auto",
                    border: "1px solid #ddd",
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <IconButton
                    onClick={onClose}
                    sx={{ position: "absolute", top: 0, right: 0, color: "#555" }}
                >
                    <CloseIcon />
                </IconButton>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <img
                            src={characterInfo.image_url}
                            alt={characterInfo.name}
                            style={{
                                width: "100%",
                                borderRadius: "12px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="h3"
                            gutterBottom
                            sx={{
                                fontWeight: "bold",
                                textAlign: "center",
                                fontFamily: "Arial, sans-serif",
                                fontSize: "2.5rem",
                                color: "#FF5733",
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
                                letterSpacing: "1px",
                                textDecoration: "underline",
                            }}
                        >
                            {characterInfo.name}
                        </Typography>

                        <Box mb={4}>
                            <Box
                                mb={2}
                                sx={{ bgcolor: "#f0f0f0", p: 3, borderRadius: "8px" }}
                            >
                                <Typography
                                    variant="h2"
                                    gutterBottom
                                    sx={{
                                        color: "#333",
                                        fontWeight: "bold",
                                        fontStyle: "italic",
                                        fontFamily: "Arial, sans-serif",
                                    }}
                                >
                                    Personal Info
                                </Typography>
                                <Divider sx={{ my: 3 }} />
                                <Box mb={2}>
                                    <Typography variant="h6" sx={{ color: "#1E90FF" }}>
                                        <HeightIcon
                                            sx={{ mr: 1, fontSize: 20, color: "#1E90FF" }}
                                        />{" "}
                                        Height: {characterInfo.height} meters
                                    </Typography>
                                </Box>
                                <Box mb={2}>
                                    <Typography variant="h6" sx={{ color: "#FF1493" }}>
                                        <FitnessCenterIcon
                                            sx={{ mr: 1, fontSize: 20, color: "#FF1493" }}
                                        />{" "}
                                        Mass: {characterInfo.mass} kg
                                    </Typography>
                                </Box>
                                <Box mb={2}>
                                    <Typography variant="h6" sx={{ color: "#008000" }}>
                                        <EventIcon sx={{ mr: 1, fontSize: 20, color: "#008000" }} />{" "}
                                        Date Added: {formattedDate}
                                    </Typography>
                                </Box>
                                <Box mb={2}>
                                    <Typography variant="h6" sx={{ color: "#9932CC" }}>
                                        <BirthdayIcon
                                            sx={{ mr: 1, fontSize: 20, color: "#9932CC" }}
                                        />{" "}
                                        Birth Year: {characterInfo.birth_year}
                                    </Typography>
                                </Box>
                                <Box mb={2}>
                                    <Typography variant="h6" sx={{ color: "#FF5733" }}>
                                        <ConfirmationNumberIcon sx={{ mr: 1, fontSize: 20, color: "#FF5733" }} />{" "}
                                        Number of Films: {characterInfo.films.length}
                                    </Typography>
                                </Box>


                            
                            </Box>

                            {planetData && (
                                <Box sx={{ bgcolor: "#f0f0f0", p: 3, borderRadius: "8px" }}>
                                    <Typography
                                        variant="h2"
                                        gutterBottom
                                        sx={{
                                            color: "#333",
                                            fontWeight: "bold",
                                            fontStyle: "italic",
                                            fontFamily: "Arial, sans-serif",
                                        }}
                                    >
                                        Planet Info
                                    </Typography>
                                    <Divider sx={{ my: 3 }} />
                                    <Box mb={2}>
                                        <Typography variant="h6" sx={{ color: "#008000" }}>
                                            <PublicIcon
                                                sx={{ mr: 1, fontSize: 20, color: "#008000" }}
                                            />{" "}
                                            Homeworld: {planetData.name}
                                        </Typography>
                                    </Box>
                                    <Box mb={2}>
                                        <Typography variant="h6" sx={{ color: "#1E90FF" }}>
                                            <LandscapeIcon
                                                sx={{ mr: 1, fontSize: 20, color: "#1E90FF" }}
                                            />{" "}
                                            Terrain: {planetData.terrain}
                                        </Typography>
                                    </Box>
                                    <Box mb={2}>
                                        <Typography variant="h6" sx={{ color: "#FF6347" }}>
                                            <AcUnitIcon
                                                sx={{ mr: 1, fontSize: 20, color: "#FF6347" }}
                                            />{" "}
                                            Climate: {planetData.climate}
                                        </Typography>
                                    </Box>
                                    <Box mb={2}>
                                        <Typography variant="h6" sx={{ color: "#9932CC" }}>
                                            <PeopleAltIcon
                                                sx={{ mr: 1, fontSize: 20, color: "#9932CC" }}
                                            />{" "}
                                            Population: {planetData.population}
                                        </Typography>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export default CharacterModal;
