import React from "react";
import "./SearchListItem.css";
import { useNavigate } from "react-router-dom";

export default function SearchListItem(props) {
  const navigate = useNavigate();
  function onVisitHotel() {
    navigate(`/detail/${props.id}`);
    window.scrollTo({ top: "0", behavior: "smooth" });
  }
  return (
    <div className="search-item-container">
      <img src={props.image_url} alt={props.name} />
      <div className="search-item-details">
        <h2 onClick={onVisitHotel}>{props.name}</h2>
        <div className="search-item-address">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="green"
            className="w-6 h-6 me-1"
            width="20px"
          >
            <path
              fillRule="evenodd"
              d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
          {props.address}
        </div>
        <span className="search-item-tag">{props.tag}m from center</span>
        <div>{props.description.split(",")[0] + "..."}</div>
        <div>
          &#9873; &nbsp;
          {props.type.toUpperCase()}
        </div>
        <div className="free-cancel">
          <strong>{props.free_cancel ? "Free cancellation" : ""}</strong>
        </div>
        <div className="free-cancel">
          {props.free_cancel
            ? "You can cancel later, so lock in this great price today!"
            : ""}
        </div>
      </div>
      <div className="item-rating-price">
        <div className="search-item-rating">
          <p>{props.rate_text}</p>
          <div className="item-rate">{props.rate} &#9733;</div>
        </div>
        <div className="search-item-price">
          <div className="item-price">${props.price}</div>
          <div className="item-tax">Includes taxes and fees</div>

          <button
            type="button"
            className="search-item-btn"
            onClick={onVisitHotel}
          >
            See availability
          </button>
        </div>
      </div>
    </div>
  );
}
