import { Link } from "react-router-dom";
import "./PriceTableItem.css";
import type { Service } from "@/types";

const PriceTableItem = ({ service }: { service: Service }) => {
    return (<div className="price-item-wrapper">
            <div className="price-circle">{service.price}€</div>
            <h3 className="price-item-heading">{service.serviceName}</h3>
            <p className="pricing-item-description">{service.description}</p>
            <ul className="price-item-details">
                {service.features?.map((feature, index) => (<li key={index}>{feature.title}</li>))}
            </ul>
            <Link className="price-item-link" to={`/gallery?type=${service.videoType}`}>Pogledaj primjere videa</Link>
            <Link className="price-item-link price-item-link-cta" to={`/payment-form?serviceId=${service.id}`}>Naruči video</Link>
        </div>);
};
export default PriceTableItem;
