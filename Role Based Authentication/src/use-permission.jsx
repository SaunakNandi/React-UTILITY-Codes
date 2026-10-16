import { useContext } from "react";
import { AuthProvider } from "./auth-context";

export const usePermission = (permission) => {
  const { user, userData } = useContext(AuthProvider);
  return userData.permission.includes(permission) ? user : null;
};
