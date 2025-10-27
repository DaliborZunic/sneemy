import { Link } from "react-router-dom";
import "./MainNavigation.css";
 import logo from "../../../../assets/sneemy-logo.svg"

const MainNavigation = () => {
    return (
        <div className="main-navigation-wrapper">
            <img className="logo" src={logo} alt="Sneemy" />
            <nav className="main-navigation">
            <Link to="/">Home</Link>
            <Link to="/about-us">About Us</Link>
            <Link className="highlighted-nav-link" to="/">Naruči video</Link>
        </nav></div>

    )
}

export default MainNavigation