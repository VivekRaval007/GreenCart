import { useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import { FiPlus, FiEdit2, FiTrash2, FiShoppingBag } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import { categories } from "../../data/mockData";
import EmptyState from "../../components/common/EmptyState";
import ImageUploadField from "../../components/common/ImageUploadField";
import ProductThumb from "../../components/common/ProductThumb";

const emptyForm = { name: "", category: categories[0], price: "", unit: "kg", quantity: "", description: "", image: null };

// Products a dealer lists for direct resale to customers, separate from the
// bulk stock they procure from farmers (see Inventory & Stock).
export default function MyProducts() {
  const { currentUser, products, addProduct, updateProduct, deleteProduct } = useApp();
  const myProducts = products.filter((p) => p.dealerId === currentUser.id);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  }
  function openEdit(product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      unit: product.unit,
      quantity: product.quantity,
      description: product.description,
      image: product.image || null,
    });
    setShowModal(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
      dealerId: currentUser.id,
      dealerName: currentUser.name,
      farmerId: null,
      farmerName: null,
      rating: editingId ? products.find((p) => p.id === editingId)?.rating : 0,
    };
    if (editingId) {
      updateProduct(editingId, payload);
    } else {
      addProduct(payload);
    }
    setShowModal(false);
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p style={{ color: "var(--color-muted)", margin: 0 }}>
          List produce from your inventory directly for sale to customers.
        </p>
        <button className="btn-gc-accent d-inline-flex align-items-center gap-2" onClick={openAdd}>
          <FiPlus /> Add product
        </button>
      </div>

      {myProducts.length === 0 ? (
        <EmptyState icon={FiShoppingBag} title="No resale products yet" hint="Add a product to make it visible to customers browsing GreenCart." />
      ) : (
        <Row className="g-3">
          {myProducts.map((p) => (
            <Col md={6} lg={4} key={p.id}>
              <div className="gc-card accent-dealer h-100 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start gap-2">
                  <div className="d-flex align-items-center gap-2">
                    <ProductThumb src={p.image} />
                    <h3 style={{ fontSize: "1rem", marginBottom: 0 }}>{p.name}</h3>
                  </div>
                  <span className="gc-pill pill-grey">{p.category}</span>
                </div>
                <p style={{ color: "var(--color-muted)", fontSize: "0.85rem", flex: 1 }}>{p.description}</p>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <strong>₹{p.price} / {p.unit}</strong>
                  <span style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>{p.quantity} {p.unit} in stock</span>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn-gc-outline flex-fill d-inline-flex align-items-center justify-content-center gap-2" onClick={() => openEdit(p)}>
                    <FiEdit2 size={14} /> Edit
                  </button>
                  <button className="btn-gc-danger" onClick={() => deleteProduct(p.id)}>
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem" }}>
            {editingId ? "Edit product" : "Add a resale product"}
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="mb-3">
              <label className="form-label" style={{ fontSize: "0.85rem" }}>Product name</label>
              <input className="form-control" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <Row className="g-2 mb-3">
              <Col>
                <label className="form-label" style={{ fontSize: "0.85rem" }}>Category</label>
                <select className="form-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Col>
              <Col>
                <label className="form-label" style={{ fontSize: "0.85rem" }}>Unit</label>
                <select className="form-select" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })}>
                  {["kg", "quintal", "bunch", "dozen", "litre"].map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
              </Col>
            </Row>
            <Row className="g-2 mb-3">
              <Col>
                <label className="form-label" style={{ fontSize: "0.85rem" }}>Price (₹)</label>
                <input type="number" min="0" className="form-control" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </Col>
              <Col>
                <label className="form-label" style={{ fontSize: "0.85rem" }}>Quantity available</label>
                <input type="number" min="0" className="form-control" required value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
              </Col>
            </Row>
            <ImageUploadField value={form.image} onChange={(image) => setForm({ ...form, image })} />
            <div className="mb-1">
              <label className="form-label" style={{ fontSize: "0.85rem" }}>Description</label>
              <textarea className="form-control" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn-gc-outline" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn-gc-accent">{editingId ? "Save changes" : "Add product"}</button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
