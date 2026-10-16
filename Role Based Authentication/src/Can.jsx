import { usePermission } from "./use-permission";

const Can = ({ permission, children }) => {
  const isPermitted = usePermission(permission);
  if (!isPermitted) return null;
  return <>{children}</>;
};

export default Can;
