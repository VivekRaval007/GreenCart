import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiFeather } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import greencartHero from "../../assets/greencart-hero.png";
import "./AuthLayout.css";

const ROLE_OPTIONS = [
  { value: "farmer", label: "Farmer" },
  { value: "dealer", label: "Dealer" },
  { value: "customer", label: "Customer" },
  { value: "delivery", label: "Delivery Personnel" },
  { value: "support", label: "Support Staff" },
  { value: "admin", label: "Administrator" },
];

export default function Register() {
  const { register } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const preselectedRole = location.state?.role || "customer";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: preselectedRole,
    location: "",
  });
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const result = register(form);
    if (result.ok) {
      navigate(`/${result.user.role}`);
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="auth-split">
      <div className="auth-split-form">
        <div className="auth-card">
        <div className="auth-logo"><FiFeather /> GreenCart</div>
        <h2 style={{ fontSize: "1.3rem" }}>Create your account</h2>
        <p style={{ color: "var(--color-muted)", fontSize: "0.88rem", marginBottom: "1.2rem" }}>
          Choose the role that matches how you'll use GreenCart.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" style={{ fontSize: "0.85rem", fontWeight: 500 }}>I am a</label>
            <select
              className="form-select"
              value={form.role}
              onChange={(e) => update("role", e.target.value)}
            >
              {ROLE_OPTIONS.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontSize: "0.85rem", fontWeight: 500 }}>Full name</label>
            <input
              className="form-control"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontSize: "0.85rem", fontWeight: 500 }}>Email</label>
            <input
              type="email"
              className="form-control"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontSize: "0.85rem", fontWeight: 500 }}>Password</label>
            <input
              type="password"
              className="form-control"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontSize: "0.85rem", fontWeight: 500 }}>Location (optional)</label>
            <input
              className="form-control"
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              placeholder="City, State"
            />
          </div>
          {error && <div className="text-danger mb-3" style={{ fontSize: "0.85rem" }}>{error}</div>}
          <button type="submit" className="btn-gc-primary w-100">Create account</button>
        </form>

        <div style={{ fontSize: "0.85rem", marginTop: "1rem" }}>
          Already have an account? <Link to="/login">Log in</Link>
        </div>
        </div>
      </div>
      <div className="auth-split-image auth-split-image--brand">
        <img src={greencartHero} alt="GreenCart — Fresh Choices, Healthier You" />
      </div>
    </div>
  );
}
