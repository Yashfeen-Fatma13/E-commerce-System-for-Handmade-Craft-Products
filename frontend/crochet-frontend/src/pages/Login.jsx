import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (isLogin) {

        // 🔥 LOGIN
        const res = await axios.post(
          "http://localhost:5000/api/users/login",
          {
            email,
            password,
          }
        );

        localStorage.setItem(
          "userInfo",
          JSON.stringify(res.data)
        );

        alert("Login Successful ");

        navigate("/");

      } else {

        // 🔥 REGISTER
        const res = await axios.post(
          "http://localhost:5000/api/users/register",
          {
            name,
            email,
            password,
          }
        );

        localStorage.setItem(
          "userInfo",
          JSON.stringify(res.data)
        );

        alert("Register Successful ");

        navigate("/");
      }

      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {

      console.log(error);

      alert("Something went wrong ❌");
    }
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(to right, #ffe6f0, #fff0f5)",
        padding: "20px",
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "white",
          padding: "45px",
          borderRadius: "30px",
          boxShadow: "0 10px 35px rgba(255,105,180,0.2)",
        }}
      >

        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
            color: "#ff4f9a",
            fontSize: "38px",
          }}
        >
          Crochet Store 🧶
        </h1>

        <p
          style={{
            textAlign: "center",
            marginBottom: "35px",
            color: "#777",
            fontSize: "16px",
          }}
        >
          {isLogin
            ? "Welcome back "
            : "Create your cute account "}
        </p>

        <form onSubmit={handleSubmit}>

          {!isLogin && (
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <button
            type="submit"
            style={buttonStyle}
          >
            {isLogin ? "Login " : "Register "}
          </button>

        </form>

        <p
          onClick={() => setIsLogin(!isLogin)}
          style={{
            marginTop: "25px",
            textAlign: "center",
            color: "#ff4f9a",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          {isLogin
            ? "New user? Create Account "
            : "Already have account? Login "}
        </p>

      </div>

    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "16px",
  marginBottom: "18px",
  border: "2px solid #ffd6e7",
  borderRadius: "14px",
  outline: "none",
  fontSize: "16px",
  background: "#fff8fb",
};

const buttonStyle = {
  width: "100%",
  padding: "16px",
  border: "none",
  borderRadius: "14px",
  background: "#ff4f9a",
  color: "white",
  fontSize: "18px",
  fontWeight: "600",
  cursor: "pointer",
};

export default Login;