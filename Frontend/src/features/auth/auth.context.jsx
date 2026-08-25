import { createContext, useEffect, useState } from "react";
import { getMe } from "./services/auth.api";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await getMe();

        setUser(data.user);
        setError(null);
      } catch (error) {
        setUser(null);
        setError(error.response?.data?.message || "Authentication failed");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return (
    <authContext.Provider
      value={{ user, setUser, loading, setLoading, error, setError }}
    >
      {children}
    </authContext.Provider>
  );
};
