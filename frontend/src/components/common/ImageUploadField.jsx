import { useRef } from "react";
import { FiImage, FiX } from "react-icons/fi";

const MAX_SIZE_MB = 3;

export default function ImageUploadField({ value, onChange, label = "Product photo" }) {
  const inputRef = useRef(null);

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert(`Please choose an image smaller than ${MAX_SIZE_MB}MB.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
  }

  return (
    <div className="mb-3">
      <label className="form-label" style={{ fontSize: "0.85rem" }}>{label}</label>
      {value ? (
        <div style={{ position: "relative", width: 120, height: 120 }}>
          <img
            src={value}
            alt="Product preview"
            style={{ width: 120, height: 120, objectFit: "cover", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-line)" }}
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="btn-gc-danger"
            style={{ position: "absolute", top: -8, right: -8, padding: "0.15rem 0.35rem", borderRadius: "50%" }}
            aria-label="Remove photo"
          >
            <FiX size={12} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          style={{
            width: 120, height: 120, borderRadius: "var(--radius-sm)",
            border: "1px dashed var(--color-line)", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--color-muted)",
            background: "var(--color-primary-light)",
          }}
        >
          <FiImage size={20} />
          <span style={{ fontSize: "0.72rem", marginTop: "0.3rem" }}>Add photo</span>
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
      {!value && (
        <div style={{ fontSize: "0.72rem", color: "var(--color-muted)", marginTop: "0.3rem" }}>Optional, up to {MAX_SIZE_MB}MB.</div>
      )}
    </div>
  );
}
