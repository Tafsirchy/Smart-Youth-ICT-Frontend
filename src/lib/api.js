import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// Attach JWT from NextAuth session on every request
api.interceptors.request.use(async (config) => {
  const session = await getSession();
  const accessToken =
    session?.accessToken || session?.user?.accessToken || session?.user?.token;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Global error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message || "Something went wrong.";
    console.error("[API Error]", message, error?.response?.status);
    return Promise.reject(error);
  },
);

export default api;
