import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { getApiBaseUrl } from "./api-base";

const API_BASE_URL = getApiBaseUrl();

const PUBLIC_AUTH_PATHS = new Set([
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
]);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  } catch (err) {
    // If NextAuth isn't reachable yet, allow public API calls to proceed.
    console.warn("[API Interceptor] Auth check failed", err.message);
  }

  return config;
});

// Global error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || "Something went wrong.";

    if (status === 403) {
      toast.error("Access Denied: You don't have permission for this action.");
    } else if (status === 401) {
      // If we get a 401, the session is likely invalid.
      // We don't want to alert on public login pages though.
      const isLoginPage =
        typeof window !== "undefined" &&
        window.location.pathname.includes("/login");
      if (!isLoginPage) {
        toast.error("Session expired. Please sign in again.");
        // signOut({ callbackUrl: '/login' }); // Uncomment to force logout on all 401s
      }
    } else if (status >= 500) {
      toast.error("Server error. Please try again later.");
    }

    console.error("[API Error]", message, status);
    return Promise.reject(error);
  },
);

export default api;
