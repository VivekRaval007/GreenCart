import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import EmptyState from "../../components/common/EmptyState";

export default function Cart() {
  const { cart, products, currentUser, updateCartQty, removeFromCart, clearCart, placeOrder } = useApp();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const [payment, setPayment] = useState("card");

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  function handleCheckout(e) {
    e.preventDefault();
    // Group cart items by the farmer who listed them, since each order ships from one farmer.
    const groups = {};
    cart.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      const farmerId = product?.farmerId || "unknown";
      if (!groups[farmerId]) groups[farmerId] = [];
      groups[farmerId].push(item);
    });
    Object.entries(groups).forEach(([farmerId, items]) => {
      placeOrder({ items, buyer: currentUser, buyerRole: "customer", farmerId });
    });
    clearCart();
    setPlaced(true);
  }

  if (placed) {
    return (
      <div className="gc-card" style={{ maxWidth: 480 }}>
        <h3 style={{ fontSize: "1.1rem" }}>Order placed successfully</h3>
        <p style={{ color: "var(--color-muted)" }}>
          Payment of ₹{total.toLocaleString("en-IN")} via {payment === "card" ? "card" : "UPI"} was received.
          You can track your delivery from the "Track Delivery" tab.
        </p>
        <button className="btn-gc-primary" onClick={() => navigate("/customer/orders")}>View my orders</button>
      </div>
    );
  }

  if (cart.length === 0) {
    return <EmptyState icon={FiShoppingCart} title="Your cart is empty" hint="Browse products and add items to see them here." />;
  }

  return (
    <div>
      <div className="gc-card mb-3">
        <table className="gc-table">
          <thead><tr><th>Product</th><th>Price</th><th>Qty</th><th>Subtotal</th><th></th></tr></thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.productId}>
                <td>{item.name}</td>
                <td>₹{item.price}</td>
                <td>
                  <input
                    type="number"
                    min={1}
                    value={item.qty}
                    onChange={(e) => updateCartQty(item.productId, Math.max(1, Number(e.target.value)))}
                    className="form-control"
                    style={{ width: 80 }}
                  />
                </td>
                <td>₹{(item.price * item.qty).toLocaleString("en-IN")}</td>
                <td>
                  <button className="btn-gc-danger" onClick={() => removeFromCart(item.productId)}>
                    <FiTrash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="gc-card" style={{ maxWidth: 420 }}>
        <h3 style={{ fontSize: "1.05rem" }}>Payment & checkout</h3>
        <form onSubmit={handleCheckout}>
          <div className="mb-3">
            <label className="form-label" style={{ fontSize: "0.85rem" }}>Payment method</label>
            <select className="form-select" value={payment} onChange={(e) => setPayment(e.target.value)}>
              <option value="card">Credit / Debit card</option>
              <option value="upi">UPI</option>
              <option value="cod">Cash on delivery</option>
            </select>
          </div>
          <div className="d-flex justify-content-between mb-3" style={{ fontSize: "1rem" }}>
            <span>Total</span>
            <strong>₹{total.toLocaleString("en-IN")}</strong>
          </div>
          <button type="submit" className="btn-gc-accent w-100">Place order &amp; pay</button>
        </form>
      </div>
    </div>
  );
}
