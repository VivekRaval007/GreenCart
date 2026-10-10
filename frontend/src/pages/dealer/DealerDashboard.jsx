import { Row, Col } from "react-bootstrap";
import { FiShoppingBag, FiArchive, FiClipboard } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import StatCard from "../../components/common/StatCard";
import StatusPill from "../../components/common/StatusPill";
import EmptyState from "../../components/common/EmptyState";
import DashboardBanner from "../../components/layout/DashboardBanner";

export default function DealerDashboard() {
  const { currentUser, orders, products } = useApp();
  const myOrders = orders.filter((o) => o.buyerId === currentUser.id);
  const inventoryUnits = myOrders
    .filter((o) => o.status === "Delivered")
    .reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.qty, 0), 0);

  return (
    <div>
      <DashboardBanner
        role="dealer"
        title={`Welcome back, ${currentUser.name.split(" ")[0]}`}
        subtitle="Track your procurement, inventory and resale activity in one place."
      />
      <Row className="g-3 mb-4">
        <Col md={4}><StatCard label="Produce available to browse" value={products.length} icon={FiShoppingBag} /></Col>
        <Col md={4}><StatCard label="Units procured" value={inventoryUnits} accent="accent-dealer" icon={FiArchive} /></Col>
        <Col md={4}><StatCard label="Bulk orders placed" value={myOrders.length} accent="accent-customer" icon={FiClipboard} /></Col>
      </Row>

      <h2 style={{ fontSize: "1.1rem" }} className="mb-3">Your recent bulk orders</h2>
      {myOrders.length === 0 ? (
        <EmptyState icon={FiClipboard} title="No bulk orders yet" hint="Browse produce and place your first bulk order." />
      ) : (
        <div className="gc-card">
          <table className="gc-table">
            <thead><tr><th>Order</th><th>Items</th><th>Total</th><th>Status</th></tr></thead>
            <tbody>
              {myOrders.map((o) => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
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
