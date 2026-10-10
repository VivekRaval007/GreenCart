import { useState } from "react";
import { FiClipboard } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import StatusPill from "../../components/common/StatusPill";
import EmptyState from "../../components/common/EmptyState";

const CATEGORIES = ["All", "Customer", "Farmer", "Dealer", "Delivery"];

export default function TicketRecords() {
  const { tickets } = useApp();
  const [category, setCategory] = useState("All");
  const filtered = category === "All" ? tickets : tickets.filter((t) => t.category === category);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <p style={{ color: "var(--color-muted)", margin: 0 }}>A full record of resolved and pending support tickets.</p>
        <div className="d-flex gap-2 flex-wrap">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={c === category ? "btn-gc-primary" : "btn-gc-outline"}
              style={{ padding: "0.3rem 0.8rem", fontSize: "0.8rem" }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      {filtered.length === 0 ? (
        <EmptyState icon={FiClipboard} title="No tickets in this category" />
      ) : (
        <div className="gc-card">
          <table className="gc-table">
            <thead><tr><th>From</th><th>Category</th><th>Subject</th><th>Priority</th><th>Status</th><th>Response</th></tr></thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id}>
                  <td>{t.customerName}</td>
                  <td><span className="gc-pill pill-grey">{t.category}</span></td>
                  <td>{t.subject}</td>
                  <td><StatusPill value={t.priority} /></td>
                  <td><StatusPill value={t.status} /></td>
                  <td style={{ color: "var(--color-muted)", fontSize: "0.85rem" }}>{t.response || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
