import { useMemo, useState } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import { FiSearch, FiShoppingBag } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import { categories } from "../../data/mockData";
import EmptyState from "../../components/common/EmptyState";
import ProductThumb from "../../components/common/ProductThumb";

export default function BrowseProduce() {
  const { products, currentUser, placeOrder } = useApp();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [orderProduct, setOrderProduct] = useState(null);
  const [qty, setQty] = useState(50);
  const [confirmed, setConfirmed] = useState(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const isFarmerProduce = !!p.farmerId;
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || p.category === category;
      return isFarmerProduce && matchesQuery && matchesCategory;
    });
  }, [products, query, category]);

  function openOrder(p) {
    setOrderProduct(p);
    setQty(Math.min(50, p.quantity));
  }

  function handleConfirm(e) {
    e.preventDefault();
    const order = placeOrder({
      items: [{ productId: orderProduct.id, name: orderProduct.name, qty: Number(qty), price: orderProduct.price }],
      buyer: currentUser,
      buyerRole: "dealer",
      farmerId: orderProduct.farmerId,
    });
    setOrderProduct(null);
    setConfirmed(order);
  }

  return (
    <div>
      <div className="d-flex gap-2 mb-3 flex-wrap">
        <div style={{ position: "relative", flex: "1 1 240px" }}>
          <FiSearch style={{ position: "absolute", left: 12, top: 11, color: "var(--color-muted)" }} />
          <input
            className="form-control"
            style={{ paddingLeft: "2.1rem" }}
            placeholder="Search produce..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select className="form-select" style={{ maxWidth: 200 }} value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>All</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={FiShoppingBag} title="No produce matches your search" />
      ) : (
        <Row className="g-3">
          {filtered.map((p) => (
            <Col md={6} lg={4} key={p.id}>
              <div className="gc-card accent-dealer h-100 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start gap-2">
                  <div className="d-flex align-items-center gap-2">
                    <ProductThumb src={p.image} />
                    <h3 style={{ fontSize: "1rem", marginBottom: 0 }}>{p.name}</h3>
                  </div>
                  <span className="gc-pill pill-grey">{p.category}</span>
                </div>
                <p style={{ color: "var(--color-muted)", fontSize: "0.83rem" }}>{p.description}</p>
                <p style={{ fontSize: "0.8rem", marginBottom: "0.6rem" }}>Farmer: {p.farmerName}</p>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <strong>₹{p.price} / {p.unit}</strong>
                  <span style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>{p.quantity} {p.unit} available</span>
                </div>
                <button className="btn-gc-accent mt-auto" onClick={() => openOrder(p)}>Place bulk order</button>
              </div>
            </Col>
          ))}
        </Row>
      )}

      <Modal show={!!orderProduct} onHide={() => setOrderProduct(null)} centered>
        {orderProduct && (
          <form onSubmit={handleConfirm}>
            <Modal.Header closeButton>
              <Modal.Title style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>
                Order {orderProduct.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label className="form-label" style={{ fontSize: "0.85rem" }}>
                Quantity ({orderProduct.unit}, max {orderProduct.quantity})
              </label>
              <input
                type="number"
                className="form-control"
                min={1}
                max={orderProduct.quantity}
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                required
              />
              <div className="mt-3" style={{ fontSize: "0.9rem" }}>
                Total: <strong>₹{(qty * orderProduct.price).toLocaleString("en-IN")}</strong>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button type="button" className="btn-gc-outline" onClick={() => setOrderProduct(null)}>Cancel</button>
              <button type="submit" className="btn-gc-accent">Confirm order</button>
            </Modal.Footer>
          </form>
        )}
      </Modal>

      <Modal show={!!confirmed} onHide={() => setConfirmed(null)} centered>
        {confirmed && (
          <>
            <Modal.Header closeButton>
              <Modal.Title style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>Order placed</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Order #{confirmed.id} for ₹{confirmed.total.toLocaleString("en-IN")} has been sent to the farmer for processing.
              You can track it from Purchase History.
            </Modal.Body>
            <Modal.Footer>
              <button className="btn-gc-primary" onClick={() => setConfirmed(null)}>Done</button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}
