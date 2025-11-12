import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute() {
  const { token } = useAuth();
  const loc = useLocation();

  if (!token) {
    return <Navigate to="/admin/login" state={{ from: loc.pathname }} replace />;
  }

  return <Outlet />;
}
