import React from "react";
import "./NavBarItem.css";

function NavBarItem(props) {
  function onClickHandler(e) {
    // on click, pass the cloest li element UP to NavBar.js
    props.onClickItem(e.target.closest("li"));
  }
  return (
    <li
      className={props.active ? "navbar-item__border" : ""}
      onClick={onClickHandler}
    >
      <a href="#" onClick={(e) => e.preventDefault()}>
        <i className={`fa ${props.icon} navbar-icon`}></i>
        {props.type}
      </a>
    </li>
  );
}

export default NavBarItem;
