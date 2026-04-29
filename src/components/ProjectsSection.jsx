import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import projectsData from "../data/projectsData";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const navigate = useNavigate();

  const handleProjectClick = (e, projectId) => {
    e.preventDefault();
    navigate(`/project/${projectId}`);
  };

  return (
    <>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="section-title mt-[70px] max-[920px]:mt-[40px]">
          <h1 className="title-main" id="projects">RECENT</h1>
          <h1 className="title-overlay max-[920px]:!left-[4%]" style={{ left: "16%" }}>PROJECTS</h1>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        className="grid grid-cols-2 gap-5 p-2.5 mb-16 max-[640px]:grid-cols-1"
      >
        {projectsData.map((proj, index) => (
          <motion.div
            key={proj.id}
            variants={cardVariants}
            className="cursor-pointer"
            onClick={(e) => handleProjectClick(e, proj.id)}
            onMouseEnter={() => setHoveredProject(proj.id)}
            onMouseLeave={() => setHoveredProject(null)}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <div
              id={`project-card-${proj.id}`}
              className="overflow-hidden rounded-2xl border border-white-5 bg-project-card transition-all duration-400 hover:border-purple-30 hover:shadow-[0_8px_32px_rgba(145,75,241,0.1),0_0_0_1px_rgba(145,75,241,0.15)]"
            >
              {/* Image Area */}
              <div className="relative h-[200px] w-full overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] max-[640px]:h-[180px]">
                {/* Bottom gradient */}
                <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-transparent to-dark-bg/40" />

                {/* Image (visible on hover) */}
                <motion.div
                  className="absolute inset-0 z-[1]"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{
                    opacity: hoveredProject === proj.id ? 1 : 0,
                    scale: hoveredProject === proj.id ? 1 : 1.1,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <img
                    src={proj.coverImg}
                    alt={proj.name}
                    className="h-full w-full object-cover"
                  />
                </motion.div>

                {/* Default state — number + icon */}
                <motion.div
                  className="absolute inset-0 z-[3] flex flex-col justify-between p-5"
                  animate={{ opacity: hoveredProject === proj.id ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="font-outfit text-5xl font-black leading-none text-white/[0.08]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center self-end rounded-full border border-purple-30 bg-purple-15">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-accent">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </div>
                </motion.div>

                {/* Hover label */}
                <motion.div
                  className="absolute bottom-5 left-5 z-[4] flex items-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: hoveredProject === proj.id ? 1 : 0,
                    y: hoveredProject === proj.id ? 0 : 20,
                  }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <span className="text-[13px] font-semibold uppercase tracking-[1.5px] text-white">
                    View Project
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-accent">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </motion.div>
              </div>

              {/* Card Info */}
              <div className="px-5 pb-5 pt-4">
                <div className="mb-2 flex items-center gap-2.5">
                  <span className="rounded bg-purple-10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[1.2px] text-purple-accent">
                    {proj.category}
                  </span>
                  <span className="text-[11px] font-medium text-white-35">
                    {proj.year}
                  </span>
                </div>
                <h3 className="mb-1 font-outfit text-lg font-bold text-white">
                  {proj.name}
                </h3>
                <p className="text-[13px] leading-relaxed text-white-40">
                  {proj.shortDesc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}

export default ProjectsSection;
