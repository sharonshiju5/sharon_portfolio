import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";

import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import ProfileCard from "./components/ProfileCard";
import SkillCards from "./components/SkillCards";
import ProjectsSection from "./components/ProjectsSection";
import ThoughtsSection from "./components/ThoughtsSection";
import ToolsSection from "./components/ToolsSection";
import ContactForm from "./components/ContactForm";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
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
          <>
            <div className="noise-overlay"></div>

            {/* Navigation */}
            <Navbar />

            {/* Main Content */}
            <main className="w-full">
              <div className="main-layout">
                {/* Sticky Profile Card */}
                <div className="sidebar-fixed">
                  <ProfileCard />
                </div>

                {/* Scrollable Content */}
                <div className="scroll-area scrollbar-hide">
                  <div className="scroll-inner">
                    {/* Hero Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      viewport={{ once: false, amount: 0.3 }}
                    >
                      <div className="section-title home-section">
                        <h1 className="title-main" id="home">MERN STACK</h1>
                        <h1 className="title-overlay developer-overlay">DEVELOPER</h1>
                        <p className="title-description">
                          Passionate about creating intuitive and engaging user experiences. Specialize in transforming ideas into beautifully crafted products.
                        </p>
                      </div>
                    </motion.div>

                    {/* Skill Cards */}
                    <SkillCards />

                    {/* Projects */}
                    <ProjectsSection />

                    {/* Design Thoughts */}
                    <ThoughtsSection />

                    {/* Tools */}
                    <ToolsSection />

                    {/* Contact Form */}
                    <ContactForm />

                    <ToastContainer />
                  </div>
                </div>
              </div>
            </main>
          </>
        </motion.div>
      )}
    </div>
  );
}

export default App;
