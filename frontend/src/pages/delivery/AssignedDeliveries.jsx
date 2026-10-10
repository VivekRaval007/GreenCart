import { FiPackage, FiTruck } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import StatusPill from "../../components/common/StatusPill";
import EmptyState from "../../components/common/EmptyState";

export default function AssignedDeliveries() {
  const { currentUser, orders, updateOrderStatus } = useApp();

  const available = orders.filter((o) => o.status === "Processing" && !o.deliveryPersonId);
  const active = orders.filter((o) => o.deliveryPersonId === currentUser.id && o.status !== "Delivered");

  function accept(order) {
    updateOrderStatus(order.id, "Out for delivery", { deliveryPersonId: currentUser.id });
  }
  function markDelivered(order) {
    updateOrderStatus(order.id, "Delivered");
  }

  return (
    <div>
      <h2 style={{ fontSize: "1.05rem" }} className="mb-3">My active deliveries</h2>
      {active.length === 0 ? (
        <EmptyState icon={FiTruck} title="No active deliveries" hint="Accept an order below to start a delivery." />
      ) : (
        <div className="gc-card mb-4">
          <table className="gc-table">
            <thead><tr><th>Order</th><th>Buyer</th><th>Items</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {active.map((o) => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  <td>{o.buyerName}</td>
                  <td>{o.items.map((i) => `${i.name} × ${i.qty}`).join(", ")}</td>
                  <td><StatusPill value={o.status} /></td>
                  <td>
                    <button className="btn-gc-primary" style={{ padding: "0.35rem 0.8rem", fontSize: "0.82rem" }} onClick={() => markDelivered(o)}>
                      Mark delivered
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2 style={{ fontSize: "1.05rem" }} className="mb-3">New orders available to accept</h2>
      {available.length === 0 ? (
        <EmptyState icon={FiPackage} title="No unassigned orders right now" />
      ) : (
        <div className="gc-card">
          <table className="gc-table">
            <thead><tr><th>Order</th><th>Buyer</th><th>Items</th><th></th></tr></thead>
            <tbody>
              {available.map((o) => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  <td>{o.buyerName}</td>
                  <td>{o.items.map((i) => `${i.name} × ${i.qty}`).join(", ")}</td>
                  <td>
                    <button className="btn-gc-outline" style={{ padding: "0.35rem 0.8rem", fontSize: "0.82rem" }} onClick={() => accept(o)}>
                      Accept delivery
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
