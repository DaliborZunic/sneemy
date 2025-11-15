import "./Sidebar.css";
import { Link } from "react-router-dom";
import sneemyLogoCRM from "../../../../assets/sneemy-erp-logo.svg";
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
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        width="16px" height="16px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xmlSpace="preserve">
                        <path d="M5,11.5C5,11.224,5.224,11,5.5,11h9c0.276,0,0.5,0.224,0.5,0.5S14.776,12,14.5,12h-9
	C5.224,12,5,11.776,5,11.5 M5,7.5C5,7.224,5.224,7,5.5,7h9C14.776,7,15,7.224,15,7.5S14.776,8,14.5,8h-9C5.224,8,5,7.776,5,7.5
	 M5,3.5C5,3.224,5.224,3,5.5,3h9C14.776,3,15,3.224,15,3.5S14.776,4,14.5,4h-9C5.224,4,5,3.776,5,3.5 M2,4.5c0.552,0,1-0.448,1-1
	s-0.448-1-1-1s-1,0.448-1,1S1.448,4.5,2,4.5 M2,8.5c0.552,0,1-0.448,1-1s-0.448-1-1-1s-1,0.448-1,1S1.448,8.5,2,8.5 M2,12.5
	c0.552,0,1-0.447,1-1s-0.448-1-1-1s-1,0.447-1,1S1.448,12.5,2,12.5"/>
                    </svg>
                    <span>Narudžbe</span>
                </Link>

                <Link
                    to="/admin/users"
                    onClick={closeSidebar}
                    className={`sidebar-link${currentPath === "/admin/users" ? " active" : ""}`}
                >
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        width="16px" height="16px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xmlSpace="preserve">
                        <path d="M5,11.5C5,11.224,5.224,11,5.5,11h9c0.276,0,0.5,0.224,0.5,0.5S14.776,12,14.5,12h-9
	C5.224,12,5,11.776,5,11.5 M5,7.5C5,7.224,5.224,7,5.5,7h9C14.776,7,15,7.224,15,7.5S14.776,8,14.5,8h-9C5.224,8,5,7.776,5,7.5
	 M5,3.5C5,3.224,5.224,3,5.5,3h9C14.776,3,15,3.224,15,3.5S14.776,4,14.5,4h-9C5.224,4,5,3.776,5,3.5 M2,4.5c0.552,0,1-0.448,1-1
	s-0.448-1-1-1s-1,0.448-1,1S1.448,4.5,2,4.5 M2,8.5c0.552,0,1-0.448,1-1s-0.448-1-1-1s-1,0.448-1,1S1.448,8.5,2,8.5 M2,12.5
	c0.552,0,1-0.447,1-1s-0.448-1-1-1s-1,0.447-1,1S1.448,12.5,2,12.5"/>
                    </svg>
                    <span>Novi link</span>
                </Link>
            </div>

            <UserAvatar logout={logout} />
        </div>
    );
}