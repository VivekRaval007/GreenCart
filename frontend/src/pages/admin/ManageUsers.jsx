import { useState } from "react";
import { FiUsers, FiTrash2 } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import RoleBadge from "../../components/common/RoleBadge";
import EmptyState from "../../components/common/EmptyState";

export default function ManageUsers() {
  const { users, setUserStatus, deleteUser, currentUser } = useApp();
  const [roleFilter, setRoleFilter] = useState("All");

  const filtered = roleFilter === "All" ? users : users.filter((u) => u.role === roleFilter);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p style={{ color: "var(--color-muted)", margin: 0 }}>Approve, suspend or remove user accounts across all roles.</p>
        <select className="form-select" style={{ maxWidth: 200 }} value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          {["All", "farmer", "dealer", "customer", "delivery", "support", "admin"].map((r) => (
            <option key={r} value={r}>{r === "All" ? "All roles" : r}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={FiUsers} title="No users found" />
      ) : (
        <div className="gc-card accent-admin">
          <table className="gc-table">
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td><RoleBadge role={u.role} /></td>
                  <td>
                    <span className={`gc-pill ${u.status === "Suspended" ? "pill-red" : "pill-green"}`}>
                      {u.status || "Active"}
                    </span>
                  </td>
                  <td className="d-flex gap-2">
                    {u.status === "Suspended" ? (
                      <button className="btn-gc-outline" style={{ padding: "0.3rem 0.7rem", fontSize: "0.8rem" }} onClick={() => setUserStatus(u.id, "Active")}>
                        Reactivate
                      </button>
                    ) : (
                      <button className="btn-gc-outline" style={{ padding: "0.3rem 0.7rem", fontSize: "0.8rem" }} onClick={() => setUserStatus(u.id, "Suspended")} disabled={u.id === currentUser.id}>
                        Suspend
                      </button>
                    )}
                    <button className="btn-gc-danger" onClick={() => deleteUser(u.id)} disabled={u.id === currentUser.id}>
                      <FiTrash2 size={14} />
                    </button>
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
