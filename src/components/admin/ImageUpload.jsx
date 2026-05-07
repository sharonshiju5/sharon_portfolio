import { useState } from "react";
import { apiFetch } from "../../hooks/api";
import { imgUrl } from "../../utils/imgUrl";

export { imgUrl };

export default function ImageUpload({ value, onChange, label = "Image", className = "" }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview immediately
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = ev.target.result;
      setPreview(base64);
      setUploading(true);

      try {
        const { id } = await apiFetch("upload-image", {
          method: "POST",
          body: JSON.stringify({ data: base64, name: file.name, type: file.type }),
        });
        onChange(id);
      } catch (err) {
        alert("Upload failed: " + err.message);
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const displaySrc = preview || imgUrl(value);

  return (
    <div className={`flex flex-col gap-1.5 text-sm text-white-60 ${className}`}>
      {label}
      <div className="flex items-center gap-3">
        <label className="px-4 py-2 bg-purple-accent rounded-lg text-white text-sm cursor-pointer hover:bg-purple-deep transition-colors">
          {uploading ? "Uploading..." : "Choose File"}
          <input type="file" accept="image/*,.pdf" onChange={handleFile} className="hidden" disabled={uploading} />
        </label>
        {value && (
          <button type="button" onClick={() => { onChange(""); setPreview(null); }}
            className="text-xs text-red-400 cursor-pointer hover:text-red-300">Remove</button>
        )}
      </div>
      {displaySrc && (
        <img src={displaySrc} alt="preview" className="mt-2 max-h-32 object-contain rounded-lg" />
      )}
    </div>
  );
}

// Multi-image upload for gallery
export function GalleryUpload({ value = [], onChange }) {
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);

    const newIds = [];
    for (const file of files) {
      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (ev) => resolve(ev.target.result);
        reader.readAsDataURL(file);
      });

      try {
        const { id } = await apiFetch("upload-image", {
          method: "POST",
          body: JSON.stringify({ data: base64, name: file.name, type: file.type }),
        });
        newIds.push(id);
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }

    onChange([...value, ...newIds]);
    setUploading(false);
    e.target.value = "";
  };

  const remove = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-1.5 text-sm text-white-60">
      Gallery Images
      <label className="px-4 py-2 bg-purple-accent rounded-lg text-white text-sm cursor-pointer hover:bg-purple-deep transition-colors w-fit">
        {uploading ? "Uploading..." : "+ Add Images"}
        <input type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" disabled={uploading} />
      </label>
      <div className="flex flex-wrap gap-2 mt-2">
        {value.map((id, i) => (
          <div key={i} className="relative group">
            <img src={imgUrl(id)} alt="" className="h-20 w-28 object-cover rounded-lg" />
            <button type="button" onClick={() => remove(i)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
