import React, { useState, useRef } from "react";
import "./DetailPage.css";
import Booking from "./Booking";

export default function DetailPage(props) {
  const bookingRef = useRef();
  const [openBooking, setOpenBooking] = useState(false);

  // Check if user has logged in or not
  const userJSON = localStorage.getItem("curUser");
  const user = JSON.parse(userJSON);
  const isLogin = user?.isLogin;

  function onOpenBooking() {
    if (!isLogin) {
      // save current id to local storage
      localStorage.removeItem("curProduct");
      localStorage.setItem("curProduct", props.id);
      // redirect to login page
      window.location.assign("/login");
      return;
    }
    setOpenBooking(true);
    window.scrollTo({
      top: bookingRef.current.offsetTop,
      behavior: "smooth"
    });
  }

  return (
    <div className="detail-container">
      <div className="detail-header">
        <div>
          <h1 className="detail-title">{props.name}</h1>
          <div className="detail-address">
            <i className="fa-solid fa-location-dot"></i>
            {props.address}
          </div>
          <div className="detail-distance">
            Excellent location - {props.distance}m from center
          </div>
          <div className="detail-price-offer">
            Book a stay over ${props.price} at this property and get a free
            airpod taxi
          </div>
        </div>
        <button type="button" className="book-btn" onClick={onOpenBooking}>
          Reserve or Book Now!
        </button>
      </div>

      <div className="detail-images">
        {props.photos?.map((url, index) => (
          <img src={url} alt={props.name} key={index} />
        ))}
      </div>

      <div className="detail-description-price">
        <div className="detail-description">
          <h2 className="detail-title">{props.title}</h2>
          <div>{props.description}</div>
        </div>
        <div className="detail-price">
          <div className="detail-nine-night-price">
            <strong>${props.price}</strong> (1 night)
          </div>
          <button type="button" className="book-btn" onClick={onOpenBooking}>
            Reserve or Book Now!
          </button>
        </div>
      </div>

      <div ref={bookingRef}>
        {isLogin && openBooking && (
          <Booking hotelId={props.id} toggle={setOpenBooking} />
        )}
      </div>
    </div>
  );
}
