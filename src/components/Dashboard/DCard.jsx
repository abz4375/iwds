import "./DCard.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import { PureComponent } from "react";
import { PieChart, Pie, Cell } from "recharts";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import LoadingButton from "@mui/lab/LoadingButton";
import ChevronRightTwoToneIcon from "@mui/icons-material/ChevronRightTwoTone";

import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";

const card = (props) => {
  let content;

  function getHHMMSSFromUnixTimestamp(unixTimestamp) {
    // Convert unix timestamp (seconds) to milliseconds
    const milliseconds = unixTimestamp * 1000;

    // Create a new Date object from the milliseconds
    const date = new Date(milliseconds);

    // Get hours, minutes, and seconds (using UTC for consistency)
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");

    // Calculate IST offset (IST is UTC+05:30)
    const istOffsetInHours = 5;
    const istOffsetInMinutes = 30;
    const istOffsetInMilliseconds =
      (istOffsetInHours * 60 + istOffsetInMinutes) * 60 * 1000;

    // Adjust UTC time for IST
    const istDate = new Date(milliseconds + istOffsetInMilliseconds);

    // Get IST hours, minutes, and seconds
    const istHours = istDate.getUTCHours().toString().padStart(2, "0");
    const istMinutes = istDate.getUTCMinutes().toString().padStart(2, "0");
    const istSeconds = istDate.getUTCSeconds().toString().padStart(2, "0");

    // Combine and format the IST time string
    const timeString = `${istHours}:${istMinutes}:${istSeconds}`;

    return timeString;
  }

  const loc = props.database;

  //  Location Content
  if (props.toshow == "location") {
    //   let [loc, setLoc] = React.useState([]);

    //   const latestLoc = async () => {
    //     const dbref = ref(db, "/");
    //     const snapshot = await get(dbref);
    //     if (snapshot.exists()) {
    //       setLoc(Object.values(snapshot.val()));
    //     } else {
    //       alert("error");
    //     }
    //     return;
    //   };
    //   latestLoc();
    const locat = loc[loc.length - 1];
    // console.log(locat);
    content = (
      <div style={{ width: "100%" }}>
        <br />
        <iframe
          width="100%"
          height="230px"
          // frameborder="0"
          // scrolling="no"
          // marginheight="0"
          // marginwidth="0"
          src={
            "https://maps.google.com/maps?q=" +
            locat?.latitude +
            "," +
            locat?.longitude +
            "&hl=en&z=19&output=embed"
          }
        ></iframe>

        {/* <Typography variant="body2">
          <span style={{ fontWeight: "bold" }}>Latitude</span> = {props.lat}
          <br />
          <span style={{ fontWeight: "bold" }}>Longitude</span> = {props.lon}
        </Typography> */}
        {/* <CardActions style={{ justifyContent: "center" }}>
          <Button
            size="small"
            href={
              "https://maps.google.com/maps?q=" +
              props.lat +
              "," +
              props.lon +
              "&hl=en&z=19"
            }
            target="_blank"
          >
            Open &nbsp;Maps
          </Button>
        </CardActions> */}
      </div>
    );
  }

  // Air Quality content
  if (props.toshow == "airQuality") {
    // let [loc, setLoc] = React.useState([]);
    // const latestLoc = async () => {
    //   const dbref = ref(db, "/");
    //   const snapshot = await get(dbref);
    //   if (snapshot.exists()) {
    //     setLoc(Object.values(snapshot.val()));
    //   } else {
    //     alert("error");
    //   }
    //   return;
    // };
    // latestLoc();
    const latestData = loc[loc.length - 2];

    const RADIAN = Math.PI / 180;
    const data = [
      { name: "A", value: 50, color: "#ffff99" },
      { name: "B", value: 50, color: "#ffcc99" },
      { name: "C", value: 50, color: "#ff9999" },
      { name: "D", value: 50, color: "#ff6666" },
      { name: "E", value: 100, color: "#ff4d4d" },
      { name: "F", value: 200, color: "#990000" },
    ];
    const cx = 150;
    const cy = 200;
    const iR = 50;
    const oR = 100;
    const value = parseInt(latestData?.air) ? parseInt(latestData?.air) : NaN;

    const needle = (value, data, cx, cy, iR, oR, color) => {
      let total = 0;
      data.forEach((v) => {
        total += v.value;
      });
      const ang = 180.0 * (1 - value / total);
      const length = (iR + 2 * oR) / 3;
      const sin = Math.sin(-RADIAN * ang);
      const cos = Math.cos(-RADIAN * ang);
      const r = 5;
      const x0 = cx + 5;
      const y0 = cy + 5;
      const xba = x0 + r * sin;
      const yba = y0 - r * cos;
      const xbb = x0 - r * sin;
      const ybb = y0 + r * cos;
      const xp = x0 + length * cos;
      const yp = y0 + length * sin;

      return [
        <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
        <path
          d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
          stroke="#none"
          fill={color}
        />,
      ];
    };

    content = (
      <>
        {loc.length === 0 ? (
          <h2
            style={{ textAlign: "center", fontSize: "1.25em", color: "teal" }}
          >
            <code>No Data To Show</code>
          </h2>
        ) : (
          <></>
        )}
        <PieChart width={300} height={225} style={{ margin: "auto", marginTop:"-75px" }}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx={cx}
            cy={cy}
            innerRadius={iR}
            outerRadius={oR}
            fill="#8884d8"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          {needle(value, data, cx, cy, iR, oR, "black")}
        </PieChart>
        <h2 style={{ textAlign: "center", fontSize: "1.25em", color: "darkgreen" }}>
          <code>Air Quality Index: {value}</code>
        </h2>
      </>
    );
  }

  // Air Quality Timeline
  if (props.toshow == "aqiTimeline") {
    // let [loc, setLoc] = React.useState([]);
    // const latestLoc = async () => {
    //   const dbref = ref(db, "/");
    //   const snapshot = await get(dbref);
    //   if (snapshot.exists()) {
    //     setLoc(Object.values(snapshot.val()));
    //   } else {
    //     alert("error");
    //   }
    //   return;
    // };
    // latestLoc();
    const dataSet = loc;
    // console.log(dataSet)

    // let data = [];
    // dataSet.map((item) => {

    // })

    const data = [
      {
        // name: "Page A",
        name: getHHMMSSFromUnixTimestamp(
          dataSet[dataSet.length - 8]?.current_stamp
        ),
        // uv: 4000,
        AQI: parseInt(dataSet[dataSet.length - 8]?.air),
        // amt: 2400,
      },
      {
        name: getHHMMSSFromUnixTimestamp(
          dataSet[dataSet.length - 7]?.current_stamp
        ),
        // uv: 3000,
        AQI: parseInt(dataSet[dataSet.length - 7]?.air),
        // amt: 1398,
      },
      {
        name: getHHMMSSFromUnixTimestamp(
          dataSet[dataSet.length - 6]?.current_stamp
        ),
        // uv: 2000,
        AQI: parseInt(dataSet[dataSet.length - 6]?.air),
        // amt: 9800,
      },
      {
        name: getHHMMSSFromUnixTimestamp(
          dataSet[dataSet.length - 5]?.current_stamp
        ),
        // uv: 2780,
        AQI: parseInt(dataSet[dataSet.length - 5]?.air),
        // amt: 3908,
      },
      {
        name: getHHMMSSFromUnixTimestamp(
          dataSet[dataSet.length - 4]?.current_stamp
        ),
        // uv: 1890,
        AQI: parseInt(dataSet[dataSet.length - 4]?.air),
        // amt: 4800,
      },
      {
        name: getHHMMSSFromUnixTimestamp(
          dataSet[dataSet.length - 3]?.current_stamp
        ),
        // uv: 2390,
        AQI: parseInt(dataSet[dataSet.length - 3]?.air),
        // amt: 3800,
      },
      {
        name: getHHMMSSFromUnixTimestamp(
          dataSet[dataSet.length - 2]?.current_stamp
        ),
        // uv: 3490,
        AQI: parseInt(dataSet[dataSet.length - 2]?.air),
        // amt: 4300,
      },
    ];

    content = (
      <div
        style={{
          width: "100%",
          height: "400px",
          margin: "auto",
          marginLeft: "-28px",
        }}
      >
        <br />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="AQI"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (props.toshow == "dataTab") {
    // content = <DataVis />;
    const dataset = loc;

    const [loading, setLoading] = React.useState(false);
    function handleClick() {
      setLoading(!loading);
      setTimeout(() => setLoading(false), 3000);
      if (dataset) {
        // loginUser(auth, email, password);
        const fileType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";
        const ws = XLSX.utils.json_to_sheet(dataset);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, "IWDS_Data" + fileExtension);
      }
    }

    function createData(item) {
      const { latitude, longitude, air } = item;
      return { latitude, longitude, air };
    }
    const columns = [
      {
        width: 120,
        label: "Location",
        dataKey: "loc",
        numeric: true,
        align: "center",
      },
      {
        width: 120,
        label: "Air Quality",
        dataKey: "air",
        numeric: true,
        align: "center",
      },
      {
        width: 120,
        label: "Latitude",
        dataKey: "latitude",
        numeric: true,
        align: "center",
      },
      {
        width: 120,
        label: "Longitude",
        dataKey: "longitude",
        numeric: true,
        align: "center",
      },
    ];
    const rows = dataset.map(createData);
    const VirtuosoTableComponents = {
      Scroller: React.forwardRef((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
      )),
      Table: (props) => (
        <Table
          {...props}
          sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
        />
      ),
      TableHead,
      TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
      TableBody: React.forwardRef((props, ref) => (
        <TableBody {...props} ref={ref} />
      )),
    };
    function fixedHeaderContent() {
      return (
        <TableRow>
          {columns.map((column) => (
            <TableCell
              key={column.dataKey}
              variant="head"
              align={column.numeric || false ? "center" : "center"}
              style={{ width: column.width }}
              sx={{
                backgroundColor: "#cbe6ef",
                fontWeight: "bold",
                boxShadow: "0px 1px 0px gray",
                fontSize: "1.005em",
              }}
            >
              {column.label}
            </TableCell>
          ))}
        </TableRow>
      );
    }
    function rowContent(_index, row) {
      const styleExtracter = (air) => {
        if (air <= 50) {
          return { backgroundColor: "#ffffe0", color:"black", fontWeight:"bold", fontSize:"1.0075em" };
        } else if (air <= 100) {
          return { backgroundColor: "#ffdfd2", color:"black", fontWeight:"bold", fontSize:"1.0075em" };
        } else if (air <= 150) {
          return { backgroundColor: "#ffc2c2", color:"black", fontWeight:"bold", fontSize:"1.0075em" };
        } else if (air <= 200) {
          return { backgroundColor: "#ffb3b3", color:"black", fontWeight:"bold", fontSize:"1.0075em" };
        } else if (air <= 300) {
          return { backgroundColor: "#ffa6a6", color:"black", fontWeight:"bold", fontSize:"1.0075em" };
        } else if (air <= 300) {
          return { backgroundColor: "#cc3333", color:"black", fontWeight:"bold", fontSize:"1.0075em" };
        }
      }
      return (
        <React.Fragment>
          {columns.map((column) => (
            <TableCell
              key={column.dataKey}
              align={column.numeric || false ? "center" : "center"}
              sx={(column.dataKey === "air")?styleExtracter(row[column.dataKey]):{fontWeight:"bold", backgroundColor:"#fafafa", fontSize:"1.0007em"}}
            >
              {column.dataKey !== "loc" ? (
                row[column.dataKey]
              ) : (
                <a
                  href={
                    "https://maps.google.com/maps?q=" +
                    row["latitude"] +
                    "," +
                    row["longitude"] +
                    "&hl=en&z=19"
                  }
                  target="_blank"
                  style={{
                    textDecoration: "none",
                    color: "darkgreen",
                    fontWeight: "bold",
                    // fontSize:"1.050em"
                  }}
                >
                  Open
                </a>
              )}
            </TableCell>
          ))}
        </React.Fragment>
      );
    }
    content = (
      <React.Fragment>
        <br />
          <Paper style={{ height: 500, width: "100%" }}>
            <TableVirtuoso
              data={rows}
              components={VirtuosoTableComponents}
              fixedHeaderContent={fixedHeaderContent}
              itemContent={rowContent}
            />
          </Paper>
        <br />
        <div style={{ margin: "auto" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoadingButton
              size="large"
              onClick={handleClick}
              endIcon={<ChevronRightTwoToneIcon />}
              loading={loading}
              loadingPosition="end"
              // loadingIndicator="Loading…"
              variant="outlined"
              sx={{
                color: "black",
                borderColor: "black",
                borderWidth: "1.5px",
                fontWeight: "bolder",
                height: "3.5em",
                // backgroundColor:"Teal",
                "&:hover": {
                  borderColor: "black",
                  color: "black",
                  // Add any other hover styles here
                },
              }}
            >
              <span>
                <span style={{ fontSize: "23px" }}>📂</span> Download CSV
              </span>
            </LoadingButton>
          </Box>
        </div>
      </React.Fragment>
    );
  }
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
            // fontSize: "1.5em",
          }}
        >
          {props.heading}
          {/* <hr style={{width:"95%", margin:"auto"}}/> */}
        </Typography>
        {content}
      </CardContent>
    </React.Fragment>
  );
};

export default function DCard(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{ display: "flex", justifyContent: "center", marginLeft: "auto" }}
      >
        <Card
          className="DCard"
          sx={{
            width: "91.5vw",
            margin: "1em",
            // border: "3px solid rgba( 0, 0, 0, 0.68 )",
            borderRadius: "5px",
            background: "rgba( 255, 255, 255, 0.88 )",
            // boxShadow: "0 3px 3px 0 rgba( 31, 38, 135, 0.2 )",
            boxShadow: "0px 0px 3px rgba( 0, 0, 0, 0.75 )",
            backdropFilter: "blur ( 60px )",
            WebkitBackdropFilter: "blur ( 4px )",
          }}
          variant="outlined"
        >
          {card(props)}
        </Card>
      </Box>
    </React.Fragment>
  );
}
