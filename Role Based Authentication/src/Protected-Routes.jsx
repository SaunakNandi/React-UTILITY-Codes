import { useContext } from "react";
import { AuthProvider } from "./auth-context";
import { Navigate, Outlet } from "react-router-dom";
import { usePermission } from "./use-permission";

const ProtectedRoutes = ({ permission, children }) => {
  const { userData } = useContext(AuthProvider);
  const isPermitted = usePermission(permission);
  if (!userData) return <Navigate to="/login" replace />;
  if (!isPermitted) return <Navigate to="/403" replace />;
  return children;
};

export default ProtectedRoutes;
