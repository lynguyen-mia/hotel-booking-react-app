import React, { useState, useEffect } from "react";
import DetailPage from "./DetailPage.js";
import NavBar from "../home/NavBarHeader/Navbar/NavBar.js";
import RegisterForm from "../home/RegisterForm/RegisterForm.js";
import Footer from "../home/Footer/Footer.js";
import { useParams } from "react-router-dom";

const Detail = () => {
  const params = useParams();
  const [hotelDetails, setHotelDetails] = useState({});

  // Call to server to fetch product data
  useEffect(() => {
    async function getProductDetails() {
      const res = await fetch(
        "https://hotel-booking-node-app.onrender.com/fetch-hotel",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: params._id })
        }
      );

      if (!res.ok) {
        console.log("Couldn't fetch the hotel");
      }

      const hotelDetails = await res.json();
      // console.log(hotelDetails);
      setHotelDetails(hotelDetails);
    }

    getProductDetails();
  }, []);

  return (
    <div>
      {hotelDetails && (
        <DetailPage
          id={hotelDetails._id}
          name={hotelDetails.name}
          address={hotelDetails.address}
          distance={hotelDetails.distance}
          price={hotelDetails.cheapestPrice}
          photos={hotelDetails.photos}
          title={hotelDetails.title}
          description={hotelDetails.desc}
        />
      )}
      <RegisterForm />
    </div>
  );
};

export default Detail;
