import { FiImage } from "react-icons/fi";

export default function ProductThumb({ src, size = 56 }) {
  if (src) {
    return (
      <img
        src={src}
        alt=""
        style={{ width: size, height: size, objectFit: "cover", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-line)", flexShrink: 0 }}
      />
    );
  }
  return (
    <div
      style={{
        width: size, height: size, borderRadius: "var(--radius-sm)", border: "1px dashed var(--color-line)",
        display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-line)", flexShrink: 0,
        background: "var(--color-primary-light)",
      }}
    >
      <FiImage size={size * 0.4} />
    </div>
  );
}
