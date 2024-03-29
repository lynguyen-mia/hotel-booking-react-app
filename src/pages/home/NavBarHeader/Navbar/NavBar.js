import React, { useState } from "react";
import NavBarItem from "./NavBarItem";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";

const data = [
  {
    type: "Stays",
    icon: "fa-bed",
    active: true
  },
  {
    type: "Flights",
    icon: "fa-plane",
    active: false
  },
  {
    type: "Car rentals",
    icon: "fa-car",
    active: false
  },
  {
    type: "Attractions",
    icon: "fa-bed",
    active: false
  },
  {
    type: "Airport taxis",
    icon: "fa-taxi",
    active: false
  }
];

function NavBar() {
  const navigate = useNavigate();
  const [navBarArr, setNavBarArr] = useState(data);

  function onClickNavItem(item) {
    // find current clicked item in data arr
    const clickedItem = data.find((obj) => obj.type === item.textContent);
    // create a new data arr with clicked item's active value set to true
    const updatedData = data.map((obj) =>
      obj.type === clickedItem.type
        ? { ...obj, active: true }
        : { ...obj, active: false }
    );
    setNavBarArr(updatedData);
  }

  // Get current logged-in user
  const curUserJSON = localStorage.getItem("curUser");
  const curUser = JSON.parse(curUserJSON);

  // Remove token and user when logging out
  function onLogout() {
    localStorage.removeItem("curUser");
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="Navbar">
      <div className="Navbar-container">
        <div className="Navbar-name">
          <h2 onClick={() => navigate("/")}>Booking Website</h2>
          {/* Not logged in */}
          {!curUser && (
            <div className="Navbar-btn">
              <Link to="/signup">
                <button type="button">Register</button>
              </Link>
              <Link to="/login">
                <button type="button">Login</button>
              </Link>
            </div>
          )}
          {/* Logged in */}
          {curUser && curUser.isLogin && (
            <div className="Navbar-btn">
              <div>{curUser.email}</div>
              <Link to="/transaction">
                <button type="button">Transactions</button>
              </Link>
              <Link to="/">
                <button type="button" onClick={onLogout}>
                  Logout
                </button>
              </Link>
            </div>
          )}
        </div>

        <ul className="Navbar-menu">
          {navBarArr.map((item) => (
            <NavBarItem
              onClickItem={onClickNavItem}
              key={item.type}
              type={item.type}
              icon={item.icon}
              active={item.active}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
