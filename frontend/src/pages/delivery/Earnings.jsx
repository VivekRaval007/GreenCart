import { Row, Col } from "react-bootstrap";
import { FiDollarSign, FiTruck, FiTrendingUp } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import StatCard from "../../components/common/StatCard";
import EmptyState from "../../components/common/EmptyState";

const PER_DELIVERY_RATE = 40; // flat rate per completed delivery, for demo purposes

export default function Earnings() {
  const { currentUser, orders } = useApp();
  const completed = orders.filter((o) => o.deliveryPersonId === currentUser.id && o.status === "Delivered");
  const totalEarnings = completed.length * PER_DELIVERY_RATE;

  return (
    <div>
      <Row className="g-3 mb-4">
        <Col md={4}><StatCard label="Total earnings" value={`₹${totalEarnings.toLocaleString("en-IN")}`} accent="accent-delivery" icon={FiDollarSign} /></Col>
        <Col md={4}><StatCard label="Deliveries completed" value={completed.length} icon={FiTruck} /></Col>
        <Col md={4}><StatCard label="Rate per delivery" value={`₹${PER_DELIVERY_RATE}`} accent="accent-customer" icon={FiTrendingUp} /></Col>
      </Row>

      <h2 style={{ fontSize: "1.1rem" }} className="mb-3">Earnings breakdown</h2>
      {completed.length === 0 ? (
        <EmptyState icon={FiDollarSign} title="No earnings yet" hint="Complete a delivery to start earning." />
      ) : (
        <div className="gc-card accent-delivery">
          <table className="gc-table">
            <thead><tr><th>Order</th><th>Date</th><th>Buyer</th><th>Payout</th></tr></thead>
            <tbody>
              {completed.map((o) => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  <td>{o.date}</td>
                  <td>{o.buyerName}</td>
                  <td>₹{PER_DELIVERY_RATE}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
