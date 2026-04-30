import { useState, useEffect } from "react";
import { apiFetch } from "../../hooks/api";
import ImageUpload, { imgUrl } from "../../components/admin/ImageUpload";

export default function AdminTools() {
  const [tools, setTools] = useState([]);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [iconMode, setIconMode] = useState("upload");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    apiFetch("tools-get?all=true").then(setTools).catch(console.error).finally(() => setLoading(false));
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

  const toggleEnabled = async (tool) => {
    await apiFetch("tool-update", {
      method: "PUT",
      body: JSON.stringify({ _id: tool._id, enabled: !tool.enabled }),
    });
    load();
  };

  const move = async (index, direction) => {
    const newTools = [...tools];
    const swapIndex = index + direction;
    if (swapIndex < 0 || swapIndex >= newTools.length) return;
    [newTools[index], newTools[swapIndex]] = [newTools[swapIndex], newTools[index]];
    setTools(newTools);
    await apiFetch("tools-reorder", {
      method: "PUT",
      body: JSON.stringify({ order: newTools.map((t) => t._id) }),
    });
  };

  if (loading) return <p className="text-white-50">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold font-outfit mb-6">Tools</h1>

      <div className="bg-card-bg rounded-xl border border-white-8 p-5 mb-6 flex flex-col gap-3">
        <input value={name} onChange={(e) => setName(e.target.value)}
          placeholder="Tool name (e.g. React JS)"
          className="h-10 rounded-lg bg-input-bg border border-gray-500 px-4 text-white" />

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
        {tools.map((tool, i) => {
          const src = tool.icon?.startsWith("http") ? tool.icon : imgUrl(tool.icon);
          const disabled = tool.enabled === false;
          return (
            <div key={tool._id} className={`bg-card-bg rounded-xl border border-white-8 p-4 flex items-center gap-3 transition-opacity ${disabled ? "opacity-40" : ""}`}>
              <div className="flex flex-col gap-0.5 shrink-0">
                <button onClick={() => move(i, -1)} disabled={i === 0}
                  className="w-6 h-6 flex items-center justify-center rounded bg-white-5 text-xs cursor-pointer hover:bg-white-10 disabled:opacity-20 disabled:cursor-default transition-colors">▲</button>
                <button onClick={() => move(i, 1)} disabled={i === tools.length - 1}
                  className="w-6 h-6 flex items-center justify-center rounded bg-white-5 text-xs cursor-pointer hover:bg-white-10 disabled:opacity-20 disabled:cursor-default transition-colors">▼</button>
              </div>

              {src && <img src={src} alt="" className="h-8 w-8 object-contain rounded shrink-0" />}
              <span className="flex-1 font-medium min-w-0 truncate">{tool.name}</span>
              <span className="text-xs text-white-40 shrink-0">#{i + 1}</span>

              {/* Enable/Disable toggle */}
              <button onClick={() => toggleEnabled(tool)}
                className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors shrink-0 ${disabled ? "bg-white-10" : "bg-purple-accent"}`}>
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${disabled ? "left-0.5" : "left-[22px]"}`} />
              </button>

              <button onClick={() => handleEdit(tool)}
                className="px-3 py-1.5 bg-white-5 rounded-lg text-xs cursor-pointer hover:bg-white-10 transition-colors shrink-0">Edit</button>
              <button onClick={() => handleDelete(tool)}
                className="px-3 py-1.5 bg-red-900/30 text-red-400 rounded-lg text-xs cursor-pointer hover:bg-red-900/50 transition-colors shrink-0">Delete</button>
            </div>
          );
        })}
        {tools.length === 0 && <p className="text-white-40 text-center py-10">No tools yet</p>}
      </div>
    </div>
  );
}
