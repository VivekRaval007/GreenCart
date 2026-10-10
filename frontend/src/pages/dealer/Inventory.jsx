import { useState } from "react";
import { FiArchive } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import EmptyState from "../../components/common/EmptyState";

export default function Inventory() {
  const { currentUser, orders } = useApp();
  const procured = orders.filter((o) => o.buyerId === currentUser.id && o.status === "Delivered");

  const stock = {};
  procured.forEach((o) =>
    o.items.forEach((i) => {
      stock[i.name] = (stock[i.name] || 0) + i.qty;
    })
  );
  const rows = Object.entries(stock);
  const [availability, setAvailability] = useState({});

  function toggleAvailability(name) {
    setAvailability((prev) => ({ ...prev, [name]: prev[name] === false ? true : false }));
  }

  return (
    <div>
      <p style={{ color: "var(--color-muted)" }}>
        Stock procured from farmers through delivered bulk orders. Mark items as available or
        out of stock for redistribution to customers.
      </p>
      {rows.length === 0 ? (
        <EmptyState icon={FiArchive} title="No inventory yet" hint="Inventory builds up automatically once your bulk orders are delivered." />
      ) : (
        <div className="gc-card">
          <table className="gc-table">
            <thead><tr><th>Product</th><th>Units in stock</th><th>Availability</th><th></th></tr></thead>
            <tbody>
              {rows.map(([name, qty]) => {
                const isAvailable = availability[name] !== false;
                return (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{qty}</td>
                    <td>
                      <span className={`gc-pill ${isAvailable ? "pill-green" : "pill-red"}`}>
                        {isAvailable ? "Available" : "Out of stock"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn-gc-outline"
                        style={{ padding: "0.3rem 0.7rem", fontSize: "0.8rem" }}
                        onClick={() => toggleAvailability(name)}
                      >
                        Mark {isAvailable ? "out of stock" : "available"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
