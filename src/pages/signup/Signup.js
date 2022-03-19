import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, signup } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password);
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
      <button className="btn">sign up</button>
      {error && <p>{error}</p>}
    </form>
  );
}
