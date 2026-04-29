import { useState, useEffect } from "react";
import { apiFetch } from "./api";

export function useAuth() {
  const [token, setToken] = useState(localStorage.getItem("admin_token"));
  const isLoggedIn = !!token;

  const login = async (username, password) => {
    const data = await apiFetch("auth-login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    localStorage.setItem("admin_token", data.token);
    setToken(data.token);
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
  };

  useEffect(() => {
    if (!token) return;
    // Verify token is still valid
    apiFetch("analytics-get").catch(() => {
      localStorage.removeItem("admin_token");
      setToken(null);
    });
  }, [token]);

  return { isLoggedIn, login, logout };
}
