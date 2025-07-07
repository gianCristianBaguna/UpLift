// components/home-sections/aboutSection.tsx
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const mockAboutData = [
  {
    title: "CHILDREN AND YOUTH",
    subtitle:
      "VALUES: Values Advocacy and Literacy Upliftment through Education and Sharing",
    image: "/uplift-kids.jpg",
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
    image: "/uplift-family.jpg",
    items: [
      "Livelihood programs",
      "Build better homes",
      "Relief and food aid",
    ],
  },
  {
    title: "COMMUNITY",
    subtitle: "Medical, Environmental, and Local Empowerment",
    image: "/uplift-community.jpg",
    items: [
      "Medical missions",
      "Environmental programs",
      "Community gardens",
    ],
  },
];

export default function AboutSection() {
  const [index, setIndex] = useState(0);
  const current = mockAboutData[index];

  const nextSlide = () => setIndex((prev) => (prev + 1) % mockAboutData.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + mockAboutData.length) % mockAboutData.length);

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#1d74c1] to-[#3da9e0] flex flex-col justify-center items-center px-6 text-white py-12">
      <div className="relative w-full max-w-6xl">
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-0 -translate-y-1/2 text-white hover:opacity-60 z-10"
          aria-label="Previous"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-0 -translate-y-1/2 text-white hover:opacity-60 z-10"
          aria-label="Next"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 items-center bg-[#1c5091] bg-opacity-90 rounded-2xl p-6 md:p-12 shadow-lg"
          >
            <div className="flex justify-center items-center h-64 md:h-80 bg-gray-200 rounded-xl">
              <Image
                src={current.image}
                alt={current.title}
                width={400}
                height={300}
                className="rounded-lg object-cover"
              />
            </div>

            <div className="mt-8 md:mt-0 md:pl-10 text-left">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
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
              <button className="mt-6 px-5 py-2 bg-orange-400 text-white font-semibold rounded-full hover:bg-orange-500 transition">
                Learn More
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-center space-x-2">
        {mockAboutData.map((_, i) => (
          <span
            key={i}
            className={`w-8 h-1 rounded-full transition-opacity duration-300 ${
              i === index ? "bg-white opacity-60" : "bg-white opacity-30"
            }`}
          ></span>
        ))}
      </div>
    </section>
  );
}