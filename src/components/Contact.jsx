import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "JavaScript Mastery",
          from_email: form.email,
          to_email: "sujata@jsmastery.pro",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden px-3 sm:px-10">
      {/* Left Section - Form Container */}
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="ml-auto mr-auto flex-[0.75] bg-gradient-to-r from-gray-900 to-black p-8 sm:p-10 rounded-2xl shadow-lg border border-gray-700 flex flex-col items-center justify-center"
      >
        <p className="text-gray-400 text-lg">Get in touch</p>
        <h3 className="text-white text-3xl font-bold mb-6 text-center">Contact Me</h3>

        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6 w-full items-center">
          <label className="flex flex-col w-[85%] sm:w-[75%] lg:w-[70%]">
            <span className="text-white font-medium mb-2">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="bg-gray-800 py-3 px-4 text-white rounded-md outline-none border border-gray-600 focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          <label className="flex flex-col w-[85%] sm:w-[75%] lg:w-[70%]">
            <span className="text-white font-medium mb-2">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="bg-gray-800 py-3 px-4 text-white rounded-md outline-none border border-gray-600 focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          <label className="flex flex-col w-[85%] sm:w-[75%] lg:w-[70%]">
            <span className="text-white font-medium mb-2">Your Message</span>
            <textarea
              rows={4}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Enter your message"
              className="bg-gray-800 py-3 px-4 text-white rounded-md outline-none border border-gray-600 focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 transition-all py-2 px-6 rounded-md text-white font-semibold shadow-md mb-3"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      {/* Right Section - Earth Animation */}
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
