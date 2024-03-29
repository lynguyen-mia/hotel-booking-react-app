import React, { useEffect, useState } from "react";
import "./CityList.css";
import { useMyContext } from "../../../store/context";
import { useNavigate } from "react-router-dom";

function CityList() {
  const [cityList, setCityList] = useState([]);
  const ctx = useMyContext();
  const navigate = useNavigate();

  // Fetch properties number by city
  useEffect(() => {
    async function getPropertiesCount() {
      try {
        const res = await fetch(
          "https://hotel-booking-node-app.onrender.com/properties-count"
        );

        if (!res.ok) {
          console.log("Couldn't fetch property counts!");
        }

        const countPropertiesByCity = await res.json(); // [{'Ha Noi': 5}, {'Ho Chi Minh' : 3}, {'Da nang' : 4}]

        function countProperties(c) {
          return countPropertiesByCity.find((city) => c in city)[c] || 0;
        }
        setCityList([
          {
            name: "Ha Noi",
            subText: countProperties("Ha Noi"),
            image: "./images/Ha Noi.jpg"
          },
          {
            name: "Ho Chi Minh",
            subText: countProperties("Ho Chi Minh"),
            image: "./images/HCM.jpg"
          },
          {
            name: "Da Nang",
            subText: countProperties("Da Nang"),
            image: "./images/Da Nang.jpg"
          }
        ]);
      } catch (err) {
        console.log(err);
      }
    }

    getPropertiesCount();
  }, []);

  async function onSearchCity(e) {
    e.preventDefault();
    const cityImageElement = e.target.closest(".city-img");
    const city = cityImageElement.querySelector(".city-name").textContent;
    await ctx.setSearchFields({
      location: city,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      adult: 1,
      children: 0,
      room: 1
    });
    return navigate("/search");
  }

  return (
    <div className="city-list">
      {cityList.length > 0 &&
        cityList.map((city) => (
          <div onClick={onSearchCity} key={city.name} className="city-img">
            <div className="img-text">
              <p className="city-name">{city.name}</p>
              <p>{city.subText} properties</p>
            </div>
            <img src={city.image} alt={city.name} />
          </div>
        ))}
    </div>
  );
}

export default CityList;
