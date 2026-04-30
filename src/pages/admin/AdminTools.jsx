import { useState, useEffect } from "react";
import { apiFetch } from "../../hooks/api";
import ImageUpload, { imgUrl } from "../../components/admin/ImageUpload";

export default function AdminTools() {
  const [tools, setTools] = useState([]);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [iconMode, setIconMode] = useState("upload"); // "upload" or "url"
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    apiFetch("tools-get").then(setTools).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleAdd = async () => {
    if (!name.trim()) return;
    if (editId) {
      await apiFetch("tool-update", { method: "PUT", body: JSON.stringify({ _id: editId, name, icon }) });
      setEditId(null);
    } else {
      await apiFetch("tool-create", { method: "POST", body: JSON.stringify({ name, icon }) });
    }
    setName("");
    setIcon("");
    load();
  };

  const handleEdit = (tool) => {
    setEditId(tool._id);
    setName(tool.name);
    setIcon(tool.icon || "");
    setIconMode(tool.icon?.startsWith("http") ? "url" : "upload");
  };

  const handleDelete = async (tool) => {
    if (!confirm(`Delete "${tool.name}"?`)) return;
    await apiFetch(`tool-delete?id=${tool._id}`, { method: "DELETE" });
    load();
  };

  const handleCancel = () => {
    setEditId(null);
    setName("");
    setIcon("");
  };

  if (loading) return <p className="text-white-50">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold font-outfit mb-6">Tools</h1>

      <div className="bg-card-bg rounded-xl border border-white-8 p-5 mb-6 flex flex-col gap-3">
        <input value={name} onChange={(e) => setName(e.target.value)}
          placeholder="Tool name (e.g. React JS)"
          className="h-10 rounded-lg bg-input-bg border border-gray-500 px-4 text-white" />

        {/* Toggle between upload and URL */}
        <div className="flex gap-2">
          <button type="button" onClick={() => { setIconMode("upload"); setIcon(""); }}
            className={`px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${iconMode === "upload" ? "bg-purple-accent text-white" : "bg-white-5 text-white-60"}`}>
            Upload Image
          </button>
          <button type="button" onClick={() => { setIconMode("url"); setIcon(""); }}
            className={`px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${iconMode === "url" ? "bg-purple-accent text-white" : "bg-white-5 text-white-60"}`}>
            Paste URL
          </button>
        </div>

        {iconMode === "upload" ? (
          <ImageUpload label="Tool Icon" value={icon} onChange={setIcon} />
        ) : (
          <div className="flex flex-col gap-1.5 text-sm text-white-60">
            Icon URL
            <input value={icon} onChange={(e) => setIcon(e.target.value)}
              placeholder="https://cdn-icons-png.flaticon.com/..."
              className="h-10 rounded-lg bg-input-bg border border-gray-500 px-4 text-white" />
            {icon && <img src={icon} alt="preview" className="mt-2 h-10 w-10 object-contain rounded" />}
          </div>
        )}

        <div className="flex gap-2">
          <button onClick={handleAdd}
            className="px-5 py-2 bg-purple-accent rounded-lg text-sm font-semibold cursor-pointer hover:bg-purple-deep transition-colors">
            {editId ? "Update" : "Add Tool"}
          </button>
          {editId && (
            <button onClick={handleCancel}
              className="px-5 py-2 bg-white-5 rounded-lg text-sm cursor-pointer hover:bg-white-10 transition-colors">
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {tools.map((tool) => {
          const src = tool.icon?.startsWith("http") ? tool.icon : imgUrl(tool.icon);
          return (
            <div key={tool._id} className="bg-card-bg rounded-xl border border-white-8 p-4 flex items-center gap-4">
              {src && <img src={src} alt="" className="h-8 w-8 object-contain rounded" />}
              <span className="flex-1 font-medium">{tool.name}</span>
              <button onClick={() => handleEdit(tool)}
                className="px-3 py-1.5 bg-white-5 rounded-lg text-xs cursor-pointer hover:bg-white-10 transition-colors">
                Edit
              </button>
              <button onClick={() => handleDelete(tool)}
                className="px-3 py-1.5 bg-red-900/30 text-red-400 rounded-lg text-xs cursor-pointer hover:bg-red-900/50 transition-colors">
                Delete
              </button>
            </div>
          );
        })}
        {tools.length === 0 && <p className="text-white-40 text-center py-10">No tools yet</p>}
      </div>
    </div>
  );
}
