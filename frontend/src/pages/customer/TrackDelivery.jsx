import { FiTruck } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import EmptyState from "../../components/common/EmptyState";

const STEPS = ["Processing", "Out for delivery", "Delivered"];

export default function TrackDelivery() {
  const { currentUser, orders, users } = useApp();
  const myOrders = orders
    .filter((o) => o.buyerId === currentUser.id && o.status !== "Cancelled")
    .sort((a, b) => (a.status === "Delivered") - (b.status === "Delivered"));

  if (myOrders.length === 0) {
    return <EmptyState icon={FiTruck} title="Nothing to track" hint="Orders you place will show their delivery progress here." />;
  }

  return (
    <div className="d-flex flex-column gap-3">
      {myOrders.map((o) => {
        const stepIndex = STEPS.indexOf(o.status);
        const driver = users.find((u) => u.id === o.deliveryPersonId);
        return (
          <div key={o.id} className="gc-card accent-delivery">
            <div className="d-flex justify-content-between mb-2">
              <strong>Order #{o.id}</strong>
              <span style={{ color: "var(--color-muted)", fontSize: "0.85rem" }}>{o.date}</span>
            </div>
            <div className="d-flex align-items-center mb-2" style={{ fontSize: "0.85rem" }}>
              {STEPS.map((step, i) => (
                <div key={step} className="d-flex align-items-center" style={{ flex: 1 }}>
                  <div
                    style={{
                      width: 10, height: 10, borderRadius: "50%",
                      background: i <= stepIndex ? "var(--color-primary)" : "var(--color-line)",
                    }}
                  />
                  {i < STEPS.length - 1 && (
                    <div style={{ flex: 1, height: 2, background: i < stepIndex ? "var(--color-primary)" : "var(--color-line)" }} />
                  )}
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-between" style={{ fontSize: "0.78rem", color: "var(--color-muted)" }}>
              {STEPS.map((step) => <span key={step}>{step}</span>)}
            </div>
            {driver && (
              <div style={{ fontSize: "0.85rem", marginTop: "0.7rem" }}>
                Delivery agent: <strong>{driver.name}</strong>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
