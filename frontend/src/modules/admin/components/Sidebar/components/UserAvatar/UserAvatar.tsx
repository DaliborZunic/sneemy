import "./UserAvatar.css";
import moreItemsIcon from "../../../../../../assets/more-items-icon.svg";

export default function UserAvatar() {
    return (
        <div className="user-avatar-wrapper">
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
        </div>
    );
}