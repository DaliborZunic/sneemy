import "./Services.css";
import laptopFrame from "../../../../../../assets/laptop-frame.svg";
import youtubeLogoColor from "../../../../../../assets/youtube-logo-color.svg";
import instagramLogoColor from "../../../../../../assets/instagram-logo-color.svg";
import facebookLogoColor from "../../../../../../assets/facebook-logo-color.svg";
import tiktokLogoColor from "../../../../../../assets/tiktok-logo-color.svg";
import blackPhoneFrame from "../../../../../../assets/black-phone-frame.svg";

const Services = () => {
    return (
        <div className="services-section">
            <div className="section-content-wrapper">
                <h2 className="services-heading">Profesionalan i pristupačan video sadržaj
                    bez studijskih procesa i troškova</h2>
                <span className="services-lead">Pošaljite nam svoj logo i par riječi o svom obrtu, OPG-u i opišite nam kako ulažete svakodnevnu strast i energiju. Naš team kreativaca će osmisliti scenarij i video pomoću kojeg ćete komunicirati sa svojim klijentima kao nikad do sad.</span>
                <div className="youtube-service-wrapper">
                    <div className="text-column">
                        <img className="youtube-service-logo" src={youtubeLogoColor} alt="youtube" />
                        <p className="services-text">Pošaljite nam svoj logo i par riječi o svom obrtu, OPG-u i opišite nam kako ulažete svakodnevnu strast i energiju. Naš team kreativaca će osmisliti scenarij i video pomoću kojeg ćete komunicirati sa svojim klijentima kao nikad do sad.</p>
                        <p className="services-text">Naš team kreativaca će osmisliti scenarij i video pomoću kojeg ćete komunicirati sa svojim klijentima kao nikad do sad.</p>
                    </div>
                    <div className="videos-column">
                        <div className="video-laptop-frame">
                            <img src={laptopFrame} alt="facebook" />
                            <div className="video-frame"></div>
                        </div>
                    </div>
                </div>

                <div className="social-networks-service-wrapper">
                    <div className="videos-column">
                        <div className="phones-frame">
                            <div className="phone-frame">
                                <img src={blackPhoneFrame} alt="black phone frame" />
                                <div className="phone-screen-frame">

                                </div>
                            </div>
                            <div className="phone-frame">
                                <img src={blackPhoneFrame} alt="black phone frame" />
                                <div className="phone-screen-frame">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-column">
                        <div className="social-network-coror-icons-frame">
                        <img src={tiktokLogoColor} alt="tiktok" />
                        <img src={instagramLogoColor} alt="instagram" />
                        <img src={facebookLogoColor} alt="facebook" />
                        </div>
                        <p className="services-text">Pošaljite nam svoj logo i par riječi o svom obrtu, OPG-u i opišite nam kako ulažete svakodnevnu strast i energiju. Naš team kreativaca će osmisliti scenarij i video pomoću kojeg ćete komunicirati sa svojim klijentima kao nikad do sad.</p>
                        <p className="services-text">Naš team kreativaca će osmisliti scenarij i video pomoću kojeg ćete komunicirati sa svojim klijentima kao nikad do sad.</p>
                        <p className="services-text">Naš team kreativaca će osmisliti scenarij i video pomoću kojeg ćete komunicirati sa svojim klijentima kao nikad do sad.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services