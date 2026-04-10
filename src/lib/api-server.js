import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/**
 * Server-side API fetcher for React Server Components.
 * Handles automatic absolute URL resolution and Auth header injection via getServerSession.
 */
export async function fetchServer(path, options = {}) {
  const session = await getServerSession(authOptions);
  const token = session?.user?.accessToken || session?.accessToken;

  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
    // Next.js specific caching options can be passed in options.next
    next: { 
      revalidate: options.revalidate !== undefined ? options.revalidate : 3600, // Default 1 hour
      ...options.next
    }
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Request failed with status ${response.status}`);
  }

  return response.json();
}
