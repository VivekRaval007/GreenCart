import { FiBell, FiPackage, FiClipboard, FiStar } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import EmptyState from "../../components/common/EmptyState";

const LOW_STOCK_THRESHOLD = 100;

export default function Notifications() {
  const { currentUser, products, orders } = useApp();
  const myProducts = products.filter((p) => p.farmerId === currentUser.id);
  const myOrders = orders.filter((o) => o.farmerId === currentUser.id);

  const notifications = [
    ...myOrders
      .filter((o) => o.status === "Processing")
      .map((o) => ({
        id: `order-${o.id}`,
        icon: FiClipboard,
        text: `New order #${o.id} from ${o.buyerName} needs to be prepared.`,
        tone: "pill-orange",
      })),
    ...myProducts
      .filter((p) => p.quantity < LOW_STOCK_THRESHOLD)
      .map((p) => ({
        id: `stock-${p.id}`,
        icon: FiPackage,
        text: `${p.name} is running low (${p.quantity} ${p.unit} left) — consider restocking.`,
        tone: "pill-red",
      })),
    ...myOrders
      .filter((o) => o.review)
      .slice(0, 3)
      .map((o) => ({
        id: `review-${o.id}`,
        icon: FiStar,
        text: `${o.buyerName} left a ${o.review.rating}-star review on order #${o.id}.`,
        tone: "pill-green",
      })),
  ];

  return (
    <div>
      <p style={{ color: "var(--color-muted)" }}>Order alerts, stock warnings and review notifications in one place.</p>
      {notifications.length === 0 ? (
        <EmptyState icon={FiBell} title="You're all caught up" hint="New orders, low-stock alerts and reviews will show up here." />
      ) : (
        <div className="d-flex flex-column gap-2">
          {notifications.map((n) => (
            <div key={n.id} className="gc-card d-flex align-items-center gap-3">
              <span className={`gc-pill ${n.tone}`} style={{ padding: "0.5rem", borderRadius: "50%" }}>
                <n.icon size={14} />
              </span>
              <span style={{ fontSize: "0.9rem" }}>{n.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
