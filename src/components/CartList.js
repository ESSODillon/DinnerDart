// React, Firebase and Router
import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { projectFirestore } from "../firebase/config";
import { useRole } from "../hooks/useRole";
import { useCollection } from "../hooks/useCollection";
import { useFirestore } from "../hooks/useFirestore";
import { useHistory } from "react-router-dom";

// Images
import Trashcan from "../assets/trashcan.svg";

// Material UI
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";

export default function CartList({ items }) {
  const { user } = useAuthContext();
  const { role } = useRole();
  const history = useHistory();
  const [isPending] = useState(false);
  const { addDocument, response } = useFirestore("orders");
  const [open, setOpen] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);

  const handleClick = (id) => {
    setOpen(!open);
    setClickedItem(id);
  };

  const deleteItem = (id) => {
    projectFirestore.collection(`users/${user.uid}/cart`).doc(id).delete();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDocument(items);

    if (!response.error) {
      for (let i = 0; i < items.length; i++) {
        projectFirestore
          .collection(`users/${user.uid}/cart`)
          .doc(items[i].id)
          .delete();
      }

      history.push("/");
    }
  };

  return (
    <div className="cart--list">
      {items.length === 0 && <p>Your cart is empty</p>}
      {items.length > 0 && (
        <List
          sx={{
            width: "100%",
            maxWidth: 600,
            bgcolor: "background.paper",
          }}
        >
          {items.map((item, i) => (
            <>
              <div className="cart">
                <div className="cart--delete">
                  <img src={Trashcan} onClick={() => deleteItem(item.id)} />
                  {/* <DeleteIcon /> */}
                </div>
                <ListItemButton onClick={() => handleClick(item.id)}>
                  <ListItemAvatar>
                    <Avatar variant="square">
                      <img src={item.image} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.name} secondary={item.price} />
                  {open && clickedItem === item.id ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </ListItemButton>
              </div>

              <Collapse
                in={open && clickedItem === item.id}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemText primary={item.description} />
                  </ListItem>
                </List>
              </Collapse>
              <Divider variant="inset" component="li" />
            </>
          ))}
          <Button
            variant="contained"
            onClick={handleSubmit}
            style={{
              background: "#d95d39",
              padding: "0.8rem 1.2rem",
              borderRadius: "10rem",
              fontFamily: "Lato",
              color: "#fdffff",
              cursor: "pointer",
              fontSize: "1.8rem",
              border: "none",
              textTransform: "capitalize",
              lineHeight: "2rem",
              display: "block",
              margin: "0 auto",
              marginTop: "5rem",
              marginBottom: "5rem",
              width: "60%",
            }}
            size="large"
            margin="normal"
          >
            Place Order
          </Button>
        </List>
      )}
    </div>
  );
}
