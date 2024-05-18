import React, { useContext, useState } from "react";
import { character, CharacterCardProps } from "../../common/types";
import { Box, Card, CardContent, Typography } from "@mui/material";
import CharacterModal from "../Modal"; // Import your Modal component
import getSpeciesColor from "./card-color";

const CharacterCard = ({ characterInfo }: CharacterCardProps) => {
  const [hovered, setHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const defaultImageUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPNSEx2uzMdrIhpaoNn9__EPPhFUP6d_EOkwhAWVgk0A&s";

  const backgroundColor = getSpeciesColor(characterInfo.species) || "#FFFFFF";

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          bgcolor: backgroundColor, // Set background color based on gender
          color: "#E0E0E0",
          my: 3,
          border: "2px solid transparent",
          borderRadius: "8px",
          transition: "border-color 0.3s, transform 0.3s",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          "&:hover": {
            borderColor: "#BDBDBD",
            transform: "scale(1.1)",
          },
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleCardClick}
      >
        <CardContent sx={{ p: 0, position: "relative" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%", // Fill the height of the Card
            }}
          >
            <img
              src={characterInfo.image_url}
              alt={characterInfo.name}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "400px",
                borderRadius: "8px",
              }}
              onError={(e) => {
                console.log("got into error");
                return (e.currentTarget.src = defaultImageUrl);
              }}
            />
            <Typography
              fontSize={10}
              color="#E0E0E0"
              aria-label="year of birth"
            >
              {characterInfo.birth_year}
            </Typography>
            <Typography aria-label="chracter name" padding={0}>
              {characterInfo.name}
            </Typography>
          </Box>
        </CardContent>
      </Card>
      {isModalOpen && (
        <CharacterModal
          characterInfo={characterInfo}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default CharacterCard;
