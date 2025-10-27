import "./SiteApp.css";
import { Routes, Route, Link } from "react-router-dom";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));

export default function SiteApp() {
  return (
    <div className="site-root">
      <nav style={{ marginBottom: "1rem" }}>
        <Link to="/">Home</Link> ·{" "}
        <Link to="/about-us">About Us</Link>
      </nav>
      
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
