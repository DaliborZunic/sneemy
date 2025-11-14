import "./UserAvatar.css";
import moreItemsIcon from "../../../../../../assets/more-items-icon.svg";

export default function UserAvatar() {
    return (
        <div className="user-avatar-wrapper">
            <div className="avatar-image-wrapper">
                <span>DŽ</span>
            </div>
            <img src={moreItemsIcon} alt="" />
        </div>
    );
}