import { Row, Col } from "react-bootstrap";
import { FiTruck, FiCheckCircle, FiClock } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import StatCard from "../../components/common/StatCard";
import DashboardBanner from "../../components/layout/DashboardBanner";

export default function DeliveryDashboard() {
  const { currentUser, orders } = useApp();
  const assigned = orders.filter((o) => o.deliveryPersonId === currentUser.id);
  const active = assigned.filter((o) => o.status === "Out for delivery");
  const completed = assigned.filter((o) => o.status === "Delivered");

  return (
    <div>
      <DashboardBanner
        role="delivery"
        title={`On the road, ${currentUser.name.split(" ")[0]}`}
        subtitle="Here's a snapshot of your deliveries today."
      />
      <Row className="g-3">
        <Col md={4}><StatCard label="Total assigned" value={assigned.length} icon={FiTruck} /></Col>
        <Col md={4}><StatCard label="Currently out for delivery" value={active.length} accent="accent-delivery" icon={FiClock} /></Col>
        <Col md={4}><StatCard label="Completed deliveries" value={completed.length} accent="accent-customer" icon={FiCheckCircle} /></Col>
      </Row>
    </div>
  );
}
