import React from "react";
import Topbar from "./Dashboard/TopBar";
import DummyText from "./Dashboard/DummyText"; // Assuming DummyText is a component
import DCard from "./Dashboard/DCard";
import ContentGrid from "./Dashboard/ContentGrid";

import db from "../config/firebase";
import {
  ref,
  get,
  orderByKey,
  limitToLast,
  onValue,
  off,
} from "firebase/database";

function Dashboard() {
  const dCardData = [...Array(10)]; // Array of 10 elements for potential DCard data

  let [loc, setLoc] = React.useState([]);
  let [latestLoc, setLatestLoc] = React.useState(null);
  let unsubscribe; // To store the unsubscribe function

  let [stop, setStop] = React.useState(0);

  React.useEffect(() => {
    if (!stop) {
      console.log("sync started");
      const dbref = ref(db, "/");
      console.log("DB referenced")

      // Initial fetch of all data if loc is null
      if (!loc.length) {
        const fetchData = async () => {
          const snapshot = await get(dbref);
          if (snapshot.exists()) {
            setLoc(Object.values(snapshot.val()));
          } else {
            console.error("Error fetching data");
          }
        };
        fetchData();
        if (loc.length !== 0) console.log("data fetched successfully");
        else {
          console.log("going to enter dummy data")
          const data = [
            {
              latitude: "23.05",
              longitude: "80.03",
              air: "100",
              current_stamp: "1713507180",
          },
            {
                latitude: "23.05",
                longitude: "80.03",
                air: "120",
                current_stamp: "1713507220",
            },
            {
                latitude: "22.05",
                longitude: "81.03",
                air: "120",
                current_stamp: "1713507233",
            },
            // Existing entries...
        
            // New entries with manual variations
            {
                latitude: "31.45",
                longitude: "75.12",
                air: "95",
                current_stamp: "1713507239",
            },
            {
                latitude: "17.32",
                longitude: "73.89",
                air: "130",
                current_stamp: "1713507261",
            },
            {
                latitude: "29.87",
                longitude: "82.56",
                air: "105",
                current_stamp: "1713507268",
            },
            {
                latitude: "24.60",
                longitude: "79.25",
                air: "115",
                current_stamp: "1713507275",
            },
            {
                latitude: "18.75",
                longitude: "76.98",
                air: "140",
                current_stamp: "1713507282",
            },
        ];
          // console.log("Dummy data set");
          setLoc(data);
        }
      }

      // Listener for new entries
      unsubscribe = onValue(dbref, (snapshot) => {
        if (snapshot.exists()) {
          const newData = Object.values(snapshot.val());
          // Check if there's a new entry compared to the current loc length
          if (newData.length !== loc.length) {
            const latestRef = limitToLast(1)(dbref); // Corrected syntax
            get(latestRef).then((latestSnapshot) => {
              if (latestSnapshot.exists()) {
                const newLatestEntry = Object.values(latestSnapshot.val())[0];
                setLatestLoc(newLatestEntry);
                setLoc((prevLoc) => [...prevLoc, newLatestEntry]); // Append latest entry to loc
              } else {
                console.error("Error fetching latest data");
              }
            });
          }
        } else {
          console.error("Error fetching data");
        }
      });

      // Cleanup function to detach the listener on component unmount
      return () => {
        if (typeof unsubscribe === "function") {
          unsubscribe();
        }
      };
    } else {
      console.log("Sync stopped");
      console.log(loc);
    }
  }, [db, loc.length, stop]); // Dependency array: db and loc.length

  const handleChildChange = (newValue) => {
    setStop(newValue);
  };

  return (
    <div
      style={{
        backgroundColor: "#e3fbfc",
        height: "100%",
        paddingTop: "4em",
        paddingBottom: "4em",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundPosition: "bottom",
        backgroundPositionY: "80%",
        backgroundAttachment: "fixed",
      }}
    >
      <Topbar
        name="Ayush Srivastava"
        email="21bcs049@iiitdmj.ac.in"
        stopValue={stop}
        onChange={handleChildChange}
      />
      <div id="back-to-top-anchor"></div>

      {/* {dCardData.map((_, index) => (
        <div style={{ display:"inline-flex"}}>
        <DCard key={index} heading="Latitude" />
        </div> 
      ))} */}
      <ContentGrid database={loc} />
    </div>
  );
}

export default Dashboard;
