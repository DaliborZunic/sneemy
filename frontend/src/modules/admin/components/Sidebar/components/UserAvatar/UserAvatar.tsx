import "./UserAvatar.css";
import moreItemsIcon from "../../../../../../assets/more-items-icon.svg";
import UserAvatarMenu from "./components/UserAvatarMenu/UserAvatarMenu";
import { useState } from "react";
import { useAuth } from "../../../../../../auth/AuthContext";

interface UserAvatarProps {
    logout: () => void;
}

export default function UserAvatar({logout}: UserAvatarProps) {
    const { user } = useAuth();
    const [menuShown, setMenuShown] = useState<boolean>(false);

    const onSetMenuShown = () => {
        setMenuShown(prev => !prev)
    }

    const getInitials = () => {
        if (!user) return "?";
        const first = user.firstName?.charAt(0) || "";
        const last = user.lastName?.charAt(0) || "";
        return (first + last).toUpperCase() || "?";
    };

    const getFullName = () => {
        if (!user) return "Unknown User";
        return `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Unknown User";
    };

    const getPrimaryRole = () => {
        if (!user || !user.roles || user.roles.length === 0) return "User";
        return user.roles[0];
    };

    return (
        <div className="user-avatar-wrapper" onClick={onSetMenuShown}>
            <div className="avatar-image-wrapper">
                <span>{getInitials()}</span>
            </div>
            <div className="user-info-wrapper">
                <span className="user-name">{getFullName()}</span>
                <span className="user-role">{getPrimaryRole()}</span>
            </div>
            <div className="icon-pressable-wrapper">
                <img src={moreItemsIcon} alt="" />
            </div>
            {menuShown && <UserAvatarMenu logout={logout} />}

        </div>
    );
}