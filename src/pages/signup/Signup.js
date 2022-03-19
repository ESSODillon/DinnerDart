import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, name, thumbnail);
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

    if (selected.size > 100000) {
      setThumbnailError("Image file size must be less than 100kb");
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
    console.log("thumbnail updated");
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
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
          onChange={(e) => setName(e.target.value)}
          value={name}
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

      {!isPending && <button className="btn">Signup</button>}
      {isPending && (
        <button disabled className="btn">
          Loading
        </button>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  );
}
