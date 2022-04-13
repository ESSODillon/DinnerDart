// React, Firebase and Router
import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { projectFirestore } from "../firebase/config";
import { useRole } from "../hooks/useRole";
import { useCollection } from "../hooks/useCollection";

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
import Delete from "@mui/icons-material/Delete";

export default function CartList({ items }) {
  const { user } = useAuthContext();
  const { role } = useRole();
  const [isPending] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const deleteItem = (id) => {
    projectFirestore.collection(`users/${user.uid}/cart`).doc(id).delete();
  };

  return (
    <div className="cart--list">
      {items.length === 0 && <p>Your cart is empty</p>}
      <List
        sx={{
          width: "100%",
          maxWidth: 600,
          bgcolor: "background.paper",
        }}
      >
        {items.map((item) => (
          <>
            <div className="cart">
              <div className="cart--delete">
                <img src={Trashcan} onClick={() => deleteItem(item.id)} />
                {/* <DeleteIcon /> */}
              </div>
              <ListItemButton onClick={handleClick}>
                <ListItemAvatar>
                  <Avatar variant="square">
                    <img src={item.image} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} secondary={item.price} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </div>

            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText primary={item.description} />
                </ListItem>
              </List>
            </Collapse>
            <Divider variant="inset" component="li" />
          </>
        ))}
      </List>
    </div>
  );
}
