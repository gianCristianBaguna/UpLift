"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Users, Flame, Heart, ShieldCheck, Home, Handshake, ArrowRight, Sparkles, Quote, Star } from "lucide-react"

const coreValues = [
  {
    icon: Users,
    title: "Unity",
    description: "Fostering a spirit of togetherness, shared purpose, and volunteerism.",
    image: "/unityAboutUs.jpg?height=300&width=400",
    color: "#F3954A",
  },
  {
    icon: Flame,
    title: "Passion",
    description: "Serving with sincerity, drive, and unwavering dedication.",
    image: "/passionAboutUs.jpg?height=300&width=400",
    color: "#E11D48",
  },
  {
    icon: Heart,
    title: "Love",
    description: "Expressing genuine care and compassion for those most in need.",
    image: "/loveAboutUs.jpg?height=300&width=400",
    color: "#DC2626",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description: "Upholding honesty and transparency in all that we do.",
    image: "/integrityAboutUs.jpg?height=300&width=400",
    color: "#2563EB",
  },
  {
    icon: Home,
    title: "Family",
    description: "Strengthening families as the foundation for resilient communities.",
    image: "/familyAboutUs.jpg?height=300&width=400",
    color: "#7C3AED",
  },
  {
    icon: Handshake,
    title: "Trust",
    description: "Nurturing growth through faith, values, and education.",
    image: "/trustAboutUs.jpg?height=300&width=400",
    color: "#059669",
  },
]

export default function AboutFocusSection() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const controls = useAnimation()

  // More sensitive viewport detection for earlier triggering
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-10% 0px -10% 0px", // Trigger when 10% of section is visible
  })

  // Separate ref for the image animation with even earlier trigger
  const imageInView = useInView(imageRef, {
    once: true,
    margin: "0px 0px -20% 0px", // Trigger when image is 20% from entering viewport
  })

  useEffect(() => {
    const hash = window.location.hash
    if (imageInView || hash === "#core") {
      controls.start({
        clipPath: "polygon(0 100%, 0 0, 100% 0, 100% 100%)",
        transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
      })
    }
  }, [imageInView, controls])

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50" id="core">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-[#F3954A]" />
            <span className="text-[#F3954A] font-semibold uppercase tracking-wide text-xs md:text-sm">
              Our Foundation
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">Why We Do This</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Empowering communities through compassion, guided by our core values and unwavering commitment to positive
            change.
          </p>
        </motion.div>

        {/* Hero Image with Mission Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 md:mb-24"
        >
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl">
            <img
              src="/upliftAboutUs.jpg?height=500&width=1200"
              alt="Community empowerment and compassion"
              className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-3xl mx-auto px-4 md:px-8 text-white">
                <Quote className="h-8 w-8 md:h-12 md:w-12 text-[#F3954A] mb-4 md:mb-6" />
                <blockquote className="text-lg md:text-2xl lg:text-3xl font-bold leading-relaxed mb-4 md:mb-6">
                  "At Uplift Foundation International, we believe in the ripple effect of kindness. Rooted in lived
                  experiences and guided by compassion."
                </blockquote>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#F3954A] rounded-full flex items-center justify-center">
                    <Heart className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm md:text-base">Our Mission</div>
                    <div className="text-xs md:text-sm opacity-90">Transforming lives through compassionate action</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mission Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16 md:mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#F3954A]/10 rounded-xl flex items-center justify-center mb-4 md:mb-6">
                <Star className="h-5 w-5 md:h-6 md:w-6 text-[#F3954A]" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Holistic Support</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                From granting seniors their heartfelt last wishes to bridging educational gaps for children, we offer
                comprehensive, lasting support.
              </p>
            </div>

            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#2A61AC]/10 rounded-xl flex items-center justify-center mb-4 md:mb-6">
                <Users className="h-5 w-5 md:h-6 md:w-6 text-[#2A61AC]" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Community Programs</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                Our programs include sustainable livelihood initiatives, emergency relief efforts, and accessible
                medical missions.
              </p>
            </div>

            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#22C55E]/10 rounded-xl flex items-center justify-center mb-4 md:mb-6">
                <Flame className="h-5 w-5 md:h-6 md:w-6 text-[#22C55E]" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Transformative Change</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                Through volunteer passion and community generosity, we spark potential and create lasting
                transformation.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Core Values Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mb-12 md:mb-16"
        >
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Our Core Values</h3>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Six fundamental principles that guide every action we take and every decision we make.
          </p>
          <div className="w-20 md:w-24 h-1 bg-[#F3954A] rounded-full mx-auto mt-4 md:mt-6" />
        </motion.div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
          {coreValues.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
              className="group bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Image */}
              <div className="relative h-40 md:h-48 overflow-hidden">
                <img
                  src={value.image || "/placeholder.svg"}
                  alt={value.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                  style={{ backgroundColor: `${value.color}20` }}
                />
                <div className="absolute top-3 right-3 md:top-4 md:right-4 p-2 md:p-3 bg-white/90 backdrop-blur-sm rounded-lg md:rounded-xl shadow-lg">
                  <value.icon className="h-4 w-4 md:h-6 md:w-6" style={{ color: value.color }} />
                </div>
                <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 text-white">
                  <h4 className="text-lg md:text-xl font-bold">{value.title}</h4>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-6">
                <p className="text-gray-600 leading-relaxed mb-3 md:mb-4 text-sm md:text-base">{value.description}</p>
                <div className="flex items-center gap-2 text-xs md:text-sm font-medium" style={{ color: value.color }}>
                  <span>Learn more</span>
                  <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Values in Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-12 md:mb-16"
        >
          <div className="bg-gradient-to-r from-[#F3954A]/5 to-[#2A61AC]/5 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Values in Action</h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6 md:mb-8">
                  Our core values aren't just words on a page—they're the driving force behind every program we run,
                  every life we touch, and every community we serve.
                </p>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-7 h-7 md:w-8 md:h-8 bg-[#F3954A] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xs md:text-sm">1</span>
                    </div>
                    <span className="text-gray-700 font-medium text-sm md:text-base">
                      Community-centered approach in all initiatives
                    </span>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-7 h-7 md:w-8 md:h-8 bg-[#2A61AC] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xs md:text-sm">2</span>
                    </div>
                    <span className="text-gray-700 font-medium text-sm md:text-base">
                      Transparent operations and impact reporting
                    </span>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-7 h-7 md:w-8 md:h-8 bg-[#22C55E] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xs md:text-sm">3</span>
                    </div>
                    <span className="text-gray-700 font-medium text-sm md:text-base">
                      Sustainable solutions for lasting change
                    </span>
                  </div>
                </div>
              </div>
              <div
                ref={imageRef}
                className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg w-full max-w-md mx-auto"
              >
                <img
                  src="/aboutUsValues.jpg?height=400&width=500"
                  alt="Values in action"
                  className="w-full h-64 md:h-80 object-cover"
                />
                {/* Diagonal overlay transition */}
                <motion.div
                  initial={{
                    clipPath: "polygon(0 100%, 0 100%, 0 100%, 0 100%)",
                  }}
                  animate={controls}
                  className="absolute inset-0 bg-gradient-to-t from-[#F3954A]/30 to-transparent pointer-events-none"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center"
        >
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden">
            <img
              src="/placeholder.svg?height=300&width=1200"
              alt="Join our values-driven mission"
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4 max-w-3xl">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Share Our Values?</h3>
                <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-90">
                  Join a community of like-minded individuals committed to creating positive change through shared
                  values and collective action.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/pages/donation"
                    className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold transition-all duration-300 bg-transparent"
                  >
                    Support Our Cause
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
