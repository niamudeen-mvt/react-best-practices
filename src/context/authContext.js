import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = (children) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const storedUserId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (storedUserId !== null && storedUserId !== undefined) {
      setIsLoggedIn(true);
    }
  }, [storedUserId]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
