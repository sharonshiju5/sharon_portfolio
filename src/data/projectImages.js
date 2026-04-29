// Auto-imports all images from src/assets/projects/
// Just drop files into the folder — no manual imports needed
//
// Naming convention:
//   cover.png        → used as the project card thumbnail
//   1.png, 2.png ... → gallery images (sorted by filename)

const allImages = import.meta.glob(
  "../assets/projects/**/*.{png,jpg,jpeg,webp,svg,gif}",
  { eager: true }
);

// Group images by project folder
const imagesByProject = {};
for (const [path, mod] of Object.entries(allImages)) {
  // path looks like: ../assets/projects/ecommerce/cover.png
  const parts = path.split("/");
  const projectId = parts[parts.length - 2];
  const fileName = parts[parts.length - 1];
  if (!imagesByProject[projectId]) imagesByProject[projectId] = {};
  imagesByProject[projectId][fileName] = mod.default;
}

export function getCover(id) {
  const imgs = imagesByProject[id];
  if (!imgs) return "";
  // Find any file starting with "cover"
  const coverKey = Object.keys(imgs).find((k) => k.startsWith("cover"));
  return coverKey ? imgs[coverKey] : Object.values(imgs)[0] || "";
}

export function getGallery(id) {
  const imgs = imagesByProject[id];
  if (!imgs) return [];
  // Return all non-cover images, sorted by filename
  return Object.entries(imgs)
    .filter(([k]) => !k.startsWith("cover"))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, v]) => v);
}
