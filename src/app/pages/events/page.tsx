"use client"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Shell from "@/components/navbar/shell"
import {
  CalendarCheck,
  Stethoscope,
  GraduationCap,
  HelpingHand,
  HeartHandshake,
  X,
  Calendar,
  MapPin,
  Users,
  Sparkles,
  ArrowRight,
  Search,
  Heart,
  Star,
} from "lucide-react"
import Footer from "@/components/navbar/footer"
import clsx from "clsx"

const allEvents: any[] = [
  {
    title: "Back-to-School Drive",
    date: "2025-08-12",
    location: "Quezon City",
    description: "Distributing school supplies and uniforms to underprivileged children to support their education.",
    icon: <GraduationCap className="w-6 h-6" />,
    time: "8:00 AM - 5:00 PM",
    participants: "500+ families",
    category: "Education",
    image: "/back2school.jpg",
    color: "#22C55E",
    impact: "Supporting 500+ students",
  },
  {
    title: "Community Health Fair",
    date: "2025-09-09",
    location: "Cavite",
    description: "Offering free check-ups, dental care, and health education to underserved communities.",
    icon: <Stethoscope className="w-6 h-6" />,
    time: "7:00 AM - 4:00 PM",
    participants: "300+ patients",
    category: "Healthcare",
    image: "/communityHealthEvents.jpg",
    color: "#EF4444",
    impact: "300+ health screenings",
  },
  {
    title: "Youth Leadership Camp",
    date: "2025-10-21",
    location: "Batangas",
    description: "Empowering young leaders with workshops, team-building activities, and skill development.",
    icon: <CalendarCheck className="w-6 h-6" />,
    time: "9:00 AM - 6:00 PM",
    participants: "100+ youth",
    category: "Leadership",
    image: "/youthLeadershipEvents.jpg",
    color: "#8B5CF6",
    impact: "100+ future leaders",
  },
  {
    title: "Livelihood Skills Workshop",
    date: "2024-11-15",
    location: "Davao City",
    description: "Teaching practical skills like sewing, cooking, and freelancing to promote economic independence.",
    icon: <HelpingHand className="w-6 h-6" />,
    time: "10:00 AM - 3:00 PM",
    participants: "50+ participants",
    category: "Skills Development",
    image: "/livelyhoodEvents.jpg",
    color: "#F59E0B",
    impact: "50+ new skills learned",
  },
  {
    title: "Gift of Giving Day",
    date: "2024-12-20",
    location: "Manila",
    description: "Christmas outreach with food packs, toys, medical support, and holiday celebrations for families.",
    icon: <HeartHandshake className="w-6 h-6" />,
    time: "6:00 AM - 8:00 PM",
    participants: "1000+ families",
    category: "Community Outreach",
    image: "/giftEvents.jpg",
    color: "#F3954A",
    impact: "1000+ families served",
  },
]

const categories = ["All", "Education", "Healthcare", "Leadership", "Skills Development", "Community Outreach"]

