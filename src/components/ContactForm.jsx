import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_qxyrp28",
        "template_g03w4n6",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "l5XSBPEe_2s74Cs0J"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          if (response.status == 200) {
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
          } else {
            toast.error("failed to send", {
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
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="section-title mt-[130px] max-[920px]:mt-[80px] max-[426px]:mt-[60px]">
          <h1 className="title-main" id="contact">LET&apos;S WORK</h1>
          <h1 className="title-overlay" style={{ left: "17.5%" }}>TOGETHER</h1>
        </div>
      </motion.div>

      <div className="-mt-12 w-[95%] max-[920px]:w-full max-[920px]:px-2 mb-20">
        <motion.div
          initial={{ opacity: 0, rotateY: 90 }}
          whileInView={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-y-4">
            <label className="w-[45%] p-2 max-[640px]:w-full">
              name
              <input
                type="text"
                placeholder="your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2 h-[38px] w-full rounded-[5px] border border-gray-500 bg-input-bg pl-4 text-white"
              />
            </label>
            <label className="w-[45%] p-2 max-[640px]:w-full">
              email
              <input
                type="text"
                placeholder="your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 h-[38px] w-full rounded-[5px] border border-gray-500 bg-input-bg pl-4 text-white"
              />
            </label>
            <label className="w-full p-2">
              company
              <input
                type="text"
                placeholder="your company"
                className="mt-2 h-[38px] w-full rounded-[5px] border border-gray-500 bg-input-bg pl-4 text-white"
              />
            </label>
            <label className="w-full p-2">
              message
              <textarea
                name="message"
                placeholder="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-2 h-24 w-full resize-none rounded-[5px] border border-gray-500 bg-input-bg pl-4 pt-3 text-white"
              />
            </label>
            <button
              type="submit"
              className="mx-2 mt-4 h-11 w-full rounded-[7px] border border-white bg-purple-accent text-lg cursor-pointer"
            >
              send message
            </button>
          </form>
        </motion.div>
      </div>
    </>
  );
}

export default ContactForm;
