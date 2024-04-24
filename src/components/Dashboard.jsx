import React from "react";
import Topbar from "./Dashboard/TopBar";
import DummyText from "./Dashboard/DummyText"; // Assuming DummyText is a component
import DCard from "./Dashboard/DCard";
import ContentGrid from "./Dashboard/ContentGrid";

function Dashboard() {
  const dCardData = [...Array(10)]; // Array of 10 elements for potential DCard data

  return (
    <div
      style={{
        backgroundColor: "#e3fbfc",
        height: "100%",
        paddingTop: "4em",
        paddingBottom: "4em",
        backgroundImage: "url('https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundPosition:"bottom",
        backgroundPositionY:"80%",
        backgroundAttachment:"fixed",
      }}
    >
      <Topbar name="Ayush Srivastava" email="21bcs049@iiitdmj.ac.in" />
      <div id="back-to-top-anchor"></div>

      {/* {dCardData.map((_, index) => (
        <div style={{ display:"inline-flex"}}>
        <DCard key={index} heading="Latitude" />
        </div> 
      ))} */}
      <ContentGrid />
    </div>
  );
}

export default Dashboard;
