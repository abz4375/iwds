import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DCard from "./DCard";
import DatVis from "./cards/DataVis";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ContentGrid(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs>
          <DCard
            heading="Live Location"
            toshow="location"
            lat="23.18"
            lon="80.03"
            database={props.database}
          />
          <DCard
            heading="Air Quality"
            toshow="airQuality"
            database={props.database}
          />
          <DCard
            heading="Data Log"
            toshow="dataTab"
            database={props.database}
          />
          <DCard
            heading="AQI Timeline"
            toshow="aqiTimeline"
            database={props.database}
          />
          {/* <DCard heading="Humidity" toshow="humidity" /> */}
          {/* <DCard heading="RH Timeline" toshow="rhTimeline"/> */}
          {/* <DCard heading="Temperature" toshow="temperature"/> */}
          {/* <DCard heading="Temp. Variation" /> */}
          {/* <HeatmapElement/> */}
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
