import { FiUsers, FiPackage } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import EmptyState from "../../components/common/EmptyState";

export default function FarmerManagement() {
  const { users, products, orders, setUserStatus, deleteUser, currentUser } = useApp();
  const farmers = users.filter((u) => u.role === "farmer");

  return (
    <div>
      <p style={{ color: "var(--color-muted)" }}>Oversee registered farmers, their listings and order activity.</p>
      {farmers.length === 0 ? (
        <EmptyState icon={FiUsers} title="No farmers registered yet" />
      ) : (
        <div className="gc-card">
          <table className="gc-table">
            <thead><tr><th>Name</th><th>Location</th><th>Listings</th><th>Orders received</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {farmers.map((f) => {
                const listingCount = products.filter((p) => p.farmerId === f.id).length;
                const orderCount = orders.filter((o) => o.farmerId === f.id).length;
                return (
                  <tr key={f.id}>
                    <td>{f.name}</td>
                    <td>{f.location || "—"}</td>
                    <td><span className="gc-pill pill-grey d-inline-flex align-items-center gap-1"><FiPackage size={11} /> {listingCount}</span></td>
                    <td>{orderCount}</td>
                    <td>
                      <span className={`gc-pill ${f.status === "Suspended" ? "pill-red" : "pill-green"}`}>{f.status || "Active"}</span>
                    </td>
                    <td className="d-flex gap-2">
                      <button
                        className="btn-gc-outline"
                        style={{ padding: "0.3rem 0.7rem", fontSize: "0.8rem" }}
                        onClick={() => setUserStatus(f.id, f.status === "Suspended" ? "Active" : "Suspended")}
                        disabled={f.id === currentUser.id}
                      >
                        {f.status === "Suspended" ? "Reactivate" : "Suspend"}
                      </button>
                      <button className="btn-gc-danger" onClick={() => deleteUser(f.id)} disabled={f.id === currentUser.id}>Remove</button>
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
