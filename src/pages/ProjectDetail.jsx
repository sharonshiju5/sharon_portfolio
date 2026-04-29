import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import projectsData from "../data/projectsData";

/* ─── Animation Variants ─── */
const pageVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.6, staggerChildren: 0.12, delayChildren: 0.3 },
  },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeLeft = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeRight = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.85 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08 } },
};

const listItem = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);

  const project = projectsData.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  /* ─── 404 ─── */
  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark-bg text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-3 font-outfit text-4xl font-extrabold">Project Not Found</h1>
          <p className="mb-8 text-base text-white-50">The project you&apos;re looking for doesn&apos;t exist.</p>
          <button
            onClick={() => navigate("/")}
            className="cursor-pointer rounded-lg bg-purple-accent px-7 py-3 text-[15px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-purple-deep"
          >
            ← Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  /* ─── Adjacent Projects ─── */
  const currentIndex = projectsData.findIndex((p) => p.id === id);
  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="relative min-h-screen overflow-x-hidden bg-dark-bg"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        key={id}
      >
        {/* Noise overlay */}
        <div className="noise-overlay" />

        {/* ─── Floating Back Button ─── */}
        <motion.button
          id="back-to-home-btn"
          className="fixed left-7 top-7 z-[100] flex cursor-pointer items-center gap-2.5 rounded-full border border-white-8 bg-glass-bg px-5 py-2.5 backdrop-blur-xl transition-all duration-300 hover:border-purple-30 hover:bg-purple-15 max-[480px]:left-4 max-[480px]:top-4 max-[480px]:px-4 max-[480px]:py-2"
          onClick={() => navigate("/")}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.05, x: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-accent">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span className="text-sm font-semibold tracking-wide text-white">Back</span>
        </motion.button>

        {/* ═══════════════════════════════════════════════
            HERO SECTION
           ═══════════════════════════════════════════════ */}
        <section className="mx-auto grid max-w-[1100px] grid-cols-2 items-center gap-15 px-10 pt-[120px] pb-15 max-[920px]:grid-cols-1 max-[920px]:gap-10 max-[920px]:px-6 max-[920px]:pt-[100px] max-[920px]:pb-10">
          {/* Left — Info */}
          <div className="flex flex-col gap-5">
            {/* Badges */}
            <motion.div className="flex items-center gap-3" variants={fadeUp}>
              <span className="rounded-md border border-purple-20 bg-purple-12 px-4 py-1.5 text-xs font-bold uppercase tracking-[2px] text-purple-accent">
                {project.category}
              </span>
              <span className="rounded-md bg-white-5 px-3.5 py-1.5 text-xs font-medium text-white-40">
                {project.year}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="bg-gradient-to-br from-white to-white/70 bg-clip-text font-outfit text-[3.2rem] font-black leading-[1.1] text-transparent max-[920px]:text-[2.4rem] max-[480px]:text-[1.8rem]"
              variants={fadeUp}
            >
              {project.name}
            </motion.h1>

            {/* Description */}
            <motion.p className="max-w-[480px] text-[17px] leading-[1.7] text-white-55" variants={fadeUp}>
              {project.shortDesc}
            </motion.p>

            {/* Action Buttons */}
            <motion.div className="mt-2 flex flex-wrap gap-3.5" variants={fadeUp}>
              {project.githubLink && (
                <a
                  id="github-link-btn"
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-[10px] bg-purple-accent px-6 py-3 text-sm font-semibold text-white no-underline transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-deep hover:shadow-[0_8px_24px_rgba(145,75,241,0.3)]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View on GitHub
                </a>
              )}
              {project.liveLink && (
                <a
                  id="live-demo-btn"
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-[10px] border border-white-12 bg-white-6 px-6 py-3 text-sm font-semibold text-white no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-white-20 hover:bg-white-10"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Live Demo
                </a>
              )}
            </motion.div>
          </div>

          {/* Right — Hero Image */}
          <motion.div className="relative overflow-hidden rounded-[20px]" variants={scaleIn}>
            <div className="absolute -inset-[20%] z-0 blur-[40px] animate-glow-pulse bg-[radial-gradient(ellipse_at_center,rgba(145,75,241,0.15)_0%,transparent_70%)]" />
            <img
              src={project.coverImg}
              alt={project.name}
              className="relative z-[1] h-[350px] w-full rounded-[20px] object-cover max-[920px]:h-[280px] max-[480px]:h-[220px]"
            />
            <div className="pointer-events-none absolute inset-0 z-[2] rounded-[20px] border border-white-8" />
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════
            01 — TECH STACK
           ═══════════════════════════════════════════════ */}
        <motion.section
          className="mx-auto max-w-[1100px] px-10 py-15 max-[920px]:px-6 max-[920px]:py-10"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2 className="mb-8 flex items-center gap-4 font-outfit text-[1.8rem] font-extrabold max-[480px]:text-[1.4rem]" variants={fadeUp}>
            <span className="rounded-md bg-purple-10 px-3 py-1 font-montserrat text-sm font-bold tracking-wide text-purple-accent">01</span>
            Tech Stack
          </motion.h2>
          <motion.div className="flex flex-wrap gap-3" variants={staggerContainer}>
            {project.techStack.map((tech) => (
              <motion.div
                key={tech}
                className="flex cursor-default items-center gap-2.5 rounded-xl border border-white-8 bg-white-4 px-5 py-3 text-sm font-medium text-white-80 transition-all duration-300 hover:border-purple-30 hover:bg-purple-10"
                variants={listItem}
                whileHover={{ scale: 1.08 }}
              >
                <span className="h-2 w-2 rounded-full bg-purple-accent shadow-[0_0_8px_rgba(145,75,241,0.5)]" />
                {tech}
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ═══════════════════════════════════════════════
            02 — ABOUT
           ═══════════════════════════════════════════════ */}
        <motion.section
          className="mx-auto max-w-[1100px] px-10 py-15 max-[920px]:px-6 max-[920px]:py-10"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 className="mb-8 flex items-center gap-4 font-outfit text-[1.8rem] font-extrabold max-[480px]:text-[1.4rem]" variants={fadeUp}>
            <span className="rounded-md bg-purple-10 px-3 py-1 font-montserrat text-sm font-bold tracking-wide text-purple-accent">02</span>
            About This Project
          </motion.h2>
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-white-6 bg-white-3 p-8 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:rounded-l before:bg-gradient-to-b before:from-purple-accent before:to-purple-10"
            variants={fadeUp}
          >
            <p className="pl-5 text-base leading-[1.8] text-white-60">{project.description}</p>
          </motion.div>
        </motion.section>

        {/* ═══════════════════════════════════════════════
            03 — FEATURES
           ═══════════════════════════════════════════════ */}
        <motion.section
          className="mx-auto max-w-[1100px] px-10 py-15 max-[920px]:px-6 max-[920px]:py-10"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.h2 className="mb-8 flex items-center gap-4 font-outfit text-[1.8rem] font-extrabold max-[480px]:text-[1.4rem]" variants={fadeUp}>
            <span className="rounded-md bg-purple-10 px-3 py-1 font-montserrat text-sm font-bold tracking-wide text-purple-accent">03</span>
            Key Features
          </motion.h2>
          <motion.div className="grid grid-cols-2 gap-3.5 max-[920px]:grid-cols-1" variants={staggerContainer}>
            {project.features.map((feature, i) => (
              <motion.div
                key={i}
                className="flex cursor-default items-start gap-3.5 rounded-xl border border-white-5 bg-white-3 px-5 py-[18px] transition-all duration-300 hover:border-purple-20 hover:bg-white-5"
                variants={listItem}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-12">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-purple-accent">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="pt-1 text-sm leading-relaxed text-white-65">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ═══════════════════════════════════════════════
            04 — GALLERY
           ═══════════════════════════════════════════════ */}
        {project.gallery && project.gallery.length > 0 && (
          <motion.section
            className="mx-auto max-w-[1100px] px-10 py-15 max-[920px]:px-6 max-[920px]:py-10"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2 className="mb-8 flex items-center gap-4 font-outfit text-[1.8rem] font-extrabold max-[480px]:text-[1.4rem]" variants={fadeUp}>
              <span className="rounded-md bg-purple-10 px-3 py-1 font-montserrat text-sm font-bold tracking-wide text-purple-accent">04</span>
              Project Gallery
            </motion.h2>
            <motion.div className="flex flex-col gap-4" variants={scaleIn}>
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-[20px] border border-white-6">
                <motion.img
                  key={activeImage}
                  src={project.gallery[activeImage]}
                  alt={`${project.name} screenshot ${activeImage + 1}`}
                  className="block h-[450px] w-full object-cover max-[920px]:h-[300px] max-[480px]:h-[220px]"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-bg/50" />
              </div>

              {/* Thumbnails */}
              {project.gallery.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {project.gallery.map((img, i) => (
                    <motion.button
                      key={i}
                      className={`h-[60px] w-[80px] shrink-0 cursor-pointer overflow-hidden rounded-[10px] border-2 p-0 transition-all duration-300 ${
                        activeImage === i
                          ? "border-purple-accent shadow-[0_0_12px_rgba(145,75,241,0.3)]"
                          : "border-white-8"
                      }`}
                      style={{ background: "none" }}
                      onClick={() => setActiveImage(i)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img src={img} alt={`Thumbnail ${i + 1}`} className="h-full w-full object-cover" />
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.section>
        )}

        {/* ═══════════════════════════════════════════════
            05 — CHALLENGES
           ═══════════════════════════════════════════════ */}
        {project.challenges && (
          <motion.section
            className="mx-auto max-w-[1100px] px-10 py-15 max-[920px]:px-6 max-[920px]:py-10"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2 className="mb-8 flex items-center gap-4 font-outfit text-[1.8rem] font-extrabold max-[480px]:text-[1.4rem]" variants={fadeUp}>
              <span className="rounded-md bg-purple-10 px-3 py-1 font-montserrat text-sm font-bold tracking-wide text-purple-accent">05</span>
              Challenges &amp; Solutions
            </motion.h2>
            <motion.div
              className="flex items-start gap-5 rounded-2xl border border-purple-15 bg-gradient-to-br from-purple-10/60 to-purple-10/20 p-8 max-[480px]:flex-col"
              variants={fadeUp}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-purple-15">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-accent">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <p className="text-[15px] leading-[1.8] text-white-60">{project.challenges}</p>
            </motion.div>
          </motion.section>
        )}

        {/* ═══════════════════════════════════════════════
            PREV / NEXT NAVIGATION
           ═══════════════════════════════════════════════ */}
        <motion.section
          className="mx-auto max-w-[1100px] px-10 pt-10 pb-5 max-[920px]:px-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex justify-between gap-5 max-[920px]:flex-col">
            {prevProject ? (
              <motion.button
                className="flex min-w-[200px] cursor-pointer items-center gap-4 rounded-[14px] border border-white-6 bg-white-3 px-7 py-5 transition-all duration-300 hover:border-purple-20 hover:bg-white-6 max-[920px]:w-full max-[920px]:min-w-0"
                onClick={() => navigate(`/project/${prevProject.id}`)}
                variants={fadeLeft}
                whileHover={{ x: -6 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-purple-accent">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold uppercase tracking-[1.5px] text-white-35">Previous</span>
                  <span className="font-outfit text-[15px] font-semibold text-white">{prevProject.name}</span>
                </div>
              </motion.button>
            ) : <div />}

            {nextProject ? (
              <motion.button
                className="flex min-w-[200px] cursor-pointer items-center gap-4 rounded-[14px] border border-white-6 bg-white-3 px-7 py-5 transition-all duration-300 hover:border-purple-20 hover:bg-white-6 max-[920px]:w-full max-[920px]:min-w-0"
                onClick={() => navigate(`/project/${nextProject.id}`)}
                variants={fadeRight}
                whileHover={{ x: 6 }}
              >
                <div className="flex flex-col gap-1 text-right">
                  <span className="text-[11px] font-semibold uppercase tracking-[1.5px] text-white-35">Next</span>
                  <span className="font-outfit text-[15px] font-semibold text-white">{nextProject.name}</span>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-purple-accent">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </motion.button>
            ) : <div />}
          </div>
        </motion.section>

        {/* ─── Footer ─── */}
        <motion.div className="mt-5 border-t border-white-5 py-10 text-center" variants={fadeUp}>
          <p className="text-[13px] tracking-wide text-white-35">
            Sharon Shiju © {new Date().getFullYear()}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ProjectDetail;
