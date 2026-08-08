import "./Footer.css";
import SneemyLogo from "@modules/site/components/shared/SneemyLogo/SneemyLogo";
const Footer = () => {
    return (<div className="footer-section">
      <div className="section-content-wrapper">
        <div className="left-footer-column">
          <SneemyLogo logoColorHex="white"/>
          <p className="footer-info">
            © 2025 Sneemy – obrt za video produkciju<br />
            vl. Dalibor Žunić,
            Zaprešić<br />
            <a href="mailto:info@sneemy.hr">info@sneemy.hr</a>
          </p>
        </div>
        <div className="right-footer-column">
          <p className="footer-info">
            OIB: 12345678901<br />
            Obrt nije u sustavu PDV-a

          </p>
        </div>
      </div>
    </div>);
};
export default Footer;
