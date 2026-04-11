import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { cart } = useContext(CartContext);

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: 20, background: "#eee" }}>
      <h2>Crochet Store 🧶</h2>

      <div>
        <Link to="/">Home</Link> |{" "}
        <Link to="/cart">Cart 🛒 ({cart.length})</Link>
      </div>
    </div>
  );
}

export default Navbar;