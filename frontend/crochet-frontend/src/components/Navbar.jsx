import { Link, useLocation } from "react-router-dom";

function Navbar() {

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const location = useLocation();

  return (

    <div
      style={{
        width: "100%",
        padding: "18px 50px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "linear-gradient(to right, #ffb6d9, #ffd6e8)",
        boxShadow: "0 4px 15px rgba(255,105,180,0.2)",
        position: "sticky",
        top: "0",
        zIndex: "1000",
      }}
    >

      {/* LOGO */}
      <Link
        to="/"
        style={{
          textDecoration: "none",
        }}
      >
        <h1
          style={{
            color: "#fff",
            fontSize: "34px",
            fontWeight: "700",
            letterSpacing: "1px",
          }}
        >
          Crochet Store 🧶
        </h1>
      </Link>

      {/* MENU */}
      <div
        style={{
          display: "flex",
          gap: "35px",
          alignItems: "center",
        }}
      >

        <Link
          to="/"
          style={linkStyle}
        >
          Home 🏡
        </Link>

        <Link
          to="/cart"
          style={linkStyle}
        >
          Cart 🛒
        </Link>

        <Link
          to="/login"
          style={linkStyle}
        >
          Login 💖
        </Link>

        {userInfo && location.pathname !== "/login" && (
          <span
            style={{
              color: "#fff",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            Hi, {userInfo.name} 🌸
          </span>
        )}

      </div>

    </div>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#fff",
  fontSize: "20px",
  fontWeight: "600",
};

export default Navbar;