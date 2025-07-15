"use client";

import { motion } from "framer-motion";
import {
  Users,
  Flame,
  Heart,
  ShieldCheck,
  Home,
  Handshake,
} from "lucide-react";
import CoreValueCard from "@/components/about/CoreValueCard";
import Image from "next/image";

export function AboutFocus() {
  const coreValues = [
    {
      icon: Users,
      title: "Unity",
      description: "Fostering a spirit of togetherness, shared purpose, and volunteerism.",
    },
    {
      icon: Flame,
      title: "Passion",
      description: "Serving with sincerity, drive, and unwavering dedication.",
    },
    {
      icon: Heart,
      title: "Love",
      description: "Expressing genuine care and compassion for those most in need.",
    },
    {
      icon: ShieldCheck,
      title: "Integrity",
      description: "Upholding honesty and transparency in all that we do.",
    },
    {
      icon: Home,
      title: "Family",
      description: "Strengthening families as the foundation for resilient communities.",
    },
    {
      icon: Handshake,
      title: "Trust",
      description: "Nurturing growth through faith, values, and education.",
    },
  ];

  return (
    <section className="space-y-16 px-6 md:px-12 py-20 bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-lg rounded-t-lg">

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-orange-500 text-center">
          Why We Do This
        </h2>
        <p className="text-sm uppercase tracking-wide text-center text-[#1c5091] mt-2">
          Empowering communities through compassion
        </p>
        <p className="text-gray-700 mt-6 text-center max-w-4xl mx-auto leading-relaxed text-lg">
          At <span className="font-semibold text-[#1c5091]">Uplift Foundation International</span>, we believe in the ripple effect of kindness. Rooted in lived experiences and guided by a heritage of compassion, our mission is to uplift lives—especially those of the underserved and often overlooked.
        </p>
      </motion.div>

      {/* Mission Statement */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto space-y-4 text-gray-700 text-lg leading-relaxed text-center">
          <p>
            From granting seniors their heartfelt last wishes to bridging educational gaps for children, we’re committed to offering holistic, lasting support.
          </p>
          <p>
            Our programs include sustainable livelihood initiatives, emergency relief efforts, and accessible medical missions—each designed to empower and uplift.
          </p>
          <p>
            Through the passion of our volunteers and the generosity of our community, we aim to spark potential, create transformative change, and illuminate a future filled with hope and dignity.
          </p>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="w-16 h-1 mx-auto bg-orange-400 rounded-full opacity-80" />

      {/* Core Values Section */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <h3 className="text-3xl font-bold text-[#1c5091] text-center mb-10">
          Our Core Values
        </h3>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {coreValues.map((value, index) => (
            <CoreValueCard
              key={value.title}
              icon={value.icon}
              title={value.title}
              description={value.description}
              delay={index * 0.15}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
