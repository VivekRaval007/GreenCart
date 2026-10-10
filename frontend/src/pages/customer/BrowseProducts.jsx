import { useMemo, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FiSearch, FiShoppingBag, FiStar } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import { categories } from "../../data/mockData";
import EmptyState from "../../components/common/EmptyState";
import ProductThumb from "../../components/common/ProductThumb";
import DashboardBanner from "../../components/layout/DashboardBanner";

export default function BrowseProducts() {
  const { currentUser, products, addToCart } = useApp();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [added, setAdded] = useState(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || p.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [products, query, category]);

  function handleAdd(p) {
    addToCart(p, 1);
    setAdded(p.id);
    setTimeout(() => setAdded(null), 1200);
  }

  return (
    <div>
      <DashboardBanner
        role="customer"
        title={`What are you cooking, ${currentUser.name.split(" ")[0]}?`}
        subtitle="Fresh produce from farmers and dealers, delivered straight to your door."
      />
      <div className="d-flex gap-2 mb-3 flex-wrap">
        <div style={{ position: "relative", flex: "1 1 240px" }}>
          <FiSearch style={{ position: "absolute", left: 12, top: 11, color: "var(--color-muted)" }} />
          <input
            className="form-control"
            style={{ paddingLeft: "2.1rem" }}
            placeholder="Search products..."
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
        <EmptyState icon={FiShoppingBag} title="No products match your search" />
      ) : (
        <Row className="g-3">
          {filtered.map((p) => (
            <Col md={6} lg={4} key={p.id}>
              <div className="gc-card accent-customer h-100 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start gap-2">
                  <div className="d-flex align-items-center gap-2">
                    <ProductThumb src={p.image} />
                    <h3 style={{ fontSize: "1rem", marginBottom: 0 }}>{p.name}</h3>
                  </div>
                  <span className="gc-pill pill-grey">{p.category}</span>
                </div>
                <p style={{ color: "var(--color-muted)", fontSize: "0.83rem" }}>{p.description}</p>
                <div className="d-flex align-items-center gap-1 mb-2" style={{ fontSize: "0.8rem", color: "var(--color-warn)" }}>
                  <FiStar size={13} /> {p.rating || "New"}{" "}
                  <span style={{ color: "var(--color-muted)" }}>· by {p.farmerName || p.dealerName}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <strong>₹{p.price} / {p.unit}</strong>
                  <span style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>{p.quantity} {p.unit} left</span>
                </div>
                <button className="btn-gc-primary mt-auto" onClick={() => handleAdd(p)}>
                  {added === p.id ? "Added ✓" : "Add to cart"}
                </button>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
