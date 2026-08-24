import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const register = async ({ username, email, password }) => {
  try {
    const response = await api.post("/api/v1/auth/register", {
      username,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await api.post("/api/v1/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/api/v1/auth/logout");

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getMe = async () => {
  try {
    const response = await api.get("/api/v1/auth/get-me");

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
