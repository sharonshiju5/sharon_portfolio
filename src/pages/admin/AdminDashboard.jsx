import { useState, useEffect } from "react";
import { apiFetch } from "../../hooks/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    apiFetch("analytics-get").then(setStats).catch(console.error);
  }, []);

  if (!stats) return <p className="text-white-50">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold font-outfit mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 max-[768px]:grid-cols-1">
        <div className="bg-card-bg rounded-xl p-6 border border-white-8">
          <p className="text-white-40 text-sm">Total Projects</p>
          <p className="text-3xl font-bold mt-2">{stats.totalProjects}</p>
        </div>
        <div className="bg-card-bg rounded-xl p-6 border border-white-8">
          <p className="text-white-40 text-sm">Total Tools</p>
          <p className="text-3xl font-bold mt-2">{stats.totalTools}</p>
        </div>
        <div className="bg-card-bg rounded-xl p-6 border border-white-8">
          <p className="text-white-40 text-sm">Visitors (30 days)</p>
          <p className="text-3xl font-bold mt-2">{stats.totalVisitors}</p>
        </div>
      </div>

      {stats.analytics.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="bg-card-bg rounded-xl border border-white-8 overflow-hidden">
            {stats.analytics.slice(0, 10).map((day) => (
              <div key={day.date} className="flex justify-between px-5 py-3 border-b border-white-5 last:border-0">
                <span className="text-white-60 text-sm">{day.date}</span>
                <span className="text-sm font-medium">{day.visitors || 0} visitors</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
