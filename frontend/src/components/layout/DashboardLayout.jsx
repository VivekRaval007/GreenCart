import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FiLogOut, FiFeather } from "react-icons/fi";
import { useApp } from "../../context/AppContext";
import { navConfig, roleMeta } from "../../navConfig";
import RoleBadge from "../common/RoleBadge";
import GetHelpButton from "../common/GetHelpButton";

export default function DashboardLayout({ role }) {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const items = navConfig[role] || [];
  const meta = roleMeta[role];
  const activeItem = [...items].reverse().find((item) =>
    item.end ? location.pathname === item.path : location.pathname.startsWith(item.path)
  );
  const pageTitle = activeItem?.label || meta?.label;

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="gc-shell">
      <aside className="gc-sidebar">
        <div className="gc-sidebar-logo">
          <FiFeather /> GreenCart
          <span>{meta?.label}</span>
        </div>
        <nav>
          {items.map(({ label, path, icon: Icon, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) => `gc-nav-link${isActive ? " active" : ""}`}
            >
              <Icon size={16} /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="gc-sidebar-footer">
          <button
            onClick={handleLogout}
            className="gc-nav-link"
            style={{ width: "100%", border: "none", background: "transparent", cursor: "pointer", textAlign: "left" }}
          >
            <FiLogOut size={16} /> Log out
          </button>
        </div>
      </aside>
      <div className="gc-main">
        <header className="gc-topbar">
          <div>
            <h1 style={{ fontSize: "1.25rem", marginBottom: "0.1rem" }}>{pageTitle}</h1>
            <div style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>
              Welcome back, {currentUser?.name?.split(" ")[0]}
            </div>
          </div>
          <div className="d-flex align-items-center gap-3">
            <GetHelpButton role={role} />
            <RoleBadge role={role} />
          </div>
        </header>
        <main className="gc-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
