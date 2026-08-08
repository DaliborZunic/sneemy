import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Orders.css";
import { useAuth } from "@auth/AuthContext";
import api from "@api";
import type { Order } from "@/types";
const formatOrderDate = (isoDate: string | undefined | null) => {
    if (!isoDate)
        return "-";
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
    return (<section className="orders-wrapper">
            <h1>Narudžbe</h1>
            <div className="table-wrapper">
                <table>
                    <tr>
                        <th>Usluga</th>
                        <th>Cijena</th>
                        <th>Ime i prezime</th>
                        <th>e-mail</th>
                        <th>Vrijeme narudžbe</th>
                    </tr>
                    {orders.map(order => (<tr key={order.id} onClick={() => navigate(`/admin/orders/${order.id}`)} className="clickable-row">
                                <td>{order.serviceName}</td>
                                <td>{order.servicePrice} €</td>
                                <td>{order.nameAndLastName}</td>
                                <td>{order.eMail}</td>
                                <td>{formatOrderDate(order.createdAt)}</td>
                            </tr>))}
                </table>
            </div> 
 
        </section>);
}
