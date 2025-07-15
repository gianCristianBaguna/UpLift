"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// Data
const mockAboutData = [
  {
    title: "CHILDREN AND YOUTH",
    subtitle:
      "VALUES: Values Advocacy and Literacy Upliftment through Education and Sharing",
    image: "/chi-and-yo.png",
    items: [
      "School supplies distribution",
      "Improvement of school libraries",
      "Feeding program",
      "Sports and Music",
      "Mobile library",
      "Scholarship",
    ],
  },
  {
    title: "FAMILY",
    subtitle: "Strengthening Families through Sustainable Support",
    image: "/fam.png",
    items: ["Livelihood programs", "Build better homes", "Relief and food aid"],
  },
  {
    title: "COMMUNITY",
    subtitle: "Medical, Environmental, and Local Empowerment",
    image: "/community.png",
    items: ["Medical missions", "Environmental programs", "Community gardens"],
  },
];

const slideVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 100 : -100,
    scale: 0.95,
  }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -100 : 100,
    scale: 0.95,
  }),
};

export default function AboutSection() {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const current = mockAboutData[index];

  useEffect(() => {
    if (isInView) {
      setIsVisible(false);
      const timeout = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timeout);
    }
  }, [isInView]);

  const paginate = (dir: number) => {
    setIndex(([i]) => [
      (i + dir + mockAboutData.length) % mockAboutData.length,
      dir,
    ]);
  };

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 text-white py-16 overflow-hidden bg-gradient-to-b from-[#2A61AC] to-gray-50 rounded-2xl "
    >

      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white/80 hover:text-white hover:scale-110 transition-transform z-20"
        aria-label="Previous"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-6 h-6"
        >
          <path
            d="M10 4L6 8L10 12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        onClick={() => paginate(1)}
        className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white/80 hover:text-white hover:scale-110 transition-transform z-20"
        aria-label="Next"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-6 h-6"
        >
          <path
            d="M6 4L10 8L6 12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

   
      <div className="relative w-full max-w-6xl z-10">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-2 items-center bg-[#1c5091]/90 rounded-2xl p-6 md:p-12 shadow-2xl"
          >

            <div className="relative h-64 md:h-80 overflow-hidden rounded-xl">
              <Image
                src={current.image}
                alt={current.title}
                fill
                priority
                className="object-cover"
              />
            </div>

            <div className="mt-8 md:mt-0 md:pl-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                {current.title}
              </h2>
              <p className="text-orange-400 font-semibold mt-2 mb-4">
                {current.subtitle}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm md:text-base">
                {current.items.map((item, i) => (
                  <p key={i} className="font-semibold">
                    {item}
                  </p>
                ))}
              </div>
              <button className="mt-6 px-6 py-2 bg-orange-400 hover:bg-orange-500 transition rounded-full font-semibold">
                Learn More
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>


      <div className="mt-6 flex items-center justify-center space-x-2 z-10">
        {mockAboutData.map((_, i) => (
          <button
            key={i}
            onClick={() => paginate(i - index)}
            className={`w-8 h-1 rounded-full transition-opacity duration-300 ${
              i === index ? "bg-white opacity-70" : "bg-white opacity-30"
            }`}
          ></button>
        ))}
      </div>
    </motion.section>
  );
}
