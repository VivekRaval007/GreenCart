import { useState } from "react";

export default function Settings() {
  const [form, setForm] = useState({
    platformName: "GreenCart",
    supportEmail: "support@greencart.test",
    commissionRate: 5,
    maintenanceMode: false,
  });
  const [saved, setSaved] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  return (
    <div className="gc-card accent-admin" style={{ maxWidth: 480 }}>
      <h3 style={{ fontSize: "1.05rem" }}>Platform settings</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" style={{ fontSize: "0.85rem" }}>Platform name</label>
          <input className="form-control" value={form.platformName} onChange={(e) => setForm({ ...form, platformName: e.target.value })} />
        </div>
        <div className="mb-3">
          <label className="form-label" style={{ fontSize: "0.85rem" }}>Support email</label>
          <input type="email" className="form-control" value={form.supportEmail} onChange={(e) => setForm({ ...form, supportEmail: e.target.value })} />
        </div>
        <div className="mb-3">
          <label className="form-label" style={{ fontSize: "0.85rem" }}>Platform commission (%)</label>
          <input type="number" min={0} max={100} className="form-control" value={form.commissionRate} onChange={(e) => setForm({ ...form, commissionRate: e.target.value })} />
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="maintenance"
            checked={form.maintenanceMode}
            onChange={(e) => setForm({ ...form, maintenanceMode: e.target.checked })}
          />
          <label className="form-check-label" htmlFor="maintenance" style={{ fontSize: "0.88rem" }}>
            Enable maintenance mode
          </label>
        </div>
        <button type="submit" className="btn-gc-primary">Save settings</button>
        {saved && <span style={{ marginLeft: "0.8rem", color: "var(--color-primary-dark)", fontSize: "0.85rem" }}>Saved ✓</span>}
      </form>
    </div>
  );
}
