import "./Services.css";
import laptopFrame from "../../../../../../assets/laptop-frame.svg";
import youtubeLogoColor from "../../../../../../assets/youtube-logo-color.svg";

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
                        <img src={laptopFrame} alt="facebook" />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Services