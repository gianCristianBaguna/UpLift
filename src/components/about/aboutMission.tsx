"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Eye, HeartHandshake, Flag, ArrowRight, Sparkles, Users, Target } from "lucide-react"

const missionData = [
  {
    id: "vision",
    title: "Our Vision",
    subtitle: "A World of Equal Opportunities",
    color: "#F3954A",
    bgGradient: "from-orange-50 to-orange-100",
    Icon: Eye,
    image: "/vision.jpg?height=400&width=600",
    text: "We envision a world where marginalized individuals have access to education, healthcare, and sustainable opportunities for growth and prosperity.",
    highlights: [
      "Equal Access to Education",
      "Universal Healthcare",
      "Sustainable Opportunities",
      "Community Empowerment",
    ],
  },
  {
    id: "mission",
    title: "Our Mission",
    subtitle: "Empowering Communities Through Action",
    color: "#2A61AC",
    bgGradient: "from-blue-50 to-blue-100",
    Icon: HeartHandshake,
    image: "/action.jpg?height=400&width=600",
    text: "We support marginalized communities by providing essential resources and services, empowering families through livelihood opportunities, quality education, and medical assistance.",
    highlights: ["Essential Resources", "Livelihood Programs", "Quality Education", "Medical Assistance"],
  },
  {
    id: "goal",
    title: "Our Goal",
    subtitle: "Building Thriving Communities",
    color: "#22C55E",
    bgGradient: "from-green-50 to-green-100",
    Icon: Flag,
    image: "/communities.jpg?height=400&width=600",
    text: "Foster thriving communities where children grow into leaders and seniors find dignity, creating a global movement that uplifts humanity across generations.",
    highlights: ["Future Leaders", "Senior Dignity", "Global Movement", "Generational Impact"],
  },
]

export default function AboutMission() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-white" id="mission-vission">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-[#F3954A]" />
            <span className="text-[#F3954A] font-semibold uppercase tracking-wide text-sm">About Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Purpose & Direction</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Driven by compassion and guided by purpose, we work tirelessly to create meaningful change in communities
            worldwide.
          </p>
        </motion.div>

        {/* Mission Cards */}
        <div className="space-y-20">
          {missionData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              {/* Image Section */}
              <div className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-80 lg:h-96 object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br opacity-20`}
                    style={{ backgroundColor: item.color }}
                  />

                  {/* Floating Icon */}
                  <div
                    className="absolute top-6 left-6 p-4 rounded-2xl shadow-lg backdrop-blur-sm"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <item.Icon className="h-8 w-8" style={{ color: item.color }} />
                  </div>

                  {/* Stats Overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold" style={{ color: item.color }}>
                            500+
                          </div>
                          <div className="text-sm text-gray-600">Lives Impacted</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold" style={{ color: item.color }}>
                            50+
                          </div>
                          <div className="text-sm text-gray-600">Communities</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl" style={{ backgroundColor: `${item.color}15` }}>
                      <item.Icon className="h-6 w-6" style={{ color: item.color }} />
                    </div>
                    <span className="font-semibold text-sm uppercase tracking-wide" style={{ color: item.color }}>
                      {item.title}
                    </span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{item.subtitle}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">{item.text}</p>
                </div>

                {/* Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {item.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-gray-700 font-medium text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <div className="pt-4">
                  <button
                    className="rounded-full px-8 py-3 font-semibold transition-all duration-300 hover:shadow-lg"
                    style={{
                      backgroundColor: item.color,
                      color: "white",
                    }}
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-24"
        >
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h3>
              <p className="text-gray-600 text-lg">Measuring our commitment to positive change</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-[#F3954A]">1,500+</div>
                <div className="text-gray-600 font-medium">Lives Transformed</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-[#2A61AC]">75+</div>
                <div className="text-gray-600 font-medium">Communities Served</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-[#22C55E]">200+</div>
                <div className="text-gray-600 font-medium">Active Volunteers</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-[#F3954A]">5+</div>
                <div className="text-gray-600 font-medium">Years of Service</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
