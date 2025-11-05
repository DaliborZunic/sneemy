import { Link } from "react-router-dom";
import "./MainNavigation.css";
import SneemyLogo from "../shared/SneemyLogo/SneemyLogo";
import hamburgerIcon from "../../../../assets/hamburger-icon.svg"
import closeIcon from "../../../../assets/close-icon.svg"
import { useState } from "react";

const MainNavigation = () => {
    const [menuShown, setMenuShown] = useState<boolean>(false);

    const handleHamburgerClick = () => {
        setMenuShown(prev => !prev)
    }

    return (
        <div className="main-navigation-wrapper">
            <SneemyLogo logoColorHex="#FBFE00" />
            <nav className={`main-navigation ${menuShown ? "menu-shown" : ""}`}>
                <Link to="/">Home</Link>
                <Link to="/payment-form">About Us</Link>
                <Link className="highlighted-nav-link" to="/payment-form">Naruči video</Link>
            </nav>
            <div className="hamburger-icon-wrapper" onClick={handleHamburgerClick}>
                { !menuShown ? <img className="hamburger-icon" src={hamburgerIcon} alt="hamburger icon" /> : menuShown && <img className="hamburger-icon" src={closeIcon} alt="close icon" /> }
            </div>
        </div>
    )
}

export default MainNavigation