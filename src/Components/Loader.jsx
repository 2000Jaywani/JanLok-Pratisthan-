import React from "react";
import "./Loader.css";

function Loader() {
  return (
    <div className="loader-container">
      <div className="loader-card">
        
        {/* Spinner */}
        <div className="spinner">
          <div className="ring"></div>
          <div className="ring ring2"></div>
        </div>

        {/* Title */}
        <h2 className="loader-title">Loading 🌍 </h2>

        {/* Subtitle */}
        <p className="loader-text">Preparing your workspace...</p>

      </div>
    </div>
  );
}

export default Loader;