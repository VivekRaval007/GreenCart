import { FiArchive, FiAlertTriangle } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import EmptyState from "../../components/common/EmptyState";

const LOW_STOCK_THRESHOLD = 100;

export default function FarmerInventory() {
  const { currentUser, products } = useApp();
  const myProducts = products.filter((p) => p.farmerId === currentUser.id);

  return (
    <div>
      <p style={{ color: "var(--color-muted)" }}>
        Live stock levels across all your listings. Items below {LOW_STOCK_THRESHOLD} units are flagged for restocking.
      </p>
      {myProducts.length === 0 ? (
        <EmptyState icon={FiArchive} title="No inventory yet" hint="Add a listing to start tracking stock." />
      ) : (
        <div className="gc-card">
          <table className="gc-table">
            <thead><tr><th>Product</th><th>Category</th><th>Unit</th><th>Stock</th><th>Status</th></tr></thead>
            <tbody>
              {myProducts.map((p) => {
                const low = p.quantity < LOW_STOCK_THRESHOLD;
                return (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>{p.unit}</td>
                    <td>{p.quantity}</td>
                    <td>
                      {low ? (
                        <span className="gc-pill pill-red d-inline-flex align-items-center gap-1">
                          <FiAlertTriangle size={11} /> Restock soon
                        </span>
                      ) : (
                        <span className="gc-pill pill-green">In stock</span>
                      )}
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
