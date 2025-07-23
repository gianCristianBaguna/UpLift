"use client"

import { useState, useEffect } from "react"
import Shell from "@/components/navbar/shell"
import AboutMission from "@/components/about/aboutMission"
import AboutFocus from "@/components/about/aboutFocus"
import AboutTeam from "@/components/about/aboutTeam"
import { motion, AnimatePresence } from "framer-motion"
import AboutHeroSection from "@/components/about/aboutHero"
import Footer from "@/components/navbar/footer"
import { Loader2, Heart } from "lucide-react"

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500) 

    return () => clearTimeout(timer)
  }, [])

  // Loading Screen Component
  const LoadingScreen = () => (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#F3954A]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#2A61AC]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F3954A]/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Loading Content */}
      <div className="relative text-center space-y-8 px-4">
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-[#F3954A] to-[#ff7b3d] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#F3954A] to-[#2A61AC] bg-clip-text text-transparent">
            Uplift Foundation
          </h1>
        </motion.div>

        {/* Loading Spinner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="relative">
            <Loader2 className="w-12 h-12 text-[#F3954A] animate-spin" />
            <div className="absolute inset-0 w-12 h-12 border-2 border-[#F3954A]/20 rounded-full animate-ping"></div>
          </div>
          <p className="text-gray-700 text-lg font-medium">Loading our story...</p>
        </motion.div>

        {/* Loading Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#F3954A] rounded-full animate-bounce"></div>
              <span>Mission</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#2A61AC] rounded-full animate-bounce delay-200"></div>
              <span>Values</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-bounce delay-400"></div>
              <span>Team</span>
            </div>
          </div>
        </motion.div>

        {/* Inspirational Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="max-w-md mx-auto"
        >
          <blockquote className="text-gray-600 italic text-sm md:text-base">
            "Preparing to share our journey of compassion and community impact..."
          </blockquote>
        </motion.div>

        {/* Progress Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex justify-center space-x-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-[#F3954A]/30 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                backgroundColor: ["#F3954A30", "#F3954A", "#F3954A30"],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )

  return (
    <Shell>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoadingScreen />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-orange-50"
          >
            <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <AboutHeroSection />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-10%" }}
            >
              <AboutMission />
            </motion.div>

            <div className="h-px bg-gray-300 shadow-md" />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-10%" }}
            >
              <AboutFocus />
            </motion.div>

            <div className="h-px bg-gray-300 shadow-md" />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-10%" }}
            >
              <AboutTeam />
            </motion.div>

            <div className="h-px bg-gray-300 shadow-md" />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && <Footer />}
    </Shell>
  )
}
