import axios from "axios";

const api = axios.create({
  baseURL: "/.netlify/functions",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function apiFetch(endpoint, options = {}) {
  try {
    const { method = "GET", body, headers } = options;
    let data = body;
    if (typeof body === "string") try { data = JSON.parse(body); } catch { /* use as-is */ }
    const res = await api({ url: `/${endpoint}`, method, data, headers });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || "Request failed");
  }
}
