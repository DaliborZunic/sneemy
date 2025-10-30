import "./Pricing.css";
import PriceTableItem from "./components/PriceTableItem/PriceTableItem";

const Pricing = () => {
    return (
        <div className="pricing-section">
            <div className="section-content-wrapper">
                <h2 className="pricing-heading">Za početak ne treba puno...</h2>
                <div className="pricing-table-wrapper">
                    <div className="col">
                        <PriceTableItem />
                    </div>
                    <div className="col">
                        <PriceTableItem />
                    </div>
                    <div className="col">
                        <PriceTableItem />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pricing