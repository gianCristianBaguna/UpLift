"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Backpack,
  Utensils,
  LibraryBig,
  ArchiveRestore,
  Trophy,
  Home,
  Briefcase,
  Hammer,
  Truck,
  HeartPulse,
  Leaf,
  Sprout,
  Soup,
  Sparkles,
} from "lucide-react";

export default function FocusSection() {
  const focusCards = [
    {
      title: "Children & Youth",
      icon: <GraduationCap className="w-5 h-5" />,
      items: [
        { icon: <BookOpen className="w-4 h-4" />, text: "VALUES Advocacy" },
        { icon: <Backpack className="w-4 h-4" />, text: "School supplies" },
        { icon: <Utensils className="w-4 h-4" />, text: "Feeding program" },
        { icon: <LibraryBig className="w-4 h-4" />, text: "Mobile library" },
        { icon: <ArchiveRestore className="w-4 h-4" />, text: "Improve libraries" },
        { icon: <Trophy className="w-4 h-4" />, text: "Sports & Music" },
        { icon: <GraduationCap className="w-4 h-4" />, text: "Scholarship" },
      ],
    },
    {
      title: "Family",
      icon: <Home className="w-5 h-5" />,
      items: [
        { icon: <Briefcase className="w-4 h-4" />, text: "Livelihood" },
        { icon: <Hammer className="w-4 h-4" />, text: "Build better homes" },
        { icon: <Truck className="w-4 h-4" />, text: "Relief & food aid" },
      ],
    },
    {
      title: "Community",
      icon: <Leaf className="w-5 h-5" />,
      items: [
        { icon: <HeartPulse className="w-4 h-4" />, text: "Medical Mission" },
        { icon: <Leaf className="w-4 h-4" />, text: "Environmental programs" },
        { icon: <Sprout className="w-4 h-4" />, text: "Community gardens" },
      ],
    },
    {
      title: "Elderly",
      icon: <Soup className="w-5 h-5" />,
      items: [
        { icon: <Home className="w-4 h-4" />, text: "Home visits" },
        { icon: <Sparkles className="w-4 h-4" />, text: "Make a Wish" },
        { icon: <HeartPulse className="w-4 h-4" />, text: "Free check-ups" },
        { icon: <Soup className="w-4 h-4" />, text: "Food assistance" },
      ],
    },
  ];

  const [focusIndex, setFocusIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFocusIndex((prev) => (prev + 1) % focusCards.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 px-4 bg-white text-center overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false, amount: 0.5 }}
          className="text-[#2A61AC] text-bold text-4xl md:text-5xl font-[Montserrat] mb-12"
        >
          <span>OUR </span>
          <span className="text-[#F3954A]">FOCUS</span>
        </motion.h2>

        {/* Mobile view: 1 card at a time */}
        <div className="block md:hidden flex items-center justify-center gap-2">
          {/* Left arrow */}
          <button
            onClick={() =>
              setFocusIndex((prev) =>
                prev === 0 ? focusCards.length - 1 : prev - 1
              )
            }
            className="text-[#2A61AC] hover:text-[#1f4d94] opacity-40"
            aria-label="Previous card"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Focus card */}
          <motion.div
            key={focusIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 max-w-xs bg-blue-100 bg-opacity-80 backdrop-blur-md rounded-lg shadow-md p-5 flex flex-col gap-2 text-left"
          >
            <h3 className="text-lg font-semibold text-[#2A61AC] flex items-center gap-2 justify-center">
              {focusCards[focusIndex].icon} {focusCards[focusIndex].title}
            </h3>
            <ul className="text-sm text-gray-800 space-y-1">
              {focusCards[focusIndex].items.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  {item.icon} {item.text}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right arrow */}
          <button
            onClick={() =>
              setFocusIndex((prev) =>
                prev === focusCards.length - 1 ? 0 : prev + 1
              )
            }
            className="text-[#2A61AC] hover:text-[#1f4d94] opacity-40"
            aria-label="Next card"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Desktop view: all cards in grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {focusCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
              className="bg-blue-100 bg-opacity-80 backdrop-blur-md rounded-lg shadow-md hover:shadow-xl transition duration-300 p-5 flex flex-col gap-2 text-left"
            >
              <h3 className="text-lg font-semibold text-[#2A61AC] flex items-center gap-2">
                {card.icon} {card.title}
              </h3>
              <ul className="text-sm text-gray-800 space-y-1">
                {card.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    {item.icon} {item.text}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
