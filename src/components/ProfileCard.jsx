import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MdPhone } from "react-icons/md";
import { imgUrl } from "../utils/imgUrl";
import fallbackImg from "../assets/profil.jpg";

function ProfileCard() {
  const [profile, setProfile] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const cardRef = useRef(null);

  // Fetch profile from API
  useEffect(() => {
    fetch("/.netlify/functions/profile-get")
      .then((r) => r.json())
      .then(setProfile)
      .catch(() => {});
  }, []);

  // Typing effect
  const texts = profile?.typingTexts?.length ? profile.typingTexts : ["Web Developer", "React Expert", "BACKEND Developer"];
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[index];
    let timeout;
    if (isDeleting) {
      if (charIndex > 0) {
        timeout = setTimeout(() => setCharIndex((prev) => prev - 1), 80);
      } else {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % texts.length);
      }
    } else {
      if (charIndex < currentText.length) {
        timeout = setTimeout(() => setCharIndex((prev) => prev + 1), 150);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    }
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index, texts]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const moveX = ((e.clientX - (rect.left + rect.width / 2)) / rect.width) * 20;
    const moveY = ((e.clientY - (rect.top + rect.height / 2)) / rect.height) * 20;
    cardRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = `translate(0px, 0px)`;
  };

  const email = profile?.email || "sharonshiju261@gmail.com";
  const phone = profile?.phone || "+919895438132";
  const github = profile?.github || "https://github.com/sharonshiju5";
  const linkedin = profile?.linkedin || "https://www.linkedin.com/in/sharon-shiju-pk/";
  const name = profile?.name || "Sharon Shiju";
  const location = profile?.location || "India, Kerala";
  const profileImage = profile?.profileImage ? imgUrl(profile.profileImage) : fallbackImg;
  const cvFile = profile?.cvFile ? imgUrl(profile.cvFile) : "/sharon_mernstack_developer.pdf";

  const handleEmailClick = () => {
    const subject = "Inquiry about your portfolio";
    const body = `Hi ${name}, I saw your portfolio and wanted to reach out.`;
    if (/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
        "_blank"
      );
    }
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${phone}`;
  };

  const handleBtnClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 150 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <div
        ref={cardRef}
        className="w-[304px] mt-20 lg:mt-0 p-[25px] rounded-[15px] bg-card-bg flex flex-col items-center gap-4 max-[920px]:w-full max-[920px]:max-w-[400px] max-[920px]:py-8 max-[426px]:max-w-full max-[426px]:rounded-[12px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transition: "transform 0.1s ease-out" }}
      >
        {/* Profile Image */}
        <div className="w-[85%] h-[220px] flex justify-center max-[920px]:h-[200px]">
          <img src={profileImage} alt="" className="w-full h-full object-cover rounded-[20px]" />
        </div>

        {/* Profile Info */}
        <div className="w-[85%] flex flex-col items-center">
          <p className="text-[37px] font-black font-outfit text-white whitespace-nowrap max-1025:text-[2rem] max-992:text-[1.5rem] max-[426px]:text-[1.6rem]">
            {name}
          </p>
          <p className="text-sm mt-1">
            I&apos;m a
            <motion.span
              key={texts[index]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-purple-accent font-bold"
            >
              {" " + texts[index].substring(0, charIndex)}
            </motion.span>
            <span className="text-purple-accent font-bold animate-blink">|</span>
          </p>
          <p className="text-sm mt-1">{location}</p>

          {/* Social Icons */}
          <div className="h-[50px] w-[70%] flex justify-evenly items-center">
            <div className="w-[30px] h-[30px] flex items-center justify-center hover:bg-purple-accent hover:scale-[1.3] hover:rounded-[7px] transition-all duration-200">
              <a href={github} target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/128/733/733609.png" alt="" className="invert h-5 w-5 object-cover !rounded-none" />
              </a>
            </div>
            <div className="w-[30px] h-[30px] flex items-center justify-center hover:bg-purple-accent hover:scale-[1.3] hover:rounded-[7px] transition-all duration-200">
              <a href={linkedin} target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/128/2111/2111532.png" alt="" className="invert h-5 w-5 object-cover !rounded-none" />
              </a>
            </div>
            <div
              className="w-[30px] h-[30px] flex items-center justify-center hover:bg-purple-accent hover:scale-[1.3] hover:rounded-[7px] transition-all duration-200 cursor-pointer"
              onClick={handleEmailClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(255,255,255)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div
              className="w-[30px] h-[30px] flex items-center justify-center hover:bg-purple-accent hover:scale-[1.3] hover:rounded-[7px] transition-all duration-200 cursor-pointer"
              onClick={handlePhoneClick}
            >
              <MdPhone size={20} />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-[85%] flex flex-col items-center gap-2">
          <a href="#contact" className="w-full">
            <motion.button
              className="w-full h-10 border border-gray-500 rounded-lg bg-purple-accent capitalize"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={isClicked ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.2 }}
              onClick={handleBtnClick}
            >
              lets talk
            </motion.button>
          </a>
          <a
            href={cvFile}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <motion.button
              className="w-full h-10 border border-gray-500 rounded-lg bg-purple-accent capitalize"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={isClicked ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.2 }}
              onClick={handleBtnClick}
            >
              Download cv
            </motion.button>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default ProfileCard;
