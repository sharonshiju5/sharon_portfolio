import jwt from "jsonwebtoken";
import { json, error } from "./lib/db.mjs";
import { handleOptions } from "./lib/auth.mjs";

export default async (request) => {
  if (request.method === "OPTIONS") return handleOptions();
  if (request.method !== "POST") return error("Method not allowed", 405);

  const { username, password } = await request.json();
  if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
    return error("Invalid credentials", 401);
  }

  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "24h" });
  return json({ token });
};
