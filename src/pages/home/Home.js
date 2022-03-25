import { projectFirestore } from "../../firebase/config";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

// Components
import RestaurantList from "../../components/RestaurantList";

export default function Home() {
  const { user } = useAuthContext();
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

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
        <h1 className="home__banner--header">Hi, {user.displayName}</h1>
      </div>

      {data && <RestaurantList restaurants={data} />}
    </div>
  );
}
