import { Row, Col } from "react-bootstrap";
import { useApp } from "../../context/AppContext";
import StatCard from "../../components/common/StatCard";
import { FiDollarSign, FiPackage, FiTrendingUp } from "react-icons/fi";

export default function SalesSummary() {
  const { currentUser, orders, products } = useApp();
  const myOrders = orders.filter((o) => o.farmerId === currentUser.id);
  const delivered = myOrders.filter((o) => o.status === "Delivered");
  const totalEarnings = delivered.reduce((sum, o) => sum + o.total, 0);
  const unitsSold = delivered.reduce(
    (sum, o) => sum + o.items.reduce((s, i) => s + i.qty, 0),
    0
  );

  const byProduct = {};
  delivered.forEach((o) =>
    o.items.forEach((i) => {
      byProduct[i.name] = (byProduct[i.name] || 0) + i.qty * i.price;
    })
  );
  const topProducts = Object.entries(byProduct).sort((a, b) => b[1] - a[1]);

  return (
    <div>
      <Row className="g-3 mb-4">
        <Col md={4}><StatCard label="Total earnings" value={`₹${totalEarnings.toLocaleString("en-IN")}`} icon={FiDollarSign} /></Col>
        <Col md={4}><StatCard label="Units sold" value={unitsSold} accent="accent-dealer" icon={FiPackage} /></Col>
        <Col md={4}><StatCard label="Completed orders" value={delivered.length} accent="accent-customer" icon={FiTrendingUp} /></Col>
      </Row>

      <h2 style={{ fontSize: "1.1rem" }} className="mb-3">Revenue by product</h2>
      {topProducts.length === 0 ? (
        <p style={{ color: "var(--color-muted)" }}>No completed sales yet — revenue will appear here once orders are delivered.</p>
      ) : (
        <div className="gc-card">
          {topProducts.map(([name, revenue]) => {
            const pct = Math.round((revenue / totalEarnings) * 100);
            return (
              <div key={name} className="mb-3">
                <div className="d-flex justify-content-between" style={{ fontSize: "0.88rem" }}>
                  <span>{name}</span>
                  <strong>₹{revenue.toLocaleString("en-IN")}</strong>
                </div>
                <div style={{ background: "var(--color-line)", borderRadius: 999, height: 8, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, background: "var(--color-primary)", height: "100%" }} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p style={{ color: "var(--color-muted)", fontSize: "0.8rem", marginTop: "1.5rem" }}>
        You currently have {products.filter((p) => p.farmerId === currentUser.id).length} product listing(s) live on GreenCart.
      </p>
    </div>
  );
}
