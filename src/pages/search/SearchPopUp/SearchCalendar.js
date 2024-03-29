import React, { useState, useRef, useEffect, forwardRef } from "react";
import "./SearchCalendar.css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useMyContext } from "../../../store/context";

const SearchCalendar = forwardRef((props, childRef) => {
  const ctx = useMyContext();
  const ctxStartDate = ctx.searchFields.startDate || new Date();
  const ctxEndDate = ctx.searchFields.endDate || new Date();
  const contextStartDate = new Date(ctxStartDate).toLocaleDateString("en-US");
  const contextEndDate = new Date(ctxEndDate).toLocaleDateString("en-US");
  // console.log(contextStartDate, contextEndDate);

  const calendarRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection"
    }
  ]);

  const startDate = range[0].startDate?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  const endDate = range[0].endDate?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  const CalendarInput = (
    <input
      // show the previously picked dates (fetched from context) as default values
      value={
        startDate && endDate
          ? `${startDate} to ${endDate || startDate}`
          : contextStartDate && contextEndDate
          ? `${contextStartDate} to ${contextEndDate}`
          : ""
      }
      id="search-calendar"
      className="input-search-calendar"
      readOnly
      onClick={() => setOpen((open) => !open)}
      placeholder="04/07/2023 to 04/07/2023"
      ref={childRef}
    />
  );

  const CalendarBox = (
    <DateRange
      className="search-calendar-box"
      editableDateInputs={true}
      onChange={(item) => {
        setRange([item.selection]);
      }}
      moveRangeOnFirstSelection={false}
      ranges={range}
      minDate={new Date()}
    />
  );

  // Hide calendar when pressing esc
  function hideCalendarOnEscape(e) {
    if (e.key === "Escape") {
      setOpen((open) => !open);
    }
  }

  // Hide calendar when clicking outside
  function hideCalendarOnClickOutside(e) {
    if (calendarRef.current && !calendarRef.current.contains(e.target)) {
      setOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", hideCalendarOnEscape);
    document.addEventListener("click", hideCalendarOnClickOutside);
  }, []);

  return (
    <div ref={calendarRef} className="checkin-date">
      {CalendarInput}
      {open && CalendarBox}
    </div>
  );
});

export default SearchCalendar;
