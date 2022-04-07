// React, Firebase and Router
import React, { useState } from "react";
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
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MenuBanner from "./MenuBanner";

export default function MenuList({ items }) {
  const { user } = useAuthContext();
  const { role } = useRole();
  const { error, documents } = useCollection("users");
  const [isPending] = useState(false);
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);

  const deleteItem = (id) => {
    projectFirestore.collection("restaurants").doc(id).delete();
  };

  const itemCount = (item) => {
    let counter = 0;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i] === item) {
        counter++;
      }
    }
    return counter;
  };

  const handleAddItem = (item) => {
    cart.push(item);
    setCount(cart.length);
  };

  const handleRemoveItem = (item) => {
    if (cart.includes(item)) {
      cart.splice(cart.indexOf(item), 1);
      setCount(cart.length);
    } else {
      console.log("Item not found in cart");
    }
  };

  return (
    <div className="menu--list">
      {items.length === 0 && <p>No items yet!</p>}
      {items.map((item) => (
        <Badge
          key={item.id}
          fontSize="large"
          color="primary"
          badgeContent={itemCount(item)}
        >
          <Card
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

                <ButtonGroup
                  sx={{ position: "absolute", bottom: "1rem", right: "30%" }}
                >
                  <Button
                    aria-label="increase"
                    onClick={() => {
                      handleAddItem(item);
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                  <Button
                    aria-label="reduce"
                    onClick={() => {
                      handleRemoveItem(item);
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
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
                {item.price}
              </Typography>
            </Box>
            <CardMedia
              component="img"
              sx={{ width: "25%" }}
              image={item.image}
              alt={item.name}
            />
          </Card>
        </Badge>
      ))}
      {cart.length > 0 && <MenuBanner>Add to Cart</MenuBanner>}
    </div>
  );
}
