import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";

// Components
import RestaurantList from "../../components/RestaurantList";
import RestaurantFilter from "./RestaurantFilter";

// Material UI
import SearchIcon from "@mui/icons-material/Search";

export default function Home() {
  const { user } = useAuthContext();
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  const { documents } = useCollection("restaurants");
  const [currentFilter, setCurrentFilter] = useState("All");

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  const restaurants = documents
    ? documents.filter((document) => {
        console.log(documents[0].cuisines.length);
        for (var x = 0; documents[x].cuisines.length; x++) {
          var cuisineOptions = documents[x].cuisines;
          console.log(cuisineOptions);
          for (let y = 0; cuisineOptions.length; y++) {
            switch (currentFilter) {
              case "All":
                return true;
              case cuisineOptions[y]:
                return cuisineOptions[y] === currentFilter;
              default:
                break;
            }
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
        <form action="#" className="home__banner--search">
          <input
            type="text"
            className="home__banner--search__input"
            placeholder="Search"
          />
          <button className="home__banner--search__button">
            <svg className="home__banner--search__icon">
              <SearchIcon />
            </svg>
          </button>
        </form>
      </div>

      <RestaurantFilter
        currentFilter={currentFilter}
        changeFilter={changeFilter}
      />

      {documents && <RestaurantList restaurants={restaurants} />}
    </div>
  );
}
