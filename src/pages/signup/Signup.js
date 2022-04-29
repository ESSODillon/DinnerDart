import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { Link } from "react-router-dom";

// Material UI
import Button from "@mui/material/Button";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [role, setRole] = useState("customer");
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signup);
    signup(email, password, displayName, thumbnail, role);
  };

  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];
    console.log(selected);

    if (!selected) {
      setThumbnailError("Please select a file");
      return;
    }

    if (!selected.type.includes("image")) {
      setThumbnailError("Selected file must be an image");
      return;
    }

    if (selected.size > 200000) {
      setThumbnailError("Image file size must be less than 200kb");
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
    console.log("thumbnail updated");
  };

  return (
    <div className="auth-background">
      <form id="signup-form" className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-form__header">Signup</h2>

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
        <label className="auth-form__label">
          <span className="auth-form__span">name:</span>
          <input
            required
            className="auth-form__input"
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>
        <label className="auth-form__label">
          <span>profile picture:</span>
          <input
            required
            type="file"
            className="auth-form__input"
            onChange={handleFileChange}
          />
          {thumbnailError && <div className="error">{thumbnailError}</div>}
        </label>
        <label className="auth-form__label">
          <span>user role:</span>
          <select
            required
            className="auth-form__input"
            name="roles"
            id="roles"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="customer">Customer</option>
            <option value="darter">Darter</option>
            <option value="restaurant">Restaurant</option>
          </select>
        </label>

        {!isPending && (
          <Button
            variant="contained"
            type="submit"
            form="signup-form"
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
              display: "block",
              margin: "0 auto",
              width: "90%",
            }}
            size="large"
            margin="normal"
          >
            Signup
          </Button>
        )}
        {isPending && (
          <Button
            variant="contained"
            disabled
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
              display: "block",
              margin: "0 auto",
              width: "90%",
            }}
            size="large"
            margin="normal"
          >
            Loading...
          </Button>
        )}
        <p className="auth-form__redirect">
          Already have an account?
          <Link className="auth-form__redirect--link" to="/login">
            Sign in
          </Link>
        </p>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
