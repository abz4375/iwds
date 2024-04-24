import "./DCard.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
// const bull = (
//   <Box
//     component="span"
//     sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
//   >
//     •
//   </Box>
// );

const card = (props) => {
  let content;

  if (props.toshow == "location") {
    content = (
      <div style={{ width: "100%" }}>
        <br />
        <iframe
          width="100%"
          height="500"
          // frameborder="0"
          // scrolling="no"
          // marginheight="0"
          // marginwidth="0"
          src={
            "https://maps.google.com/maps?q=" +
            props.lat +
            "," +
            props.lon +
            "&hl=en&z=14&output=embed"
          }
        ></iframe>

        {/* <Typography variant="body2">
          <span style={{ fontWeight: "bold" }}>Latitude</span> = {props.lat}
          <br />
          <span style={{ fontWeight: "bold" }}>Longitude</span> = {props.lon}
        </Typography> */}
        <CardActions style={{ justifyContent: "center" }}>
          <Button
            size="small"
            href={
              "https://maps.google.com/maps?q=" +
              props.lat +
              "," +
              props.lon +
              "&hl=en&z=14"
            }
            target="_blank"
          >
            Open &nbsp;Maps
          </Button>
        </CardActions>
      </div>
    );
  }

  // console.log(content);

  return (
    <React.Fragment>
      <CardContent
        sx={{
          borderColor: "darkblue",
        }}
      >
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography> */}
        <Typography
          variant="h5"
          component="div"
          style={{
            fontWeight: "bold",
            fontFamily: "Roboto",
            // textAlign: "center",
          }}
        >
          {props.heading}
        </Typography>
        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}

        {content}
      </CardContent>
    </React.Fragment>
  );
};

export default function DCard(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box>
        <Card
          className="DCard"
          sx={{
            width : "91.5vw",
            margin : "1em",
            border : "3px solid rgba( 0, 0, 0, 0.68 )",
            borderRadius : "5px",
            background : "rgba( 255, 255, 255, 0.9 )",
            boxShadow : "0 3px 3px 0 rgba( 31, 38, 135, 0.2 )",
            backdropFilter : "blur ( 4px )",
            WebkitBackdropFilter : "blur ( 4px )",
          }}
          variant="outlined"
        >
          {card(props)}
        </Card>
      </Box>
    </React.Fragment>
  );
}
