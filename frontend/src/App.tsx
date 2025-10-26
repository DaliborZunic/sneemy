import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy-load each module root
const SiteApp = lazy(() => import("./modules/site/SiteApp"));
const AdminApp = lazy(() => import("./modules/admin/AdminApp"));

export default function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public site */}
          <Route path="/*" element={<SiteApp />} />

          {/* Admin CRM */}
          <Route path="/admin/*" element={<AdminApp />} />

          {/* Unknown route → home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
