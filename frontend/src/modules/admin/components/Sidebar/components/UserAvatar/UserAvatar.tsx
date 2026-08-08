import "./UserAvatar.css";
import moreItemsIcon from "@assets/more-items-icon.svg";
import UserAvatarMenu from "./components/UserAvatarMenu/UserAvatarMenu";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@auth/AuthContext";
export default function UserAvatar({ logout }: { logout: () => void }) {
    const { user } = useAuth();
    const [menuShown, setMenuShown] = useState<boolean>(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (wrapperRef.current && event.target && !wrapperRef.current.contains(event.target as Node)) {
                setMenuShown(false);
            }
        };
        if (menuShown) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuShown]);
    const onSetMenuShown = () => {
        setMenuShown(prev => !prev);
    };
    const getInitials = () => {
        if (!user)
            return "?";
        const first = user.firstName?.charAt(0) || "";
        const last = user.lastName?.charAt(0) || "";
        return (first + last).toUpperCase() || "?";
    };
    const getFullName = () => {
        if (!user)
            return "Unknown User";
        return `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Unknown User";
    };
    const getPrimaryRole = () => {
        if (!user || !user.roles || user.roles.length === 0)
            return "User";
        return user.roles[0];
    };
    return (<div className="user-avatar-wrapper" ref={wrapperRef} onClick={onSetMenuShown}>
            <div className="avatar-image-wrapper">
                <span>{getInitials()}</span>
            </div>
            <div className="user-info-wrapper">
                <span className="user-name">{getFullName()}</span>
                <span className="user-role">{getPrimaryRole()}</span>
            </div>
            <div className="icon-pressable-wrapper">
                <img src={moreItemsIcon} alt=""/>
            </div>
            {menuShown && <UserAvatarMenu logout={logout}/>}

        </div>);
}
