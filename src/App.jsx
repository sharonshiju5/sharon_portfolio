import { lazy, Suspense, useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { LoadingProvider, useLoading } from "./hooks/useLoading";
import LoadingScreen from "./components/LoadingScreen";
import { useAuth } from "./hooks/useAuth";

// Lazy load pages
const HomePage = lazy(() => import("./pages/HomePage"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));

// Lazy load admin pages
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminProjects = lazy(() => import("./pages/admin/AdminProjects"));
const AdminProjectForm = lazy(() => import("./pages/admin/AdminProjectForm"));
const AdminProfile = lazy(() => import("./pages/admin/AdminProfile"));
const AdminTools = lazy(() => import("./pages/admin/AdminTools"));

function AdminRoutes() {
  const { isLoggedIn, login, logout } = useAuth();

  if (!isLoggedIn) return <AdminLogin onLogin={login} />;

  return (
    <Routes>
      <Route element={<AdminLayout onLogout={logout} />}>
        <Route index element={<AdminDashboard />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="projects/:id" element={<AdminProjectForm />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="tools" element={<AdminTools />} />
      </Route>
    </Routes>
  );
}

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { allReady } = useLoading();
  const [minTimePassed, setMinTimePassed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMinTimePassed(true), 800);
    return () => clearTimeout(t);
  }, []);

  const showLoading = isHome && (!allReady || !minTimePassed);

  return (
    <div>
      <AnimatePresence mode="wait">
        {showLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {!showLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/admin/*" element={<AdminRoutes />} />
            </Routes>
          </Suspense>
        </motion.div>
      )}
    </div>
  );
}

function App() {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
}

export default App;
