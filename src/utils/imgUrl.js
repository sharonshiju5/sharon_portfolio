const API_IMG = "/.netlify/functions/get-image?id=";

export function imgUrl(id) {
  if (!id) return "";
  if (id.startsWith("http") || id.startsWith("data:") || id.startsWith("/")) return id;
  return `${API_IMG}${id}`;
}
