import React, { createContext, ReactNode, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { getMe } from "./services/auth.api.ts";

export interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const authContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await getMe();

        setUser(data.user);
        setError(null);
      } catch (error: unknown) {
        setUser(null);

        if (error instanceof AxiosError) {
          setError(error.response?.data?.message || "Authentication failed");
        } else {
          setError("Authentication failed");
        }
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
