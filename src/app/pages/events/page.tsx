"use client"
import Shell from "@/components/navbar/shell"
import { usePathname } from "next/navigation"
import { useState, useEffect, type JSX } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
  CalendarCheck,
  Stethoscope,
  GraduationCap,
  HelpingHand,
  HeartHandshake,
  X,
  Calendar,
  MapPin,
  Clock,
  Users,
  Sparkles,
} from "lucide-react"
import dynamic from "next/dynamic"

const LottiePlayer = dynamic(() => import("@lottiefiles/react-lottie-player").then((m) => m.Player), { ssr: false })

const allEvents: any[] = [
  {
    title: "Back-to-School Drive",
    date: "2025-08-12",
    location: "Quezon City",
    description: "Distributing school supplies and uniforms to underprivileged children.",
    icon: <GraduationCap className="w-6 h-6 text-[#F3954A]" />,
    time: "8:00 AM - 5:00 PM",
    participants: "500+ families",
    category: "Education",
    image: "/gallery/gallery5.png",
  },
  {
    title: "Community Health Fair",
    date: "2025-09-09",
    location: "Cavite",
    description: "Offering free check-ups, dental care, and health education.",
    icon: <Stethoscope className="w-6 h-6 text-[#F3954A]" />,
    time: "7:00 AM - 4:00 PM",
    participants: "300+ patients",
    category: "Healthcare",
    image: "/gallery/gallery4.png",
  },
  {
    title: "Youth Leadership Camp",
    date: "2025-10-21",
    location: "Batangas",
    description: "Empowering young leaders with workshops and team-building.",
    icon: <CalendarCheck className="w-6 h-6 text-[#F3954A]" />,
    time: "9:00 AM - 6:00 PM",
    participants: "100+ youth",
    category: "Leadership",
    image: "/gallery/gallery3.png",
  },
  {
    title: "Livelihood Skills Workshop",
    date: "2024-11-15",
    location: "Davao City",
    description: "Teaching practical skills like sewing and freelancing.",
    icon: <HelpingHand className="w-6 h-6 text-[#F3954A]" />,
    time: "10:00 AM - 3:00 PM",
    participants: "50+ participants",
    category: "Skills Development",
    image: "/gallery/gallery2.png",
  },
  {
    title: "Gift of Giving Day",
    date: "2024-12-20",
    location: "Manila",
    description: "Christmas outreach with food packs, toys, and medical support.",
    icon: <HeartHandshake className="w-6 h-6 text-[#F3954A]" />,
    time: "6:00 AM - 8:00 PM",
    participants: "1000+ families",
    category: "Community Outreach",
    image: "/gallery/gallery1.png",
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
  hover: {
    y: -10,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: {
      duration: 0.3,
    },
  },
}

export default function EventsPage() {
  const pathname = usePathname()
  const [selectedTab, setSelectedTab] = useState<"upcoming" | "past">("upcoming")

  type EventType = {
    title: string
    date: string
    location: string
    description: string
    icon: JSX.Element
    time: string
    participants: string
    category: string
    image: string
  }

  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null)
  const [showModal, setShowModal] = useState(false)

  const today = new Date()
  const filteredEvents = allEvents.filter((e) =>
    selectedTab === "upcoming" ? new Date(e.date) >= today : new Date(e.date) < today,
  )

  useEffect(() => {
    setSelectedTab("upcoming")
    setShowModal(false)
    setSelectedEvent(null)
  }, [pathname])

  return (
    <Shell key={pathname}>
      <section className="relative w-full min-h-screen overflow-hidden">
        {/* Extended Banner Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#F3954A]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#2A61AC]/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F3954A]/5 rounded-full blur-3xl animate-pulse delay-500"></div>
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(243,149,74,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(243,149,74,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          {/* Floating particles */}
          <div className="absolute top-20 left-10 w-2 h-2 bg-[#F3954A]/30 rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-[#2A61AC]/30 rounded-full animate-bounce delay-700"></div>
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-[#F3954A]/40 rounded-full animate-bounce delay-1000"></div>
        </div>

        {/* Extended Hero Banner */}
        <div className="relative -mx-4 px-4 py-32 mb-16 bg-gradient-to-r from-[#F3954A]/10 via-transparent to-[#2A61AC]/10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent"></div>
          <div className="relative text-center space-y-6 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <h1 className="text-7xl mt-20 lg:text-8xl font-bold bg-gradient-to-r from-[#F3954A] via-[#ff7b3d] to-white bg-clip-text text-transparent">
                Events
              </h1>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-[#F3954A]/10 rounded-full blur-3xl"></div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            >
              Engaging communities through action, learning, and care
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-32 h-1 bg-gradient-to-r from-[#F3954A] to-[#ff7b3d] mx-auto rounded-full"
            ></motion.div>

            {/* Enhanced Tab Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex justify-center gap-6 pt-12"
            >
              {(["upcoming", "past"] as const).map((tab) => (
                <motion.button
                  key={tab}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTab(tab)}
                  className={`relative px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 backdrop-blur-xl border-2 ${
                    selectedTab === tab
                      ? "bg-[#2A61AC]/20 border-[#2A61AC] text-[#2A61AC] shadow-lg shadow-[#2A61AC]/20"
                      : "bg-gray-800/40 border-gray-700/50 text-white hover:border-[#F3954A]/50 hover:bg-[#F3954A]/10"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {selectedTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[#2A61AC]/10 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Enhanced Events Grid */}
        <div className="px-4 pb-20 text-white">
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event, i) => (
                <motion.div
                  key={event.title}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover="hover"
                  className="group cursor-pointer"
                  onClick={() => {
                    setSelectedEvent(event)
                    setShowModal(true)
                  }}
                >
                  <div className="relative bg-gray-800/30 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-700/50 hover:border-[#F3954A]/30 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-[#F3954A]/10 h-full">
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#F3954A]/5 via-transparent to-gray-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Event Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={event.image || "/placeholder.svg?height=200&width=400&query=event"}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#F3954A]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-[#2A61AC] to-[#1e4a8c] rounded-full text-white shadow-lg backdrop-blur-sm">
                          {event.category}
                        </span>
                      </div>

                      {/* Icon Overlay */}
                      <div className="absolute bottom-4 left-4">
                        <div className="p-3 rounded-2xl bg-black/60 backdrop-blur-sm border border-[#F3954A]/30">
                          {event.icon}
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 p-6 h-full flex flex-col">
                      {/* Title */}
                      <h3 className="text-xl font-bold text-white group-hover:text-[#F3954A] transition-colors duration-300 leading-tight mb-4">
                        {event.title}
                      </h3>

                      {/* Event Details */}
                      <div className="space-y-3 mb-6 flex-1">
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                          <Calendar className="w-4 h-4 text-[#F3954A]" />
                          <span className="font-medium">
                            {new Date(event.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-gray-300">
                          <Clock className="w-4 h-4 text-[#F3954A]" />
                          <span className="font-medium">{event.time}</span>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-gray-300">
                          <MapPin className="w-4 h-4 text-[#F3954A]" />
                          <span className="font-medium">{event.location}</span>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-gray-300">
                          <Users className="w-4 h-4 text-[#F3954A]" />
                          <span className="font-medium">{event.participants}</span>
                        </div>

                        <p className="text-sm text-gray-400 leading-relaxed pt-2">{event.description}</p>
                      </div>

                      {/* CTA Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="self-start px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-white flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        Register Now
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
              <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-12 h-12 text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-400 mb-2">No events found</h3>
              <p className="text-gray-500">
                {selectedTab === "upcoming" ? "Stay tuned for upcoming events!" : "Check back for past events."}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Enhanced Responsive Modal */}
      <AnimatePresence mode="wait">
        {showModal && selectedEvent && (
          <motion.div
            key="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              key="modal-content"
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative bg-gray-900/95 backdrop-blur-xl text-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-700/50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 md:top-6 md:right-6 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all duration-300 hover:scale-110 z-10"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Modal Header with Image */}
              <div className="relative h-48 md:h-64 overflow-hidden rounded-t-3xl">
                <Image
                  src={selectedEvent.image || "/placeholder.svg?height=300&width=800&query=event"}
                  alt={selectedEvent.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 md:p-4 rounded-2xl bg-black/60 backdrop-blur-sm border border-[#F3954A]/30">
                      {selectedEvent.icon}
                    </div>
                    <span className="px-3 py-1 text-sm font-medium bg-[#2A61AC]/80 text-white rounded-full backdrop-blur-sm">
                      {selectedEvent.category}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedEvent.title}</h2>
                </div>
              </div>

              <div className="p-4 md:p-8">
                {/* Description */}
                <p className="text-gray-300 leading-relaxed mb-6 text-sm md:text-base">{selectedEvent.description}</p>

                {/* Event Details Grid - Responsive */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                  <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 border border-gray-700/50">
                    <div className="flex items-center gap-2 md:gap-3 mb-2">
                      <Calendar className="w-4 h-4 md:w-5 md:h-5 text-[#F3954A]" />
                      <span className="text-xs md:text-sm font-medium text-gray-400">Date</span>
                    </div>
                    <p className="text-white font-semibold text-sm md:text-base">
                      {new Date(selectedEvent.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 border border-gray-700/50">
                    <div className="flex items-center gap-2 md:gap-3 mb-2">
                      <Clock className="w-4 h-4 md:w-5 md:h-5 text-[#F3954A]" />
                      <span className="text-xs md:text-sm font-medium text-gray-400">Time</span>
                    </div>
                    <p className="text-white font-semibold text-sm md:text-base">{selectedEvent.time}</p>
                  </div>

                  <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 border border-gray-700/50">
                    <div className="flex items-center gap-2 md:gap-3 mb-2">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#F3954A]" />
                      <span className="text-xs md:text-sm font-medium text-gray-400">Location</span>
                    </div>
                    <p className="text-white font-semibold text-sm md:text-base">{selectedEvent.location}</p>
                  </div>

                  <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 border border-gray-700/50">
                    <div className="flex items-center gap-2 md:gap-3 mb-2">
                      <Users className="w-4 h-4 md:w-5 md:h-5 text-[#F3954A]" />
                      <span className="text-xs md:text-sm font-medium text-gray-400">Expected</span>
                    </div>
                    <p className="text-white font-semibold text-sm md:text-base">{selectedEvent.participants}</p>
                  </div>
                </div>

                {/* Registration Form - Responsive */}
                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-[#F3954A]" />
                    Join the Event
                  </h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                        <input
                          type="text"
                          className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-white placeholder-gray-400 focus:border-[#F3954A]/50 focus:ring-2 focus:ring-[#F3954A]/20 transition-all duration-300"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                        <input
                          type="email"
                          className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-white placeholder-gray-400 focus:border-[#F3954A]/50 focus:ring-2 focus:ring-[#F3954A]/20 transition-all duration-300"
                          placeholder="you@email.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-white placeholder-gray-400 focus:border-[#F3954A]/50 focus:ring-2 focus:ring-[#F3954A]/20 transition-all duration-300"
                          placeholder="+63 XXX XXX XXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Organization (Optional)</label>
                        <input
                          type="text"
                          className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-white placeholder-gray-400 focus:border-[#F3954A]/50 focus:ring-2 focus:ring-[#F3954A]/20 transition-all duration-300"
                          placeholder="Your organization"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Special Requirements</label>
                      <textarea
                        rows={3}
                        className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-white placeholder-gray-400 focus:border-[#F3954A]/50 focus:ring-2 focus:ring-[#F3954A]/20 transition-all duration-300 resize-none"
                        placeholder="Any dietary restrictions, accessibility needs, etc."
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="w-full bg-gradient-to-r from-[#2A61AC] to-[#1e4a8c] hover:from-[#1e4a8c] hover:to-[#2A61AC] text-white font-semibold rounded-xl py-3 md:py-4 transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base"
                    >
                      Register for Event
                    </motion.button>
                  </form>
                </div>

                {/* Support Section */}
                <div className="pt-4 md:pt-6 border-t border-gray-700/50">
                  <p className="text-xs md:text-sm text-gray-400 text-center mb-3 md:mb-4">
                    Want to support our mission even more?
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#F3954A] to-[#ff7b3d] hover:from-[#ff7b3d] hover:to-[#F3954A] text-white font-semibold py-3 md:py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base"
                  >
                    Make a Donation
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Shell>
  )
}
