import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className="bg-white shadow-lg border border-gray-200 rounded-xl p-6 sm:p-8 w-full sm:w-[350px] lg:w-[400px] min-h-[220px]" // Increased height
  >
    {/* Quote Symbol */}
    <p className="text-gray-500 font-extrabold text-[42px] leading-none">“</p>

    {/* Testimonial Content */}
    <p className="text-gray-700 text-[16px] leading-relaxed mt-2">
      {testimonial}
    </p>

    {/* Profile Section */}
    <div className="mt-6 flex items-center gap-4">
      <img
        src={image}
        alt={`feedback_by-${name}`}
        className="w-14 h-14 rounded-full object-cover border border-gray-300"
      />
      <div>
        <p className="text-gray-900 font-semibold text-[16px]">
          {name}
        </p>
        <p className="text-gray-500 text-[14px]">
          {designation} at <span className="font-semibold">{company}</span>
        </p>
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  return (
    <div className="mt-12 bg-gray-100 py-12 rounded-xl">
      {/* Section Header */}
      <div className="text-center mb-10">
        <motion.div variants={textVariant()}>
          <p className="text-gray-500 text-lg uppercase tracking-wide">
            What Others Say
          </p>
          <h2 className="text-gray-900 text-3xl font-bold">
            Testimonials
          </h2>
        </motion.div>
      </div>

      {/* Testimonial Cards Grid */}
      <div className="flex flex-wrap justify-center gap-6 px-4 sm:px-10">
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
