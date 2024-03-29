import React from "react";
import "./PropertyList.css";
import CityList from "./CityList";
import HotelTypeList from "./HotelTypeList";
import HotelList from "./HotelList";

function PropertyList() {
  return (
    <div className="property-list">
      <CityList />
      <HotelTypeList />
      <HotelList />
    </div>
  );
}

export default PropertyList;
