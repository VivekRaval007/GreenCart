import { Row, Col } from "react-bootstrap";
import { FiUsers, FiPackage, FiClipboard, FiDollarSign } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import StatCard from "../../components/common/StatCard";
import StatusPill from "../../components/common/StatusPill";
import DashboardBanner from "../../components/layout/DashboardBanner";

export default function AdminDashboard() {
  const { currentUser, users, products, orders } = useApp();
  const revenue = orders.filter((o) => o.status === "Delivered").reduce((sum, o) => sum + o.total, 0);

  return (
    <div>
      <DashboardBanner
        role="admin"
        title={`Welcome back, ${currentUser.name.split(" ")[0]}`}
        subtitle="A full view of users, listings and activity across GreenCart."
      />
      <Row className="g-3 mb-4">
        <Col md={3}><StatCard label="Total users" value={users.length} accent="accent-admin" icon={FiUsers} /></Col>
        <Col md={3}><StatCard label="Product listings" value={products.length} icon={FiPackage} /></Col>
        <Col md={3}><StatCard label="Orders placed" value={orders.length} accent="accent-customer" icon={FiClipboard} /></Col>
        <Col md={3}><StatCard label="Platform revenue" value={`₹${revenue.toLocaleString("en-IN")}`} accent="accent-dealer" icon={FiDollarSign} /></Col>
      </Row>

      <h2 style={{ fontSize: "1.1rem" }} className="mb-3">Latest platform activity</h2>
      <div className="gc-card">
        <table className="gc-table">
          <thead><tr><th>Order</th><th>Buyer</th><th>Role</th><th>Total</th><th>Status</th></tr></thead>
          <tbody>
            {orders.slice(0, 8).map((o) => (
              <tr key={o.id}>
                <td>#{o.id}</td>
                <td>{o.buyerName}</td>
                <td style={{ textTransform: "capitalize" }}>{o.buyerRole}</td>
                <td>₹{o.total.toLocaleString("en-IN")}</td>
                <td><StatusPill value={o.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
