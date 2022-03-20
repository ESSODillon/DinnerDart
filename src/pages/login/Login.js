import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, login } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="auth-background">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-form__header">Login</h2>
        <label className="auth-form__label">
          <span className="auth-form__span">email:</span>
          <input
            required
            className="auth-form__input"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label className="auth-form__label">
          <span className="auth-form__span">password:</span>
          <input
            required
            className="auth-form__input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <Button
          variant="contained"
          style={{
            background: "#d95d39",
            padding: "0.8rem 1.2rem",
            borderRadius: "10rem",
            fontFamily: "Lato",
            color: "#fdffff",
            cursor: "pointer",
            fontSize: "1.8rem",
            border: "none",
            textTransform: "capitalize",
            lineHeight: "1.8rem",
            marginTop: "1rem",
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          size="large"
          margin="normal"
        >
          Login
        </Button>
        {error && <p>{error}</p>}
        <p className="auth-form__redirect">
          Don't have an account?
          <Link className="auth-form__redirect--link" to="/signup">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
