import { useEffect, useRef ,useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import './App.css'
import project from "./assets/project.png"
import pro from "./assets/profil.jpg"
import chatapp from "./assets/chatapplication.png"
import { MdPhone } from "react-icons/md";
function App() {
  const textRef = useRef(null);
  const email = "sharonshiju261@gmail.com";
  const subject = "Inquiry about your portfolio";
  const body = "Hi Sharon, I saw your portfolio and wanted to reach out."; 

  // hovereffe4tc
  // hovereffe4tc
  // hovereffe4tc
const [hoveredProject, setHoveredProject] = useState(null);

const projects = [
  {
    id: 'ecommerce',
    name: 'E-comerce',
    link: 'https://github.com/sharonshiju5/e-comerce_project',
    originalImg: "https://img.freepik.com/free-photo/project-management-planning-development-message-box-notification-graphic_53876-123902.jpg?t=st=1739350068~exp=1739353668~hmac=4cb46d19698569abd104a66ab7512ef66cf6c4977c71fa04b2ce4d35d5737ba3&w=996",
    hoverImg: `${project}`
  },
  {
    id: 'chat',
    name: 'Chat application',
    link: 'https://github.com/sharonshiju5/chatapplication',
    originalImg: "https://img.freepik.com/free-photo/project-management-planning-development-message-box-notification-graphic_53876-123902.jpg?t=st=1739350068~exp=1739353668~hmac=4cb46d19698569abd104a66ab7512ef66cf6c4977c71fa04b2ce4d35d5737ba3&w=996",
    hoverImg:`${chatapp}`
  }
];


  // contact using email
  // contact using email

const handleEmailClick = () => {
  if (/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
    // Mobile → use mailto (opens native email app)
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  } else {
    // Desktop → open Gmail compose in browser
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      "_blank"
    );
  }
};

const handlePhoneClick = () => {
  window.location.href = "tel:+919895438132";
};





  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_qxyrp28",  // Replace with your EmailJS Service ID
        "template_g03w4n6", // Replace with your EmailJS Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "l5XSBPEe_2s74Cs0J"  // Replace with your EmailJS Public Key
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          if (response.status==200) {
            toast.success("email send", {
              position: "top-center",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
          }
          else{
            toast.error('failed to send', {
              position: "top-right",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
          }
          setStatus("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.log("FAILED...", error);
          setStatus("Failed to send message. Please try again.");
        }
      );
  };


  // move when courser
  // move when courser
  // move when courser
  // move when courser


  const [isClicked, setIsClicked] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const rect = e.target.getBoundingClientRect(); // Get element position

    // Calculate movement (10px max in all directions)
    const moveX = ((clientX - (rect.left + rect.width / 2)) / rect.width) *  20;
    const moveY = ((clientY - (rect.top + rect.height / 2)) / rect.height) * 20;

    setPosition({ x: moveX, y: moveY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 }); // Reset when the mouse leaves
  };

  // loading time
  // loading time
  // loading time

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Show loading for 1.5 seconds
  }, []);




  const texts = [" Web Developer", " React Expert", " BACKEND Developer"];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typingSpeed = 150; // Adjust for slower typing
  const deletingSpeed = 80;
  const pauseTime = 2000; // Pause before deleting

  useEffect(() => {
    const currentText = texts[index];

    if (isDeleting) {
      if (charIndex > 0) {
        setTimeout(() => setCharIndex((prev) => prev - 1), deletingSpeed);
      } else {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % texts.length);
      }
    } else {
      if (charIndex < currentText.length) {
        setTimeout(() => setCharIndex((prev) => prev + 1), typingSpeed);
      } else {
        setTimeout(() => setIsDeleting(true), pauseTime);
      }
    }
  }, [charIndex, isDeleting, index, texts]);

  return (
    <div>
 <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            className="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.svg
              className="loading-svg"
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
              className="loading-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            >
              {/* Loading... */}
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
      {!isLoading && (
        <motion.div
          className="main-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
    <><div className="noise-overlay">
      
    </div>
       {/* navigation */}
       {/* navigation */}
       {/* navigation */}
       {/* navigation */}
       {/* navigation */}
       {/* navigation */}

      <nav>
        <div className="nav-container">
          <div className="nav-icons">
            <a href="#home">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "20px", height: "20px" }} ><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            </a>
            <p className="hidden">home</p>
          </div>
          <div className="nav-icons">
            <a href="#projects">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="20" height="20"  viewBox="0 0 24 24"  fill="none"  stroke="rgb(255, 255, 255)"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  style={{ width: "20px", height: "20px" }} ><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
            </a>
            <p className="hidden">projects</p>
          </div>
          <div className="nav-icons">
            <a href="#footer">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="20" height="20"  viewBox="0 0 24 24"  fill="none"  stroke="rgb(255, 255, 255)"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  style={{ width: "20px", height: "20px" }} ><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
            </a>
            <p className="hidden">tools</p>
          </div>
          <div className="nav-icons">
            <a href="/sharon_shiju_cv.pdf"  download="sharon_shiju_cv.pdf"  target="_blank"  rel="noopener noreferrer" >
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24" height="24"  viewBox="0 0 24 24"  fill="none"  stroke="rgb(255, 255, 255)"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  style={{ width: "20px", height: "20px" }}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            </a>
            <p className="hidden">cv</p>
         </div>
          <div className="nav-icons">
            <a href="#thought">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"  viewBox="0 0 24 24"  fill="none"  stroke="rgb(255, 255, 255)"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  style={{ width: "20px", height: "20px" }}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </a>
            <p className="hidden">thoughts</p>
          </div>
          <div className="nav-icons">
            <a href="#contact">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "24px", height: "24px" }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline><p></p> </svg>
            </a>
            <p className="hidden">contact</p>
          </div>
        </div>
      </nav>
      {/* main part */}
      {/* main part */}
      {/* main part */}
      {/* main part */}
      {/* main part */}
    <main>
      <div className="main-container">
        <div className="fixed">
          <motion.div initial={{ opacity: 0, x: 150 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} >
          <div className="profile-div" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{   transform: `translate(${position.x}px, ${position.y}px)`,   transition: "transform 0.1s ease-out", }}>

            <div className="profile-section" >
                <img src={pro} alt="" />
            </div>
            <div className="profile-section" style={{height:"30%"}}>
              <p className='profile-name'>Sharon Shiju</p>
              I'm a{" "}
        <motion.span
          key={text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="typing-text"
        >
          {" "+texts[index].substring(0, charIndex)}
        </motion.span>
        <span className="cursor">|</span>
              <p style={{width:"100%", textAlign:"center"}}></p><br/>
              <p>india,kerala</p>
              <div className="profile-icon-div">
                  <div className="profile-icons">
                    <a href="https://github.com/sharonshiju5">
                    <img src="https://cdn-icons-png.flaticon.com/128/733/733609.png" alt="" />
                      </a>
                  </div>
                  <div className="profile-icons">
                    <a href="https://www.linkedin.com/in/sharon-shiju-pk/">
                    <img src="https://cdn-icons-png.flaticon.com/128/2111/2111532.png" alt="" />
                    </a>
                  </div>
                  <div className="profile-icons" onClick={handleEmailClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "       ", height: "      " }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <div className="profile-icons" onClick={handlePhoneClick}>
                    <MdPhone  size={20} />
                  </div>
              </div>
            </div>
            <div className="profile-section" style={{height:"10%"}}>
                <a href="#contact" style={{width:"100%"}}>
                  <motion.button className="click-me-btn" whileHover={{ scale: 1.1,  }} whileTap={{ scale: 0.9 }} animate={isClicked ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 0.2 }} onClick={() => {   setIsClicked(true);   setTimeout(() => setIsClicked(false), 300); }} >
                    lets talk
                  </motion.button>
                </a>
                <a href="/sharon_mernstack_developer.pdf"  download="sharon_mernstack_developer.pdf"  target="_blank"  rel="noopener noreferrer" >
                  <motion.button className="click-me-btn" whileHover={{ scale: 1.1,  }} whileTap={{ scale: 0.9 }} animate={isClicked ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 0.2 }} onClick={() => {   setIsClicked(true);   setTimeout(() => setIsClicked(false), 300); }} >
                    Download cv
                  </motion.button>
              </a>
            </div>
          </div>
            </motion.div>
        </div>
        <div className="scroll delay-600" 
        // onScroll={handleScroll}
        >
          <div className="scrool-info">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} >
            <div className="title-container home">
              
              <h1 className='title'  id='home'>MERN STACK</h1>
              <h1 className='title overlay developer'>DEVELOPER</h1>
              <p>Passionate about creating intuitive and engaging user experiences. Specialize in transforming ideas into beautifully crafted products.</p>
            </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: -80 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} >
            <div className="main-tools">
              <div className="div">
                <div className="stack-div">
                  <img className='stack' src="https://pic.onlinewebfonts.com/thumbnails/icons_402492.svg" alt="" />
                </div>
                <p className='div-p'>DYNAMIC ANIMATION, MOTION DESIGN</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 388 155" fill="transparent" stroke="rgba(202,89,46,0.4)" strokeWidth="5" strokeMiterlimit="10" strokeDasharray="">
                  <path d="M 400.825 526.501 C 359.981 521.61 275.061 502.161 262.145 463.503 C 249.228 424.845 64.622 467.64 -26.068 493.869 L -1.845 151.05 C 71.348 136.783 216.884 99.23 213.496 63.159 C 209.26 18.069 245.759 11.716 307.691 18.653 C 369.624 25.591 361.774 9.523 393.416 2.626"></path>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 388 155" fill="transparent" stroke="rgba(202,89,46,0.4)" strokeWidth="5" strokeMiterlimit="10" strokeDasharray="">
                    <path d="M 400.825 526.501 C 359.981 521.61 275.061 502.161 262.145 463.503 C 249.228 424.845 64.622 467.64 -26.068 493.869 L -1.845 151.05 C 71.348 136.783 216.884 99.23 213.496 63.159 C 209.26 18.069 245.759 11.716 307.691 18.653 C 369.624 25.591 361.774 9.523 393.416 2.626"></path>
                  </svg>
              </div>
              <div className="div yellow-div">
                <div className="yellow-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--token-796ee79d-fa4e-4408-bc78-57c89a70fe0d, rgb(21, 19, 18))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                </div>
                <p className='div-p'>REACTJS, FIGMA,</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 422 284" fill="transparent" stroke="rgba(108,227,182,0.5)" strokeWidth="5" strokeMiterlimit="10" strokeDasharray="">
                <path d="M 33.026 0.557 L 4.893 135.318 L 98.467 61.255 L 128.435 164.831 L 227.513 61.255 L 250.754 164.831 L 310.078 107.475 L 328.426 247.247 L 426.893 107.475 L 433.62 254.486 L 472.762 292.353"></path>
                </svg>
              </div>                
            </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} >
            <div className="title-container" style={{marginTop:"70px"}}>
              <h1 className='title ' id='projects'>RECENT</h1>
              <h1 className='title overlay' style={{left:"16%"}}>PROJECTS</h1>
            </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} >
            <div className="projects-div" >


              <div className="project-section">
                <a href={projects[0].link}>
                  <div 
                    className="projects"
                    onMouseEnter={() => setHoveredProject('ecommerce')}
                    onMouseLeave={() => setHoveredProject(null)}
                    style={{ position: 'relative', overflow: 'hidden' }}
                  >
                    <div className="project-img" style={{ position: 'relative', overflow: 'hidden' }}>
                      <img src={projects[0].originalImg} alt="" />
                      <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: hoveredProject === 'ecommerce' ? '0%' : '100%' }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      >
                        <img 
                          src={projects[0].hoverImg} 
                          alt=""
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </motion.div>
                    </div>
                    <div className="project-name">
                      <h3>E-comerce</h3>
                    </div>
                  </div>
                </a>
                <a href={projects[1].link}>  
                  <div 
                    className="projects"
                    onMouseEnter={() => setHoveredProject('chat')}
                    onMouseLeave={() => setHoveredProject(null)}
                    style={{ position: 'relative', overflow: 'hidden' }}
                  >
                    <div className="project-img" style={{ position: 'relative', overflow: 'hidden' }}>
                      <img src={projects[1].originalImg} alt="" />
                      <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: hoveredProject === 'chat' ? '0%' : '100%' }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      >
                        <img 
                          src={projects[1].hoverImg} 
                          alt=""
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </motion.div>
                    </div>
                    <div className="project-name">
                      <h3>Chat application</h3>
                    </div>
                  </div>
                </a>


                {/* <div className="projects">
                  <div className="project-img">
                    <img src="https://img.freepik.com/free-photo/project-management-planning-development-message-box-notification-graphic_53876-123902.jpg?t=st=1739350068~exp=1739353668~hmac=4cb46d19698569abd104a66ab7512ef66cf6c4977c71fa04b2ce4d35d5737ba3&w=996" alt="" />
                  </div>
                  <div className="project-name">
                    <h3>api tester</h3>
                  </div>
                </div> */}



              </div>


                {/* <div className="projects">
                  <div className="project-img">
                    <img src="https://img.freepik.com/free-photo/project-management-planning-development-message-box-notification-graphic_53876-123902.jpg?t=st=1739350068~exp=1739353668~hmac=4cb46d19698569abd104a66ab7512ef66cf6c4977c71fa04b2ce4d35d5737ba3&w=996" alt="" />
                  </div>
                  <div className="project-name">
                    <h3>api tester</h3>
                  </div>
                </div> */}


                {/* <div className="projects">
                  <div className="project-img">
                    <img src="https://img.freepik.com/free-photo/project-management-planning-development-message-box-notification-graphic_53876-123902.jpg?t=st=1739350068~exp=1739353668~hmac=4cb46d19698569abd104a66ab7512ef66cf6c4977c71fa04b2ce4d35d5737ba3&w=996" alt="" />
                  </div>
                  <div className="project-name">
                    <h3>Chat application</h3>
                  </div>
                </div> */}
              {/* </div> */}



            </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, skewX: 15 }} whileInView={{ opacity: 1, skewX: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} >
            <div className="thoughts-div">
              <motion.div initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} >
              <div className="title-container thought-container" style={{marginTop:"420px"}}>
                <h1 className='title' id='thought'>DESIGN</h1>
                <h1 className='title overlay' style={{left:"15.6%"}}>THOUGHTS</h1>
              </div>
              </motion.div>
            
              <div className="thought">
                <h2>Starting and Growing a Career in Web Design</h2>
                <p>As the internet continues to develop and grow exponentially, jobs related to the industry do too, particularly those that relate to web design and development.</p>
              </div>
              <div className="thought">
                <h2>Create a Landing Page That Performs Great</h2>
                <p>Whether you work in marketing, sales, or product design, you understand the importance of a quality landing page. Landing pages are standalone websites used to generate leads or sales—in other words they help you increase your revenue.</p>
              </div>
              <div className="thought" >
                <h2>How Can Designers Prepare for the Future?</h2>
                <p>Whether you work in marketing, sales, or product design, you understand the importance of a quality landing page. Landing pages are standalone websites used to generate leads or sales—in other words they help you increase your revenue.</p>
              </div>
            </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} >
              <motion.div initial={{ opacity: 0, filter: "blur(10px)" }} whileInView={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} >
              <div className="title-container tool-container" style={{marginTop:"420px"}}>
                <h1 className='title' id='footer'>Top-Tier</h1>
                <h1 className='title overlay' style={{left:"10%"}}>Tools</h1>
              </div>
              </motion.div>
            <div className="tool-div">
              <div className="tool">
                <div className="tool-icon">
                  <img src="https://cdn-icons-png.flaticon.com/128/174/174854.png" alt="" />
                </div>
                <div className="tool-name">
                  <h1>html5</h1>
                </div>
              </div>

              <div className="tool">
                <div className="tool-icon">
                  <img src="https://cdn-icons-png.flaticon.com/128/5968/5968242.png" alt="" />
                </div> 
                  <div className="tool-name">
                    <h1>css</h1>
                  </div>
              </div>

              <div className="tool">
                <div className="tool-icon">
                  <img src="https://img.icons8.com/?size=100&id=EzPCiQUqWWEa&format=png&color=000000" alt="" />
                </div> 
                  <div className="tool-name">
                    <h1>bootstrap</h1>
                  </div>
              </div>


              <div className="tool">
                <div className="tool-icon">
                  <img src="https://cdn-icons-png.flaticon.com/128/5968/5968292.png" alt="" />
                </div> 
                  <div className="tool-name">
                    <h1>java script</h1>
                  </div>
              </div>
              
              <div className="tool">
                <div className="tool-icon">
                  <img src="https://img.icons8.com/?size=100&id=4PiNHtUJVbLs&format=png&color=000000" alt="" />
                </div>
                <div className="tool-name">
                  <h1>tailwind css</h1>
                </div>
              </div>

              <div className="tool">
                <div className="tool-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" className="css-pgi4ag"><path fill-rule="evenodd" clip-rule="evenodd" fill="#0073E6" d="M24 5.601V1.592a.344.344 0 0 0-.514-.298l-2.64 1.508a.688.688 0 0 0-.346.597v4.009c0 .264.285.43.514.298l2.64-1.508A.688.688 0 0 0 24 5.6ZM.515 1.295l7.643 4.383a.688.688 0 0 0 .684 0l7.643-4.383a.344.344 0 0 1 .515.298v12.03c0 .235-.12.453-.319.58l-4.65 2.953 3.11 1.832c.22.13.495.127.713-.009l4.61-2.878a.344.344 0 0 0 .161-.292v-4.085c0-.254.14-.486.362-.606l2.507-1.346a.344.344 0 0 1 .506.303v7.531c0 .244-.13.47-.34.593l-7.834 4.592a.688.688 0 0 1-.71-.009l-5.953-3.681A.344.344 0 0 1 9 18.808v-3.624c0-.115.057-.222.153-.286l4.04-2.694a.688.688 0 0 0 .307-.572v-4.39a.137.137 0 0 0-.208-.117l-4.44 2.664a.688.688 0 0 1-.705.002L3.645 7.123a.138.138 0 0 0-.208.118v7.933a.344.344 0 0 1-.52.295L.5 14.019C.19 13.833 0 13.497 0 13.135V1.593c0-.264.286-.43.515-.298Z"></path></svg>                </div>
                <div className="tool-name">
                  <h1>meterial ui</h1>
                </div>
              </div>

              <div className="tool">
                <div className="tool-icon">
                  <img src="https://img.icons8.com/?size=100&id=20906&format=png&color=000000" alt="" />
                </div>
                <div className="tool-name">
                  <h1>git</h1>
                </div>
              </div>

              <div className="tool">
                <div className="tool-icon">
                  <img src="https://img.icons8.com/?size=100&id=kg46nzoJrmTR&format=png&color=000000" alt="" />
                </div>
                <div className="tool-name">
                  <h1>expres js</h1>
                </div>
              </div>

              <div className="tool">
                <div className="tool-icon">
                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" id="node-js"> <path fill="#8CC03E" d="M9.413,21.027c-0.615,0.356-0.732,0.4-1.311,0.604c-0.14,0.048-0.352,0.133,0.081,0.381l2.899,1.738c0.276,0.163,0.597,0.248,0.911,0.248L11.995,24c0.32,0,0.634-0.086,0.912-0.248l8.682-5.076c0.563-0.334,0.911-0.948,0.911-1.606V6.922c0-0.662-0.347-1.276-0.911-1.604l-8.682-5.082c-0.546-0.313-1.274-0.313-1.824,0L2.411,5.313C1.848,5.642,1.5,6.26,1.5,6.917v10.149c0,0.662,0.347,1.276,0.911,1.604l2.275,1.329c1.101,0.552,1.495,0.552,1.997,0.552c1.631,0,2.571-1,2.571-2.743V7.785c0-0.143-0.117-0.252-0.254-0.252H7.901c-0.142,0-0.254,0.109-0.254,0.252v10.018c0,0.776-0.79,1.543-2.082,0.891l-2.379-1.39C3.103,17.262,3.05,17.166,3.05,17.07V6.922c0-0.098,0.053-0.194,0.136-0.242l8.672-5.077h0.267l8.677,5.072c0.084,0.052,0.136,0.142,0.136,0.242V17.07c0,0.095-0.051,0.19-0.131,0.237l-8.682,5.077h-0.267L9.63,21.047L9.413,21.027L9.413,21.027z"></path> <path fill="#7AA736" d="M9.413,21.027c-0.615,0.356-0.732,0.4-1.311,0.604c-0.14,0.048-0.352,0.133,0.081,0.381l2.899,1.738c0.276,0.163,0.597,0.248,0.911,0.248L11.995,24c0.002,0,0.003,0,0.005,0v-1.615h-0.142L9.63,21.047L9.413,21.027L9.413,21.027z M11.997,0c-0.319,0-0.639,0.078-0.914,0.235L2.411,5.313C1.848,5.642,1.5,6.26,1.5,6.917v10.149c0,0.662,0.347,1.276,0.911,1.604l2.275,1.329c1.101,0.552,1.495,0.552,1.997,0.552c1.631,0,2.571-1,2.571-2.743V7.785c0-0.143-0.117-0.252-0.254-0.252H7.901c-0.142,0-0.254,0.109-0.254,0.252v10.018c0,0.571-0.427,1.137-1.167,1.137c-0.266,0-0.573-0.073-0.915-0.246l-2.379-1.39C3.103,17.262,3.05,17.166,3.05,17.07V6.922c0-0.098,0.053-0.194,0.136-0.242l8.672-5.077H12V0C11.999,0,11.998,0,11.997,0L11.997,0z"></path> <path fill="#8CC03E" d="M14.674,15.47c-2.299,0-2.802-0.587-2.97-1.744c-0.019-0.124-0.123-0.214-0.249-0.214h-1.123c-0.142,0-0.249,0.113-0.249,0.252c0,1.482,0.795,3.248,4.597,3.248c2.744-0.006,4.325-1.105,4.325-3.02l-0.003,0.001c0-1.9-1.269-2.404-3.935-2.763c-2.698-0.361-2.97-0.547-2.97-1.186c0-0.528,0.231-1.233,2.229-1.233c1.781,0,2.44,0.391,2.712,1.609c0.023,0.115,0.128,0.2,0.245,0.2h1.128l0.184-0.081l0.065-0.195c-0.173-2.1-1.551-3.076-4.333-3.076c-2.476,0-3.953,1.058-3.953,2.834c0,1.924,1.471,2.457,3.845,2.694c2.844,0.282,3.064,0.706,3.064,1.273C17.283,15.051,16.503,15.47,14.674,15.47L14.674,15.47z"></path> <path fill="#7AA736" d="M11.455,13.512h-1.123c-0.142,0-0.249,0.113-0.249,0.252c0,1.464,0.776,3.206,4.461,3.247v-1.542c-2.188-0.022-2.675-0.609-2.84-1.744C11.685,13.601,11.581,13.512,11.455,13.512L11.455,13.512z M14.327,7.269c-2.476,0-3.953,1.058-3.953,2.834c0,1.924,1.471,2.457,3.845,2.694c0.112,0.011,0.221,0.022,0.325,0.034v-1.673c-2.211-0.317-2.446-0.519-2.446-1.113c0-0.528,0.231-1.233,2.229-1.233c0.075,0,0.147,0.001,0.218,0.002V7.271C14.473,7.269,14.4,7.269,14.327,7.269L14.327,7.269z"></path> </svg>                </div>
                <div className="tool-name">
                  <h1>node js</h1>
                </div>
              </div>

              <div className="tool">
                <div className="tool-icon">
                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" id="react"> <path fill="#53C1DE" d="M12,9.852c-1.186,0-2.147,0.961-2.147,2.147c0,1.185,0.961,2.146,2.147,2.146c1.186,0,2.147-0.961,2.147-2.146C14.147,10.812,13.186,9.852,12,9.852L12,9.852z"></path> <path fill="#53C1DE" d="M4.514,15.801c0.211,0.069,0.422,0.141,0.638,0.201c-0.07,0.281-0.131,0.559-0.188,0.845c-0.491,2.602-0.108,4.663,1.12,5.371c1.266,0.731,3.395-0.019,5.467-1.833c0.163-0.145,0.328-0.295,0.491-0.455c0.206,0.202,0.422,0.395,0.637,0.581c2.006,1.724,3.989,2.423,5.213,1.716c1.266-0.73,1.678-2.947,1.144-5.647c-0.042-0.206-0.089-0.417-0.141-0.633c0.15-0.042,0.295-0.089,0.441-0.135C22.041,14.916,24,13.467,24,11.98c0-1.42-1.847-2.798-4.397-3.675V8.305c-0.253-0.084-0.506-0.164-0.759-0.239c0.042-0.173,0.08-0.348,0.117-0.521c0.577-2.793,0.197-5.038-1.083-5.779c-1.233-0.708-3.244,0.028-5.278,1.8c-0.202,0.173-0.398,0.357-0.586,0.539c-0.127-0.122-0.258-0.244-0.389-0.361C9.492,1.851,7.355,1.054,6.075,1.8C4.847,2.513,4.481,4.627,4.997,7.27c0.052,0.263,0.108,0.52,0.173,0.782c-0.3,0.084-0.595,0.179-0.872,0.278C1.795,9.196,0,10.564,0,11.98C0,13.443,1.912,14.91,4.514,15.801L4.514,15.801z M10.889,19.62c-0.773,0.708-1.669,1.269-2.644,1.654c-0.52,0.248-1.12,0.273-1.655,0.061c-0.745-0.431-1.056-2.086-0.634-4.312c0.052-0.261,0.108-0.525,0.173-0.783c1.05,0.226,2.109,0.38,3.183,0.459c0.619,0.877,1.298,1.716,2.025,2.503c-0.15,0.145-0.3,0.286-0.45,0.417L10.889,19.62L10.889,19.62z M16.842,10.817c-0.22-0.412-0.445-0.824-0.68-1.227c-0.23-0.398-0.469-0.792-0.717-1.181c0.755,0.094,1.476,0.22,2.152,0.375C17.381,9.479,17.128,10.153,16.842,10.817L16.842,10.817z M16.851,13.151c0.3,0.681,0.563,1.369,0.792,2.077c-0.727,0.164-1.462,0.291-2.203,0.375c0.253-0.393,0.492-0.797,0.727-1.2C16.406,13.99,16.631,13.573,16.851,13.151L16.851,13.151z M16.309,11.985c-0.314,0.647-0.652,1.284-1.012,1.912c-0.356,0.623-0.736,1.228-1.134,1.828c-0.698,0.052-1.425,0.075-2.161,0.075c-0.736,0-1.448-0.023-2.137-0.066c-0.408-0.595-0.792-1.205-1.153-1.828s-0.694-1.256-1.008-1.902H7.702c0.309-0.647,0.647-1.28,1.003-1.903c0.356-0.622,0.741-1.228,1.144-1.823c0.703-0.052,1.42-0.08,2.152-0.08c0.732,0,1.453,0.028,2.152,0.08c0.398,0.591,0.778,1.194,1.139,1.814S15.99,11.344,16.309,11.985L16.309,11.985z M7.832,9.598c-0.23,0.398-0.455,0.806-0.666,1.218c-0.295-0.697-0.544-1.382-0.75-2.042c0.675-0.15,1.392-0.272,2.137-0.366C8.306,8.797,8.062,9.195,7.832,9.598L7.832,9.598z M7.167,13.188v0.001c0.216,0.412,0.436,0.82,0.67,1.223c0.239,0.408,0.483,0.816,0.741,1.214c-0.731-0.08-1.458-0.196-2.175-0.352C6.609,14.6,6.867,13.901,7.167,13.188L7.167,13.188z M12.038,18.481L12.038,18.481c-0.478-0.516-0.956-1.086-1.42-1.701c0.45,0.018,0.914,0.028,1.383,0.028c0.483,0,0.956-0.01,1.425-0.033C12.995,17.369,12.531,17.938,12.038,18.481L12.038,18.481z M18.165,19.888L18.165,19.888c-0.043,0.571-0.324,1.106-0.774,1.466c-0.745,0.431-2.334-0.131-4.05-1.602c-0.197-0.169-0.394-0.352-0.595-0.539c0.716-0.792,1.378-1.631,1.978-2.512c1.073-0.089,2.142-0.253,3.197-0.492c0.047,0.192,0.089,0.385,0.127,0.572C18.278,17.793,18.315,18.846,18.165,19.888L18.165,19.888z M18.572,9.032c0.244,0.069,0.478,0.145,0.703,0.22c2.184,0.75,3.717,1.866,3.717,2.719c0,0.919-1.636,2.104-3.975,2.878c-0.131,0.042-0.262,0.084-0.398,0.122c-0.328-1.022-0.731-2.021-1.195-2.991C17.874,11.024,18.254,10.039,18.572,9.032L18.572,9.032z M13.26,4.325L13.26,4.325c1.745-1.518,3.371-2.112,4.112-1.687c0.792,0.455,1.097,2.292,0.6,4.706c-0.033,0.158-0.066,0.314-0.108,0.469c-1.041-0.235-2.095-0.403-3.156-0.497C14.1,6.444,13.434,5.61,12.712,4.827C12.895,4.654,13.073,4.489,13.26,4.325L13.26,4.325z M12.01,5.545c0.492,0.534,0.956,1.097,1.387,1.677c-0.928-0.042-1.861-0.042-2.789,0C11.067,6.617,11.54,6.056,12.01,5.545L12.01,5.545z M6.572,2.672C7.36,2.213,9.108,2.868,10.95,4.5c0.116,0.103,0.234,0.216,0.356,0.327C10.579,5.61,9.909,6.444,9.295,7.316C8.236,7.41,7.186,7.574,6.145,7.803C6.084,7.565,6.033,7.321,5.981,7.077C5.54,4.808,5.831,3.098,6.572,2.672L6.572,2.672z M4.627,9.28c0.267-0.094,0.539-0.179,0.811-0.258c0.319,1.017,0.703,2.016,1.148,2.981c-0.45,0.979-0.839,1.991-1.162,3.022l-0.001,0.001c-0.197-0.056-0.389-0.117-0.58-0.182c-0.998-0.315-2.134-0.812-2.953-1.462c-0.473-0.328-0.792-0.834-0.881-1.402C1.008,11.122,2.489,10.026,4.627,9.28L4.627,9.28z"></path> <path fill="#DEDEDE" d="M10.618 16.78c.452.599.917 1.155 1.382 1.661v-1.633C11.532 16.808 11.067 16.798 10.618 16.78L10.618 16.78zM6.13 16.24c-.065.258-.121.522-.173.783-.422 2.227-.112 3.882.634 4.312.242.096.498.143.754.143.308 0 .616-.069.901-.204.975-.385 1.871-.946 2.644-1.654l-.001-.001c.15-.131.3-.272.45-.417-.726-.787-1.406-1.626-2.025-2.503C8.239 16.62 7.18 16.466 6.13 16.24L6.13 16.24zM7.167 13.188c-.3.713-.558 1.411-.764 2.086.717.155 1.444.272 2.175.352-.258-.397-.502-.806-.741-1.214-.234-.403-.453-.811-.67-1.223V13.188L7.167 13.188zM5.438 9.022C5.166 9.102 4.894 9.187 4.627 9.28c-2.138.745-3.619 1.842-3.619 2.699.089.568.407 1.074.881 1.402.82.65 1.955 1.147 2.953 1.462.192.066.384.127.58.182l.001-.001c.323-1.031.712-2.043 1.162-3.022C6.141 11.038 5.757 10.039 5.438 9.022L5.438 9.022zM8.554 8.408C7.809 8.502 7.092 8.624 6.417 8.774c.206.66.454 1.345.75 2.042.211-.412.435-.819.666-1.218C8.062 9.195 8.306 8.797 8.554 8.408L8.554 8.408zM12 8.198c-.732 0-1.448.028-2.151.08-.403.595-.788 1.201-1.144 1.823-.356.623-.694 1.256-1.003 1.903h.002c.314.646.647 1.279 1.008 1.902s.745 1.234 1.153 1.828c.688.043 1.4.066 2.135.066v-1.655l0 0c-1.186 0-2.147-.961-2.147-2.146 0-1.187.961-2.147 2.147-2.147l0 0V8.198L12 8.198zM12 5.555c-.466.508-.937 1.066-1.392 1.667C11.071 7.202 11.536 7.191 12 7.191V5.555L12 5.555zM7.183 2.529c-.24 0-.447.047-.611.143C5.831 3.098 5.54 4.808 5.981 7.077c.052.244.103.488.164.726 1.041-.229 2.091-.393 3.15-.487.614-.872 1.284-1.706 2.011-2.489C11.184 4.716 11.067 4.603 10.95 4.5 9.493 3.209 8.094 2.529 7.183 2.529L7.183 2.529z"></path> <path fill="#48A8C1" d="M12,9.852c-1.186,0-2.147,0.961-2.147,2.147c0,1.185,0.961,2.146,2.147,2.146l0,0V9.852L12,9.852L12,9.852z"></path> <path fill="#48A8C1" d="M7.344,21.479c-0.256,0-0.512-0.047-0.754-0.143c-0.745-0.431-1.056-2.086-0.634-4.312c0.052-0.261,0.108-0.525,0.173-0.783c1.05,0.226,2.109,0.38,3.183,0.459c0.619,0.877,1.298,1.716,2.025,2.503c-0.15,0.145-0.3,0.286-0.45,0.417l0.001,0.001c-0.773,0.708-1.669,1.269-2.644,1.654C7.961,21.41,7.653,21.479,7.344,21.479L7.344,21.479z M8.578,15.626c-0.731-0.08-1.458-0.196-2.175-0.352c0.205-0.675,0.464-1.373,0.764-2.086v0.001c0.216,0.412,0.436,0.82,0.67,1.223C8.076,14.82,8.32,15.228,8.578,15.626L8.578,15.626z M5.423,15.026c-0.197-0.056-0.389-0.117-0.58-0.182c-0.998-0.315-2.134-0.812-2.953-1.462c-0.473-0.328-0.792-0.834-0.881-1.402c0-0.857,1.481-1.954,3.619-2.699c0.267-0.094,0.539-0.179,0.811-0.258c0.319,1.017,0.703,2.016,1.148,2.981c-0.45,0.979-0.839,1.991-1.162,3.022L5.423,15.026L5.423,15.026z M7.167,10.816c-0.295-0.697-0.544-1.382-0.75-2.042c0.675-0.15,1.392-0.272,2.137-0.366c-0.248,0.388-0.492,0.787-0.722,1.19C7.602,9.997,7.377,10.404,7.167,10.816L7.167,10.816z M6.145,7.803C6.084,7.565,6.033,7.321,5.981,7.077C5.54,4.808,5.831,3.098,6.572,2.672c0.164-0.096,0.371-0.143,0.611-0.143c0.911,0,2.309,0.68,3.767,1.971c0.116,0.103,0.234,0.216,0.356,0.327C10.579,5.61,9.909,6.444,9.295,7.316C8.236,7.41,7.186,7.574,6.145,7.803L6.145,7.803z M7.187,1.523c-0.416,0-0.79,0.09-1.111,0.277C4.847,2.513,4.481,4.627,4.997,7.27c0.052,0.263,0.108,0.52,0.173,0.782c-0.3,0.084-0.595,0.179-0.872,0.278C1.795,9.196,0,10.564,0,11.98l0,0c0,1.463,1.912,2.93,4.514,3.82c0.211,0.069,0.422,0.141,0.638,0.201c-0.07,0.281-0.131,0.559-0.188,0.845c-0.491,2.602-0.108,4.663,1.12,5.371c0.324,0.187,0.705,0.277,1.127,0.277c1.226,0,2.798-0.761,4.34-2.111c0.149-0.132,0.3-0.27,0.45-0.414v-1.53c-0.465-0.506-0.93-1.062-1.382-1.661c0.449,0.018,0.914,0.028,1.382,0.028v-1.007c-0.735,0-1.446-0.024-2.135-0.066c-0.408-0.595-0.792-1.205-1.153-1.828s-0.694-1.256-1.008-1.902H7.702c0.309-0.647,0.647-1.28,1.003-1.903c0.356-0.622,0.741-1.228,1.144-1.823c0.703-0.052,1.419-0.08,2.151-0.08V7.191c-0.464,0-0.929,0.01-1.392,0.031C11.064,6.621,11.534,6.063,12,5.555V4.092c-0.123-0.118-0.249-0.235-0.375-0.348C10.027,2.326,8.427,1.523,7.187,1.523L7.187,1.523z"></path> </svg>                </div>
                <div className="tool-name">
                  <h1>react js</h1>
                </div>
              </div>


              <div className="tool">
                <div className="tool-icon">
                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" id="npm"> <polygon fill="#C53735" points="12 9.964 10.666 9.964 10.666 12.679 12 12.679 12 9.964"></polygon> <path fill="#C53735" d="M24,7.25H0v8.143h6.666v1.357H12v-1.357h12V7.25L24,7.25z M6.666,14.036H5.333V9.964H4v4.072H1.333V8.608h5.333V14.036L6.666,14.036z M13.333,14.036h-2.667v1.356H8V8.608h5.333V14.036L13.333,14.036z M22.667,14.036h-1.333V9.964H20v4.072h-1.333V9.964h-1.333v4.072h-2.667V8.608h8V14.036L22.667,14.036z"></path> <polygon fill="#DEDEDE" points="4 11.29 1.333 11.29 1.333 14.036 4 14.036 4 11.29"></polygon> <polygon fill="#DEDEDE" points="6.666 11.29 5.333 11.29 5.333 14.036 6.666 14.036 6.666 11.29"></polygon> <polygon fill="#DEDEDE" points="13.333 11.29 12 11.29 12 12.679 10.666 12.679 10.666 11.29 8 11.29 8 15.393 10.666 15.393 10.666 14.036 13.333 14.036 13.333 11.29"></polygon> <polygon fill="#DEDEDE" points="17.334 11.29 14.667 11.29 14.667 14.036 17.334 14.036 17.334 11.29"></polygon> <polygon fill="#DEDEDE" points="20 11.29 18.667 11.29 18.667 14.036 20 14.036 20 11.29"></polygon> <polygon fill="#DEDEDE" points="22.667 11.29 21.334 11.29 21.334 14.036 22.667 14.036 22.667 11.29"></polygon> <polygon fill="#AC302E" points="12 11.29 10.666 11.29 10.666 12.679 12 12.679 12 11.29"></polygon> <polygon fill="#AC302E" points="24 11.29 22.667 11.29 22.667 14.036 21.334 14.036 21.334 11.29 20 11.29 20 14.036 18.667 14.036 18.667 11.29 17.334 11.29 17.334 14.036 14.667 14.036 14.667 11.29 13.333 11.29 13.333 14.036 10.666 14.036 10.666 15.393 8 15.393 8 11.29 6.666 11.29 6.666 14.036 5.333 14.036 5.333 11.29 4 11.29 4 14.036 1.333 14.036 1.333 11.29 0 11.29 0 15.393 6.666 15.393 6.666 16.75 12 16.75 12 15.393 24 15.393 24 11.29"></polygon> </svg>                </div>
                <div className="tool-name">
                  <h1>npm</h1>
                </div>
              </div>

              <div className="tool">
                <div className="tool-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" id="mongodb"> <path fill="#94795D" fill-rule="evenodd" d="M87.259 100.139c.169-.325.331-.612.469-.909.087-.19.221-.228.41-.223 1.133.032 2.266.067 3.4.078.963.01 1.928-.008 2.892-.019 1.086-.013 2.172-.07 3.257-.039 1.445.042 2.853.325 4.16.968 1.561.769 2.742 1.94 3.547 3.483.514.985.812 2.03.931 3.14.172 1.608.059 3.179-.451 4.717-.632 1.906-1.832 3.365-3.499 4.458-1.283.841-2.69 1.338-4.198 1.622-1.596.301-3.197.204-4.798.209-1.756.007-3.511-.031-5.267-.051-.307-.003-.351-.061-.27-.354l.075-.27c.171-.538.263-.562.809-.652.378-.061.77-.203 1.087-.413.184-.122.26-.44.332-.685.062-.214.065-.449.067-.675.025-3.425.051-6.849.065-10.272.003-.865-.017-1.732-.065-2.596-.034-.605-.357-1.019-1.077-1.162-.56-.111-1.124-.197-1.687-.296l-.189-.059zm16.076 8.293c-.076-.682-.113-1.37-.235-2.042-.292-1.613-.998-3.018-2.238-4.119-2.005-1.779-4.419-2.053-6.949-1.841-.576.048-.7.245-.709.837-.014.84-.028 1.68-.029 2.52-.004 2.664-.004 5.328 0 7.992.001.758.009 1.516.031 2.272.024.774.305 1.429 1.063 1.729 1.195.473 2.452.529 3.706.336 2.003-.307 3.404-1.474 4.344-3.223.744-1.388.954-2.903 1.016-4.461zM108.204 117.503c-.024-.415.146-.758.356-1.073.057-.085.253-.081.388-.108l1.146-.227c.405-.086.618-.358.675-.755.038-.262.074-.527.077-.792.025-2.097.049-4.194.059-6.291.01-2.1.002-4.2.002-6.3l-.009-.401c-.041-.675-.367-1.025-1.037-1.124l-1.453-.221c-.179-.024-.244-.11-.179-.269.112-.271.219-.552.377-.796.059-.09.258-.125.392-.122.694.01 1.388.062 2.082.061l6.041-.036c1.164-.001 2.288.202 3.332.759 1.149.612 1.792 1.559 1.976 2.849.192 1.355-.219 2.497-1.209 3.404-.407.374-.934.618-1.406.922l-.154.096c.438.161.855.3 1.261.466 1.188.487 2.133 1.248 2.633 2.463.395.959.395 1.959.161 2.953-.364 1.556-1.389 2.591-2.722 3.374-1.251.735-2.605 1.163-4.047 1.235-1.33.067-2.666.042-3.999.057l-.772.004c-1.284-.029-2.569-.062-3.854-.096l-.117-.032zm5.537-6.089h.013c0 .658-.009 1.316.003 1.974.008.426-.007.864.085 1.274.138.613.418 1.166 1.106 1.342.929.239 1.878.287 2.818.124 1.177-.205 2.116-.795 2.631-1.916.382-.833.439-1.716.308-2.618-.174-1.188-.805-2.05-1.854-2.615-.688-.371-1.422-.598-2.204-.628-.876-.033-1.753-.035-2.629-.062-.246-.007-.28.118-.279.32.005.934.002 1.869.002 2.805zm1.865-4.475c.479-.024 1.021-.031 1.56-.085 1.032-.103 1.759-.622 2.138-1.609.193-.501.185-1.017.19-1.538.015-1.357-.777-2.469-2.066-2.929-.995-.355-2.021-.361-3.053-.333-.418.011-.605.194-.611.615l-.062 5.489c-.003.218.091.312.303.319l1.601.071z" clip-rule="evenodd"></path> <path fill="#50382B" fill-rule="evenodd" d="M10.543 116.448l-.073.944c-.68 0-1.307-.005-1.934.002-1.181.012-2.362.031-3.544.048l-.114.007c-.169-.02-.476-.02-.484-.07-.05-.281-.034-.576-.021-.867.001-.033.116-.075.183-.091l.919-.205c.573-.149.775-.396.802-.988.031-.667.062-1.335.065-2.002.009-1.642-.001-3.282.006-4.924.001-.384-.132-.67-.49-.826-.426-.188-.854-.372-1.285-.546-.204-.082-.469-.127-.445-.401.024-.279.281-.352.523-.407 1.002-.229 2.005-.452 3.004-.696.322-.079.63-.212 1.015-.346.02.208.057.406.053.604l-.059.941c-.001.106.054.248.133.307.048.037.209-.03.289-.092.854-.65 1.758-1.211 2.789-1.538 1.597-.507 2.968-.037 3.928 1.34.338.485.339.485.808.146.805-.585 1.647-1.101 2.589-1.441 2.068-.747 4.055.201 4.774 2.284.262.756.362 1.537.36 2.335l-.019 5.298c-.001.437.144.686.56.822.467.153.951.258 1.477.396l-.122.911c-.598 0-1.148-.004-1.698.001-1.344.012-2.688.019-4.031.05-.234.006-.295-.052-.307-.271-.039-.701-.045-.7.615-.858l.222-.057c.645-.176.86-.374.865-1.028.015-1.878.054-3.761-.041-5.635-.099-1.944-1.642-2.979-3.526-2.481-.615.162-1.172.446-1.69.814-.175.125-.208.269-.194.488.053.828.086 1.657.093 2.486.012 1.451-.006 2.902 0 4.354.002.588.203.813.784.949l.863.199.16.036c.012.276.023.552.01.828-.008.173-.142.188-.292.185-.839-.021-1.679-.049-2.518-.047-1.021.002-2.041.031-3.061.049h-.24c0-.293-.014-.573.01-.852.005-.067.123-.161.204-.182l1.006-.213c.427-.105.631-.324.655-.758.114-2.01.196-4.021.007-6.03-.037-.39-.164-.786-.326-1.145-.515-1.138-1.674-1.613-3.011-1.271-.635.162-1.208.453-1.75.82-.256.174-.378.404-.378.695 0 2.005.007 4.01.013 6.014l.011.773c.012.539.241.823.776.939.344.078.692.131 1.082.203z" clip-rule="evenodd"></path> <path fill="#4F382B" fill-rule="evenodd" d="M71.001 105.285c.155.754.152 1.432-.402 1.946-.55.511-1.246.339-1.925.225.063.358.133.662.167.97.247 2.289-.738 3.988-2.861 4.959-.802.366-1.653.502-2.522.572-.432.034-.81.364-.851.719-.042.36.184.73.636.838.533.127 1.089.163 1.636.226 1.174.134 2.361.195 3.521.405 1.754.316 2.733 1.847 2.424 3.609-.275 1.568-1.183 2.709-2.449 3.584-2.133 1.478-4.473 1.91-6.965 1.156-1.425-.432-2.43-1.369-2.777-2.885-.174-.759.011-1.446.582-1.961.679-.61 1.418-1.154 2.129-1.73l.23-.231-.264-.185c-.725-.344-1.305-.815-1.53-1.633-.077-.277.003-.459.238-.601.4-.241.798-.486 1.193-.735.186-.116.37-.236.543-.37.236-.18.215-.314-.067-.418-.656-.242-1.239-.593-1.691-1.133-.755-.901-.969-1.974-.907-3.107.097-1.77 1.058-2.936 2.62-3.686 1.857-.891 3.72-.947 5.613-.135.7.3 1.438.364 2.189.312.561-.04 1.051-.252 1.49-.711zm-6.843 12.681c-1.394-.012-1.831.16-2.649.993-.916.934-.911 2.229.003 3.167.694.711 1.56 1.044 2.523 1.144 1.125.116 2.233.069 3.255-.494 1.09-.603 1.632-1.723 1.387-2.851-.203-.931-.889-1.357-1.724-1.602-.95-.278-1.932-.331-2.795-.357zm-2.738-8.908c.051.387.072.779.158 1.158.223.982.65 1.845 1.627 2.282 1.147.515 2.612.294 3.114-1.316.344-1.103.302-2.198-.113-3.274-.185-.48-.483-.886-.91-1.184-.996-.695-2.793-.787-3.525.749-.238.499-.331 1.03-.351 1.585z" clip-rule="evenodd"></path> <path fill="#4F372B" fill-rule="evenodd" d="M47.35 105.038c.037.171.111.365.113.56.003.371-.037.742-.058 1.113v.322l.314-.24c.86-.708 1.784-1.311 2.86-1.636 1.942-.585 3.882.478 4.515 2.456.24.752.335 1.525.344 2.311.02 1.746.032 3.492.05 5.238.006.627.078.739.671.92.336.103.683.175 1.03.229.191.03.273.105.263.292l.002.172c-.007.723-.057.756-.758.754-1.678-.003-3.355.007-5.033.021-.5.004-.501.019-.551-.475l-.01-.284c.031-.426.041-.422.46-.484.282-.042.562-.107.837-.179.283-.073.419-.282.457-.562.019-.142.044-.284.043-.426-.024-1.908.007-3.818-.097-5.723-.084-1.541-1.26-2.459-2.807-2.354-.759.053-1.445.306-2.071.743-.413.289-.496.706-.494 1.155.008 1.784.025 3.568.044 5.353.004.391.015.782.052 1.17.039.424.188.595.604.687.398.088.804.139 1.229.21l.036.328c.014.765-.066.822-.809.819-1.735-.007-3.47.004-5.204.023-.273.004-.389-.082-.382-.348l-.004-.114c-.045-.689-.025-.715.627-.827l.308-.062c.706-.159.887-.347.897-1.064.033-2.271.045-4.541.068-6.812.003-.326-.12-.579-.424-.714-.426-.188-.856-.367-1.287-.544-.238-.098-.51-.16-.519-.489-.006-.232.242-.437.581-.506.681-.138 1.368-.253 2.041-.422.67-.167 1.328-.391 2.062-.611z" clip-rule="evenodd"></path> <path fill="#4F382B" fill-rule="evenodd" d="M84.865 110.97c-.032 2.121-.583 3.836-2.083 5.123-1.9 1.633-4.864 2.188-7.287.967-1.034-.521-1.794-1.32-2.289-2.357-.759-1.595-.949-3.272-.553-4.99.392-1.699 1.421-2.93 2.961-3.727 1.584-.819 3.252-1.139 5.011-.709 2.225.543 3.824 2.357 4.142 4.667.057.405.079.815.098 1.026zm-2.577 1.149l-.086-.01c0-.2.011-.4-.002-.6-.073-1.246-.353-2.433-1.075-3.476-.685-.988-1.618-1.571-2.832-1.656-1.359-.096-2.501.664-2.902 2.052-.602 2.084-.398 4.115.66 6.024.461.832 1.144 1.446 2.059 1.769 1.793.631 3.383-.186 3.85-2.022.172-.678.222-1.387.328-2.081z" clip-rule="evenodd"></path> <path fill="#4F372B" fill-rule="evenodd" d="M40.819 111.134c-.037 1.522-.396 2.929-1.336 4.152-1.007 1.31-2.391 2.01-3.965 2.305-1.861.348-3.609.032-5.104-1.217-.71-.594-1.195-1.355-1.515-2.221-.525-1.42-.656-2.875-.333-4.358.345-1.587 1.241-2.8 2.63-3.614 1.606-.939 3.339-1.358 5.19-.936 2.38.544 3.754 2.095 4.262 4.443.102.474.116.964.171 1.446zm-2.606 1.004l-.069-.01v-.286c-.039-1.396-.312-2.726-1.145-3.886-.617-.861-1.443-1.401-2.502-1.552-1.726-.246-2.854.778-3.228 2.169-.488 1.817-.335 3.612.42 5.335.471 1.074 1.215 1.911 2.358 2.317 1.782.633 3.396-.205 3.847-2.034.166-.669.216-1.367.319-2.053z" clip-rule="evenodd"></path> <path fill="#439934" fill-rule="evenodd" d="M82.362 33.544c1.227 3.547 2.109 7.168 2.4 10.92.36 4.656.196 9.28-.786 13.859l-.126.366c-.308.001-.622-.038-.923.009-2.543.4-5.083.814-7.624 1.226-2.627.426-5.256.835-7.878 1.289-.929.16-2.079-.031-2.454 1.253l-.18.061.127-7.678-.129-18.526 1.224-.21c2.001-.327 4.002-.66 6.006-.979 2.39-.379 4.782-.749 7.174-1.119 1.056-.162 2.113-.313 3.169-.471z" clip-rule="evenodd"></path> <path fill="#45A538" fill-rule="evenodd" d="M62.265 84.911c-1.291-1.11-2.627-2.171-3.864-3.339-6.658-6.28-11.529-13.673-13.928-22.586-.661-2.452-1.101-4.945-1.243-7.479-.1-1.774-.243-3.563-.117-5.328.333-4.693 1.012-9.341 2.388-13.862l.076-.105c.134.178.326.336.394.537 1.344 3.956 2.677 7.916 4.004 11.879 4.169 12.451 8.333 24.905 12.509 37.354.082.243.293.442.445.661l-.664 2.268z" clip-rule="evenodd"></path> <path fill="#46A037" fill-rule="evenodd" d="M82.362 33.544c-1.057.157-2.114.309-3.169.471-2.392.37-4.784.74-7.174 1.119-2.003.318-4.004.651-6.006.979l-1.224.21-.01-.798c-.041-.656-.109-1.312-.118-1.968l-.137-12.554c-.032-2.619-.08-5.238-.133-7.856-.033-1.627-.068-3.255-.141-4.88-.04-.873-.181-1.742-.237-2.615-.033-.502.011-1.008.022-1.512.624 1.209 1.235 2.427 1.876 3.627 1.013 1.897 2.628 3.295 4.083 4.82 5.746 6.031 9.825 13.039 12.368 20.957z" clip-rule="evenodd"></path> <path fill="#409433" fill-rule="evenodd" d="M64.792 62.527l.18-.061c.375-1.284 1.525-1.093 2.454-1.253 2.622-.454 5.251-.863 7.878-1.289 2.541-.411 5.081-.825 7.624-1.226.301-.047.615-.008.923-.009-.475 1.696-.849 3.429-1.452 5.078-.685 1.87-1.513 3.696-2.392 5.486-1.314 2.675-2.951 5.171-4.853 7.458-1.466 1.762-3.1 3.393-4.737 5.002-.906.889-1.972 1.614-2.966 2.414l-.258-.176-.927-.792-.959-2.104c-.661-2.462-1.007-4.968-1.065-7.516l.018-.428.131-1.854c.043-.633.101-1.265.128-1.898.096-2.276.182-4.554.273-6.832z" clip-rule="evenodd"></path> <path fill="#4FAA41" fill-rule="evenodd" d="M64.792 62.527c-.09 2.278-.176 4.557-.273 6.835-.027.634-.084 1.266-.128 1.898l-.584.221c-1.298-3.821-2.597-7.602-3.867-11.392-2.101-6.271-4.176-12.551-6.274-18.824-1.693-5.062-3.401-10.121-5.118-15.176-.081-.236-.311-.422-.471-.631l3.74-6.877c.129.223.298.432.379.672 1.73 5.12 3.457 10.241 5.169 15.367 2.228 6.67 4.441 13.343 6.667 20.014.089.266.235.512.375.811l.512-.596c-.043 2.56-.085 5.118-.127 7.678z" clip-rule="evenodd"></path> <path fill="#4AA73C" fill-rule="evenodd" d="M48.076 25.458c.161.209.391.395.471.631 1.717 5.055 3.425 10.113 5.118 15.176 2.098 6.273 4.173 12.553 6.274 18.824 1.27 3.79 2.569 7.57 3.867 11.392l.584-.221-.131 1.854-.119.427c-.203 2.029-.374 4.062-.622 6.087-.124 1.015-.389 2.011-.59 3.015-.151-.219-.363-.418-.445-.661-4.177-12.449-8.34-24.903-12.509-37.354-1.327-3.963-2.661-7.923-4.004-11.879-.068-.201-.26-.359-.394-.537l2.5-6.754z" clip-rule="evenodd"></path> <path fill="#57AE47" fill-rule="evenodd" d="M64.918 54.849l-.512.596c-.14-.299-.286-.545-.375-.811-2.226-6.671-4.439-13.344-6.667-20.014-1.712-5.126-3.439-10.247-5.169-15.367-.081-.24-.25-.449-.379-.672l4.625-6.084c.146.194.354.367.429.586 1.284 3.76 2.556 7.523 3.822 11.289 1.182 3.518 2.346 7.04 3.542 10.552.08.235.359.401.545.601l.01.798.129 18.526z" clip-rule="evenodd"></path> <path fill="#60B24F" fill-rule="evenodd" d="M64.779 35.525c-.187-.199-.465-.365-.545-.601-1.195-3.512-2.36-7.034-3.542-10.552-1.266-3.766-2.538-7.529-3.822-11.289-.075-.219-.283-.392-.429-.586 1.504-1.473 2.961-2.999 4.526-4.404 1.391-1.248 2.509-2.586 2.561-4.559l.11-.393.396.998c-.01.504-.055 1.01-.022 1.512.057.873.198 1.742.237 2.615.073 1.625.108 3.253.141 4.88.053 2.618.101 5.237.133 7.856l.137 12.554c.01.657.079 1.313.119 1.969z" clip-rule="evenodd"></path> <path fill="#A9AA88" fill-rule="evenodd" d="M62.929 82.642c.201-1.004.466-2 .59-3.015.248-2.024.419-4.058.622-6.087l.051-.008.05.009c.058 2.548.404 5.054 1.065 7.516-.135.178-.324.335-.396.535-.555 1.566-1.079 3.145-1.637 4.71-.076.214-.29.381-.439.568l-.571-1.96.665-2.268z" clip-rule="evenodd"></path> <path fill="#B6B598" fill-rule="evenodd" d="M62.835 86.871c.149-.188.363-.354.439-.568.558-1.565 1.082-3.144 1.637-4.71.071-.2.261-.357.396-.535l.959 2.104c-.189.268-.451.511-.556.81l-1.836 5.392c-.076.217-.333.369-.507.552l-.532-3.045z" clip-rule="evenodd"></path> <path fill="#C2C1A7" fill-rule="evenodd" d="M63.367 89.915c.173-.183.431-.335.507-.552l1.836-5.392c.104-.299.367-.542.556-.81l.928.791c-.448.443-.697.955-.547 1.602l-.282.923c-.128.158-.314.296-.377.477-.641 1.836-1.252 3.682-1.898 5.517-.082.232-.309.415-.468.621l-.255-3.177z" clip-rule="evenodd"></path> <path fill="#CECDB7" fill-rule="evenodd" d="M63.621 93.091c.16-.206.387-.389.468-.621.646-1.835 1.258-3.681 1.898-5.517.063-.181.249-.318.377-.477l-.389 4.236c-.104.12-.254.225-.304.364l-1.294 3.708c-.091.253-.265.479-.401.716-.121-.158-.337-.311-.347-.475-.038-.642-.011-1.289-.008-1.934z" clip-rule="evenodd"></path> <path fill="#DBDAC7" fill-rule="evenodd" d="M63.977 95.501c.136-.237.31-.463.401-.716l1.294-3.708c.05-.14.201-.244.304-.364l.01 2.78-.931 2.387-1.078-.379z" clip-rule="evenodd"></path> <path fill="#EBE9DC" fill-rule="evenodd" d="M65.055 95.88l.931-2.387.192 2.824-1.123-.437z" clip-rule="evenodd"></path> <path fill="#CECDB7" fill-rule="evenodd" d="M66.646 85.554c-.149-.646.099-1.158.547-1.602l.258.176-.805 1.426z" clip-rule="evenodd"></path> <path fill="#4FAA41" fill-rule="evenodd" d="M64.242 73.542l-.05-.009-.051.008.119-.427-.018.428z" clip-rule="evenodd"></path> </svg>
                </div>
                <div className="tool-name">
                  <h1>mongodb</h1>
                </div>
              </div>
              
              <div className="tool">
                <div className="tool-icon">
                  <img src="https://img.icons8.com/?size=100&id=33039&format=png&color=000000" alt="" />
                </div>
                <div className="tool-name">
                  <h1>AWS</h1>
                </div>
              </div>

              <div className="tool">
                <div className="tool-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" id="postman"> <path fill="#F36933" d="M18.855,6.049L18.855,6.049l-0.059,0.117l0.006,0.042V6.207l0.043,0.183c0,0.102-0.036,0.194-0.097,0.266h0.001l-0.031,0.087l0.054,0.109l0.084,0.03l0.106-0.05c0.099-0.119,0.16-0.273,0.16-0.442c0-0.111-0.027-0.216-0.074-0.31l-0.112-0.059L18.855,6.049L18.855,6.049z"></path> <polygon fill="#F36933" points="19.049 6.082 19.047 6.078 19.048 6.081 19.049 6.082"></polygon> <path fill="#F36933" d="M13.527,0.099C6.955-0.744,0.942,3.9,0.099,10.473c-0.843,6.572,3.8,12.584,10.373,13.429c6.574,0.843,12.588-3.802,13.429-10.374C24.745,6.955,20.101,0.943,13.527,0.099L13.527,0.099z M15.998,7.584c-0.232,0.003-0.441,0.097-0.593,0.25l-4.453,4.453l-0.949-0.95C14.392,6.961,15.183,6.919,15.998,7.584L15.998,7.584z M11.135,12.445l4.44-4.44c0.113-0.118,0.272-0.192,0.449-0.192c0.342,0,0.62,0.278,0.62,0.62c0,0.19-0.086,0.361-0.221,0.475l-0.001,0.001l-4.699,4.125L11.135,12.445L11.135,12.445z M11.466,13.139l-1.1,0.238l-0.013,0.001l-0.054-0.033l-0.008-0.029l0.018-0.044l0.645-0.644L11.466,13.139L11.466,13.139z M8.662,12.68l1.172-1.172l0.879,0.878l-1.979,0.426l-0.019,0.002l-0.067-0.04l-0.011-0.039L8.662,12.68L8.662,12.68z M5.016,18.737L5.016,18.737l-0.069-0.075v-0.008l0.022-0.046h0.002l0.946-0.946l1.222,1.222L5.016,18.737L5.016,18.737z M7.442,17.483L7.442,17.483l-0.124,0.202l0.006,0.056v-0.002l0.203,0.864l0.004,0.031l-0.125,0.125l-0.09-0.038H7.314l-1.228-1.229l3.763-3.758l1.82-0.394l0.874,0.874C11.287,15.316,9.571,16.415,7.442,17.483L7.442,17.483z M12.72,14.054h-0.002l-0.839-0.839l4.699-4.125l0.116-0.125l0.002-0.002C16.549,10.308,14.669,12.208,12.72,14.054L12.72,14.054z M17.662,8.126c-0.502,0-0.957-0.203-1.286-0.532h0.001l-0.003-0.002c-0.328-0.329-0.531-0.784-0.531-1.285c0-1.006,0.816-1.822,1.822-1.822c0.446,0,0.854,0.159,1.17,0.426l-0.003-0.002l-1.61,1.612l-0.036,0.084l0.036,0.085l1.247,1.246C18.234,8.056,17.956,8.126,17.662,8.126L17.662,8.126z M18.956,7.594c-0.081,0.08-0.169,0.151-0.265,0.214l-0.006,0.004h-0.001l-1.207-1.207l1.533-1.532C19.671,5.792,19.646,6.905,18.956,7.594L18.956,7.594z"></path> <path fill="#D45B2C" d="M8.715,12.813l-0.067-0.04l-0.011-0.039l0.024-0.055l1.172-1.172l0.879,0.878l-1.979,0.426L8.715,12.813L8.715,12.813z M10.952,12.287l-0.949-0.95c3.179-3.17,4.471-4.066,5.251-4.066c0.297,0,0.52,0.13,0.745,0.313c-0.232,0.003-0.441,0.097-0.593,0.25L10.952,12.287L10.952,12.287z M11.986,0C6.039,0,0.876,4.418,0.099,10.473C-0.39,14.28,0.964,17.9,3.466,20.436l1.688-1.688l-0.139-0.01v0.001l-0.069-0.076v-0.008l0.022-0.046h0.002l0.946-0.946l0.161,0.161l0.17-0.17l-0.162-0.162l3.763-3.758l0.409-0.088l0.312-0.312l-0.203,0.044l-0.013,0.001l-0.054-0.033l-0.008-0.029l0.018-0.044l0.645-0.644l0.161,0.161l0.182-0.182l-0.161-0.161l4.44-4.44c0.113-0.118,0.272-0.192,0.449-0.192c0.021,0,0.042,0.001,0.062,0.003l0.257-0.256c-0.309-0.326-0.5-0.768-0.5-1.252c0-1.006,0.816-1.822,1.822-1.822c0.446,0,0.854,0.159,1.17,0.426l-0.003-0.002l-1.61,1.612l-0.036,0.084l0.032,0.077l3.216-3.216c-1.806-1.788-4.193-3.019-6.908-3.367C13.009,0.032,12.495,0,11.986,0L11.986,0z"></path> </svg>                
                </div>
                <div className="tool-name">
                  <h1>post man</h1>
                </div>
              </div>
            </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} >
            <div className="title-container contact" style={{marginTop:"130px"}}>
              <h1 className='title' id='contact'>LET'S WORK</h1>
              <h1 className='title overlay' style={{left:"17.5%"}}>TOGETHER</h1>
            </div>
            </motion.div>
            <div className="form-div">
            <motion.div initial={{ opacity: 0, rotateY: 90 }} whileInView={{ opacity: 1, rotateY: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: false, amount: 0.3 }} >
              <form  onSubmit={handleSubmit}>
              <label htmlFor="">
                name
                <input type="text" placeholder='your name' name="name" value={formData.name} onChange={handleChange} required/>
              </label>
              <label htmlFor="">
                email
                <input type="text" placeholder='your email' name="email" value={formData.email} onChange={handleChange} />
              </label>
              <label htmlFor="" style={{width:"100%"}}>
                company
                <input type="text" placeholder='your email'/>
              </label>
              <label htmlFor="" style={{width:"100%",height:"80px"}}>
                message
                <textarea name="message" placeholder='message' id=""style={{height:"80px"}} value={formData.message} onChange={handleChange} required />
              </label>
              <button type="submit">send message</button>
              </form>
              </motion.div>
            </div>
            <ToastContainer/>
            {/* <div className="empty-div">

            </div> */}



          </div>
        </div>
      </div>   
    {/* <footer>
      <p>thank you for visiting my portfolio</p>
      </footer> */}
    </main>





    </>
      </motion.div>
        )}
        </div>
  )
}

export default App
