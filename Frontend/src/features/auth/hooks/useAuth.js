import { useContext } from "react";
import { authContext } from "../auth.context.jsx";
import { login, register, logout, getMe } from "../services/auth.api.js";
import { useNavigate } from "react-router";
export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    const data = await login({ email, password });

    if (data) {
      setUser(data.user);
    }
    setLoading(false);
  };

  const handleRegister = async ({ email, password, username }) => {
    const data = await register({ email, username, password });

    if (data) {
      setUser(data.user);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setLoading(false);
  };

  return { user, loading, handleLogin, handleRegister, handleLogout };
};
