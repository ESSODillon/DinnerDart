import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import CartList from "../../components/CartList";
import { useAuthContext } from "../../hooks/useAuthContext";

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
      <h1>Cart</h1>
      {documents != null && <CartList items={documents} />}
    </div>
  );
}
