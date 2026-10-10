import { FiCreditCard } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import StatusPill from "../../components/common/StatusPill";
import EmptyState from "../../components/common/EmptyState";

export default function Transactions() {
  const { currentUser, orders } = useApp();
  const myOrders = orders.filter((o) => o.buyerId === currentUser.id);

  return (
    <div>
      <p style={{ color: "var(--color-muted)" }}>Payment method and status for every bulk order you've placed.</p>
      {myOrders.length === 0 ? (
        <EmptyState icon={FiCreditCard} title="No transactions yet" />
      ) : (
        <div className="gc-card">
          <table className="gc-table">
            <thead><tr><th>Order</th><th>Date</th><th>Amount</th><th>Method</th><th>Payment status</th><th>Order status</th></tr></thead>
            <tbody>
              {myOrders.map((o) => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  <td>{o.date}</td>
                  <td>₹{o.total.toLocaleString("en-IN")}</td>
                  <td>{o.paymentMethod}</td>
                  <td><StatusPill value={o.paymentStatus} /></td>
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
