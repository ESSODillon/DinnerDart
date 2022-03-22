import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import Trashcan from "../assets/trashcan.svg";
import { projectFirestore } from "../firebase/config";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function RestaurantList({ restaurants }) {
  const { mode } = useTheme();

  console.log(mode);

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
                <img
                  className="delete"
                  src={Trashcan}
                  onClick={() => deleteItem(restaurant.id)}
                />
              </CardContent>
            </CardActionArea>
          </Link>
        </Card>
      ))}
    </div>
  );
}
