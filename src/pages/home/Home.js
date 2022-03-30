import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";

// Components
import RestaurantList from "../../components/RestaurantList";
import Searchbar from "../../components/Searchbar";
import RestaurantFilter from "../../components/RestaurantFilter";

export default function Home() {
  const { user } = useAuthContext();
  const [isPending] = useState(false);
  const [error] = useState(false);
  const { documents } = useCollection("restaurants");
  const [currentFilter, setCurrentFilter] = useState("All");

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  const restaurants = documents
    ? documents.filter((document) => {
        for (let x in documents) {
          let cuisineOptions = document.cuisines;

          switch (currentFilter) {
            case "All":
              return true;
            case cuisineOptions[x]:
              return cuisineOptions.includes(currentFilter);
            default:
              break;
          }
        }
      })
    : null;

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}

      <div className="home__banner">
        <h1 className="home__banner--header">
          Already know what you want {user.displayName}?
        </h1>
        <Searchbar />
      </div>

      <RestaurantFilter
        currentFilter={currentFilter}
        changeFilter={changeFilter}
      />

      {documents && <RestaurantList restaurants={restaurants} />}
    </div>
  );
}
