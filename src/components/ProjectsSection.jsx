import { useState } from "react";
import { motion } from "framer-motion";
import project from "../assets/project.png";
import chatapp from "../assets/chatapplication.png";

const projects = [
  {
    id: 'ecommerce',
    name: 'E-comerce',
    link: 'https://github.com/sharonshiju5/e-comerce_project',
    originalImg: "https://img.freepik.com/free-photo/project-management-planning-development-message-box-notification-graphic_53876-123902.jpg?t=st=1739350068~exp=1739353668~hmac=4cb46d19698569abd104a66ab7512ef66cf6c4977c71fa04b2ce4d35d5737ba3&w=996",
    hoverImg: project,
  },
  {
    id: 'chat',
    name: 'Chat application',
    link: 'https://github.com/sharonshiju5/chatapplication',
    originalImg: "https://img.freepik.com/free-photo/project-management-planning-development-message-box-notification-graphic_53876-123902.jpg?t=st=1739350068~exp=1739353668~hmac=4cb46d19698569abd104a66ab7512ef66cf6c4977c71fa04b2ce4d35d5737ba3&w=996",
    hoverImg: chatapp,
  },
];

function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="section-title" style={{ marginTop: "70px" }}>
          <h1 className="title-main" id="projects">RECENT</h1>
          <h1 className="title-overlay" style={{ left: "16%" }}>PROJECTS</h1>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="w-full p-[10px]" style={{ height: "45vh" }}>
          <div className="flex w-full flex-wrap justify-between gap-[10px]" style={{ height: "40vh" }}>
            {projects.map((proj) => (
              <a href={proj.link} key={proj.id}>
                <div
                  className="relative mb-5 overflow-hidden rounded-[20px] bg-project-card hover:bg-hover-card"
                  style={{ width: "320px", height: "40vh" }}
                  onMouseEnter={() => setHoveredProject(proj.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="relative h-[75%] w-full overflow-hidden">
                    <img
                      src={proj.originalImg}
                      alt=""
                      className="h-full w-full rounded-t-[20px] object-cover"
                    />
                    <motion.div
                      initial={{ x: '100%' }}
                      animate={{ x: hoveredProject === proj.id ? '0%' : '100%' }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute left-0 top-0 h-full w-full"
                    >
                      <img
                        src={proj.hoverImg}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </motion.div>
                  </div>
                  <div className="mx-auto w-[90%] p-[17px]" style={{ height: "48px" }}>
                    <h3 className="text-[30px] capitalize">{proj.name}</h3>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default ProjectsSection;
