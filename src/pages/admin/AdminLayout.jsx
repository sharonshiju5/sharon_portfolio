import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout({ onLogout }) {
  const links = [
    { to: "/admin", label: "Dashboard", end: true },
    { to: "/admin/projects", label: "Projects" },
    { to: "/admin/profile", label: "Profile" },
    { to: "/admin/tools", label: "Tools" },
  ];

  return (
    <div className="min-h-screen bg-dark-bg flex">
      {/* Sidebar */}
      <aside className="w-[220px] bg-card-bg border-r border-white-8 p-5 flex flex-col gap-2 shrink-0 max-[768px]:w-[60px] max-[768px]:p-2">
        <h2 className="text-lg font-bold font-outfit mb-4 max-[768px]:hidden">Admin</h2>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? "bg-purple-accent text-white" : "text-white-60 hover:bg-white-5"
              } max-[768px]:px-2 max-[768px]:text-xs max-[768px]:text-center`
            }
          >
            {link.label}
          </NavLink>
        ))}
        <button
          onClick={onLogout}
          className="mt-auto px-4 py-2.5 rounded-lg text-sm text-red-400 hover:bg-white-5 cursor-pointer transition-colors max-[768px]:px-2 max-[768px]:text-xs"
        >
          Logout
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 overflow-y-auto max-[768px]:p-4">
        <Outlet />
      </main>
    </div>
  );
}
