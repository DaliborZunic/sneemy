import "./UserAvatar.css";
import moreItemsIcon from "../../../../../../assets/more-items-icon.svg";
import UserAvatarMenu from "./components/UserAvatarMenu/UserAvatarMenu";
import { useState } from "react";

interface UserAvatarProps {
    logout: () => void;
}

export default function UserAvatar({logout}: UserAvatarProps) {
    const [menuShown, setMenuShown] = useState<boolean>(false);

    const onSetMenuShown = () => {
        setMenuShown(prev => !prev)
    }

    return (
        <div className="user-avatar-wrapper" onClick={onSetMenuShown}>
            <div className="avatar-image-wrapper">
                <span>DŽ</span>
            </div>
            <div className="user-info-wrapper">
                <span className="user-name">Dalibor Žunić</span>
                <span className="user-role">Admin</span>
            </div>
            <div className="icon-pressable-wrapper">
                <img src={moreItemsIcon} alt="" />
            </div>
            {menuShown && <UserAvatarMenu logout={logout} />}
            
        </div>
    );
}