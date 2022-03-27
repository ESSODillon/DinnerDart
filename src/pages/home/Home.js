import { projectFirestore } from "../../firebase/config";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";

// Components
import RestaurantList from "../../components/RestaurantList";
import RestaurantFilter from "./RestaurantFilter";

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
        switch (currentFilter) {
          case "All":
            return true;
          case "American":
          case "Asian":
          case "Fast Food":
          case "Pizza":
          case "Chicken":
          case "Breakfast":
            // Change this to cycle through every cuisines option
            return document.cuisines[0] === currentFilter;
          default:
            return true;
        }
      })
    : null;

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore.collection("restaurants").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("Data failed to load");
          setIsPending(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setData(results);
          setIsPending(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );

    return () => unsub();
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}

      <div className="home__banner">
        <h1 className="home__banner--header">
          Already know what you want {user.displayName}?
        </h1>
      </div>

      <RestaurantFilter
        currentFilter={currentFilter}
        changeFilter={changeFilter}
      />

      {documents && <RestaurantList restaurants={restaurants} />}
    </div>
  );
}
