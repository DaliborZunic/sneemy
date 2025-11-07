import "./AdminApp.css";
import { Routes, Route, Link } from "react-router-dom";
import { Suspense, lazy } from "react";
import sneemyLogoCRM from "../../assets/sneemy-erp-logo.svg";
import ordersIcon from "../../assets/orders-icon.svg";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Users = lazy(() => import("./pages/Users"));

export default function AdminApp() {
  return (
    <div className="admin-root">
      <div className="sidebar">
        <div className="sidebar-header">
          <img className="crm-logo" src={sneemyLogoCRM} alt="" />
        </div>
        <div className="sidebar-links">
          <div className="sidebar-link">
            <img src={ordersIcon} alt="" />
            <Link to="/admin">Narudžbe</Link>
          </div>
          <div className="sidebar-link">
            <img src={ordersIcon} alt="" />
            <Link to="/admin/users">Novi link</Link>
          </div>
        </div>
      </div>
      <div className="main-content">
        <Suspense fallback={<div>Loading admin...</div>}>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="*" element={<div>404 – Admin section</div>} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}
