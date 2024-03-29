import React from "react";
import "./Search.css";
import SearchPopup from "./SearchPopUp/SearchPopup";
import SearchList from "./SearchList/SearchList";
import RegisterForm from "../home/RegisterForm/RegisterForm.js";

const Search = () => {
  return (
    <div>
      <div className="search-container">
        <SearchPopup />
        <SearchList />
      </div>
      <RegisterForm />
    </div>
  );
};

export default Search;
