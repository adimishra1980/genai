import axios from "axios";
import type { User } from "../auth.context.tsx";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

interface AuthResponse {
  message: string;
  user: User;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export const register = async ({
  username,
  email,
  password,
}: RegisterRequest): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/api/v1/auth/register", {
    username,
    email,
    password,
  });

  return response.data;
};

export interface LoginRequest {
  email: string;
  password: string;
}

export const login = async ({
  email,
  password,
}: LoginRequest): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/api/v1/auth/login", {
    email,
    password,
  });

  return response.data;
};

interface LogoutResponse {
  message: string;
}

export const logout = async (): Promise<LogoutResponse> => {
  const response = await api.post<LogoutResponse>("/api/v1/auth/logout");

  return response.data;
};

interface GetMeResponse {
  message: string;
  user: User;
}

export const getMe = async (): Promise<GetMeResponse> => {
  const response = await api.get<GetMeResponse>("/api/v1/auth/get-me");

  return response.data;
};
