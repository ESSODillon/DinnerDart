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
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { createTheme } from "@mui/material/styles";

export default function MenuList({ items }) {
  const { user } = useAuthContext();
  const { role } = useRole();
  const { error, documents } = useCollection("users");
  const [isPending] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [count, setCount] = React.useState(0);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#d95d39",
      },
    },
  });

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
    <div className="menu--list">
      {items.length === 0 && <p>No items yet!</p>}
      {items.map((item) => (
        <Badge fontSize="large" color="primary" badgeContent={count}>
          <Card
            sx={{
              width: "45rem",
              minHeight: "13rem",
              display: "flex",
              justifyContent: "space-between",
            }}
            key={item.id}
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
                      setCount(count + 1);
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                  <Button
                    aria-label="reduce"
                    onClick={() => {
                      setCount(Math.max(count - 1, 0));
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
              </CardContent>

              {admin && (
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
    </div>
  );
}
