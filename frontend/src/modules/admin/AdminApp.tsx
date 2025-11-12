import "./AdminApp.css";
import { Routes, Route, Link, useLocation, Navigate, Outlet } from "react-router-dom";
import { Suspense, lazy, useState } from "react";
import sneemyLogoCRM from "../../assets/sneemy-erp-logo.svg";
import ordersIcon from "../../assets/orders-icon.svg";
import hamburgerIcon from "../../assets/hamburger-icon-crm.svg";
import closeIcon from "../../assets/close-icon-crm.svg";
import { useAuth } from "../../auth/AuthContext";
import ProtectedRoute from "../../auth/ProtectedRoute";
import Login from "./pages/Login/Login"; 

const Orders = lazy(() => import("./pages/Orders/Orders"));
const Users = lazy(() => import("./pages/Users"));

export default function AdminApp() {
  const location = useLocation();
  const { logout } = useAuth();
  const [sidebarShown, setSidebarShown] = useState<boolean>(false);

  const onHamburgerClick = () => setSidebarShown((prev) => !prev);
  const closeSidebar = () => setSidebarShown(false);

  // if no token and not on login route, redirect handled by ProtectedRoute
  // layout shown only inside protected routes

  const AdminLayout = () => (
    <div className="admin-root">
      <div className={`sidebar${sidebarShown ? " active" : ""}`}>
        <div className="sidebar-header">
          <img className="crm-logo" src={sneemyLogoCRM} alt="" />
          <div className="close-icon-wrapper" onClick={onHamburgerClick}>
            <img className="close-icon" src={closeIcon} alt="close icon" />
          </div>
        </div>

        <div className="sidebar-links">
          <Link
            to="/admin"
            onClick={closeSidebar}
            className={`sidebar-link${location.pathname === "/admin" ? " active" : ""}`}
          >
            <img src={ordersIcon} alt="" />
            <span>Narudžbe</span>
          </Link>

          <Link
            to="/admin/users"
            onClick={closeSidebar}
            className={`sidebar-link${location.pathname === "/admin/users" ? " active" : ""}`}
          >
            <img src={ordersIcon} alt="" />
            <span>Novi link</span>
          </Link>

          <button
            onClick={logout}
            style={{ marginLeft: "1rem", marginTop: "2rem" }}
            className="btn btn-sm btn-outline-secondary"
          >
            Odjava
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="main-content-header">
          <div className="hamburger-wrapper" onClick={onHamburgerClick}>
            <img className="hamburger-icon" src={hamburgerIcon} alt="hamburger icon" />
          </div>
        </div>

        <div className="routes-wrapper">
          <Suspense fallback={<div>Loading admin...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );

  return (
    <Routes>
      {/* Public admin login page */}
      <Route path="login" element={<Login />} />

      {/* Protected admin area */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Orders />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="*" element={<div>404 – Admin section</div>} />
        </Route>
      </Route>

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
