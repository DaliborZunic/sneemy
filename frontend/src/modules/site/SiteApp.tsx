import "./SiteApp.css";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import MainNavigation from "./components/MainNavigation/MainNavigation";

const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));

export default function SiteApp() {
  return (
    <div className="site-root">
      <MainNavigation />
      
      <Suspense fallback={<div>Loading site...</div>}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="about-us" element={<About />} />
          <Route path="*" element={<div>404 – Page not found</div>} />
        </Routes>
      </Suspense>
    </div>
  );
}
