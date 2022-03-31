import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDocument } from "../../hooks/useDocument";
import { useCollection } from "../../hooks/useCollection";
import MenuList from "../../components/MenuList";
import { Typography } from "@mui/material";

export default function Menu() {
  const { id } = useParams();
  const [isPending, setIsPending] = useState(false);
  const { documents } = useCollection(`restaurants/${id}/menu`);
  const { error, document } = useDocument("restaurants", id);

  console.log(documents);

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
          <Typography sx={{ mb: 10, mt: 15 }} variant="h3">
            {document.name}
          </Typography>
          <MenuList items={documents} />
        </>
      )}
    </div>
  );
}
