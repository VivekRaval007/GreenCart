const STATUS_STYLE = {
  Processing: "pill-grey",
  "Ready for pickup": "pill-orange",
  "Out for delivery": "pill-blue",
  Delivered: "pill-green",
  Cancelled: "pill-red",
  Open: "pill-red",
  "In Progress": "pill-orange",
  Resolved: "pill-green",
  Active: "pill-green",
  Suspended: "pill-red",
  Low: "pill-grey",
  Medium: "pill-orange",
  High: "pill-red",
  Paid: "pill-green",
  Pending: "pill-orange",
};

export default function StatusPill({ value }) {
  const cls = STATUS_STYLE[value] || "pill-grey";
  return <span className={`gc-pill ${cls}`}>{value}</span>;
}
