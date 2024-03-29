import React from "react";
import PropertyList from "./PropertyList/PropertyList.js";
import RegisterForm from "./RegisterForm/RegisterForm";
import Header from "../home/NavBarHeader/Header/Header.js";

const Home = () => {
  return (
    <div>
      <Header />
      <PropertyList />
      <RegisterForm />
    </div>
  );
};

export default Home;
