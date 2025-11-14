import "./Sidebar.css";
import { Link } from "react-router-dom";
import sneemyLogoCRM from "../../../../assets/sneemy-erp-logo.svg";
import ordersIcon from "../../../../assets/orders-icon.svg";
import closeIcon from "../../../../assets/close-icon-crm.svg";
import UserAvatar from "./components/UserAvatar/UserAvatar";

interface SidebarProps {
    sidebarShown: boolean;
    currentPath: string;
    onHamburgerClick: () => void;
    closeSidebar: () => void;
    logout: () => void;
}

export default function Sidebar({ 
    sidebarShown, 
    currentPath, 
    onHamburgerClick, 
    closeSidebar, 
    logout 
}: SidebarProps) {
    return (
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
                    className={`sidebar-link${currentPath === "/admin" ? " active" : ""}`}
                >
                    <img src={ordersIcon} alt="" />
                    <span>Narudžbe</span>
                </Link>

                <Link
                    to="/admin/users"
                    onClick={closeSidebar}
                    className={`sidebar-link${currentPath === "/admin/users" ? " active" : ""}`}
                >
                    <img src={ordersIcon} alt="" />
                    <span>Novi link</span>
                </Link>

                <button
                    onClick={logout}
                    className="btn btn-sm btn-outline-secondary"
                >
                    Odjava
                </button>
            </div>
            
            <UserAvatar />
        </div>
    );
}