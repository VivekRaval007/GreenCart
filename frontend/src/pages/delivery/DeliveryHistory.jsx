import { FiClipboard } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import EmptyState from "../../components/common/EmptyState";

export default function DeliveryHistory() {
  const { currentUser, orders } = useApp();
  const completed = orders.filter((o) => o.deliveryPersonId === currentUser.id && o.status === "Delivered");

  return (
    <div>
      <p style={{ color: "var(--color-muted)" }}>A record of deliveries you've completed.</p>
      {completed.length === 0 ? (
        <EmptyState icon={FiClipboard} title="No completed deliveries yet" />
      ) : (
        <div className="gc-card">
          <table className="gc-table">
            <thead><tr><th>Order</th><th>Buyer</th><th>Date</th><th>Items</th></tr></thead>
            <tbody>
              {completed.map((o) => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  <td>{o.buyerName}</td>
                  <td>{o.date}</td>
                  <td>{o.items.map((i) => `${i.name} × ${i.qty}`).join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
