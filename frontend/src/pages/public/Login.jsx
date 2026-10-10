import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiFeather } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import { demoUsers } from "../../data/mockData";
import greencartHero from "../../assets/greencart-hero.png";
import "./AuthLayout.css";

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const result = login(email, password);
    if (result.ok) {
      navigate(`/${result.user.role}`);
    } else {
      setError(result.error);
    }
  }

  function fillDemo(user) {
    setEmail(user.email);
    setPassword(user.password);
    setError("");
  }

  return (
    <div className="auth-split">
      <div className="auth-split-form">
        <div className="auth-card">
        <div className="auth-logo"><FiFeather /> GreenCart</div>
        <h2 style={{ fontSize: "1.3rem" }}>Welcome back</h2>
        <p style={{ color: "var(--color-muted)", fontSize: "0.88rem", marginBottom: "1.2rem" }}>
          Log in to reach your role's dashboard.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" style={{ fontSize: "0.85rem", fontWeight: 500 }}>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontSize: "0.85rem", fontWeight: 500 }}>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {error && <div className="text-danger mb-3" style={{ fontSize: "0.85rem" }}>{error}</div>}
          <button type="submit" className="btn-gc-primary w-100">Log in</button>
        </form>

        <div style={{ fontSize: "0.85rem", marginTop: "1rem" }}>
          New to GreenCart? <Link to="/register">Create an account</Link>
        </div>

        <div className="demo-box">
          <strong>Demo accounts</strong> (password: demo123)
          <table>
            <tbody>
              {demoUsers.map((u) => (
                <tr key={u.id}>
                  <td style={{ textTransform: "capitalize", fontWeight: 600 }}>{u.role}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => fillDemo(u)}
                      style={{ background: "none", border: "none", padding: 0, color: "var(--color-primary-dark)", cursor: "pointer", textDecoration: "underline" }}
                    >
                      {u.email}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>
      <div className="auth-split-image auth-split-image--brand">
        <img src={greencartHero} alt="GreenCart — Fresh Choices, Healthier You" />
      </div>
    </div>
  );
}
