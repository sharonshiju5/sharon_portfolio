import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";

import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";
import SkillCards from "../components/SkillCards";
import ProjectsSection from "../components/ProjectsSection";
import ThoughtsSection from "../components/ThoughtsSection";
import ToolsSection from "../components/ToolsSection";
import ContactForm from "../components/ContactForm";

function HomePage() {
  return (
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
  );
}

export default HomePage;
