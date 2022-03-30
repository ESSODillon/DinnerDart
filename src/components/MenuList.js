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
import Box from "@mui/material/Box";

export default function MenuList({ items }) {
  const { user } = useAuthContext();
  const { role } = useRole();
  const { error, documents } = useCollection("users");
  const [isPending] = useState(false);
  const [admin, setAdmin] = useState(false);
  console.log(items);

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

  const deleteItem = (id) => {
    projectFirestore.collection("restaurants").doc(id).delete();
  };

  return (
    <div className="item-list">
      {items.length === 0 && <p>No items yet!</p>}
      {items.map((item) => (
        <Card
          sx={{ maxWidth: 345, display: "flex" }}
          key={item.id}
          style={{ fontSize: "1.6rem", fontFamily: "Lato" }}
          className="menu--card"
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
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
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              {item.price}

              {admin && (
                <img
                  className="delete--menu-item"
                  src={Trashcan}
                  onClick={() => deleteItem(item.id)}
                />
              )}
            </Box>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={item.image}
            alt="Live from space album cover"
          />
        </Card>
      ))}
    </div>
  );
}
