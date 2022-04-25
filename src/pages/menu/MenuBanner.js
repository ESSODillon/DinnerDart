import { Button } from "@mui/material";
import { useFirestore } from "../../hooks/useFirestore";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function MenuBanner({ cart }) {
  const [total, setTotal] = useState(cart[0].price);
  const history = useHistory();
  const { user, authIsReady } = useAuthContext();
  const { addDocument, response } = useFirestore(`users/${user.uid}/cart`);
  const addButtons = document.getElementsByClassName("add-button");
  const reduceButtons = document.getElementsByClassName("reduce-button");

  function getSum(total, num) {
    return total + Math.round(num * 10) / 10;
  }

  const changeTotal = () => {
    for (let i = 0; i < cart.length; i++) {
      prices.push(cart[i].price);
    }

    setTotal(prices.reduce(getSum, 1));
  };

  let prices = [];

  useEffect(() => {
    Array.from(addButtons).forEach((button) => {
      button.addEventListener("click", changeTotal);
    });

    Array.from(reduceButtons).forEach((button) => {
      button.addEventListener("click", changeTotal);
    });
  }, [addButtons, reduceButtons]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let i = 0; i < cart.length; i++) {
      console.log(cart);
      await addDocument(cart[i]);
    }

    if (!response.error) {
      history.push("/cart");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="menu--banner">
      <ul className="menu--banner__list">
        {cart.map((item) => (
          <li key={item.id} className="menu--banner__list--item">
            {item.name} ~ ${item.price}
          </li>
        ))}
        <br />
        {/* <li className="menu--banner__list--item">Total: ${total}</li> */}
      </ul>

      <Button
        variant="contained"
        size="large"
        type="submit"
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
    </form>
  );
}
