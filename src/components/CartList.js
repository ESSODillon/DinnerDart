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
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import StarBorder from "@mui/icons-material/StarBorder";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ListSubheader from "@mui/material/ListSubheader";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

export default function CartList({ items }) {
  const { user } = useAuthContext();
  const { role } = useRole();
  const [isPending] = useState(false);
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const deleteItem = (id) => {
    projectFirestore.collection(`users/${user.uid}/cart`).doc(id).delete();
  };

  return (
    <div className="menu--list">
      {items.length === 0 && <p>No items yet!</p>}
      <List
        sx={{
          width: "100%",
          maxWidth: 600,
          bgcolor: "background.paper",
        }}
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {user.displayName}'s Cart
          </ListSubheader>
        }
      >
        {items.map((item) => (
          <>
            <ListItemButton onClick={handleClick}>
              <ListItemAvatar>
                <Avatar>
                  <img src={item.image} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.name} secondary={item.price} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

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
