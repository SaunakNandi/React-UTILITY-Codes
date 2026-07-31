import { Route, Routes } from "react-router-dom";
import { RoleBasedGuard } from "./role-based-guard";
import App from "./App";
export function RouteSetup() {
  return (
    <Routes>
      <Route
        path="/admin-dashboard"
        element={
          <RoleBasedGuard allowedRoles={["admin"]}>
            {/* <AdminDashboard */}
          </RoleBasedGuard>
        }
      />
    </Routes>
  );
}
