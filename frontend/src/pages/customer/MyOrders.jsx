import { useState } from "react";
import { Modal } from "react-bootstrap";
import { FiClipboard, FiStar } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import StatusPill from "../../components/common/StatusPill";
import EmptyState from "../../components/common/EmptyState";

export default function MyOrders() {
  const { currentUser, orders, addReview } = useApp();
  const myOrders = orders.filter((o) => o.buyerId === currentUser.id);
  const [reviewOrder, setReviewOrder] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  function openReview(order) {
    setReviewOrder(order);
    setRating(5);
    setComment("");
  }

  function submitReview(e) {
    e.preventDefault();
    addReview(reviewOrder.id, { rating, comment });
    setReviewOrder(null);
  }

  return (
    <div>
      <p style={{ color: "var(--color-muted)" }}>All orders you've placed, with the option to rate delivered items.</p>
      {myOrders.length === 0 ? (
        <EmptyState icon={FiClipboard} title="No orders yet" />
      ) : (
        <div className="gc-card">
          <table className="gc-table">
            <thead><tr><th>Order</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {myOrders.map((o) => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  <td>{o.date}</td>
                  <td>{o.items.map((i) => `${i.name} × ${i.qty}`).join(", ")}</td>
                  <td>₹{o.total.toLocaleString("en-IN")}</td>
                  <td><StatusPill value={o.status} /></td>
                  <td>
                    {o.status === "Delivered" && (
                      o.review ? (
                        <span style={{ fontSize: "0.8rem", color: "var(--color-warn)" }}>
                          <FiStar size={13} /> {o.review.rating}/5
                        </span>
                      ) : (
                        <button className="btn-gc-outline" style={{ padding: "0.3rem 0.7rem", fontSize: "0.8rem" }} onClick={() => openReview(o)}>
                          Rate order
                        </button>
                      )
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal show={!!reviewOrder} onHide={() => setReviewOrder(null)} centered>
        {reviewOrder && (
          <form onSubmit={submitReview}>
            <Modal.Header closeButton>
              <Modal.Title style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>
                Rate order #{reviewOrder.id}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label className="form-label" style={{ fontSize: "0.85rem" }}>Rating</label>
              <select className="form-select mb-3" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} star{n > 1 ? "s" : ""}</option>)}
              </select>
              <label className="form-label" style={{ fontSize: "0.85rem" }}>Comment</label>
              <textarea className="form-control" rows={3} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="How was your produce?" />
            </Modal.Body>
            <Modal.Footer>
              <button type="button" className="btn-gc-outline" onClick={() => setReviewOrder(null)}>Cancel</button>
              <button type="submit" className="btn-gc-primary">Submit review</button>
            </Modal.Footer>
          </form>
        )}
      </Modal>
    </div>
  );
}
