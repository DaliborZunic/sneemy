import { Link } from "react-router-dom";
import "./MainNavigation.css";
import SneemyLogo from "@modules/site/components/shared/SneemyLogo/SneemyLogo";
import hamburgerIcon from "@assets/hamburger-icon.svg";
import closeIcon from "@assets/close-icon.svg";
import { useState } from "react";
const MainNavigation = () => {
    const [menuShown, setMenuShown] = useState(false);
    const handleHamburgerClick = () => {
        setMenuShown(prev => !prev);
    };
    const closeMenu = () => {
        setMenuShown(false);
    };
    return (<div className="main-navigation-wrapper">
            <SneemyLogo logoColorHex="#FBFE00"/>
            <nav className={`main-navigation ${menuShown ? "menu-shown" : ""}`}>
                <Link to="/" onClick={closeMenu}>Početna</Link>
                <Link to="/payment-form" onClick={closeMenu}>O nama</Link>
                <Link to="/gallery" onClick={closeMenu}>Galerija</Link>
                <Link className="highlighted-nav-link" to="/payment-form" onClick={closeMenu}>Naruči video</Link>
            </nav>
            <div className="hamburger-icon-wrapper" onClick={handleHamburgerClick}>
                {!menuShown ? <img className="hamburger-icon" src={hamburgerIcon} alt="hamburger icon"/> : menuShown && <img className="hamburger-icon" src={closeIcon} alt="close icon"/>}
            </div>
        </div>);
};
export default MainNavigation;
