import { Button } from "@mui/material";
import { useEffect, useState } from "react";

export default function MenuBanner({ cart }) {
  const [total, setTotal] = useState(0);
  const addButtons = document.getElementsByClassName("add-button");
  const reduceButtons = document.getElementsByClassName("reduce-button");

  const changeTotal = () => {
    let prices = [];

    for (let i = 0; i < cart.length; i++) {
      prices.push(cart[i].price);
      setTotal(prices.reduce((a, b) => a + b, 0));
    }
  };

  useEffect(() => {
    Array.from(addButtons).forEach((button) => {
      button.addEventListener("click", changeTotal);
    });

    Array.from(reduceButtons).forEach((button) => {
      button.addEventListener("click", changeTotal);
    });
  }, [addButtons, reduceButtons]);

  return (
    <div className="menu--banner">
      <ul className="menu--banner__list">
        {cart.map((item) => (
          <li className="menu--banner__list--item">
            {item.name} ~ ${item.price}
          </li>
        ))}
        <br />
        <li className="menu--banner__list--item">Total: ${total}</li>
      </ul>

      <Button
        variant="contained"
        size="large"
        style={{
          background: "#fdffff",
          borderRadius: "10rem",
          fontFamily: "Lato",
          color: "#3a3335",
          cursor: "pointer",
          fontSize: "1.4rem",
          border: "none",
          textTransform: "capitalize",
          display: "block",
          width: "25%",
          height: "5rem",
        }}
      >
        Add to Cart
      </Button>
    </div>
  );
}
