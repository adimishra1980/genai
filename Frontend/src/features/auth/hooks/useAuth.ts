import { useContext } from "react";
import { authContext } from "../auth.context.tsx";
import { login, register, logout } from "../services/auth.api.ts";
import type { LoginRequest, RegisterRequest } from "../services/auth.api.ts";
import axios from "axios";

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, setUser, loading, setLoading, error, setError } = context;

  const handleLogin = async ({
    email,
    password,
  }: LoginRequest): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const data = await login({ email, password });

      if (data) {
        setUser(data.user);
      }
    } catch (error: unknown) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Login failed");
      } else {
        setError("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({
    email,
    password,
    username,
  }: RegisterRequest): Promise<void> => {
    setError(null);
    setLoading(true);
    try {
      const data = await register({ email, username, password });

      if (data) {
        setUser(data.user);
      }
    } catch (error: unknown) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Registration failed");
      } else {
        setError("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await logout();
      setUser(null);
    } catch (error: unknown) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Logout failed");
      } else {
        setError("Logout failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, handleLogin, handleRegister, handleLogout };
};
