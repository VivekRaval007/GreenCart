import { FiClipboard } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import StatusPill from "../../components/common/StatusPill";
import EmptyState from "../../components/common/EmptyState";

export default function PurchaseHistory() {
  const { currentUser, orders } = useApp();
  const myOrders = orders.filter((o) => o.buyerId === currentUser.id);

  return (
    <div>
      <p style={{ color: "var(--color-muted)" }}>Your complete bulk order and purchase record.</p>
      {myOrders.length === 0 ? (
        <EmptyState icon={FiClipboard} title="No purchases yet" />
      ) : (
        <div className="gc-card">
          <table className="gc-table">
            <thead><tr><th>Order</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th></tr></thead>
            <tbody>
              {myOrders.map((o) => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  <td>{o.date}</td>
                  <td>{o.items.map((i) => `${i.name} × ${i.qty}`).join(", ")}</td>
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
