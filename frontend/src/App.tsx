import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider } from "./auth/AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./modules/admin/pages/Login/Login";
const SiteApp = lazy(() => import("./modules/site/SiteApp"));
const AdminApp = lazy(() => import("./modules/admin/AdminApp"));
export default function App() {
    return (<Router>
      <ScrollToTop />
      <AuthProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/*" element={<SiteApp />}/>
            <Route path="/admin/login" element={<Login />}/>
            <Route path="/admin/*" element={<AdminApp />}/>
            <Route path="*" element={<Navigate to="/" replace/>}/>
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>);
}
