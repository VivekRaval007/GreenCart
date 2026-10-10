import { useState } from "react";
import { useApp } from "../../context/AppContext";
import RoleBadge from "../../components/common/RoleBadge";

export default function Profile() {
  const { currentUser, updateProfile } = useApp();
  const [form, setForm] = useState({ name: currentUser.name, location: currentUser.location || "" });
  const [saved, setSaved] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  return (
    <div className="gc-card" style={{ maxWidth: 460 }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 style={{ fontSize: "1.05rem", marginBottom: 0 }}>Profile management</h3>
        <RoleBadge role={currentUser.role} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" style={{ fontSize: "0.85rem" }}>Full name</label>
          <input className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label className="form-label" style={{ fontSize: "0.85rem" }}>Email</label>
          <input className="form-control" value={currentUser.email} disabled />
          <div style={{ fontSize: "0.75rem", color: "var(--color-muted)", marginTop: "0.25rem" }}>
            Contact support to change your login email.
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label" style={{ fontSize: "0.85rem" }}>Location</label>
          <input className="form-control" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="City, State" />
        </div>
        <button type="submit" className="btn-gc-primary">Save profile</button>
        {saved && <span style={{ marginLeft: "0.8rem", color: "var(--color-primary-dark)", fontSize: "0.85rem" }}>Saved ✓</span>}
      </form>
    </div>
  );
}
