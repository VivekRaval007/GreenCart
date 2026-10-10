import { useState } from "react";
import { Modal } from "react-bootstrap";
import { FiLifeBuoy } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import StatusPill from "../../components/common/StatusPill";
import EmptyState from "../../components/common/EmptyState";

const CATEGORIES = ["All", "Customer", "Farmer", "Dealer", "Delivery"];

export default function ManageQueries() {
  const { tickets, updateTicket } = useApp();
  const [category, setCategory] = useState("All");
  const openQueries = tickets.filter(
    (t) => t.status !== "Resolved" && (category === "All" || t.category === category)
  );
  const [active, setActive] = useState(null);
  const [response, setResponse] = useState("");

  function openTicket(t) {
    setActive(t);
    setResponse(t.response || "");
  }

  function handleRespond(e, andResolve) {
    e.preventDefault();
    updateTicket(active.id, { response, status: andResolve ? "Resolved" : "In Progress" });
    setActive(null);
  }

  function escalate() {
    updateTicket(active.id, { priority: "High", status: "In Progress" });
    setActive(null);
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <p style={{ color: "var(--color-muted)", margin: 0 }}>
          Queries from customers, farmers, dealers and delivery personnel awaiting a response.
        </p>
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

      {openQueries.length === 0 ? (
        <EmptyState icon={FiLifeBuoy} title="No open queries" hint="Nice work — the queue is clear." />
      ) : (
        <div className="gc-card accent-support">
          <table className="gc-table">
            <thead><tr><th>From</th><th>Category</th><th>Subject</th><th>Priority</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {openQueries.map((t) => (
                <tr key={t.id}>
                  <td>{t.customerName}</td>
                  <td><span className="gc-pill pill-grey">{t.category}</span></td>
                  <td>{t.subject}</td>
                  <td><StatusPill value={t.priority} /></td>
                  <td><StatusPill value={t.status} /></td>
                  <td>
                    <button className="btn-gc-outline" style={{ padding: "0.35rem 0.8rem", fontSize: "0.82rem" }} onClick={() => openTicket(t)}>
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal show={!!active} onHide={() => setActive(null)} centered>
        {active && (
          <>
            <Modal.Header closeButton>
              <Modal.Title style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>{active.subject}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p style={{ fontSize: "0.85rem", color: "var(--color-muted)" }}>
                From {active.customerName} <span className="gc-pill pill-grey" style={{ marginLeft: "0.4rem" }}>{active.category}</span>
              </p>
              <p>{active.message}</p>
              <label className="form-label" style={{ fontSize: "0.85rem" }}>Your response</label>
              <textarea className="form-control" rows={3} value={response} onChange={(e) => setResponse(e.target.value)} />
            </Modal.Body>
            <Modal.Footer>
              <button className="btn-gc-danger" onClick={escalate}>Escalate</button>
              <button className="btn-gc-outline" onClick={(e) => handleRespond(e, false)}>Save response</button>
              <button className="btn-gc-primary" onClick={(e) => handleRespond(e, true)}>Respond &amp; resolve</button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}
