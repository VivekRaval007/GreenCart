import { Row, Col } from "react-bootstrap";
import { useApp } from "../../context/AppContext";
import StatCard from "../../components/common/StatCard";
import { FiUsers, FiTrendingUp } from "react-icons/fi";

export default function Reports() {
  const { users, orders } = useApp();

  const usersByRole = {};
  users.forEach((u) => { usersByRole[u.role] = (usersByRole[u.role] || 0) + 1; });

  const ordersByStatus = {};
  orders.forEach((o) => { ordersByStatus[o.status] = (ordersByStatus[o.status] || 0) + 1; });

  const revenue = orders.filter((o) => o.status === "Delivered").reduce((sum, o) => sum + o.total, 0);
  const avgOrderValue = orders.length ? Math.round(orders.reduce((s, o) => s + o.total, 0) / orders.length) : 0;

  return (
    <div>
      <Row className="g-3 mb-4">
        <Col md={6}><StatCard label="Platform revenue (delivered orders)" value={`₹${revenue.toLocaleString("en-IN")}`} icon={FiTrendingUp} /></Col>
        <Col md={6}><StatCard label="Average order value" value={`₹${avgOrderValue.toLocaleString("en-IN")}`} accent="accent-customer" icon={FiUsers} /></Col>
      </Row>

      <Row className="g-3">
        <Col md={6}>
          <div className="gc-card h-100">
            <h3 style={{ fontSize: "1rem" }}>Users by role</h3>
            {Object.entries(usersByRole).map(([role, count]) => (
              <div key={role} className="d-flex justify-content-between" style={{ fontSize: "0.88rem", padding: "0.3rem 0", borderBottom: "1px solid var(--color-line)", textTransform: "capitalize" }}>
                <span>{role}</span><strong>{count}</strong>
              </div>
            ))}
          </div>
        </Col>
        <Col md={6}>
          <div className="gc-card accent-customer h-100">
            <h3 style={{ fontSize: "1rem" }}>Orders by status</h3>
            {Object.entries(ordersByStatus).map(([status, count]) => (
              <div key={status} className="d-flex justify-content-between" style={{ fontSize: "0.88rem", padding: "0.3rem 0", borderBottom: "1px solid var(--color-line)" }}>
                <span>{status}</span><strong>{count}</strong>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}
