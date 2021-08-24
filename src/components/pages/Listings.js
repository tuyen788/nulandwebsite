import React from "react";
import "../../App.css";
import Poster from "../Poster";
function Listings() {
  return (
    <div>
      <div className="listings">
        <h1>LISTINGS</h1>
        <p>Current and Future Available Accomodations</p>
      </div>
      <Poster />
    </div>
  );
}

export default Listings;
