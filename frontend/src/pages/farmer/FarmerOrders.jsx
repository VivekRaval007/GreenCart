import { FiClipboard } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import StatusPill from "../../components/common/StatusPill";
import EmptyState from "../../components/common/EmptyState";

export default function FarmerOrders() {
  const { currentUser, orders } = useApp();
  const myOrders = orders.filter((o) => o.farmerId === currentUser.id);

  return (
    <div>
      <p style={{ color: "var(--color-muted)" }}>
        Track the status of every order placed for your produce by dealers or customers.
      </p>
      {myOrders.length === 0 ? (
        <EmptyState icon={FiClipboard} title="No orders to track" />
      ) : (
        <div className="gc-card">
          <table className="gc-table">
            <thead>
              <tr><th>Order</th><th>Buyer</th><th>Items</th><th>Date</th><th>Total</th><th>Status</th></tr>
            </thead>
            <tbody>
              {myOrders.map((o) => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  <td>{o.buyerName} <span style={{ color: "var(--color-muted)", fontSize: "0.78rem" }}>({o.buyerRole})</span></td>
                  <td>{o.items.map((i) => `${i.name} × ${i.qty}`).join(", ")}</td>
                  <td>{o.date}</td>
                  <td>₹{o.total.toLocaleString("en-IN")}</td>
                  <td><StatusPill value={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