export default function EventsPage() {
  const pathname = usePathname()
  const [selectedTab, setSelectedTab] = useState<"upcoming" | "past">("upcoming")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null)
  const [showModal, setShowModal] = useState(false)

  // Hash navigation effect - for tab switching
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "")
      // Handle tab switching from navbar dropdown
      if (hash === "upcoming" || hash === "past") {
        setSelectedTab(hash as "upcoming" | "past")
      }
      // Close modal when navigating
      setShowModal(false)
      setSelectedEvent(null)
    }

    // Check hash on initial load
    handleHashChange()

    // Listen for hash changes (from navbar dropdown clicks)
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  // Update URL hash when tab changes
  const handleTabChange = (tab: "upcoming" | "past") => {
    setSelectedTab(tab)
    // Update URL hash without triggering page scroll
    window.history.replaceState(null, "", `#${tab}`)
  }

  // Filter events
  const today = new Date()
  const filteredEvents = allEvents.filter((event) => {
    const isUpcoming = selectedTab === "upcoming" ? new Date(event.date) >= today : new Date(event.date) < today
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    return isUpcoming && matchesCategory && matchesSearch
  })

  const bubbles = [
    {
      className: "top-1/3 left-8 w-14 h-14",
      colors: "from-[#F3954A]/25 to-orange-300/35",
      animation: "animate-float-1",
    },
    {
      className: "bottom-1/20 left-8 w-14 h-14",
      colors: "from-[#F3954A]/25 to-orange-300/35",
      animation: "animate-float-1",
    },
    {
      className: "top-1/2 right-12 w-11 h-11",
      colors: "from-[#2A61AC]/30 to-blue-300/30",
      animation: "animate-bounce-slow delay-500",
    },
    {
      className: "top-2/3 left-1/3 w-13 h-13",
      colors: "from-amber-300/25 to-orange-200/35",
      animation: "animate-float-2 delay-800",
    },
    {
      className: "top-3/4 right-3/4 w-13 h-13",
      colors: "from-[#F3954A]/35 to-amber-300/35",
      animation: "animate-float-3 delay-300",
    },
    {
      className: "top-1/8 left-8 w-10 h-10",
      colors: "from-[#F3954A]/25 to-orange-300/35",
      animation: "animate-float-1",
    },
    {
      className: "top-1/6 right-12 w-15 h-15",
      colors: "from-[#2A61AC]/30 to-blue-300/30",
      animation: "animate-bounce-slow delay-500",
    },
    {
      className: "top-2/5 left-1/3 w-11 h-11",
      colors: "from-amber-300/25 to-orange-200/35",
      animation: "animate-float-2 delay-800",
    },
    {
      className: "top-4/10 right-3/4 w-9 h-9",
      colors: "from-[#F3954A]/35 to-amber-300/35",
      animation: "animate-float-3 delay-300",
    },
    {
      className: "bottom-1/20 right-1/4 w-10 h-10",
      colors: "from-[#2A61AC]/35 to-amber-300/35",
      animation: "animate-float-3 delay-300",
    },
    {
      className: "top-3/6 right-1/4 w-9 h-9",
      colors: "from-[#F3954A]/35 to-amber-300/35",
      animation: "animate-float-3 delay-300",
    },
    {
      className: "bottom-1/6 right-2/4 w-10 h-10",
      colors: "from-[#2A61AC]/35 to-amber-300/35",
      animation: "animate-float-3 delay-300",
    },
  ]

  return (
    <Shell>
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-gray-50 to-white overflow-hidden mt-10">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {bubbles.map((b, idx) => (
              <div
                key={idx}
                className={clsx("absolute rounded-full", b.className, "bg-gradient-to-br", b.colors, b.animation)}
              ></div>
            ))}
          </div>
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <div className="flex items-center justify-center gap-2 mb-4 mt-10">
                  <Sparkles className="h-6 w-6 text-[#F3954A]" />
                  <span className="text-[#F3954A] font-semibold uppercase tracking-wide text-sm">Our Events</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Community Events</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Engaging communities through action, learning, and care. Join us in making a difference.
                </p>
              </motion.div>

              {/* Tab Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center gap-4 mb-8"
              >
                {(["upcoming", "past"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
                      selectedTab === tab
                        ? "bg-[#F3954A] text-white shadow-lg"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
                  </button>
                ))}
              </motion.div>

              {/* Search and Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-2xl mx-auto -mb-10"
              >
                <div className="relative flex-1 w-full md:w-auto border-2 border-black rounded-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-full text-black"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border-2 border-black rounded-full text-black  bg-transparent transition-all"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}> 
                      {category}
                    </option>
                  ))}
                </select>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Events Content - Single Section that changes based on tab */}
        <section className="py-16 bg-white" id="upcoming">
          <div className="container mx-auto px-4 max-w-7xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-12">
                  <h2 className="py-10 text-2xl md:text-2xl lg:text-8xl font-black bg-gradient-to-r from-orange-500 via-violet-500 to-blue-600 bg-clip-text text-transparent">
                    {selectedTab === "upcoming" ? "Upcoming Events" :  "Past Events"}
                  </h2>
                  <p className="text-lg text-gray-600 mt-5">
                    {selectedTab === "upcoming"
                      ? "Join us in our upcoming community initiatives"
                      : "Celebrating our community impact and achievements"}
                  </p>
                </div>
                <EventsGrid
                  events={filteredEvents}
                  onEventClick={(event) => {
                    setSelectedEvent(event)
                    setShowModal(true)
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Enhanced Modal */}
        <AnimatePresence>
          {showModal && selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-300 shadow-lg"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>

                {/* Modal Header */}
                <div className="relative h-64 overflow-hidden rounded-t-3xl">
                  <img
                    src={selectedEvent.image || "/placeholder.svg"}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 rounded-xl" style={{ backgroundColor: `${selectedEvent.color}20` }}>
                        <div style={{ color: selectedEvent.color }}>{selectedEvent.icon}</div>
                      </div>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                        {selectedEvent.category}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold">{selectedEvent.title}</h2>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">{selectedEvent.description}</p>

                  {/* Event Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Calendar className="w-5 h-5 text-[#F3954A]" />
                        <span className="font-semibold text-gray-900">Date & Time</span>
                      </div>
                      <p className="text-gray-600 mb-1">
                        {new Date(selectedEvent.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-gray-600">{selectedEvent.time}</p>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <MapPin className="w-5 h-5 text-[#F3954A]" />
                        <span className="font-semibold text-gray-900">Location</span>
                      </div>
                      <p className="text-gray-600">{selectedEvent.location}</p>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Users className="w-5 h-5 text-[#F3954A]" />
                        <span className="font-semibold text-gray-900">Expected Participants</span>
                      </div>
                      <p className="text-gray-600">{selectedEvent.participants}</p>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Heart className="w-5 h-5 text-[#F3954A]" />
                        <span className="font-semibold text-gray-900">Expected Impact</span>
                      </div>
                      <p className="text-gray-600">{selectedEvent.impact}</p>
                    </div>
                  </div>

                  {/* Registration Form */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Star className="w-6 h-6 text-[#F3954A]" />
                      Register for This Event
                    </h3>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F3954A]/20 focus:border-[#F3954A] transition-all focus:outline-none"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                          <input
                            type="email"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F3954A]/20 focus:border-[#F3954A] transition-all focus:outline-none"
                            placeholder="you@email.com"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                          <input
                            type="tel"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F3954A]/20 focus:border-[#F3954A] transition-all focus:outline-none"
                            placeholder="+63 XXX XXX XXXX"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Organization (Optional)
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F3954A]/20 focus:border-[#F3954A] transition-all focus:outline-none"
                            placeholder="Your organization"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Special Requirements</label>
                        <textarea
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F3954A]/20 focus:border-[#F3954A] transition-all resize-none focus:outline-none"
                          placeholder="Any dietary restrictions, accessibility needs, etc."
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          type="button"
                          className="flex-1 bg-[#F3954A] hover:bg-[#F3954A]/90 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
                          onClick={() => setShowModal(false)}
                        >
                          Register for Event
                          <ArrowRight className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          className="flex-1 border-2 border-[#F3954A] text-[#F3954A] hover:bg-[#F3954A] hover:text-white px-8 py-4 rounded-xl font-semibold bg-transparent transition-all duration-300"
                        >
                          Make a Donation
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </Shell>
  )
}

// Events Grid Component
function EventsGrid({ events, onEventClick }: { events: any[]; onEventClick: (event: any) => void }) {
  if (events.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Calendar className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-400 mb-2">No events found</h3>
        <p className="text-gray-500">Check back later for more events!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event, index) => (
        <motion.div
          key={event.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="group cursor-pointer"
          onClick={() => onEventClick(event)}
        >
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
            <div className="relative h-48 overflow-hidden">
              <img
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-4 right-4">
                <span
                  className="px-3 py-1 text-xs font-semibold rounded-full text-white"
                  style={{ backgroundColor: event.color }}
                >
                  {event.category}
                </span>
              </div>
              <div className="absolute bottom-4 left-4">
                <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                  <div style={{ color: event.color }}>{event.icon}</div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#F3954A] transition-colors">
                {event.title}
              </h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-[#F3954A]" />
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-[#F3954A]" />
                  {event.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4 text-[#F3954A]" />
                  {event.participants}
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{event.description}</p>
              <button className="w-full py-3 bg-[#F3954A] hover:bg-[#F3954A]/90 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2">
                Learn More
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
