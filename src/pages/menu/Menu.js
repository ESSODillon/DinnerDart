import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDocument } from "../../hooks/useDocument";
import { useRole } from "../../hooks/useRole";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import MenuList from "./MenuList";
import { Divider, Typography } from "@mui/material";
import FormDialog from "./FormDialogue";

export default function Menu() {
  const { role } = useRole();
  const { id } = useParams();
  const { user } = useAuthContext();
  const [isPending, setIsPending] = useState(false);
  const { documents } = useCollection(`restaurants/${id}/menu`);
  const { error, document } = useDocument("restaurants", id);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="menu">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {document && (
        <>
          <div className="u-margin-bottom-medium">
            <Typography sx={{ mb: 1, ml: "5rem" }} variant="h3">
              {document.name}
            </Typography>
            <Typography
              sx={{ mb: 1, ml: "5rem", color: "#808080" }}
              variant="h6"
            >
              {document.address} • {document.phone}
            </Typography>
            <Divider sx={{ width: "90vw", ml: "5rem" }} />
          </div>
          <MenuList items={documents} />
          {role === "admin" && <FormDialog id={id} />}
        </>
      )}
    </div>
  );
}
