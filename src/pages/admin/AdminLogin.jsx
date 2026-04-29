import { useState } from "react";

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await onLogin(username, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-[360px] bg-card-bg rounded-2xl p-8 flex flex-col gap-5">
        <h1 className="text-2xl font-bold font-outfit text-center">Admin Login</h1>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="h-11 rounded-lg bg-input-bg border border-gray-500 px-4 text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-11 rounded-lg bg-input-bg border border-gray-500 px-4 text-white"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="h-11 rounded-lg bg-purple-accent font-semibold cursor-pointer hover:bg-purple-deep transition-colors disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
