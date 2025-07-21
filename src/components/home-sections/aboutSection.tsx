"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
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
} from "lucide-react"
import { motion, AnimatePresence, useInView } from "framer-motion"

const eventData = [
  {
    id: 1,
    image: "/placeholder.svg?height=300&width=400",
    what: "Make a Change – Save A Life",
    when: "May 23, 2025",
    where: "Interface, Don Salvador, Los Confianza",
    why: "Because every life matters.",
    who: "Volunteers, donors, local health workers",
    category: "Health Mission",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=300&width=400",
    what: "Free Medical Mission",
    when: "September 10, 8 AM – 5 PM",
    where: "La Castellana",
    why: "Your health, our priority.",
    who: "Medical, Minor Surgery, Dental, Pediatrics, Gynecology, Health Expo",
    category: "Community Care",
  },
]

const mockAboutData = [
  {
    title: "CHILDREN AND YOUTH",
    subtitle: "VALUES: Values Advocacy and Literacy Upliftment through Education and Sharing",
    image: "/placeholder.svg?height=400&width=500",
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
    image: "/placeholder.svg?height=400&width=500",
    items: ["Livelihood programs", "Build better homes", "Relief and food aid"],
    icon: <Heart className="w-8 h-8" />,
    gradient: "from-[#F3954A] to-[#e8844a]",
  },
  {
    title: "COMMUNITY",
    subtitle: "Medical, Environmental, and Local Empowerment",
    image: "/placeholder.svg?height=400&width=500",
    items: ["Medical missions", "Environmental programs", "Community gardens"],
    icon: <Target className="w-8 h-8" />,
    gradient: "from-[#F3954A] to-[#d17a42]",
  },
]

const slideVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 100 : -100,
    scale: 0.95,
    rotateY: dir > 0 ? 15 : -15,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotateY: 0,
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -100 : 100,
    scale: 0.95,
    rotateY: dir > 0 ? -15 : 15,
  }),
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function ModernSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [cardWidth, setCardWidth] = useState(0)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [[index, direction], setIndex] = useState([0, 0])
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const current = mockAboutData[index]

  useEffect(() => {
    const measure = () => {
      if (wrapperRef.current) setCardWidth(wrapperRef.current.offsetWidth)
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  useEffect(() => {
    if (isInView) {
      setIsVisible(false)
      const timeout = setTimeout(() => setIsVisible(true), 100)
      return () => clearTimeout(timeout)
    }
  }, [isInView])

  const handlePrev = () => setActiveIndex((i) => (i - 1 + eventData.length) % eventData.length)
  const handleNext = () => setActiveIndex((i) => (i + 1) % eventData.length)

  const paginate = (dir: number) => setIndex(([i]) => [(i + dir + mockAboutData.length) % mockAboutData.length, dir])

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

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(243,149,74,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(243,149,74,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* About Section */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-gray-100 to-[#F3954A] bg-clip-text text-transparent mb-4">
            Our Impact Areas
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transforming communities through targeted programs that create lasting change
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#F3954A] to-[#ff7b3d] mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-gray-800/30 backdrop-blur-xl p-8 lg:p-12 rounded-3xl border border-gray-700/50 shadow-2xl">
                {/* Image Section */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F3954A]/20 to-[#ff7b3d]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative h-80 lg:h-96 w-full overflow-hidden rounded-2xl shadow-2xl border border-gray-700/30">
                    <Image
                      src={current.image || "/placeholder.svg"}
                      alt={current.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#F3954A]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col justify-center space-y-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-r ${current.gradient} shadow-lg`}>
                      {current.icon}
                    </div>
                    <div>
                      <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-white">{current.title}</h3>
                      <div className="h-1 w-20 bg-gradient-to-r from-[#F3954A] to-[#ff7b3d] rounded-full mt-2"></div>
                    </div>
                  </div>

                  <p className="text-lg text-gray-300 leading-relaxed italic font-medium">{current.subtitle}</p>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                    {current.items.map((item, i) => (
                      <motion.div
                        key={i}
                        variants={itemVariants}
                        className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/40 backdrop-blur-sm border border-gray-700/40 hover:bg-gray-700/40 hover:border-[#F3954A]/30 transition-all duration-300 group"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-[#F3954A] to-[#ff7b3d] rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                        <span className="text-sm lg:text-base font-medium text-gray-200 group-hover:text-white transition-colors duration-300">
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
            onClick={() => paginate(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-gray-800/60 hover:bg-[#2A61AC] backdrop-blur-sm rounded-full p-4 transition-all duration-300 hover:scale-110 border border-gray-700/50 hover:border-[#2A61AC]/50 group"
          >
            <ChevronLeft className="text-white w-6 h-6 group-hover:text-white transition-colors duration-300" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-gray-800/60 hover:bg-[#2A61AC] backdrop-blur-sm rounded-full p-4 transition-all duration-300 hover:scale-110 border border-gray-700/50 hover:border-[#2A61AC]/50 group"
          >
            <ChevronRight className="text-white w-6 h-6 group-hover:text-white transition-colors duration-300" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {mockAboutData.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex([i, i > index ? 1 : -1])}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === index
                    ? "bg-gradient-to-r from-[#F3954A] to-[#ff7b3d] scale-125 shadow-lg shadow-[#F3954A]/30"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Events Section */}
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
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Join us in making a difference in our community</p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#F3954A] to-[#ff7b3d] mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* Desktop Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="hidden sm:grid sm:grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {eventData.map((event, i) => (
            <motion.div key={event.id} variants={itemVariants}>
              <EventCard event={event} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Carousel */}
        <div className="sm:hidden flex items-center justify-center gap-4 mt-10" ref={wrapperRef}>
          <button
            onClick={handlePrev}
            className="bg-gray-800/60 hover:bg-[#2A61AC] backdrop-blur-sm rounded-full p-3 transition-all duration-300 border border-gray-700/50"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <div className="overflow-hidden w-full max-w-sm">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * cardWidth}px)` }}
            >
              {eventData.map((event) => (
                <div key={event.id} style={{ width: cardWidth }} className="flex-shrink-0 px-2">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handleNext}
            className="bg-gray-800/60 hover:bg-[#2A61AC] backdrop-blur-sm rounded-full p-3 transition-all duration-300 border border-gray-700/50"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </motion.section>
  )
}

type EventType = {
  id: number
  image: string
  what: string
  when: string
  where: string
  why: string
  who: string
  category: string
}

function EventCard({ event }: { event: EventType }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative bg-gray-800/40 backdrop-blur-xl rounded-3xl p-6 text-white shadow-2xl h-full flex flex-col border border-gray-700/50 hover:border-[#F3954A]/30 overflow-hidden"
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
      <div className="relative h-48 sm:h-56 lg:h-64 w-full mb-6 rounded-2xl overflow-hidden shadow-xl border border-gray-700/30">
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
        <h3 className="text-2xl lg:text-3xl font-bold mb-4 tracking-tight leading-tight group-hover:text-[#F3954A] transition-colors duration-300">
          {event.what}
        </h3>

        <div className="space-y-3 mb-6 flex-1">
          <div className="flex items-center gap-3 text-sm lg:text-base text-gray-200 group-hover:text-gray-100 transition-colors duration-300">
            <div className="p-2 rounded-lg bg-[#F3954A]/20 border border-[#F3954A]/30">
              <CalendarDays className="w-4 h-4 text-[#F3954A]" />
            </div>
            <span className="font-medium">{event.when}</span>
          </div>

          <div className="flex items-start gap-3 text-sm lg:text-base text-gray-200 group-hover:text-gray-100 transition-colors duration-300">
            <div className="p-2 rounded-lg bg-[#F3954A]/20 border border-[#F3954A]/30 mt-0.5">
              <MapPin className="w-4 h-4 text-[#F3954A]" />
            </div>
            <span className="font-medium leading-relaxed">{event.where}</span>
          </div>

          <div className="flex items-start gap-3 text-sm lg:text-base text-gray-200 group-hover:text-gray-100 transition-colors duration-300">
            <div className="p-2 rounded-lg bg-[#F3954A]/20 border border-[#F3954A]/30 mt-0.5">
              <HelpCircle className="w-4 h-4 text-[#F3954A]" />
            </div>
            <span className="font-medium leading-relaxed italic">{event.why}</span>
          </div>

          <div className="flex items-start gap-3 text-sm lg:text-base text-gray-200 group-hover:text-gray-100 transition-colors duration-300">
            <div className="p-2 rounded-lg bg-[#F3954A]/20 border border-[#F3954A]/30 mt-0.5">
              <Users className="w-4 h-4 text-[#F3954A]" />
            </div>
            <span className="font-medium leading-relaxed">{event.who}</span>
          </div>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="self-start bg-[#2A61AC] hover:bg-[#1e4a8c] px-6 py-3 rounded-2xl text-sm lg:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl border border-[#2A61AC]/50 hover:border-[#2A61AC] text-white"
        >
          Learn More
        </motion.button>
      </div>
    </motion.div>
  )
}
