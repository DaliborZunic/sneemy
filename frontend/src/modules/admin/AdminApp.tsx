import "./AdminApp.css";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import sneemyLogoCRM from "../../assets/sneemy-erp-logo.svg";
import ordersIcon from "../../assets/orders-icon.svg";

const Orders = lazy(() => import("./pages/Orders/Orders"));
const Users = lazy(() => import("./pages/Users"));

export default function AdminApp() {
  const location = useLocation();

  return (
    <div className="admin-root">
      <div className="sidebar">
        <div className="sidebar-header">
          <img className="crm-logo" src={sneemyLogoCRM} alt="" />
        </div>

        <div className="sidebar-links">
          <Link
            to="/admin"
            className={`sidebar-link${
              location.pathname === "/admin" ? " active" : ""
            }`}
          >
            <img src={ordersIcon} alt="" />
            <span>Narudžbe</span>
          </Link>

          <Link
            to="/admin/users"
            className={`sidebar-link${
              location.pathname === "/admin/users" ? " active" : ""
            }`}
          >
            <img src={ordersIcon} alt="" />
            <span>Novi link</span>
          </Link>
        </div>
      </div>

      <div className="main-content">
        <Suspense fallback={<div>Loading admin...</div>}>
          <Routes>
            <Route index element={<Orders />} />
            <Route path="orders" element={<Orders />} />
            <Route path="users" element={<Users />} />
            <Route path="*" element={<div>404 – Admin section</div>} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}
