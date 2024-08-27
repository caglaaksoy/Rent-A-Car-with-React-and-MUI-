import React from "react";
import Box from "@mui/material/Box";
import MarkaFilter from "./SideMenuComponents/MarkaFilter";
import Grid from "@mui/material/Grid";
import VitesFilter from "./SideMenuComponents/VitesFilter";
import YakitTipiFilter from "./SideMenuComponents/YakitTipiFilter";
import RenkFilter from "./SideMenuComponents/RenkFilter";
import LokasyonFilter from "./SideMenuComponents/LokasyonFilter";
import FiyatFilter from "./SideMenuComponents/FiyatFilter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ModelYiliFilter from "./SideMenuComponents/ModelYiliFilter";
import KmFilter from "./SideMenuComponents/KmFilter";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

function SideMenu() {
  const theme = createTheme();
  const filteredCarCount = useSelector((state) => state.cars.filteredCarCount);
  console.log("filteredCarCount:", filteredCarCount);
  return (
    <ThemeProvider theme={theme}>
      <Box
        bgcolor="primary.main"
        p={2}
        sx={{
          marginTop: "135px",
          backgroundColor: "#e7eae8",
          display: "flex",
          flexDirection: "column",
          border: "1px solid lightgrey",
        }}
      >
        <Typography>{filteredCarCount} adet araba listelendi.</Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MarkaFilter />
            <VitesFilter />
            <YakitTipiFilter />
            <FiyatFilter />
            <ModelYiliFilter />
            <KmFilter />
            <RenkFilter />
            <LokasyonFilter />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default SideMenu;
