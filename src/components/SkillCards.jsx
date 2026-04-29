import { motion } from "framer-motion";

function SkillCards() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="w-full h-[250px] flex justify-between max-[920px]:mt-0 max-[920px]:h-auto max-[920px]:flex-col max-[920px]:gap-4">
        {/* Orange Card */}
        <div className="w-[46%] h-full bg-card-orange rounded-[15px] relative max-[920px]:w-full max-[920px]:h-[200px] max-[426px]:h-[160px]">
          <div className="h-[35px] w-[35px] relative">
            <img
              className="h-full w-full object-cover invert absolute left-[25px] top-[50px]"
              src="https://pic.onlinewebfonts.com/thumbnails/icons_402492.svg"
              alt=""
            />
          </div>
          <p className="absolute text-[23px] font-extrabold left-[25px] top-[120px] max-[992px]:text-[1.3rem] max-[920px]:text-lg max-[920px]:top-[90px] max-[426px]:top-[70px] max-[426px]:text-base">
            DYNAMIC ANIMATION, MOTION DESIGN
          </p>
          <svg className="absolute bottom-0 right-0 w-full h-[60%]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 388 155" fill="transparent" stroke="rgba(202,89,46,0.4)" strokeWidth="5" strokeMiterlimit="10">
            <path d="M 400.825 526.501 C 359.981 521.61 275.061 502.161 262.145 463.503 C 249.228 424.845 64.622 467.64 -26.068 493.869 L -1.845 151.05 C 71.348 136.783 216.884 99.23 213.496 63.159 C 209.26 18.069 245.759 11.716 307.691 18.653 C 369.624 25.591 361.774 9.523 393.416 2.626"></path>
          </svg>
          <svg className="absolute bottom-0 right-0 w-full h-[60%]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 388 155" fill="transparent" stroke="rgba(202,89,46,0.4)" strokeWidth="5" strokeMiterlimit="10">
            <path d="M 400.825 526.501 C 359.981 521.61 275.061 502.161 262.145 463.503 C 249.228 424.845 64.622 467.64 -26.068 493.869 L -1.845 151.05 C 71.348 136.783 216.884 99.23 213.496 63.159 C 209.26 18.069 245.759 11.716 307.691 18.653 C 369.624 25.591 361.774 9.523 393.416 2.626"></path>
          </svg>
        </div>

        {/* Lime Card */}
        <div className="w-[50%] h-full bg-card-lime rounded-[15px] relative max-[920px]:w-full max-[920px]:h-[200px] max-[426px]:h-[160px]">
          <div className="absolute h-10 left-[7%] top-[17%]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--token-796ee79d-fa4e-4408-bc78-57c89a70fe0d, rgb(21, 19, 18))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
          </div>
          <p className="absolute text-[23px] font-extrabold left-[25px] top-[120px] max-[992px]:text-[1.3rem] max-[920px]:text-lg max-[920px]:top-[90px] max-[426px]:top-[70px] max-[426px]:text-base">
            REACTJS, FIGMA,
          </p>
          <svg className="absolute bottom-0 right-0 w-full h-[60%]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 422 284" fill="transparent" stroke="rgba(108,227,182,0.5)" strokeWidth="5" strokeMiterlimit="10">
            <path d="M 33.026 0.557 L 4.893 135.318 L 98.467 61.255 L 128.435 164.831 L 227.513 61.255 L 250.754 164.831 L 310.078 107.475 L 328.426 247.247 L 426.893 107.475 L 433.62 254.486 L 472.762 292.353"></path>
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default SkillCards;
