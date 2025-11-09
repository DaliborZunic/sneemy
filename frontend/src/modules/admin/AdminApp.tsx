import "./AdminApp.css";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import sneemyLogoCRM from "../../assets/sneemy-erp-logo.svg";
import ordersIcon from "../../assets/orders-icon.svg";
import hamburgerIcon from "../../assets/hamburger-icon-crm.svg";
import closeIcon from "../../assets/close-icon-crm.svg";

const Orders = lazy(() => import("./pages/Orders/Orders"));
const Users = lazy(() => import("./pages/Users"));

export default function AdminApp() {
  const location = useLocation();
  const [sidebarShown, setSidebarShown] = useState<boolean>(false);

  const onHamburgerClick = () => {
    setSidebarShown((prev) => !prev);
  };

  const closeSidebar = () => setSidebarShown(false);

  useEffect(() => {
  const fetchWeather = async () => {
    const res = await fetch('/api/WeatherForecast');
    const data = await res.json();
    console.log(data);
  };

  fetchWeather();
}, []);

  return (
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
            className={`sidebar-link${location.pathname === "/admin" ? " active" : ""
              }`}
          >
            <img src={ordersIcon} alt="" />
            <span>Narudžbe</span>
          </Link>

          <Link
            to="/admin/users"
            onClick={closeSidebar}
            className={`sidebar-link${location.pathname === "/admin/users" ? " active" : ""
              }`}
          >
            <img src={ordersIcon} alt="" />
            <span>Novi link</span>
          </Link>
        </div>
      </div>

      <div className="main-content">
        <div className="main-content-header">
          <div className="hamburger-wrapper" onClick={onHamburgerClick}>
            <img
              className="hamburger-icon"
              src={hamburgerIcon}
              alt="hamburger icon"
            />
          </div>
        </div>

        <div className="routes-wrapper">
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
    </div>
  );
}
