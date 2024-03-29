import React, { useRef } from "react";
import "./SearchPopup.css";
import SearchCalendar from "./SearchCalendar";
import { useMyContext } from "../../../store/context";

export default function SearchPopup() {
  const ctx = useMyContext();
  const destinationRef = useRef();
  const dateRef = useRef();
  const adultRef = useRef(1);
  const childrenRef = useRef(0);
  const roomRef = useRef(1);

  async function onSearch() {
    const location = destinationRef.current.value.trim();
    const [startDate, endDate] = dateRef.current.value
      .trim()
      .split("to")
      .map((date) => date.trim());

    const adult = adultRef.current.value.trim();
    const children = childrenRef.current.value.trim();
    const room = roomRef.current.value.trim();

    // Send search conditions to context
    // Context's searchFields change will lead to page being reloaded
    await ctx.setSearchFields({
      location: location || "Ha Noi",
      startDate: new Date(startDate).toISOString() || new Date().toISOString(),
      endDate: new Date(endDate).toISOString() || new Date().toISOString(),
      adult: adult || 1,
      children: children || 0,
      room: room || 1
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  return (
    // prettier-ignore
    <form className="search-form-container">
      <h1>Search</h1>
      <div className="form-box">
        <label htmlFor="input-destination">Destination</label>
        <input type="text" id="input-destination" name="destination" className="search_destination" defaultValue={ctx.searchFields.location || "Ha Noi" } ref={destinationRef} />
      </div>
      <div className="form-box">
        <label htmlFor="search-calendar">Check-in Date</label>
        <SearchCalendar ref={dateRef}/>
      </div>

      <div className="options-box">
      <label>Options</label>
        <div className="options__row">
          <label htmlFor="input-adult">Adults</label>
          <input id="input-adult" type="number" max="30" min="1" placeholder="1" defaultValue={ctx.searchFields.adult || 1} ref={adultRef} />
        </div>

        <div className="options__row">
          <label htmlFor="input-children">Childrens</label>
          <input id="input-children" type="number" max="30" min="1" step="1" placeholder="0" defaultValue={ctx.searchFields.children || 0} ref={childrenRef} />
        </div>

        <div className="options__row">
          <label htmlFor="input-room">Rooms</label>
          <input id="input-room" type="number" max="30" min="1" step="1" placeholder="1" defaultValue={ctx.searchFields.room || 1} ref={roomRef} />
        </div>
      </div>
        <button type="button" onClick={onSearch} className="SearchBtn">Search</button>
    </form>
  );
}
