import { Link } from "react-router-dom";
import "./PriceTableItem.css";

interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    features: string[];
}

interface PriceTableItemProps {
    service: Service;
}

const PriceTableItem = ({ service }: PriceTableItemProps) => {
    return (
        <div className="price-item-wrapper">
            <div className="price-circle">{service.price}€</div>
            <h3 className="price-item-heading">{service.name}</h3>
            <p className="pricing-item-description">{service.description}</p>
            <ul className="price-item-details">
                {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
            <Link className="price-item-link" to="/admin/users">Pogledaj primjere videa</Link>
            <Link className="price-item-link price-item-link-cta" to={`/payment-form?serviceId=${service.id}`}>Naruči video</Link>
        </div>
    )
}

export default PriceTableItem