import { Row, Col } from "react-bootstrap";
import { FiDollarSign, FiTrendingUp, FiAlertCircle } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import StatCard from "../../components/common/StatCard";
import StatusPill from "../../components/common/StatusPill";
import EmptyState from "../../components/common/EmptyState";

export default function PaymentsRevenue() {
  const { orders } = useApp();
  const revenue = orders.filter((o) => o.status === "Delivered").reduce((sum, o) => sum + o.total, 0);
  const pending = orders.filter((o) => o.paymentStatus === "Pending");
  const pendingAmount = pending.reduce((sum, o) => sum + o.total, 0);

  return (
    <div>
      <Row className="g-3 mb-4">
        <Col md={4}><StatCard label="Total revenue (delivered)" value={`₹${revenue.toLocaleString("en-IN")}`} icon={FiDollarSign} /></Col>
        <Col md={4}><StatCard label="Pending payments" value={`₹${pendingAmount.toLocaleString("en-IN")}`} accent="accent-delivery" icon={FiAlertCircle} /></Col>
        <Col md={4}><StatCard label="Total orders" value={orders.length} accent="accent-customer" icon={FiTrendingUp} /></Col>
      </Row>

      <h2 style={{ fontSize: "1.1rem" }} className="mb-3">Payment status by order</h2>
      {orders.length === 0 ? (
        <EmptyState icon={FiDollarSign} title="No transactions yet" />
      ) : (
        <div className="gc-card">
          <table className="gc-table">
            <thead><tr><th>Order</th><th>Buyer</th><th>Amount</th><th>Method</th><th>Payment status</th></tr></thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  <td>{o.buyerName}</td>
                  <td>₹{o.total.toLocaleString("en-IN")}</td>
                  <td>{o.paymentMethod}</td>
                  <td><StatusPill value={o.paymentStatus} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
