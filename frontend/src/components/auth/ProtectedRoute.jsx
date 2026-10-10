import { Navigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function ProtectedRoute({ role, children }) {
  const { currentUser } = useApp();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role !== role) return <Navigate to={`/${currentUser.role}`} replace />;
  return children;
}
