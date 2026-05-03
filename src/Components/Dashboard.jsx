import React from "react";
  import Slider from "./Slider";
//  import Navbar from "./Navbar";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <Slider />
      <div className="dashboard-content">
        {/* <Navbar /> */}
        <div className="page-content">
          <h1>Welcome to Dashboard</h1>
          <p>Select menu from left side</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;