import "./AdminApp.css";
import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import { Suspense, lazy, useState } from "react";
import hamburgerIcon from "../../assets/hamburger-icon-crm.svg";
import { useAuth } from "../../auth/AuthContext";
import ProtectedRoute from "../../auth/ProtectedRoute";
import Sidebar from "./components/Sidebar/Sidebar";

const Orders = lazy(() => import("./pages/Orders/Orders"));
const Users = lazy(() => import("./pages/Users"));

interface AdminLayoutProps {
    sidebarShown: boolean;
    onHamburgerClick: () => void;
    closeSidebar: () => void;
    logout: () => void;
}

function AdminLayout({
    sidebarShown,
    onHamburgerClick,
    closeSidebar,
    logout,
}: AdminLayoutProps) {
    const location = useLocation();

    return (
        <div className="admin-root">
            <Sidebar
                sidebarShown={sidebarShown}
                currentPath={location.pathname}
                onHamburgerClick={onHamburgerClick}
                closeSidebar={closeSidebar}
                logout={logout}
            />

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
}

export default function AdminApp() {
    const { logout } = useAuth();
    const [sidebarShown, setSidebarShown] = useState(false);

    const onHamburgerClick = () => setSidebarShown(prev => !prev);
    const closeSidebar = () => setSidebarShown(false);

    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route
                    element={
                        <AdminLayout
                            sidebarShown={sidebarShown}
                            onHamburgerClick={onHamburgerClick}
                            closeSidebar={closeSidebar}
                            logout={logout}
                        />
                    }
                >
                    <Route index element={<Orders />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="users" element={<Users />} />
                    <Route path="*" element={<div>404 – Admin section</div>} />
                </Route>
            </Route>

            <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
    );
}