"use client"
import type React from "react"
import { motion } from "framer-motion"
import {
  Heart, Star, Zap, Users, Home, BookOpen,
  Stethoscope, Utensils, Globe, Smile,
  Leaf, Handshake, Sparkles, Lightbulb, TreePalm,
} from "lucide-react"

const CreativeBackground: React.FC = () => {
  const floatingIcons = [
    { Icon: Heart, color: "#F3954A", delay: 0, x: "10%", y: "20%" },
    { Icon: Star, color: "#2A61AC", delay: 2, x: "80%", y: "15%" },
    { Icon: Users, color: "#10B981", delay: 4, x: "15%", y: "70%" },
    { Icon: Home, color: "#8B5CF6", delay: 1, x: "85%", y: "60%" },
    { Icon: BookOpen, color: "#F59E0B", delay: 3, x: "70%", y: "80%" },
    { Icon: Stethoscope, color: "#EF4444", delay: 5, x: "25%", y: "45%" },
    { Icon: Utensils, color: "#06B6D4", delay: 1.5, x: "90%", y: "35%" },
    { Icon: Globe, color: "#84CC16", delay: 3.5, x: "5%", y: "85%" },
    { Icon: Zap, color: "#F97316", delay: 2.5, x: "60%", y: "25%" },
    // New icons
    { Icon: Smile, color: "#E879F9", delay: 6, x: "40%", y: "10%" },
    { Icon: Leaf, color: "#4ADE80", delay: 7, x: "65%", y: "70%" },
    { Icon: Handshake, color: "#F43F5E", delay: 8, x: "30%", y: "85%" },
    { Icon: Sparkles, color: "#FACC15", delay: 6.5, x: "75%", y: "5%" },
    { Icon: Lightbulb, color: "#FDE68A", delay: 9, x: "45%", y: "55%" },
    { Icon: TreePalm, color: "#10B981", delay: 7.5, x: "20%", y: "5%" },
  ]

  const inspirationWords = ["Hope", "Unity", "Growth", "Care"]

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50" />

      {/* Mesh gradient pulse */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(243, 149, 74, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(42, 97, 172, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.08) 0%, transparent 50%)
            `,
            animation: "meshMove 20s ease-in-out infinite",
          }}
        />
      </div>

      {/* Community connection SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3954A" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#2A61AC" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {/* Connection nodes */}
        <g className="animate-pulse" style={{ animationDuration: "4s" }}>
          {[
            [100, 150], [300, 100], [500, 200], [700, 120], [900, 180], [1100, 140],
            [150, 400], [350, 450], [550, 380], [750, 420], [950, 400],
            [200, 650], [400, 700], [600, 620], [800, 680], [1000, 640],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={3 + (i % 3)} fill="#F3954A" opacity="0.5" />
          ))}
        </g>

        {/* Connection lines */}
        <g stroke="url(#connectionGradient)" strokeWidth="1" fill="none" opacity="0.4">
          {/* Add all your existing <path> connection lines here (unchanged from your original code) */}
        </g>
      </svg>

      {/* Organic floating blobs */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(243, 149, 74, 0.3) 0%, transparent 70%)", animation: "float 15s ease-in-out infinite" }} />
        <div className="absolute top-32 right-20 w-48 h-48 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(42, 97, 172, 0.25) 0%, transparent 70%)", animation: "float 18s ease-in-out infinite reverse" }} />
        <div className="absolute bottom-20 left-1/4 w-56 h-56 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)", animation: "float 20s ease-in-out infinite" }} />
        <div className="absolute bottom-32 right-1/3 w-40 h-40 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)", animation: "float 16s ease-in-out infinite reverse" }} />
      </div>

      {/* Spark particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`spark-${i}`}
            className="absolute rounded-full bg-yellow-300 opacity-10 blur-lg"
            style={{
              width: `${6 + Math.random() * 6}px`,
              height: `${6 + Math.random() * 6}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -15, 0], opacity: [0.1, 0.2, 0.1], scale: [1, 1.2, 1] }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Floating community icons */}
      <div className="absolute inset-0">
        {floatingIcons.map(({ Icon, color, delay, x, y }, index) => (
          <motion.div
            key={index}
            className="absolute opacity-20"
            style={{ left: x, top: y }}
            animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8 + index, delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon size={24 + (index % 3) * 4} color={color} className="drop-shadow-sm" />
          </motion.div>
        ))}
      </div>

      {/* Floating inspirational words */}
      <div className="absolute inset-0">
        {inspirationWords.map((word, i) => (
          <motion.div
            key={`word-${i}`}
            className="absolute text-sm md:text-lg font-bold text-black/20"
            style={{ top: `${20 + i * 15}%`, left: `${10 + i * 20}%` }}
            animate={{ y: [0, -10, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8 + i, repeat: Infinity, delay: i * 1.2, ease: "easeInOut" }}
          >
            {word}
          </motion.div>
        ))}
      </div>

      {/* Gooey blurred mesh blobs */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" className="absolute opacity-10">
          <filter id="blob">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="
              1 0 0 0 0  
              0 1 0 0 0  
              0 0 1 0 0  
              0 0 0 15 -5" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
          </filter>
          <g filter="url(#blob)">
            <circle cx="400" cy="300" r="80" fill="#2A61AC" opacity="0.1" />
            <circle cx="700" cy="500" r="100" fill="#F59E0B" opacity="0.1" />
          </g>
        </svg>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes meshMove {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -10px) rotate(1deg); }
          50% { transform: translate(-5px, 5px) rotate(-1deg); }
          75% { transform: translate(5px, 10px) rotate(0.5deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }

        @keyframes patternMove {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(60px) translateY(60px); }
        }

        @keyframes rotate {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default CreativeBackground
