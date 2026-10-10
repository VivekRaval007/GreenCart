import { FiLifeBuoy } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import StatusPill from "../../components/common/StatusPill";
import EmptyState from "../../components/common/EmptyState";

export default function SupportManagement() {
  const { tickets } = useApp();
  const byCategory = {};
  tickets.forEach((t) => {
    byCategory[t.category] = (byCategory[t.category] || 0) + 1;
  });

  return (
    <div>
      <p style={{ color: "var(--color-muted)" }}>Platform-wide view of support activity across every ticket category.</p>

      <div className="d-flex gap-2 flex-wrap mb-4">
        {Object.entries(byCategory).map(([cat, count]) => (
          <span key={cat} className="gc-pill pill-grey">{cat}: {count}</span>
        ))}
      </div>

      {tickets.length === 0 ? (
        <EmptyState icon={FiLifeBuoy} title="No support tickets on file" />
      ) : (
        <div className="gc-card accent-support">
          <table className="gc-table">
            <thead><tr><th>From</th><th>Category</th><th>Subject</th><th>Priority</th><th>Status</th></tr></thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id}>
                  <td>{t.customerName}</td>
                  <td><span className="gc-pill pill-grey">{t.category}</span></td>
                  <td>{t.subject}</td>
                  <td><StatusPill value={t.priority} /></td>
                  <td><StatusPill value={t.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
