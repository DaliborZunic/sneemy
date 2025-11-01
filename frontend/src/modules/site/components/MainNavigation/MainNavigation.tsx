import { Link } from "react-router-dom";
import "./MainNavigation.css";
import SneemyLogo from "../shared/SneemyLogo/SneemyLogo";

const MainNavigation = () => {
    return (
        <div className="main-navigation-wrapper">
            <SneemyLogo logoColorHex="#FBFE00" />
            <nav className="main-navigation">
                <Link to="/">Home</Link>
                <Link to="/about-us">About Us</Link>
                <Link className="highlighted-nav-link" to="/">Naruči video</Link>
            </nav>
        </div>

    )
}

export default MainNavigation