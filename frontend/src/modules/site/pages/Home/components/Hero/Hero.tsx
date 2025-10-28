import "./Hero.css";
import sneemyLogo from "../../../../../../assets/sneemy-logo.svg";
import tikTokLogo from "../../../../../../assets/tiktok-logo.svg";
import youTubeLogo from "../../../../../../assets/youtube-logo.svg";
import instagramLogo from "../../../../../../assets/instagram-logo.svg";
import facebookLogo from "../../../../../../assets/facebook-logo.svg";
import { Link } from "react-router-dom";
import PhoneFrame from "./components/PhoneFrame/PhoneFrame";

const Hero = () => {
  return (
    <div className="hero-wrapper">
        <div className="section-content-wrapper">
          <div className="row">
            <div className="col hero-left-col">
              <PhoneFrame />
            </div>

            <div className="col hero-right-col">
              <img className="hero-logo" src={sneemyLogo} alt="Sneemy" />
              <h1 className="hero-heading">Izrada video sadržaja za društvene mreže i web kampanje</h1>
              <div className="hero-logo-wrapper">
                <img className="hero-logo" src={tikTokLogo} alt="TikTok" />
                <img className="hero-logo" src={instagramLogo} alt="Instagram" />
                <img className="hero-logo" src={facebookLogo} alt="facebook" />
                <img className="hero-logo youtube-logo" src={youTubeLogo} alt="YouTube" />
              </div>
              <Link className="hero-button-link" to="/about-us">Naruči video</Link>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Hero