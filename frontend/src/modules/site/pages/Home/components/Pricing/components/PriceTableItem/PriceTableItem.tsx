import { Link } from "react-router-dom";
import "./PriceTableItem.css";

const PriceTableItem = () => {
    return (
        <div className="price-item-wrapper">
            <div className="price-circle">59€</div>
            <h3 className="price-item-heading">Story / reel objava</h3>
            <p className="pricing-item-description">Za male obrte, OPG-ove i influencere koji žele prezentirati proizvod u modernom formatu.</p>
            <ul className="price-item-details">
                <li>video ca. 30 sekundi</li>
                <li>autentičan stiln mobilnog formata</li>
                <li>video ca. 30 sekundi</li>
                <li>animacija logotipa</li>
                <li>glazba u pozadini</li>
                <li>1 revizija uključena</li>
            </ul>
            <Link className="price-item-link" to="/admin/users">Pogledaj primjere videa</Link>
            <Link className="price-item-link price-item-link-cta" to="/admin/users">Naruči video</Link>
        </div>
    )
}

export default PriceTableItem