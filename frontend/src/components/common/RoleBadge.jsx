import { roleMeta } from "../../navConfig";

export default function RoleBadge({ role }) {
  const meta = roleMeta[role] || { label: role, color: "var(--color-muted)" };
  return (
    <span className="gc-role-badge" style={{ background: meta.color }}>
      {meta.label}
    </span>
  );
}
