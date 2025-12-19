import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Orders.css"
import { useAuth } from "../../../../auth/AuthContext";
import api from "../../../../api";

export interface Order {
    id: string;
    nameAndLastName: string;
    eMail: string;
    phoneNumber: string | null;
    website: string | null;
    customerRequest: string | null;
    isR1Reciept: boolean;
    companyName: string | null;
    companyOIB: string | null;
    createdAt: string;
    stripePaymentIntentId: string;
}

const formatOrderDate = (isoDate: string) => {
    if (!isoDate) return "-";
    return new Date(isoDate).toLocaleString("hr-HR", {
        year: "numeric",
        month: "narrow",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    });
};


export default function Orders() {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        if (token) {
            api.get("/Orders")
                .then((res: any) => {
                    console.log("Data:", res.data);
                    setOrders(res.data);
                })
                .catch((err: any) => console.error("Data call failed:", err));
        }
    }, [token]);

    return (
        <section className="orders-wrapper">
            <h1>Narudžbe</h1>
            <div className="table-wrapper">
                <table>
                    <tr>
                        <th>Ime i prezime</th>
                        <th>e-mail</th>
                        <th>Web stranica</th>
                        <th>Vrijeme narudžbe</th>
                    </tr>
                    {
                        orders.map(order => (
                            <tr
                                key={order.id}
                                onClick={() => navigate(`/admin/orders/${order.id}`)}
                                className="clickable-row"
                            >
                                <td>{order.nameAndLastName}</td>
                                <td>{order.eMail}</td>
                                <td>{order.website || "-"}</td>
                                <td>{formatOrderDate(order.createdAt)}</td>
                            </tr>
                        ))
                    }
                </table>
            </div>

        </section>
    );
}
