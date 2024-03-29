import React, { useState, useEffect } from "react";
import "./HotelTypeList.css";

function HotelTypeList() {
  const [hotelTypeList, setHotelTypeList] = useState([]);

  // Fetch hotel type number by city
  useEffect(() => {
    async function getTypesCount() {
      try {
        const res = await fetch(
          "https://hotel-booking-node-app.onrender.com/types-count"
        );

        if (!res.ok) {
          console.log("Couldn't fetch property counts!");
        }

        const countTypes = await res.json(); // [{'hotel': 5}, {'apartments' : 3}]

        function countHotelTypes(t) {
          return countTypes.find((type) => t in type)[t] || 0;
        }
        setHotelTypeList([
          {
            name: "Hotels",
            count: countHotelTypes("hotel"),
            image: "./images/type_1.webp"
          },
          {
            name: "Apartments",
            count: countHotelTypes("apartments"),
            image: "./images/type_2.jpg"
          },
          {
            name: "Resorts",
            count: countHotelTypes("resorts"),
            image: "./images/type_3.jpg"
          },
          {
            name: "Villas",
            count: countHotelTypes("villas"),
            image: "./images/type_4.jpg"
          },
          {
            name: "Cabins",
            count: countHotelTypes("cabins"),
            image: "./images/type_5.jpg"
          }
        ]);
      } catch (err) {
        console.log(err);
      }
    }

    getTypesCount();
  }, []);

  return (
    <div>
      <h2 className="type-title">Browser by property type</h2>

      <div className="type-list">
        {hotelTypeList.length > 0 &&
          hotelTypeList.map((type) => (
            <div key={type.name} className="type-img">
              <img src={type.image} alt={type.name} />
              <div className="img-text">
                <div>{type.name}</div>
                <div>{type.count + " hotels"}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default HotelTypeList;
