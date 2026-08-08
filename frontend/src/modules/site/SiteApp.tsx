import "./SiteApp.css";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import MainNavigation from "./components/MainNavigation/MainNavigation";
import Footer from "./pages/Home/components/Footer/Footer";
const Home = lazy(() => import("./pages/Home/Home"));
const PaymentForm = lazy(() => import("./pages/PaymentForm/PaymentForm"));
const Gallery = lazy(() => import("./pages/Gallery/Gallery"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
export default function SiteApp() {
    return (<div className="site-root">
            <MainNavigation />

            <Suspense fallback={<div>Učitavanje...</div>}>
                <Routes>
                    <Route index element={<Home />}/>
                    <Route path="payment-form" element={<PaymentForm />}/>
                    <Route path="gallery" element={<Gallery />}/>
                    <Route path="*" element={<NotFound />}/>
                </Routes>
            </Suspense>
            <Footer />
        </div>);
}
