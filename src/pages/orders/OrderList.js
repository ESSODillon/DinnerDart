// React, Firebase and Router
import React, { useState } from "react";
import { projectFirestore } from "../../firebase/config";
import { useRole } from "../../hooks/useRole";

// Images
import Trashcan from "../../assets/trashcan.svg";

// Material UI
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function OrderList({ orders }) {
  const { role } = useRole();

  const deleteItem = (id) => {
    projectFirestore.collection("restaurants").doc(id).delete();
  };

  if (orders.length == 0) {
    return <div className="error">No orders to load...</div>;
  }

  return (
    <div className="orders--list">
      {orders.map((order) => (
        <Accordion sx={{ maxWidth: "80vw" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{order.customer}'s Order</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{}}>
            {order.items.map((item) => (
              <Card
                sx={{
                  width: "45rem",
                  minHeight: "13rem",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                style={{ fontSize: "1.6rem", fontFamily: "Lato" }}
                className="orders--card"
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
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
