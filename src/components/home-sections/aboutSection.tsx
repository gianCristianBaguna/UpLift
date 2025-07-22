"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  CalendarDays,
  MapPin,
  HelpCircle,
  Users,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Heart,
  Target,
} from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const eventData = [
  {
    id: 1,
    image: "/event1.png",
    what: "Make a Change – Save A Life",
    when: "May 23, 2025",
    where: "Interface, Don Salvador, Los Confianza",
    why: "Because every life matters.",
    who: "Volunteers, donors, local health workers",
    category: "Health Mission",
  },
  {
    id: 2,
    image: "/event2.png",
    what: "Free Medical Mission",
    when: "September 10, 8 AM – 5 PM",
    where: "La Castellana",
    why: "Your health, our priority.",
    who: "Medical, Minor Surgery, Dental, Pediatrics, Gynecology, Health Expo",
    category: "Community Care",
  },
];

const mockAboutData = [
  {
    title: "CHILDREN AND YOUTH",
    subtitle:
      "VALUES: Values Advocacy and Literacy Upliftment through Education and Sharing",
    image: "/gallery/gallery1.png",
    items: [
      "School supplies distribution",
      "Improvement of school libraries",
      "Feeding program",
      "Sports and Music",
      "Mobile library",
      "Scholarship",
    ],
    icon: <Sparkles className="w-8 h-8" />,
    gradient: "from-[#F3954A] to-[#ff7b3d]",
  },
  {
    title: "FAMILY",
    subtitle: "Strengthening Families through Sustainable Support",
    image: "/gallery/gallery9.png",
    items: ["Livelihood programs", "Build better homes", "Relief and food aid"],
    icon: <Heart className="w-8 h-8" />,
    gradient: "from-[#F3954A] to-[#e8844a]",
  },
  {
    title: "COMMUNITY",
    subtitle: "Medical, Environmental, and Local Empowerment",
    image: "/gallery/gallery7.png",
    items: ["Medical missions", "Environmental programs", "Community gardens"],
    icon: <Target className="w-8 h-8" />,
    gradient: "from-[#F3954A] to-[#d17a42]",
  },
];

const slideVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 100 : -100,
    scale: 0.95,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -100 : 100,
    scale: 0.95,
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ModernSection() {
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [[aboutIndex, direction], setAboutIndex] = useState([0, 0]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const currentAbout = mockAboutData[aboutIndex];

  useEffect(() => {
    if (isInView) {
      setIsVisible(false);
      const timeout = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timeout);
    }
  }, [isInView]);

  const handleEventPrev = () =>
    setActiveEventIndex((i) => (i - 1 + eventData.length) % eventData.length);
  const handleEventNext = () =>
    setActiveEventIndex((i) => (i + 1) % eventData.length);

  const paginateAbout = (dir: number) =>
    setAboutIndex(([i]) => [
      (i + dir + mockAboutData.length) % mockAboutData.length,
      dir,
    ]);

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white py-20 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#F3954A]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#F3954A]/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F3954A]/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(243,149,74,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(243,149,74,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* About Section - Single Card Carousel */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-6xl font-bold text-[#F3954A] mb-4">
            Our Impact Areas
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transforming communities through targeted programs that create
            lasting change
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#F3954A] to-[#ff7b3d] mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={aboutIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-gray-800/30 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50 shadow-xl">
                {/* Image Section */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F3954A]/20 to-[#ff7b3d]/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  <div className="relative h-60 lg:h-72 w-full overflow-hidden rounded-xl shadow-lg border border-gray-700/30">
                    <Image
                      src={currentAbout.image || "/placeholder.svg"}
                      alt={currentAbout.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#F3954A]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col justify-center space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`p-2 rounded-xl bg-gradient-to-r ${currentAbout.gradient} shadow-md`}
                    >
                      {currentAbout.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white leading-snug">
                        {currentAbout.title}
                      </h3>
                      <div className="h-1 w-16 bg-gradient-to-r from-[#F3954A] to-[#ff7b3d] rounded-full mt-1"></div>
                    </div>
                  </div>
                  <p className="text-base text-gray-300 italic font-medium leading-snug">
                    {currentAbout.subtitle}
                  </p>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                  >
                    {currentAbout.items.map((item, i) => (
                      <motion.div
                        key={i}
                        variants={itemVariants}
                        className="flex items-center gap-2 p-2 rounded-lg bg-gray-800/40 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/40 hover:border-[#F3954A]/30 transition-all duration-300 group"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-[#F3954A] to-[#ff7b3d] rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                        <span className="text-sm text-gray-200 group-hover:text-white transition-colors duration-300">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={() => paginateAbout(-1)}
            className="absolute -left-16 top-1/2 -translate-y-1/2 z-20 bg-gray-800/60 hover:bg-[#F3954A] backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110 border border-gray-700/50 hover:border-[#F3954A]/50 group"
          >
            <ChevronLeft className="text-white w-6 h-6 group-hover:text-white transition-colors duration-300" />
          </button>
          <button
            onClick={() => paginateAbout(1)}
            className="absolute -right-16 top-1/2 -translate-y-1/2 z-20 bg-gray-800/60 hover:bg-[#F3954A] backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110 border border-gray-700/50 hover:border-[#F3954A]/50 group"
          >
            <ChevronRight className="text-white w-6 h-6 group-hover:text-white transition-colors duration-300" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {mockAboutData.map((_, i) => (
              <button
                key={i}
                onClick={() => setAboutIndex([i, i > aboutIndex ? 1 : -1])}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === aboutIndex
                    ? "bg-gradient-to-r from-[#F3954A] to-[#ff7b3d] scale-125 shadow-lg shadow-[#F3954A]/30"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Events Section - Multi-Card Carousel with Blurred Sides */}
      <div className="container mx-auto px-6 mt-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#F3954A] via-[#ff7b3d] to-white bg-clip-text text-transparent mb-4">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join us in making a difference in our community
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#F3954A] to-[#ff7b3d] mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* Multi-Card Carousel */}
        <div className="relative max-w-7xl mx-auto overflow-hidden">
          <div className="flex items-center justify-center">
            {/* Navigation Button Left */}
            <button
              onClick={handleEventPrev}
              className="z-20 bg-gray-800/60 hover:bg-[#2A61AC] backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110 border border-gray-700/50 hover:border-[#2A61AC]/50 group mr-4"
            >
              <ChevronLeft className="text-white w-6 h-6 group-hover:text-white transition-colors duration-300" />
            </button>

            {/* Cards Container */}
            <div className="flex items-center gap-6 px-4">
              {eventData.map((event, index) => {
                const isActive = index === activeEventIndex;
                const isPrev =
                  index ===
                  (activeEventIndex - 1 + eventData.length) % eventData.length;
                const isNext =
                  index === (activeEventIndex + 1) % eventData.length;
                const isVisible = isActive || isPrev || isNext;

                if (!isVisible) return null;

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: isActive ? 1 : 0.3,
                      scale: isActive ? 1 : 0.85,
                      filter: isActive ? "blur(0px)" : "blur(2px)",
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`${
                      isActive ? "z-10" : "z-0"
                    } transition-all duration-500 cursor-pointer`}
                    onClick={() => setActiveEventIndex(index)}
                  >
                    <div
                      className={`${
                        isActive ? "w-96" : "w-80"
                      } transition-all duration-500`}
                    >
                      <EventCard event={event} isActive={isActive} />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation Button Right */}
            <button
              onClick={handleEventNext}
              className="z-20 bg-gray-800/60 hover:bg-[#2A61AC] backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110 border border-gray-700/50 hover:border-[#2A61AC]/50 group ml-4"
            >
              <ChevronRight className="text-white w-6 h-6 group-hover:text-white transition-colors duration-300" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {eventData.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveEventIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === activeEventIndex
                    ? "bg-gradient-to-r from-[#2A61AC] to-[#1e4a8c] scale-125 shadow-lg shadow-[#2A61AC]/30"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

type EventType = {
  id: number;
  image: string;
  what: string;
  when: string;
  where: string;
  why: string;
  who: string;
  category: string;
};

function EventCard({
  event,
  isActive,
}: {
  event: EventType;
  isActive: boolean;
}) {
  return (
    <motion.div
      whileHover={isActive ? { y: -8, scale: 1.02 } : {}}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`group relative bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 text-white shadow-2xl border border-gray-700/50 hover:border-[#F3954A]/30 overflow-hidden h-[500px] flex flex-col ${
        isActive ? "cursor-default" : "cursor-pointer"
      }`}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F3954A]/5 via-transparent to-gray-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Category Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-[#F3954A] to-[#ff7b3d] rounded-full text-white shadow-lg">
          {event.category}
        </span>
      </div>

      {/* Image */}
      <div className="relative h-48 w-full rounded-xl overflow-hidden shadow-xl border border-gray-700/30 mb-4">
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.what}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#F3954A]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-3 tracking-tight leading-tight group-hover:text-[#F3954A] transition-colors duration-300">
          {event.what}
        </h3>
        <div className="space-y-2 mb-4 flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-200 group-hover:text-gray-100 transition-colors duration-300">
            <CalendarDays className="w-4 h-4 text-[#F3954A]" />
            <span className="font-medium">{event.when}</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-gray-200 group-hover:text-gray-100 transition-colors duration-300">
            <MapPin className="w-4 h-4 text-[#F3954A] mt-0.5" />
            <span className="font-medium leading-relaxed">{event.where}</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-gray-200 group-hover:text-gray-100 transition-colors duration-300">
            <HelpCircle className="w-4 h-4 text-[#F3954A] mt-0.5" />
            <span className="font-medium leading-relaxed italic">
              {event.why}
            </span>
          </div>
          <div className="flex items-start gap-2 text-sm text-gray-200 group-hover:text-gray-100 transition-colors duration-300">
            <Users className="w-4 h-4 text-[#F3954A] mt-0.5" />
            <span className="font-medium leading-relaxed">{event.who}</span>
          </div>
        </div>
        {/* CTA Button */}
        {isActive && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="self-start bg-[#2A61AC] hover:bg-[#1e4a8c] px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl border border-[#2A61AC]/50 hover:border-[#2A61AC] text-white"
          >
            <a href="/pages/events">Learn More</a>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
