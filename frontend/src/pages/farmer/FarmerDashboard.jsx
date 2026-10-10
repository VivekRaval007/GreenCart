import { Row, Col } from "react-bootstrap";
import { FiPackage, FiClipboard, FiTrendingUp, FiAlertCircle } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import StatCard from "../../components/common/StatCard";
import StatusPill from "../../components/common/StatusPill";
import EmptyState from "../../components/common/EmptyState";
import DashboardBanner from "../../components/layout/DashboardBanner";

export default function FarmerDashboard() {
  const { currentUser, products, orders } = useApp();
  const myProducts = products.filter((p) => p.farmerId === currentUser.id);
  const myOrders = orders.filter((o) => o.farmerId === currentUser.id);
  const lowStock = myProducts.filter((p) => p.quantity < 100);
  const earnings = myOrders
    .filter((o) => o.status === "Delivered")
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div>
      <DashboardBanner
        role="farmer"
        title={`Welcome back, ${currentUser.name.split(" ")[0]}`}
        subtitle="Here's how your produce is performing across GreenCart today."
      />
      <Row className="g-3 mb-4">
        <Col md={3}><StatCard label="Active listings" value={myProducts.length} icon={FiPackage} /></Col>
        <Col md={3}><StatCard label="Orders received" value={myOrders.length} accent="accent-customer" icon={FiClipboard} /></Col>
        <Col md={3}><StatCard label="Earnings to date" value={`₹${earnings.toLocaleString("en-IN")}`} accent="accent-dealer" icon={FiTrendingUp} /></Col>
        <Col md={3}><StatCard label="Low stock items" value={lowStock.length} accent="accent-delivery" icon={FiAlertCircle} /></Col>
      </Row>

      <h2 style={{ fontSize: "1.1rem" }} className="mb-3">Recent orders for your produce</h2>
      {myOrders.length === 0 ? (
        <EmptyState icon={FiClipboard} title="No orders yet" hint="Orders placed by dealers or customers for your listings will appear here." />
      ) : (
        <div className="gc-card">
          <table className="gc-table">
            <thead>
              <tr><th>Order</th><th>Buyer</th><th>Items</th><th>Total</th><th>Status</th></tr>
            </thead>
            <tbody>
              {myOrders.slice(0, 6).map((o) => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  <td>{o.buyerName} <span style={{ color: "var(--color-muted)", fontSize: "0.78rem" }}>({o.buyerRole})</span></td>
                  <td>{o.items.map((i) => i.name).join(", ")}</td>
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
