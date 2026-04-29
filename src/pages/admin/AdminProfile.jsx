import { useState, useEffect } from "react";
import { apiFetch } from "../../hooks/api";
import ImageUpload from "../../components/admin/ImageUpload";

const empty = {
  name: "", typingTexts: [], location: "", email: "", phone: "",
  github: "", linkedin: "", profileImage: "", cvFile: "",
  heroTitle: "", heroOverlay: "", heroDescription: "",
};

export default function AdminProfile() {
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    apiFetch("profile-get").then((p) => setForm({ ...empty, ...p }));
  }, []);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const addTypingText = () => {
    if (!textInput.trim()) return;
    set("typingTexts", [...form.typingTexts, textInput.trim()]);
    setTextInput("");
  };

  const removeTypingText = (i) => {
    set("typingTexts", form.typingTexts.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { _id, ...data } = form;
      await apiFetch("profile-update", { method: "PUT", body: JSON.stringify(data) });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold font-outfit mb-6">Profile Settings</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-[700px]">
        <label className="flex flex-col gap-1.5 text-sm text-white-60">
          Name
          <input value={form.name} onChange={(e) => set("name", e.target.value)}
            className="h-10 rounded-lg bg-input-bg border border-gray-500 px-4 text-white" />
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-white-60">
          Location
          <input value={form.location} onChange={(e) => set("location", e.target.value)}
            className="h-10 rounded-lg bg-input-bg border border-gray-500 px-4 text-white" />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1.5 text-sm text-white-60">
            Email
            <input value={form.email} onChange={(e) => set("email", e.target.value)}
              className="h-10 rounded-lg bg-input-bg border border-gray-500 px-4 text-white" />
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-white-60">
            Phone
            <input value={form.phone} onChange={(e) => set("phone", e.target.value)}
              className="h-10 rounded-lg bg-input-bg border border-gray-500 px-4 text-white" />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1.5 text-sm text-white-60">
            GitHub URL
            <input value={form.github} onChange={(e) => set("github", e.target.value)}
              className="h-10 rounded-lg bg-input-bg border border-gray-500 px-4 text-white" />
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-white-60">
            LinkedIn URL
            <input value={form.linkedin} onChange={(e) => set("linkedin", e.target.value)}
              className="h-10 rounded-lg bg-input-bg border border-gray-500 px-4 text-white" />
          </label>
        </div>

        {/* Image uploads */}
        <ImageUpload label="Profile Photo" value={form.profileImage} onChange={(id) => set("profileImage", id)} />
        <ImageUpload label="CV / Resume (PDF)" value={form.cvFile} onChange={(id) => set("cvFile", id)} />

        {/* Typing Texts */}
        <div className="flex flex-col gap-1.5 text-sm text-white-60">
          Typing Texts (shown in profile card)
          <div className="flex gap-2">
            <input value={textInput} onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTypingText())}
              placeholder="e.g. Web Developer"
              className="flex-1 h-10 rounded-lg bg-input-bg border border-gray-500 px-4 text-white" />
            <button type="button" onClick={addTypingText}
              className="px-4 bg-purple-accent rounded-lg text-white text-sm cursor-pointer">Add</button>
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            {form.typingTexts.map((t, i) => (
              <span key={i} className="flex items-center gap-1.5 bg-purple-10 text-purple-accent px-3 py-1 rounded-lg text-xs">
                {t}
                <button type="button" onClick={() => removeTypingText(i)} className="text-white-40 hover:text-red-400 cursor-pointer">×</button>
              </span>
            ))}
          </div>
        </div>

        {/* Hero Section */}
        <h2 className="text-lg font-semibold mt-4">Hero Section</h2>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1.5 text-sm text-white-60">
            Hero Title
            <input value={form.heroTitle} onChange={(e) => set("heroTitle", e.target.value)}
              placeholder="MERN STACK"
              className="h-10 rounded-lg bg-input-bg border border-gray-500 px-4 text-white" />
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-white-60">
            Hero Overlay
            <input value={form.heroOverlay} onChange={(e) => set("heroOverlay", e.target.value)}
              placeholder="DEVELOPER"
              className="h-10 rounded-lg bg-input-bg border border-gray-500 px-4 text-white" />
          </label>
        </div>

        <label className="flex flex-col gap-1.5 text-sm text-white-60">
          Hero Description
          <textarea value={form.heroDescription} onChange={(e) => set("heroDescription", e.target.value)} rows={3}
            className="rounded-lg bg-input-bg border border-gray-500 px-4 py-3 text-white resize-none" />
        </label>

        <button type="submit" disabled={saving}
          className="px-6 py-2.5 bg-purple-accent rounded-lg font-semibold cursor-pointer hover:bg-purple-deep transition-colors disabled:opacity-50 w-fit">
          {saving ? "Saving..." : saved ? "✓ Saved!" : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
