import { FiUsers, FiShoppingBag } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import EmptyState from "../../components/common/EmptyState";

export default function DealerManagement() {
  const { users, orders, setUserStatus, deleteUser, currentUser } = useApp();
  const dealers = users.filter((u) => u.role === "dealer");

  return (
    <div>
      <p style={{ color: "var(--color-muted)" }}>Oversee registered dealers and their bulk purchase activity.</p>
      {dealers.length === 0 ? (
        <EmptyState icon={FiUsers} title="No dealers registered yet" />
      ) : (
        <div className="gc-card accent-dealer">
          <table className="gc-table">
            <thead><tr><th>Name</th><th>Location</th><th>Orders placed</th><th>Total spend</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {dealers.map((d) => {
                const dealerOrders = orders.filter((o) => o.buyerId === d.id);
                const spend = dealerOrders.reduce((sum, o) => sum + o.total, 0);
                return (
                  <tr key={d.id}>
                    <td>{d.name}</td>
                    <td>{d.location || "—"}</td>
                    <td><span className="gc-pill pill-grey d-inline-flex align-items-center gap-1"><FiShoppingBag size={11} /> {dealerOrders.length}</span></td>
                    <td>₹{spend.toLocaleString("en-IN")}</td>
                    <td>
                      <span className={`gc-pill ${d.status === "Suspended" ? "pill-red" : "pill-green"}`}>{d.status || "Active"}</span>
                    </td>
                    <td className="d-flex gap-2">
                      <button
                        className="btn-gc-outline"
                        style={{ padding: "0.3rem 0.7rem", fontSize: "0.8rem" }}
                        onClick={() => setUserStatus(d.id, d.status === "Suspended" ? "Active" : "Suspended")}
                        disabled={d.id === currentUser.id}
                      >
                        {d.status === "Suspended" ? "Reactivate" : "Suspend"}
                      </button>
                      <button className="btn-gc-danger" onClick={() => deleteUser(d.id)} disabled={d.id === currentUser.id}>Remove</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
