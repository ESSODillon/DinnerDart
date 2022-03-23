// React, Firebase and Router
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projectFirestore } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRole } from "../hooks/useRole";
import { useTheme } from "../hooks/useTheme";

// Images
import Trashcan from "../assets/trashcan.svg";

// Material UI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function RestaurantList({ restaurants }) {
  const { user } = useAuthContext();
  const { role } = useRole();
  const [userData, setUserData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore.collection("users").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("Data failed to load");
          setIsPending(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setUserData(results);
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

  // If the currently logged user's ID matches a document in the users table ID, console log that users role

  useEffect(() => {
    if (userData != null) {
      for (let x in userData) {
        if (user.uid == userData[x].id && userData[x].role == "admin") {
          setAdmin(true);
          return;
        } else {
          setAdmin(false);
        }
      }
    }
  }, [userData]);

  if (restaurants.length == 0) {
    return <div className="error">No restaurants to load...</div>;
  }

  const deleteItem = (id) => {
    projectFirestore.collection("restaurants").doc(id).delete();
  };

  return (
    <div className="restaurant-list">
      {restaurants.map((restaurant) => (
        <Card sx={{ maxWidth: 345 }} key={restaurant.id}>
          <Link
            to={`/restaurants/${restaurant.id}`}
            className="u-remove-text-decoration"
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={restaurant.image}
                alt={restaurant.name}
              />
              <CardContent>
                <Typography
                  sx={{ fontSize: "1rem" }}
                  color="text.secondary"
                  gutterBottom
                >
                  Word of the Day
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {restaurant.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {restaurant.cuisines[0]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
                {admin && (
                  <img
                    className="delete"
                    src={Trashcan}
                    onClick={() => deleteItem(restaurant.id)}
                  />
                )}
              </CardContent>
            </CardActionArea>
          </Link>
        </Card>
      ))}
    </div>
  );
}
