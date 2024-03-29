import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HotelList.css";

function HotelList() {
  const [topRatedHotels, setTopRatedHotels] = useState([]);
  const navigate = useNavigate();

  // Fetch top 3 most rated hotels
  useEffect(() => {
    async function getTopRatedHotels() {
      try {
        const res = await fetch(
          "https://hotel-booking-node-app.onrender.com/top-rated-hotels"
        );

        if (!res.ok) {
          console.log("Couldn't fetch property counts!");
        }

        const topRatedHotels = await res.json();
        setTopRatedHotels(topRatedHotels);
      } catch (err) {
        console.log(err);
      }
    }

    getTopRatedHotels();
  }, []);

  function onClickHotel(hotel) {
    navigate(`/detail/${hotel._id}`);
    window.scrollTo({ top: "0", behavior: "smooth" });
  }
  return (
    <div>
      <h2 className="hotel-title">Home guests love</h2>

      <div className="hotel-list">
        {topRatedHotels.length > 0 &&
          topRatedHotels.map((hotel) => (
            <div href="" key={hotel.name} className="hotel-img">
              <img
                src={hotel.photos[0]}
                alt={hotel.name}
                onClick={() => onClickHotel(hotel)}
              />

              <div className="img-text mt-3">
                <div onClick={() => onClickHotel(hotel)} className="img-name">
                  {hotel.name}
                </div>
                <div>{hotel.city}</div>
                <div>
                  <strong>{"Starting from $" + hotel.cheapestPrice}</strong>
                </div>
                <div className="d-flex justity-content-center gap-1">
                  <span className="hotel-rate">{hotel.rating} &#9733;</span>
                  <span>{hotel.type}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default HotelList;
