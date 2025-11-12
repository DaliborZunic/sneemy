import { useEffect } from "react";
import "./Orders.css"
import { useAuth } from "../../../../auth/AuthContext";
import api from "../../../../api";

export default function Dashboard() {
    const { token } = useAuth();
    useEffect(() => {
        if (token) {
            api.get("/WeatherForecast")
                .then((res: any) => console.log("Weather data:", res.data))
                .catch((err: any) => console.error("Weather call failed:", err));
        }
    }, [token]);
    
    return (
        <section>
            <h1>Narudžbe</h1>
            <table>
                <tr>
                    <th>Ime i prezime</th>
                    <th>e-mail</th>
                    <th>Status</th>
                </tr>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                </tr>
                <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                </tr>
            </table>
        </section>
    );
}
