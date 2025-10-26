import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));

export default function SiteApp() {
  return (
    <div className="site-root">
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
