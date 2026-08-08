import "./NotFound.css";
import { Link } from "react-router-dom";
export default function NotFound() {
    return (<section className="not-found-section">
            <div className="section-content-wrapper">
                <h1>404</h1>
                <p>Stranica koju tražite ne postoji</p>
                <Link to="/" className="back-home-link">
                    Natrag na početnu
                </Link>
            </div>
        </section>);
}
