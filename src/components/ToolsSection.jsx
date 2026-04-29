import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { apiFetch } from "../hooks/api";
import { imgUrl } from "../components/admin/ImageUpload";

function ToolsSection() {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    apiFetch("tools-get").then(setTools).catch(console.error);
  }, []);

  if (!tools.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="section-title mt-[42px] max-[920px]:mt-[120px] max-[426px]:mt-[80px]">
          <h1 className="title-main" id="footer">Top-Tier</h1>
          <h1 className="title-overlay" style={{ left: "10%" }}>Tools</h1>
        </div>
      </motion.div>

      <div className="flex w-full flex-wrap justify-between max-[920px]:gap-2 max-[426px]:flex-col">
        {tools.map((tool) => (
          <div
            key={tool._id}
            className="flex w-[43.9%] items-center rounded-lg p-[15px] mb-[15px] hover:bg-hover-bg max-[920px]:w-[48%] max-[426px]:w-full"
            style={{ minHeight: "50px" }}
          >
            <div className="tool-icon-box">
              {tool.icon && (
                <img className="w-full h-full object-contain" src={imgUrl(tool.icon)} alt={tool.name} />
              )}
            </div>
            <div>
              <h1 className="text-[26px] font-normal capitalize text-tool-text max-[426px]:text-xl">
                {tool.name}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default ToolsSection;
