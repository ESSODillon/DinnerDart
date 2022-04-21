import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";

// Components
import RestaurantList from "../home/RestaurantList";

export default function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q");

  const [isPending] = useState(false);
  const [error] = useState(false);
  const { documents } = useCollection("restaurants");

  const restaurants = documents
    ? documents.filter((document) => {
        let nameResults = document.name.toLocaleUpperCase();
        let searchQuery = query.toLocaleUpperCase();

        return nameResults.includes(searchQuery);
      })
    : null;

  return (
    <div className="search">
      <h2 className="page-title">Search results for "{query}"</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {documents && <RestaurantList restaurants={restaurants} />}
    </div>
  );
}
