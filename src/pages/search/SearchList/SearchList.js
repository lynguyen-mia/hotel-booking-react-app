import React, { useEffect, useState } from "react";
import "./SearchList.css";
import SearchListItem from "./SearchListItem";
import { useMyContext } from "../../../store/context";

export default function SearchList() {
  const ctx = useMyContext();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get search results from server
  useEffect(() => {
    // Get search conditions from context
    const searchConditions = ctx.searchFields;

    async function getSearchedResults() {
      setIsLoading(true);
      const res = await fetch(
        "https://hotel-booking-node-app.onrender.com/search-hotels",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(searchConditions)
        }
      );

      if (!res.ok) {
        console.log("Couldn't fetch hotels");
      }

      const searchResults = await res.json();
      // console.log(searchResults);
      setSearchResults(searchResults);
      setIsLoading(false);
    }

    getSearchedResults();
  }, [ctx.searchFields]); // this make page reloads everytime search conditions change

  return (
    <div className="search-list-container">
      {isLoading && <div className="text-center">Loading...</div>}
      {!isLoading && searchResults.length === 0 && (
        <div className="text-center">No hotels found.</div>
      )}
      {!isLoading &&
        searchResults.length > 0 &&
        searchResults.map((item) => (
          <SearchListItem
            key={item._id}
            id={item._id}
            name={item.name}
            address={item.address}
            tag={item.distance}
            type={item.type}
            description={item.desc}
            free_cancel={true}
            price={item.cheapestPrice}
            rate={item.rating}
            // rate_text={item.rate_text}
            image_url={item.photos[0]}
          />
        ))}
    </div>
  );
}
