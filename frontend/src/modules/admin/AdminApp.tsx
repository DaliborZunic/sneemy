import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Users = lazy(() => import("./pages/Users"));

export default function AdminApp() {
  return (
    <div className="admin-root">
      <Suspense fallback={<div>Loading admin...</div>}>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="*" element={<div>404 – Admin section</div>} />
        </Routes>
      </Suspense>
    </div>
  );
}
