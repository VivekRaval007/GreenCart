import { useState } from "react";
import { FiClipboard } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import StatusPill from "../../components/common/StatusPill";
import EmptyState from "../../components/common/EmptyState";

const STATUS_OPTIONS = ["Processing", "Ready for pickup", "Out for delivery", "Delivered", "Cancelled"];

export default function OrderManagement() {
  const { orders, updateOrderStatus, cancelOrder } = useApp();
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = statusFilter === "All" ? orders : orders.filter((o) => o.status === statusFilter);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p style={{ color: "var(--color-muted)", margin: 0 }}>Every order placed across the platform, with the ability to update or cancel.</p>
        <select className="form-select" style={{ maxWidth: 200 }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All</option>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={FiClipboard} title="No orders match this filter" />
      ) : (
        <div className="gc-card">
          <table className="gc-table">
            <thead><tr><th>Order</th><th>Buyer</th><th>Role</th><th>Total</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  <td>{o.buyerName}</td>
                  <td style={{ textTransform: "capitalize" }}>{o.buyerRole}</td>
                  <td>₹{o.total.toLocaleString("en-IN")}</td>
                  <td><StatusPill value={o.status} /></td>
                  <td className="d-flex gap-2">
                    <select
                      className="form-select"
                      style={{ fontSize: "0.8rem", width: 160 }}
                      value={o.status}
                      onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                    >
                      {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {o.status !== "Cancelled" && o.status !== "Delivered" && (
                      <button className="btn-gc-danger" onClick={() => cancelOrder(o.id)}>Cancel</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
