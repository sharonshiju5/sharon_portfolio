import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import LoadingScreen from "./components/LoadingScreen";
import HomePage from "./pages/HomePage";
import ProjectDetail from "./pages/ProjectDetail";

// Admin
import { useAuth } from "./hooks/useAuth";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminProjectForm from "./pages/admin/AdminProjectForm";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminTools from "./pages/admin/AdminTools";

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

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  return (
    <div>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Routes>
        </motion.div>
      )}
    </div>
  );
}

export default App;
