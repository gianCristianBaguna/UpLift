"use client";

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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

export default function ServicesSection() {
  const focusCards = [
    {
      title: "CHILDREN & YOUTH",
      icon: <GraduationCap className="w-10 h-10 transition-all duration-500" />,
      items: [
        { icon: <BookOpen className="w-4 h-4" />, text: "VALUES Advocacy" },
        { icon: <Backpack className="w-4 h-4" />, text: "School supplies" },
        { icon: <Utensils className="w-4 h-4" />, text: "Feeding program" },
        { icon: <LibraryBig className="w-4 h-4" />, text: "Mobile library" },
        {
          icon: <ArchiveRestore className="w-4 h-4" />,
          text: "Improve libraries",
        },
        { icon: <Trophy className="w-4 h-4" />, text: "Sports & Music" },
        { icon: <GraduationCap className="w-4 h-4" />, text: "Scholarship" },
      ],
    },
    {
      title: "FAMILY",
      icon: <Home className="w-10 h-10 transition-all duration-500" />,
      items: [
        { icon: <Briefcase className="w-4 h-4" />, text: "Livelihood" },
        { icon: <Hammer className="w-4 h-4" />, text: "Build better homes" },
        { icon: <Truck className="w-4 h-4" />, text: "Relief & food aid" },
      ],
    },
    {
      title: "COMMUNITY",
      icon: <Leaf className="w-10 h-10 transition-all duration-500" />,
      items: [
        { icon: <HeartPulse className="w-4 h-4" />, text: "Medical Mission" },
        { icon: <Leaf className="w-4 h-4" />, text: "Environmental programs" },
        { icon: <Sprout className="w-4 h-4" />, text: "Community gardens" },
      ],
    },
    {
      title: "ELDERLY",
      icon: <Soup className="w-10 h-10 transition-all duration-500" />,
      items: [
        { icon: <Home className="w-4 h-4" />, text: "Home visits" },
        { icon: <Sparkles className="w-4 h-4" />, text: "Make a Wish" },
        { icon: <HeartPulse className="w-4 h-4" />, text: "Free check-ups" },
        { icon: <Soup className="w-4 h-4" />, text: "Food assistance" },
      ],
    },
  ];

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {amount: 0.3 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedMobileCard, setExpandedMobileCard] = useState<number | null>(
    null
  );

  const handleArrow = (dir: string) => {
    // Close expanded card when navigating
    setExpandedMobileCard(null);

    if (dir === "left") {
      setActiveIndex((prev) => (prev === 0 ? focusCards.length - 1 : prev - 1));
    } else {
      setActiveIndex((prev) => (prev === focusCards.length - 1 ? 0 : prev + 1));
    }
  };

  const handleMobileCardClick = (index: number) => {
    setExpandedMobileCard(expandedMobileCard === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 -mt-2 mt-10 bg-gray-50 overflow-hidden"
    >
      <div className="absolute top-12 left-0 w-0 h-0 border-t-[60px] border-t-transparent border-b-[60px] border-b-transparent border-r-[100px] border-r-[#F3954A] opacity-80"></div>
      <div className="absolute top-10 left-10 w-0 h-0 border-t-[60px] border-t-transparent border-b-[60px] border-b-transparent border-r-[100px] border-r-[#2A61AC] opacity-80"></div>
      <div className="absolute bottom-10 right-0 w-0 h-0 border-t-[40px] border-t-transparent border-b-[40px] border-b-transparent border-l-[80px] border-l-[#F3954A] opacity-80"></div>
      <div className="absolute bottom-12 right-10 w-0 h-0 border-t-[40px] border-t-transparent border-b-[40px] border-b-transparent border-l-[80px] border-l-[#2A61AC] opacity-80"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-20 lg:pt-20 lg:mt-20 lg:max-w-md"
          >
            <h2 className="hidden lg:block text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-[#2A61AC] block">LEARN MORE</span>
              <span className="text-[#2A61AC] block">ABOUT OUR</span>
              <span className="text-[#F3954A] block drop-shadow-[2px_4px_0_#2A61AC]">
                FOCUS
              </span>
            </h2>

            <div className="mt-30 justify-center text-center">
              <a
                href="/pages/donation"
                className="hidden lg:inline-block drop-shadow-[2px_4px_0_#2A61AC] bg-[#F3954A] text-white text-lg font-semibold px-10 py-4 rounded-full shadow-lg hover:bg-[#e07f2f] transition-transform transform hover:scale-105 duration-300"
              >
                Donate Now
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="lg:hidden text-center mb-8">
              <h2 className="text-4xl font-bold leading-tight">
                <span className="text-[#2A61AC] block">LEARN MORE</span>
                <span className="text-[#2A61AC] block">ABOUT OUR</span>
                <span className="text-[#F3954A] block drop-shadow-[2px_4px_0_#2A61AC]">
                  FOCUS
                </span>
              </h2>
            </div>
            {/* Mobile Carousel */}
            <div className="relative lg:hidden">
              <div className="overflow-hidden w-full">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${activeIndex * 100}%)`,
                  }}
                >
                  {focusCards.map((card, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-2">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className={`relative bg-gradient-to-br from-[#fff] to-[#fdf7f2] rounded-2xl border border-gray-200 shadow-lg transition-all duration-500 cursor-pointer overflow-hidden ${
                          expandedMobileCard === index
                            ? "min-h-[28rem]"
                            : "min-h-[20rem]"
                        }`}
                        onClick={() => handleMobileCardClick(index)}
                      >
                        {/* Collapsed State */}
                        <div
                          className={`absolute inset-0 flex flex-col items-center justify-center z-10 transition-all duration-500 p-6 ${
                            expandedMobileCard === index
                              ? "opacity-0 pointer-events-none"
                              : "opacity-100"
                          }`}
                        >
                          <div className="text-[#2A61AC] mb-4">{card.icon}</div>
                          <h3 className="text-[#F3954A] text-xl font-bold text-center">
                            {card.title}
                          </h3>
                          <p className="text-[#2A61AC] text-sm mt-2 opacity-70">
                            Tap to learn more
                          </p>
                        </div>

                        {/* Expanded State */}
                        <div
                          className={`absolute inset-0 p-6 transition-all duration-500 flex flex-col ${
                            expandedMobileCard === index
                              ? "opacity-100"
                              : "opacity-0 pointer-events-none"
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-6">
                            <div className="text-[#F3954A] transform scale-110">
                              {card.icon}
                            </div>
                            <h3 className="text-[#2A61AC] font-bold text-xl">
                              {card.title}
                            </h3>
                          </div>

                          <div className="flex-1 overflow-y-auto">
                            <ul className="space-y-3">
                              {card.items.map((item, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={
                                    expandedMobileCard === index
                                      ? { opacity: 1, x: 0 }
                                      : { opacity: 0, x: -10 }
                                  }
                                  transition={{ delay: i * 0.1, duration: 0.3 }}
                                  className="flex items-center gap-3 text-[#2A61AC] bg-white/50 rounded-lg p-3"
                                >
                                  <span className="text-[#F3954A] flex-shrink-0">
                                    {item.icon}
                                  </span>
                                  <span className="text-sm font-medium">
                                    {item.text}
                                  </span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          <div className="mt-4 text-center">
                            <p className="text-[#2A61AC] text-xs opacity-70">
                              Tap to close
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={() => handleArrow("left")}
                  className="text-[#2A61AC] hover:text-[#1f4d94] p-2 rounded-full transition-all duration-200"
                  aria-label="Previous card"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="flex gap-2">
                  {focusCards.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveIndex(index);
                        setExpandedMobileCard(null);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === activeIndex
                          ? "bg-[#F3954A] w-6"
                          : "bg-gray-300"
                      }`}
                      aria-label={`Go to card ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => handleArrow("right")}
                  className="text-[#2A61AC] hover:text-[#1f4d94] p-2 rounded-full transition-all duration-200"
                  aria-label="Next card"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              <div className="flex justify-center mt-6 lg:hidden">
                <a
                  href="/pages/donation"
                  className="inline-block drop-shadow-[2px_4px_0_#2A61AC] bg-[#F3954A] text-white text-lg font-semibold px-10 py-4 rounded-full shadow-lg hover:bg-[#e07f2f] transition-transform transform hover:scale-105 duration-300"
                >
                  Donate Now
                </a>
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-8">
              {focusCards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative bg-gradient-to-br from-[#fff] to-[#fdf7f2] rounded-xl border border-gray-200 shadow-md transition-all duration-500 group cursor-pointer overflow-hidden h-[18rem]"
                >
                  <div className="absolute inset-0 p-4 h-full">
                    {/* Default visible state */}
                    <div className="z-10 group-hover:opacity-0 transition-all duration-500 w-full h-full flex flex-col justify-center items-center text-center">
                      <div className="text-[#2A61AC] mb-2">{card.icon}</div>
                      <h3 className="text-[#F3954A] text-base font-bold">
                        {card.title}
                      </h3>
                    </div>

                    {/* Hover state */}
                    <div className="absolute inset-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 flex flex-col justify-start items-start text-left h-full bg-white/90">
                      <div className="text-[#F3954A] mb-2 transform group-hover:scale-110 transition-all duration-300">
                        {card.icon}
                      </div>
                      <h3 className="text-[#2A61AC] font-bold text-base mb-2">
                        {card.title}
                      </h3>
                      <ul className="space-y-1 w-full  pr-1 max-h-[8rem]">
                        {card.items.map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-start gap-2 text-sm text-[#2A61AC]"
                          >
                            <span className="text-[#F3954A]">{item.icon}</span>
                            <span>{item.text}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
