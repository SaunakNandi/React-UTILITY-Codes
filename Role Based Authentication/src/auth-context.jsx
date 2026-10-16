import { createContext, useState } from "react";

export const AuthProvider = createContext(null);

export const AuthContext = ({ children }) => {
  const [userData, setUserData] = useState({
    id: "123",
    name: "Saunak",
    Permissions: ["invoice:view", "user:invite"],
  });
  return (
    <AuthProvider.Provider value={{ userData, setUserData }}>
      {children}
    </AuthProvider.Provider>
  );
};
