import { useEffect } from "react";
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
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 920) {
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";
      } else {
        document.body.style.overflow = "";
        document.body.style.height = "";
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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
                <div className="relative w-full mt-28 md:mb-[200px]  max-[1442px]:mb-[300px] max-[920px]:mb-10">
                  <h1 className="text-[5.81rem] font-bold text-white uppercase max-[1442px]:text-[5rem] max-[1025px]:text-[4.5rem] max-[920px]:text-[3.2rem] max-[426px]:text-[2.2rem] max-[384px]:text-[1.9rem]" id="home">MERN STACK</h1>
                  <h1 className="text-[5.81rem] font-bold uppercase text-white/20 max-[1442px]:text-[5rem] max-[1025px]:text-[4.5rem] max-[920px]:text-[3.2rem] max-[426px]:text-[2.2rem] max-[384px]:text-[1.9rem] min-[921px]:absolute min-[921px]:top-[95px] min-[921px]:left-[18.5%] min-[921px]:-translate-x-[20.5%]">DEVELOPER</h1>
                  <p className="text-xl text-[#f4f4f485] mt-4 max-[426px]:text-sm min-[921px]:absolute min-[921px]:top-[215px] min-[921px]:left-[18%] min-[921px]:-translate-x-[20.5%] min-[921px]:mt-0">
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
