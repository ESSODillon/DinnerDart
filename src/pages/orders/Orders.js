import React from "react";
import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import OrderList from "../../components/OrderList";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Typography } from "@mui/material";

export default function Orders() {
  const { user } = useAuthContext();
  const [isPending, setIsPending] = useState(false);
  const { documents, error } = useCollection("orders");

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="orders">
      {/* {error && <p className="error">{error}</p>} */}
      {isPending && <p className="loading">Loading...</p>}
      <Typography sx={{ mb: 10, mt: 15, ml: "5rem" }} variant="h3">
        Orders
      </Typography>
      {documents != null && <OrderList items={documents} />}
    </div>
  );
}
