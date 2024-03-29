import React, { useRef } from "react";
import "./Form.css";
import CalendarRangeInput from "./CalendarRangeInput";
import GuestInput from "./GuestInput";
import { Link } from "react-router-dom";
import { useMyContext } from "../../../../store/context";

function Form() {
  const ctx = useMyContext();
  const locationRef = useRef();
  const dateRef = useRef();
  const guestRef = useRef();

  function onSearch() {
    const location = locationRef.current.value.trim();
    const [startDate, endDate] = dateRef.current.value
      .split("to")
      .map((date) => date.trim());

    const [adult, children, room] = guestRef.current.value
      .trim()
      .split("-")
      .map((value) => value.trim().split(" ")[0]);

    // Send search conditions to context
    ctx.setSearchFields({
      location: location || "Ha Noi",
      // convert to  ISO 8601 formatted strings
      startDate: startDate
        ? new Date(startDate).toISOString()
        : new Date().toISOString(),
      endDate: endDate
        ? new Date(endDate).toISOString()
        : new Date().toISOString(),
      adult: adult || 1,
      children: children || 0,
      room: room || 1
    });
  }

  return (
    <div className="form-input__control">
      <div className="input-icon">
        <i className="fa fa-bed fa-lg"></i>
        <input
          className="input-location"
          type="text"
          name="location"
          placeholder="Where are you going?"
          ref={locationRef}
        ></input>
      </div>
      <div className="input-icon">
        <i className="fa fa-calendar fa-lg"></i>
        <CalendarRangeInput ref={dateRef} />
      </div>
      <div className="input-icon">
        <i className="fa fa-female fa-lg"></i>
        <GuestInput ref={guestRef} />
      </div>
      <Link to="/search">
        <button type="button" className="form-btn" onClick={onSearch}>
          Search
        </button>
      </Link>
    </div>
  );
}

export default Form;
