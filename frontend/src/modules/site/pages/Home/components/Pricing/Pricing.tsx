import { useEffect, useState } from "react";
import api from "@api";
import "./Pricing.css";
import PriceTableItem from "./components/PriceTableItem/PriceTableItem";
import type { Service } from "@/types";

const Pricing = () => {
    const [services, setServices] = useState<Service[]>([]);
    useEffect(() => {
        api.get("/services")
            .then(res => setServices(res.data))
            .catch(err => console.error("Failed to fetch services:", err));
    }, []);
    return (<div className="pricing-section">
            <div className="section-content-wrapper">
                <h2 className="pricing-heading">Za početak ne treba puno...</h2>
                <div className="pricing-table-wrapper">
                    {services.map(service => (<div className="col" key={service.id}>
                            <PriceTableItem service={service}/>
                        </div>))}
                </div>
            </div>
        </div>);
};
export default Pricing;
