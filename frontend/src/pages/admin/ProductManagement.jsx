import { FiPackage, FiTrash2 } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import EmptyState from "../../components/common/EmptyState";
import ProductThumb from "../../components/common/ProductThumb";

export default function ProductManagement() {
  const { products, deleteProduct } = useApp();

  return (
    <div>
      <p style={{ color: "var(--color-muted)" }}>All agricultural product listings currently live on GreenCart.</p>
      {products.length === 0 ? (
        <EmptyState icon={FiPackage} title="No products listed yet" />
      ) : (
        <div className="gc-card">
          <table className="gc-table">
            <thead><tr><th></th><th>Product</th><th>Category</th><th>Listed by</th><th>Price</th><th>Stock</th><th></th></tr></thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td><ProductThumb src={p.image} size={40} /></td>
                  <td>{p.name}</td>
                  <td><span className="gc-pill pill-grey">{p.category}</span></td>
                  <td>
                    {p.farmerName || p.dealerName}{" "}
                    <span style={{ fontSize: "0.75rem", color: "var(--color-muted)" }}>
                      ({p.farmerId ? "farmer" : "dealer"})
                    </span>
                  </td>
                  <td>₹{p.price} / {p.unit}</td>
                  <td>{p.quantity} {p.unit}</td>
                  <td>
                    <button className="btn-gc-danger" onClick={() => deleteProduct(p.id)}>
                      <FiTrash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
