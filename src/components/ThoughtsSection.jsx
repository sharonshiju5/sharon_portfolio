import { motion } from "framer-motion";

const thoughts = [
  {
    title: "Starting and Growing a Career in Web Design",
    desc: "As the internet continues to develop and grow exponentially, jobs related to the industry do too, particularly those that relate to web design and development.",
  },
  {
    title: "Create a Landing Page That Performs Great",
    desc: "Whether you work in marketing, sales, or product design, you understand the importance of a quality landing page. Landing pages are standalone websites used to generate leads or sales—in other words they help you increase your revenue.",
  },
  {
    title: "How Can Designers Prepare for the Future?",
    desc: "Whether you work in marketing, sales, or product design, you understand the importance of a quality landing page. Landing pages are standalone websites used to generate leads or sales—in other words they help you increase your revenue.",
  },
];

function ThoughtsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, skewX: 15 }}
      whileInView={{ opacity: 1, skewX: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="w-full mb-10">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="section-title mt-[420px] max-[920px]:mt-[120px] max-[426px]:mt-[80px]">
            <h1 className="title-main" id="thought">DESIGN</h1>
            <h1 className="title-overlay" style={{ left: "15.6%" }}>THOUGHTS</h1>
          </div>
        </motion.div>

        {thoughts.map((item, i) => (
          <div
            key={i}
            className="w-[95%] rounded-[20px] p-4 pt-6 mb-6 hover:bg-hover-bg max-[920px]:w-full"
            style={{ transition: "background-color 1.3s ease" }}
          >
            <h2 className="text-[30px] max-[920px]:text-2xl max-[426px]:text-xl max-[920px]:w-full w-[70%]">
              {item.title}
            </h2>
            <p
              className="mt-6 text-[15px] max-[920px]:w-full max-[426px]:text-sm w-[60%]"
              style={{ color: "rgba(182, 182, 182, 0.666)" }}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default ThoughtsSection;
