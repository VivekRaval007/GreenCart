export default function EmptyState({ icon: Icon, title, hint }) {
  return (
    <div className="gc-empty">
      {Icon && <Icon />}
      <div style={{ fontWeight: 600, color: "var(--color-ink)" }}>{title}</div>
      {hint && <div style={{ fontSize: "0.85rem", marginTop: "0.25rem" }}>{hint}</div>}
    </div>
  );
}
