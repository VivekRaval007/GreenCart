import { useState } from "react";
import { Modal } from "react-bootstrap";
import { FiLifeBuoy } from "react-icons/fi";
import { useApp } from "../../context/AppContext";

const ROLE_TO_CATEGORY = {
  customer: "Customer",
  farmer: "Farmer",
  dealer: "Dealer",
  delivery: "Delivery",
};

export default function GetHelpButton({ role }) {
  const { currentUser, addTicket } = useApp();
  const [show, setShow] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [sent, setSent] = useState(false);

  const category = ROLE_TO_CATEGORY[role];
  if (!category) return null;

  function handleSubmit(e) {
    e.preventDefault();
    addTicket({
      customerId: currentUser.id,
      customerName: currentUser.name,
      category,
      subject,
      message,
      priority,
    });
    setSubject("");
    setMessage("");
    setPriority("Medium");
    setSent(true);
  }

  function close() {
    setShow(false);
    setSent(false);
  }

  return (
    <>
      <button className="btn-gc-outline d-inline-flex align-items-center gap-2" onClick={() => setShow(true)}>
        <FiLifeBuoy size={15} /> Get help
      </button>

      <Modal show={show} onHide={close} centered>
        {sent ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>Request sent</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Our support team has received your request and will get back to you shortly.
            </Modal.Body>
            <Modal.Footer>
              <button className="btn-gc-primary" onClick={close}>Done</button>
            </Modal.Footer>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>Contact support</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                <label className="form-label" style={{ fontSize: "0.85rem" }}>Subject</label>
                <input className="form-control" value={subject} onChange={(e) => setSubject(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ fontSize: "0.85rem" }}>Message</label>
                <textarea className="form-control" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} required />
              </div>
              <div className="mb-1">
                <label className="form-label" style={{ fontSize: "0.85rem" }}>Priority</label>
                <select className="form-select" value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button type="button" className="btn-gc-outline" onClick={close}>Cancel</button>
              <button type="submit" className="btn-gc-primary">Submit request</button>
            </Modal.Footer>
          </form>
        )}
      </Modal>
    </>
  );
}
