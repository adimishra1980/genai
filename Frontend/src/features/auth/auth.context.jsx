import { createContext, useContext, useState } from "react";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <authContext.Provider
      value={{ user, setUser, loading, setLoading, error, setError }}
    >
      {children}
    </authContext.Provider>
  );
};
