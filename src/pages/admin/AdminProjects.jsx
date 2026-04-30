import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../hooks/api";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = () => {
    apiFetch("projects-get?all=true")
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const toggleStatus = async (p) => {
    const newStatus = p.status === "published" ? "draft" : "published";
    await apiFetch("project-status", {
      method: "PUT",
      body: JSON.stringify({ projectId: p.projectId, status: newStatus }),
    });
    load();
  };

  const deleteProject = async (p) => {
    if (!confirm(`Delete "${p.name}"?`)) return;
    await apiFetch(`project-delete?id=${p.projectId}`, { method: "DELETE" });
    load();
  };

  const swapOrder = async (i, direction) => {
    const j = i + direction;
    if (j < 0 || j >= projects.length) return;
    const a = projects[i];
    const b = projects[j];
    await Promise.all([
      apiFetch("project-update", { method: "PUT", body: JSON.stringify({ projectId: a.projectId, order: b.order ?? j }) }),
      apiFetch("project-update", { method: "PUT", body: JSON.stringify({ projectId: b.projectId, order: a.order ?? i }) }),
    ]);
    load();
  };

  if (loading) return <p className="text-white-50">Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold font-outfit">Projects</h1>
        <button
          onClick={() => navigate("/admin/projects/new")}
          className="px-5 py-2.5 bg-purple-accent rounded-lg text-sm font-semibold cursor-pointer hover:bg-purple-deep transition-colors"
        >
          + Add Project
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {projects.map((p, i) => (
          <div key={p.projectId} className="bg-card-bg rounded-xl border border-white-8 p-5 flex items-center gap-4 max-[768px]:flex-col max-[768px]:items-start">
            {/* Order controls */}
            <div className="flex flex-col gap-1 shrink-0">
              <button
                onClick={() => swapOrder(i, -1)}
                disabled={i === 0}
                className="px-2 py-0.5 bg-white-5 rounded text-xs cursor-pointer hover:bg-white-10 disabled:opacity-30 disabled:cursor-not-allowed"
              >▲</button>
              <span className="text-[10px] text-white-40 text-center">{i + 1}</span>
              <button
                onClick={() => swapOrder(i, 1)}
                disabled={i === projects.length - 1}
                className="px-2 py-0.5 bg-white-5 rounded text-xs cursor-pointer hover:bg-white-10 disabled:opacity-30 disabled:cursor-not-allowed"
              >▼</button>
            </div>

            {p.coverImg && (
              <img src={p.coverImg} alt="" className="w-20 h-14 object-cover rounded-lg shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{p.name}</p>
              <p className="text-sm text-white-40">
                {p.category} · {p.year}
                {p.role && <span className="ml-2 text-purple-accent">· {p.role}</span>}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-white-40">
              <span>{p.views || 0} views</span>
              <span>·</span>
              <span>{p.clicks || 0} clicks</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => toggleStatus(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  p.status === "published"
                    ? "bg-green-900/40 text-green-400"
                    : "bg-yellow-900/40 text-yellow-400"
                }`}
              >
                {p.status || "draft"}
              </button>
              <button
                onClick={() => navigate(`/admin/projects/${p.projectId}`)}
                className="px-3 py-1.5 bg-white-5 rounded-lg text-xs cursor-pointer hover:bg-white-10 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProject(p)}
                className="px-3 py-1.5 bg-red-900/30 text-red-400 rounded-lg text-xs cursor-pointer hover:bg-red-900/50 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="text-white-40 text-center py-10">No projects yet</p>}
      </div>
    </div>
  );
}
