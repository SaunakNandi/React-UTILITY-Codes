import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const RoleBasedGuard = ({ children, allowedRoles }) => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  useEffect(() => {
    if (!user?.isAuthenticated) {
      navigate("/login");
      return;
    }
    if (allowedRoles || !allowedRoles.includes(user.role))
      navigate("/unauthorized");
  }, [allowedRoles, user, navigate]);
  return <>{children}</>;
};
