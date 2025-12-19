import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../../api";
import type { Order } from "./Orders";
import "./OrderDetails.css";

const formatOrderDate = (isoDate: string) => {
    if (!isoDate) return "-";
    return new Date(isoDate).toLocaleString("hr-HR", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    });
};

export default function OrderDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (id) {
            api.get(`/Orders/${id}`)
                .then((res) => {
                    setOrder(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Failed to fetch order:", err);
                    setError("Nije moguće učitati narudžbu");
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return <div className="order-details-wrapper">Učitavam...</div>;
    }

    if (error || !order) {
        return (
            <div className="order-details-wrapper">
                <p className="error-message">{error || "Narudžba nije pronađena"}</p>
                <button onClick={() => navigate("/admin/orders")}>Natrag na narudžbe</button>
            </div>
        );
    }

    return (
        <section className="order-details-wrapper">
            <div className="order-details-header">
                <h1>Detalji narudžbe</h1>
                <button onClick={() => navigate("/admin/orders")}>Natrag</button>
            </div>

            <div className="order-details-content">
                <div className="detail-group">
                    <h2>Podaci o kupcu</h2>
                    <div className="detail-row">
                        <span className="detail-label">Ime i prezime</span>
                        <span className="detail-value">{order.nameAndLastName}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">E-mail</span>
                        <span className="detail-value">{order.eMail}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Telefon</span>
                        <span className="detail-value">{order.phoneNumber || "-"}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Web stranica</span>
                        <span className="detail-value">{order.website || "-"}</span>
                    </div>
                </div>

                <div className="detail-group">
                    <h2>Detalji narudžbe</h2>
                    <div className="detail-row">
                        <span className="detail-label">Zahtjev kupca</span>
                        <span className="detail-value">{order.customerRequest || "-"}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Vrijeme narudžbe</span>
                        <span className="detail-value">{formatOrderDate(order.createdAt)}</span>
                    </div>
                </div>

                <div className="detail-group">
                    <h2>R1 Račun</h2>
                    <div className="detail-row">
                        <span className="detail-label">R1 račun</span>
                        <span className="detail-value">{order.isR1Reciept ? "Da" : "Ne"}</span>
                    </div>
                    {order.isR1Reciept && (
                        <>
                            <div className="detail-row">
                                <span className="detail-label">Naziv tvrtke</span>
                                <span className="detail-value">{order.companyName || "-"}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">OIB tvrtke</span>
                                <span className="detail-value">{order.companyOIB || "-"}</span>
                            </div>
                        </>
                    )}
                </div>

                <div className="detail-group">
                    <h2>Plaćanje</h2>
                    <div className="detail-row">
                        <span className="detail-label">Stripe Payment ID</span>
                        <span className="detail-value stripe-id">{order.stripePaymentIntentId}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
