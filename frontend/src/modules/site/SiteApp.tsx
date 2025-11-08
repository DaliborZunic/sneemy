import "./SiteApp.css";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import MainNavigation from "./components/MainNavigation/MainNavigation";
import Footer from "./pages/Home/components/Footer/Footer";

const Home = lazy(() => import("./pages/Home/Home"));
const PaymentForm = lazy(() => import("./pages/PaymentForm/PaymentForm"));

export default function SiteApp() {
    return (
        <div className="site-root">
            <MainNavigation />

            <Suspense fallback={<div>Loading site...</div>}>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="payment-form" element={<PaymentForm />} />
                    <Route path="*" element={<div>404 – Page not found</div>} />
                </Routes>
            </Suspense>
            <Footer />
        </div>
    );
}
