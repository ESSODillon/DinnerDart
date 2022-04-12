// React, Firebase and Router
import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { projectFirestore } from "../firebase/config";
import { useRole } from "../hooks/useRole";
import { useCollection } from "../hooks/useCollection";

// Images
import Trashcan from "../assets/trashcan.svg";

// Material UI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function CartList({ items }) {
  const { user } = useAuthContext();
  const { role } = useRole();
  const [isPending] = useState(false);

  const deleteItem = (id) => {
    projectFirestore.collection(`users/${user.uid}/cart`).doc(id).delete();
  };

  return (
    <div className="menu--list">
      {items.length === 0 && <p>No items yet!</p>}
      {items.map((item) => (
        <Card
          key={item.id}
          sx={{
            width: "45rem",
            minHeight: "13rem",
            display: "flex",
            justifyContent: "space-between",
          }}
          style={{ fontSize: "1.6rem", fontFamily: "Lato" }}
          className="menu--card"
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent>
              <Typography sx={{ mb: 1.5 }} component="div" variant="h5">
                {item.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {item.description}
              </Typography>
            </CardContent>

            {role === "admin" && (
              <img
                className="delete--menu-item"
                src={Trashcan}
                onClick={() => deleteItem(item.id)}
              />
            )}

            <Typography
              variant="subtitle1"
              component="div"
              className="menu--card__price"
            >
              ${item.price}
            </Typography>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: "25%" }}
            image={item.image}
            alt={item.name}
          />
        </Card>
      ))}
    </div>
  );
}
