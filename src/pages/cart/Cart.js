import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import CartList from "./CartList";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Typography } from "@mui/material";

export default function Cart() {
  const { user } = useAuthContext();
  const [isPending, setIsPending] = useState(false);
  const { documents } = useCollection(`users/${user.uid}/cart`);

  // if (error) {
  //   return <div className="error">{error}</div>;
  // }

  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="menu">
      {/* {error && <p className="error">{error}</p>} */}
      {isPending && <p className="loading">Loading...</p>}
      <Typography sx={{ mb: 10, mt: 15, ml: "5rem" }} variant="h3">
        {user.displayName}'s Cart
      </Typography>
      {documents != null && <CartList items={documents} />}
    </div>
  );
}
