import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

const PUBLIC_AUTH_PATHS = new Set([
  "/auth/register",
  "/auth/login",
  "/auth/google",
  "/auth/forgot-password",
  "/auth/reset-password",
]);

// Attach JWT from NextAuth session on every request
api.interceptors.request.use(async (config) => {
  const requestPath = config.url || "";
  if (PUBLIC_AUTH_PATHS.has(requestPath)) {
    return config;
  }

  try {
    const session = await getSession();
    const accessToken =
      session?.accessToken ||
      session?.user?.accessToken ||
      session?.user?.token;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  } catch {
    // If NextAuth isn't reachable yet, allow public API calls to proceed.
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
