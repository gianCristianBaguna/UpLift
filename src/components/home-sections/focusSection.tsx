"use client"
import { motion, AnimatePresence, useInView } from "framer-motion"
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
  ArrowRight,
  Users,
  Heart,
  Clock,
  X,
} from "lucide-react"
import { useRef, useState, useEffect } from "react"

export default function ServicesSection() {
  const focusAreas = [
    {
      id: "children",
      title: "Children & Youth",
      subtitle: "Building Tomorrow's Leaders",
      icon: <GraduationCap className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-200",
      textColor: "text-blue-600",
      accentColor: "bg-blue-500",
      description: "Empowering the next generation through education, nutrition, and opportunities for growth.",
      stats: { number: "2,500+", label: "Children Served" },
      programs: [
        {
          icon: <BookOpen className="w-5 h-5" />,
          name: "VALUES Advocacy",
          impact: "Building character",
        },
        {
          icon: <Backpack className="w-5 h-5" />,
          name: "School Supplies",
          impact: "Education support",
        },
        {
          icon: <Utensils className="w-5 h-5" />,
          name: "Feeding Program",
          impact: "Nutrition security",
        },
        {
          icon: <LibraryBig className="w-5 h-5" />,
          name: "Mobile Library",
          impact: "Reading access",
        },
        {
          icon: <ArchiveRestore className="w-5 h-5" />,
          name: "Library Improvement",
          impact: "Learning spaces",
        },
        {
          icon: <Trophy className="w-5 h-5" />,
          name: "Sports & Music",
          impact: "Talent development",
        },
        {
          icon: <GraduationCap className="w-5 h-5" />,
          name: "Scholarships",
          impact: "Higher education",
        },
      ],
    },
    {
      id: "family",
      title: "Family Support",
      subtitle: "Strengthening Family Bonds",
      icon: <Home className="w-8 h-8" />,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-200",
      textColor: "text-green-600",
      accentColor: "bg-green-500",
      description: "Supporting families with essential resources, housing improvements, and livelihood opportunities.",
      stats: { number: "800+", label: "Families Helped" },
      programs: [
        {
          icon: <Briefcase className="w-5 h-5" />,
          name: "Livelihood Programs",
          impact: "Economic stability",
        },
        {
          icon: <Hammer className="w-5 h-5" />,
          name: "Home Building",
          impact: "Safe housing",
        },
        {
          icon: <Truck className="w-5 h-5" />,
          name: "Relief & Food Aid",
          impact: "Emergency support",
        },
      ],
    },
    {
      id: "community",
      title: "Community Health",
      subtitle: "Caring for Our Neighbors",
      icon: <Heart className="w-8 h-8" />,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-200",
      textColor: "text-purple-600",
      accentColor: "bg-purple-500",
      description: "Promoting health, wellness, and environmental sustainability in our communities.",
      stats: { number: "1,200+", label: "People Reached" },
      programs: [
        {
          icon: <HeartPulse className="w-5 h-5" />,
          name: "Medical Missions",
          impact: "Healthcare access",
        },
        {
          icon: <Leaf className="w-5 h-5" />,
          name: "Environmental Programs",
          impact: "Sustainability",
        },
        {
          icon: <Sprout className="w-5 h-5" />,
          name: "Community Gardens",
          impact: "Food security",
        },
      ],
    },
    {
      id: "elderly",
      title: "Elderly Care",
      subtitle: "Honoring Our Elders",
      icon: <Clock className="w-8 h-8" />,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-200",
      textColor: "text-orange-600",
      accentColor: "bg-orange-500",
      description: "Providing compassionate care and support for our senior community members.",
      stats: { number: "400+", label: "Seniors Supported" },
      programs: [
        {
          icon: <Home className="w-5 h-5" />,
          name: "Home Visits",
          impact: "Personal care",
        },
        {
          icon: <Sparkles className="w-5 h-5" />,
          name: "Make a Wish",
          impact: "Joy & fulfillment",
        },
        {
          icon: <HeartPulse className="w-5 h-5" />,
          name: "Health Check-ups",
          impact: "Preventive care",
        },
        {
          icon: <Soup className="w-5 h-5" />,
          name: "Food Assistance",
          impact: "Nutritional support",
        },
      ],
    },
  ]

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { amount: 0.2 })
  const [hasAnimated, setHasAnimated] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])

  const [showVolunteerModal, setShowVolunteerModal] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const services = [
    "Minor surgeries",
    "Circumcision",
    "OB Gyne",
    "Pediatrics",
    "Dental",
    "Optometry",
    "Doctor (General practitioner)",
    "Registered Nurse",
    "Student Nurse",
    "Counselling",
    "Food Preparation",
    "Teaching and feeding program for children",
    "Haircut",
    "Massage",
    "Utilities/Handyman",
    "Support Staff",
  ]

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]))
  }

  return (
    <>
      <section
        ref={sectionRef}
        className="relative py-24 px-6 lg:px-8 mt-10 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
        id="impact"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent to-blue-50/30"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-orange-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-purple-200/20 to-green-200/20 rounded-full blur-3xl"></div>
        <div className="relative z-10 -mt-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-[#F3954A]/10 text-[#F3954A] px-6 py-3 rounded-full text-sm font-semibold mb-10 ">
              <Users className="w-4 h-4" />
              Our Impact Areas
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-[#2A61AC]">WHERE WE</span>
              <br />
              <span className="text-[#F3954A] drop-shadow-[3px_6px_0_#2A61AC]">MAKE A DIFFERENCE</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover how we're transforming lives across four key areas of community impact, creating lasting change
              through dedicated service and compassionate action.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {focusAreas.map((area, index) => (
              <button
                key={area.id}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  activeTab === index
                    ? `bg-gradient-to-r ${area.color} text-white shadow-2xl scale-105`
                    : "bg-white text-gray-600 hover:bg-gray-50 shadow-2xl hover:shadow-2xl"
                }`}
              >
                <span className={activeTab === index ? "text-white" : area.textColor}>{area.icon}</span>
                <span className="hidden sm:inline">{area.title}</span>
              </button>
            ))}
          </motion.div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-blue-400 rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className={`${focusAreas[activeTab].bgColor} p-8 lg:p-12`}>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div
                      className={`inline-flex items-center gap-3 ${focusAreas[activeTab].accentColor} text-white px-4 py-2 rounded-full`}
                    >
                      {focusAreas[activeTab].icon}
                      <span className="font-semibold">{focusAreas[activeTab].title}</span>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-800">{focusAreas[activeTab].subtitle}</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">{focusAreas[activeTab].description}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${focusAreas[activeTab].textColor}`}>
                        {focusAreas[activeTab].stats.number}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">{focusAreas[activeTab].stats.label}</div>
                    </div>
                    <div className="w-px h-12 bg-gray-300"></div>
                    <div className="text-sm text-gray-600">
                      Making measurable impact in our community through dedicated programs and initiatives.
                    </div>
                  </div>
                  <div className="pt-4">
                    <a
                      href="/pages/donation"
                      className="inline-flex items-center gap-2 bg-[#F3954A] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#e07f2f] transition-all duration-300 hover:scale-105 shadow-2xl"
                    >
                      Support This Cause
                    </a>
                  </div>
                </div>
                <div className="space-y-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-6">Our Programs</h4>
                  <div className="grid gap-4">
                    {focusAreas[activeTab].programs.map((program, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="relative overflow-hidden backdrop-blur-sm rounded-xl p-4 bg-white/80 group hover:shadow-md transition-all duration-300"
                      >
                        <div
                          className={`absolute inset-0 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-out pointer-events-none ${focusAreas[activeTab].accentColor}`}
                          style={{ zIndex: 0 }}
                        />
                        <div className="flex items-center gap-4 relative z-10">
                          <div
                            className={`${focusAreas[activeTab].accentColor} text-white p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}
                          >
                            {program.icon}
                          </div>
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-800 mb-1">{program.name}</h5>
                            <p className="text-sm text-gray-600">{program.impact}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-20"
          >
            <div className="bg-gradient-to-r from-[#2A61AC] to-[#F3954A] rounded-3xl p-12 text-white">
              <div className="max-w-3xl mx-auto space-y-6">
                <h3 className="text-3xl lg:text-4xl font-bold">Ready to Make a Difference?</h3>
                <p className="text-xl opacity-90">
                  Join us in creating lasting change in our community. Every contribution, no matter the size, helps us
                  expand our reach and deepen our impact.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <a
                    href="/pages/donation"
                    className="inline-flex items-center justify-center gap-2 bg-white text-[#2A61AC] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <Heart className="w-5 h-5" />
                    Donate Now
                  </a>
                  <button
                    onClick={() => setShowVolunteerModal(true)}
                    className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#2A61AC] transition-all duration-300 hover:scale-105"
                  >
                    <Users className="w-5 h-5" />
                    Volunteer With Us
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {showVolunteerModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative"
            >
              <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-[#2A61AC]" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Volunteer Registration Form</h3>
                  </div>
                </div>
                <button onClick={() => setShowVolunteerModal(false)} className="text-gray-400 hover:text-red-500 p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form
                className="p-6 space-y-8"
                onSubmit={(e) => {
                  e.preventDefault()
                  alert("Thank you for registering! We'll contact you soon.")
                  setShowVolunteerModal(false)
                  setSelectedServices([])
                }}
              >
                {/* Personal Information Section */}
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">I. PERSONAL INFORMATION</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                      <input
                        required
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A61AC]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sex *</label>
                      <select
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A61AC]"
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Birthday *</label>
                      <input
                        required
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A61AC]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Civil Status *</label>
                      <select
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A61AC]"
                      >
                        <option value="">Select</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                        <option value="widowed">Widowed</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                      <textarea
                        required
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A61AC]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Occupation *</label>
                      <input
                        required
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A61AC]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
                      <input
                        required
                        type="tel"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A61AC]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <input
                        required
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A61AC]"
                      />
                    </div>
                  </div>
                </div>

                {/* Services Section */}
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
                    II. PLEASE CHECK THE LIST OF SERVICE/S YOU WANT TO PROVIDE:
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {services.map((service) => (
                      <label
                        key={service}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedServices.includes(service)}
                          onChange={() => handleServiceToggle(service)}
                          className="w-4 h-4 text-[#2A61AC] border-gray-300 rounded focus:ring-[#2A61AC]"
                        />
                        <span className="text-sm text-gray-700">{service}</span>
                      </label>
                    ))}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Other skills and interest:</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A61AC]"
                        placeholder="Please specify..."
                      />
                    </div>
                  </div>
                </div>

                {/* Agreement Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      required
                      type="checkbox"
                      className="w-4 h-4 text-[#2A61AC] border-gray-300 rounded focus:ring-[#2A61AC] mt-1"
                    />
                    <span className="text-sm text-gray-700 leading-relaxed">
                      As a volunteer, I agree to abide by the rules and policies of the Foundation. I understand that I
                      am volunteering at my own risk and assume all the responsibilities and accountability in the
                      performance of my duties and functions as volunteer.
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowVolunteerModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#F3954A] hover:bg-[#e07f2f] text-white px-6 py-3 rounded-lg font-semibold transition-all"
                  >
                    Submit Registration
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
