import { motion } from "framer-motion";

function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 w-screen h-screen bg-dark-bg flex flex-col items-center justify-center text-white text-2xl font-montserrat z-[9999]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.svg
        className="w-20 h-20"
        width="120"
        height="120"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          stroke="#914bf1"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="251.2"
          strokeDashoffset="251.2"
          animate={{ strokeDashoffset: [251.2, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
      <motion.h1
        className="mt-5 font-bold opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        {/* Loading... */}
      </motion.h1>
    </motion.div>
  );
}

export default LoadingScreen;
