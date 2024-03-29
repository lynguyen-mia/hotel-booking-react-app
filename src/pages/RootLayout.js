import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./home/NavBarHeader/Navbar/NavBar";
import Footer from "./home/Footer/Footer";

const RootLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
