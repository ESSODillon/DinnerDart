// React, Firebase and Router
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projectFirestore } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRole } from "../hooks/useRole";
import { useCollection } from "../hooks/useCollection";

// Images
import Trashcan from "../assets/trashcan.svg";

// Material UI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Rating from "@mui/material/Rating";

export default function RestaurantList({ restaurants }) {
  const { user } = useAuthContext();
  const { role } = useRole();
  const { error, documents } = useCollection("users");
  const [isPending] = useState(false);
  const [admin, setAdmin] = useState(false);

  // If the currently logged user's ID matches a document in the users table ID, console log that users role
  useEffect(() => {
    if (documents != null) {
      for (let x in documents) {
        if (user.uid == documents[x].id && documents[x].role == "admin") {
          setAdmin(true);
          return;
        } else {
          setAdmin(false);
        }
      }
    }
  }, [documents]);

  if (restaurants.length == 0) {
    return <div className="error">No restaurants to load...</div>;
  }

  const deleteItem = (id) => {
    projectFirestore.collection("restaurants").doc(id).delete();
  };

  return (
    <div className="restaurant-list">
      {restaurants.map((restaurant) => (
        <Card
          sx={{ minWidth: 345 }}
          key={restaurant.id}
          style={{ fontSize: "1.6rem", fontFamily: "Lato" }}
        >
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
                  {restaurant.hours}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {restaurant.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {restaurant.cuisines[0]}
                </Typography>
                <Rating
                  name="simple-controlled"
                  precision={0.5}
                  value={restaurant.rating}
                  readOnly
                />
                {admin && (
                  <img
                    className="delete--restaurant"
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
