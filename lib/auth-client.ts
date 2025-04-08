// lib/auth-client.ts
"use client";

import { useRouter } from "next/navigation";

// Client-side authentication utilities
export async function login(email: string, password: string) {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Check if the response is JSON before trying to parse it
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`Expected JSON response but got ${contentType}`);
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error: ${response.status}`);
    }

    // If there's a redirectUrl in the response, use it for redirection
    if (data.redirectUrl) {
      window.location.href = data.redirectUrl;
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

// Custom hook for login functionality
export function useLogin() {
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      const data = await login(email, password);

      // If the API returns a redirectUrl, use Next.js router for client-side navigation
      if (data.redirectUrl) {
        router.push(data.redirectUrl);
        router.refresh();
      }

      return data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  return handleLogin;
}

export async function register(userData: any) {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    // Check if the response is JSON before trying to parse it
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`Expected JSON response but got ${contentType}`);
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

export async function logout() {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response is JSON before trying to parse it
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      // If not JSON, just check if the request was successful
      if (response.ok) {
        return { success: true };
      }
      throw new Error(`Expected JSON response but got ${contentType}`);
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}

// Custom hook for logout functionality
export function useLogout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      // Still redirect to login page even if logout API fails
      router.push("/login");
      router.refresh();
    }
  };

  return handleLogout;
}
