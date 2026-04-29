import jwt from "jsonwebtoken";
import { error } from "./db.mjs";

export function verifyAuth(request) {
  const auth = request.headers.get("authorization");
  if (!auth || !auth.startsWith("Bearer ")) return null;
  try {
    return jwt.verify(auth.split(" ")[1], process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

export function requireAuth(request) {
  const user = verifyAuth(request);
  if (!user) return error("Unauthorized", 401);
  return null;
}

// CORS preflight handler
export function handleOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    },
  });
}
