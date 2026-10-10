import { Row, Col } from "react-bootstrap";
import { FiLifeBuoy, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import StatCard from "../../components/common/StatCard";
import DashboardBanner from "../../components/layout/DashboardBanner";

export default function SupportDashboard() {
  const { currentUser, tickets } = useApp();
  const open = tickets.filter((t) => t.status === "Open");
  const inProgress = tickets.filter((t) => t.status === "In Progress");
  const resolved = tickets.filter((t) => t.status === "Resolved");

  return (
    <div>
      <DashboardBanner
        role="support"
        title={`Hi ${currentUser.name.split(" ")[0]}, here's today's queue`}
        subtitle="Keep an eye on open tickets across customers, farmers, dealers and delivery."
      />
      <Row className="g-3">
        <Col md={4}><StatCard label="Open tickets" value={open.length} accent="accent-support" icon={FiAlertCircle} /></Col>
        <Col md={4}><StatCard label="In progress" value={inProgress.length} accent="accent-delivery" icon={FiLifeBuoy} /></Col>
        <Col md={4}><StatCard label="Resolved" value={resolved.length} accent="accent-customer" icon={FiCheckCircle} /></Col>
      </Row>
    </div>
  );
}
