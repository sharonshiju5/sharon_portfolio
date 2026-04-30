import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiFetch } from "../../hooks/api";
import ImageUpload, { GalleryUpload, imgUrl } from "../../components/admin/ImageUpload";

const empty = {
  projectId: "", name: "", shortDesc: "", category: "", year: "",
  coverImg: "", gallery: [], techStack: [], description: "",
  features: [], challenges: "", githubLink: "", liveLink: "", status: "draft",
  role: "Full Stack",
};

export default function AdminProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id && id !== "new";
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState({ tech: "", feature: "" });

  useEffect(() => {
    if (isEdit) {
      apiFetch(`project-get?id=${id}`).then((p) => setForm({ ...empty, ...p }));
    }
  }, [id, isEdit]);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const addToArray = (key, inputKey) => {
    const val = tagInput[inputKey]?.trim();
    if (!val) return;
    set(key, [...form[key], val]);
    setTagInput((t) => ({ ...t, [inputKey]: "" }));
  };

  const removeFromArray = (key, index) => {
    set(key, form[key].filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEdit) {
        await apiFetch("project-update", { method: "PUT", body: JSON.stringify(form) });
      } else {
        const slug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        await apiFetch("project-create", { method: "POST", body: JSON.stringify({ ...form, projectId: slug }) });
      }
      navigate("/admin/projects");
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold font-outfit mb-6">{isEdit ? "Edit Project" : "New Project"}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-[700px]">
        <label className="flex flex-col gap-1.5 text-sm text-white-60">
          Name
          <input value={form.name} onChange={(e) => set("name", e.target.value)} required
            className="h-10 rounded-lg bg-input-bg border border-gray-500 px-4 text-white" />
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-white-60">
          Short Description
          <input value={form.shortDesc} onChange={(e) => set("shortDesc", e.target.value)}
            className="h-10 rounded-lg bg-input-bg border border-gray-500 px-4 text-white" />
        </label>

        <div className="grid grid-cols-3 gap-4">
          <label className="flex flex-col gap-1.5 text-sm text-white-60">
            Category
            <input value={form.category} onChange={(e) => set("category", e.target.value)}
              className="h-10 rounded-lg bg-input-bg border border-gray-500 px-4 text-white" />
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-white-60">
            Year
            <input value={form.year} onChange={(e) => set("year", e.target.value)}
              className="h-10 rounded-lg bg-input-bg border border-gray-500 px-4 text-white" />
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-white-60">
            My Role
            <select value={form.role || "Full Stack"} onChange={(e) => set("role", e.target.value)}
              className="h-10 rounded-lg bg-input-bg border border-gray-500 px-4 text-white">
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Full Stack">Full Stack</option>
            </select>
          </label>
        </div>

        <label className="flex flex-col gap-1.5 text-sm text-white-60">
          Description
          <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={4}
            className="rounded-lg bg-input-bg border border-gray-500 px-4 py-3 text-white resize-none" />
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-white-60">
          Challenges
          <textarea value={form.challenges} onChange={(e) => set("challenges", e.target.value)} rows={3}
            className="rounded-lg bg-input-bg border border-gray-500 px-4 py-3 text-white resize-none" />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1.5 text-sm text-white-60">
            GitHub Link
            <input value={form.githubLink} onChange={(e) => set("githubLink", e.target.value)}
              className="h-10 rounded-lg bg-input-bg border border-gray-500 px-4 text-white" />
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-white-60">
            Live Link
            <input value={form.liveLink} onChange={(e) => set("liveLink", e.target.value)}
              className="h-10 rounded-lg bg-input-bg border border-gray-500 px-4 text-white" />
          </label>
        </div>

        {/* Cover Image Upload */}
        <ImageUpload label="Cover Image" value={form.coverImg} onChange={(id) => set("coverImg", id)} />

        {/* Gallery Upload with reorder */}
        <GalleryUpload value={form.gallery} onChange={(ids) => set("gallery", ids)} />
        {form.gallery.length > 1 && (
          <div className="flex flex-col gap-1.5 text-sm text-white-60">
            Reorder Gallery (drag or use arrows)
            <div className="flex flex-wrap gap-2">
              {form.gallery.map((img, i) => (
                <div key={i} className="relative flex flex-col items-center gap-1">
                  <img src={imgUrl(img)} alt="" className="h-16 w-24 object-cover rounded-lg border border-white-8" />
                  <div className="flex gap-1">
                    <button type="button" disabled={i === 0}
                      onClick={() => {
                        const g = [...form.gallery];
                        [g[i - 1], g[i]] = [g[i], g[i - 1]];
                        set("gallery", g);
                      }}
                      className="px-1.5 py-0.5 bg-white-5 rounded text-[10px] cursor-pointer hover:bg-white-10 disabled:opacity-30 disabled:cursor-not-allowed">←</button>
                    <span className="text-[10px] text-white-40 py-0.5">{i + 1}</span>
                    <button type="button" disabled={i === form.gallery.length - 1}
                      onClick={() => {
                        const g = [...form.gallery];
                        [g[i], g[i + 1]] = [g[i + 1], g[i]];
                        set("gallery", g);
                      }}
                      className="px-1.5 py-0.5 bg-white-5 rounded text-[10px] cursor-pointer hover:bg-white-10 disabled:opacity-30 disabled:cursor-not-allowed">→</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-col gap-1.5 text-sm text-white-60">
          Tech Stack
          <div className="flex gap-2">
            <input value={tagInput.tech} onChange={(e) => setTagInput((t) => ({ ...t, tech: e.target.value }))}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addToArray("techStack", "tech"))}
              placeholder="Type and press Enter"
              className="flex-1 h-10 rounded-lg bg-input-bg border border-gray-500 px-4 text-white" />
            <button type="button" onClick={() => addToArray("techStack", "tech")}
              className="px-4 bg-purple-accent rounded-lg text-white text-sm cursor-pointer">Add</button>
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            {form.techStack.map((t, i) => (
              <span key={i} className="flex items-center gap-1.5 bg-purple-10 text-purple-accent px-3 py-1 rounded-lg text-xs">
                {t}
                <button type="button" onClick={() => removeFromArray("techStack", i)} className="text-white-40 hover:text-red-400 cursor-pointer">×</button>
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-col gap-1.5 text-sm text-white-60">
          Features
          <div className="flex gap-2">
            <input value={tagInput.feature} onChange={(e) => setTagInput((t) => ({ ...t, feature: e.target.value }))}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addToArray("features", "feature"))}
              placeholder="Type and press Enter"
              className="flex-1 h-10 rounded-lg bg-input-bg border border-gray-500 px-4 text-white" />
            <button type="button" onClick={() => addToArray("features", "feature")}
              className="px-4 bg-purple-accent rounded-lg text-white text-sm cursor-pointer">Add</button>
          </div>
          <div className="flex flex-col gap-1 mt-1">
            {form.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2 bg-white-5 px-3 py-2 rounded-lg text-sm">
                <span className="flex-1">{f}</span>
                <button type="button" onClick={() => removeFromArray("features", i)} className="text-white-40 hover:text-red-400 cursor-pointer">×</button>
              </div>
            ))}
          </div>
        </div>

        {/* Status */}
        <label className="flex flex-col gap-1.5 text-sm text-white-60">
          Status
          <select value={form.status} onChange={(e) => set("status", e.target.value)}
            className="h-10 rounded-lg bg-input-bg border border-gray-500 px-4 text-white">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>

        <div className="flex gap-3 mt-2">
          <button type="submit" disabled={saving}
            className="px-6 py-2.5 bg-purple-accent rounded-lg font-semibold cursor-pointer hover:bg-purple-deep transition-colors disabled:opacity-50">
            {saving ? "Saving..." : isEdit ? "Update" : "Create"}
          </button>
          <button type="button" onClick={() => navigate("/admin/projects")}
            className="px-6 py-2.5 bg-white-5 rounded-lg cursor-pointer hover:bg-white-10 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
