import "./UserAvatarMenu.css";
import moreItemsIcon from "../../../../../../../../assets/more-items-icon.svg";

interface UserAvatarMenuProps {
    logout: () => void;
}

const UserAvatarMenu = ({logout}: UserAvatarMenuProps) => {
    return (
        <div className="user-menu-wrapper">
            <div className="user-menu-item" onClick={logout}>
                <div className="img-wrapper"><img src={moreItemsIcon} alt="" /></div>
                <span>Odjava</span>
            </div>
        </div>
    )
}

export default UserAvatarMenu