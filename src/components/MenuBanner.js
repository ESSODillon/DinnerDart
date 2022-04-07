import { Button } from "@mui/material";

export default function MenuBanner() {
  return (
    <div className="menu--banner">
      <Button
        variant="contained"
        size="large"
        style={{
          background: "#fdffff",
          padding: "0.8rem 1.2rem",
          borderRadius: "10rem",
          fontFamily: "Lato",
          color: "#3a3335",
          cursor: "pointer",
          fontSize: "1.8rem",
          border: "none",
          textTransform: "capitalize",
          lineHeight: "1.8rem",
          display: "block",
          margin: "0 auto",
          marginTop: "3rem",
          width: "50%",
        }}
      >
        Add to Cart
      </Button>
    </div>
  );
}
