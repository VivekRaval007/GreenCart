export default function StatCard({ label, value, accent = "", icon: Icon }) {
  return (
    <div className={`gc-card gc-stat-card ${accent}`}>
      <div className="gc-stat-card-row">
        <div>
          <div className="gc-stat-label">{label}</div>
          <div className="gc-stat-value">{value}</div>
        </div>
        {Icon && (
          <span className="gc-stat-icon">
            <Icon size={18} />
          </span>
        )}
      </div>
    </div>
  );
}
