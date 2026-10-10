import { FiStar } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import EmptyState from "../../components/common/EmptyState";

export default function FarmerReviews() {
  const { currentUser, orders } = useApp();
  const reviewed = orders.filter((o) => o.farmerId === currentUser.id && o.review);
  const avg = reviewed.length
    ? (reviewed.reduce((sum, o) => sum + o.review.rating, 0) / reviewed.length).toFixed(1)
    : null;

  return (
    <div>
      <div className="d-flex align-items-center gap-2 mb-3">
        <p style={{ color: "var(--color-muted)", margin: 0 }}>Feedback customers left on your delivered orders.</p>
        {avg && (
          <span className="gc-pill pill-orange d-inline-flex align-items-center gap-1">
            <FiStar size={12} /> {avg} average
          </span>
        )}
      </div>
      {reviewed.length === 0 ? (
        <EmptyState icon={FiStar} title="No reviews yet" hint="Reviews appear once customers rate a delivered order." />
      ) : (
        <div className="d-flex flex-column gap-3">
          {reviewed.map((o) => (
            <div key={o.id} className="gc-card">
              <div className="d-flex justify-content-between mb-1">
                <strong>{o.buyerName}</strong>
                <span style={{ color: "var(--color-warn)" }}>
                  {"★".repeat(o.review.rating)}{"☆".repeat(5 - o.review.rating)}
                </span>
              </div>
              <p style={{ marginBottom: "0.2rem" }}>{o.review.comment}</p>
              <div style={{ fontSize: "0.78rem", color: "var(--color-muted)" }}>
                Order #{o.id} · {o.items.map((i) => i.name).join(", ")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
