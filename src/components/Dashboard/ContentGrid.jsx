import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DCard from "./DCard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ContentGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs>
          <DCard heading="Location" toshow="location" lat="23.18" lon="80.03" />
          <DCard heading="Test Cards" />
          <DCard heading="Test Cards" />
          <DCard heading="Test Cards" />
          <DCard heading="Test Cards" />
          <DCard heading="Test Cards" />
        </Grid>
        {/* <Grid item xs>
          <DCard heading="Latitude" />
        </Grid>
        <Grid item xs>
          <DCard heading="Latitude" />
        </Grid> */}
      </Grid>
    </Box>
  );
}
