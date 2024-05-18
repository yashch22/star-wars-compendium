import { Grid, Paper } from "@mui/material";
import React from "react";
import { character, CharacterListProps } from "../../common/types";
import CharacterCard from "../Character-Card";



const CharacterList = ({ recommendList }: CharacterListProps) => {
  console.log("The recommendList is : ", recommendList);
  return (
    <Grid container spacing={2} justifyContent="center">
      {recommendList.map((item) => (
        <Grid item key={item.name} xs={12} sm={6} md={4} lg={3}>
          <Paper elevation={0} sx={{ backgroundColor: "transparent" }}>
            <CharacterCard characterInfo={item} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default CharacterList;
