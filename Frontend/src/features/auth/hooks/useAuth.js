import { useContext } from "react";
import { authContext } from "../auth.context.jsx";
import { login, register, logout, getMe } from "../services/auth.api.js";
import { useNavigate } from "react-router";
export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, setUser, loading, setLoading, error, setError } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login({ email, password });

      if (data) {
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ email, password, username }) => {
    setError(null);
    setLoading(true);
    try {
      const data = await register({ email, username, password });

      if (data) {
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, handleLogin, handleRegister, handleLogout };
};
