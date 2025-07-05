"use client";

import Image from "next/image";
import Shell from "@/components/navbar/shell";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Backpack,
  Utensils,
  LibraryBig,
  ArchiveRestore,
  Drumstick,
  Hammer,
  Briefcase,
  Truck,
  HeartPulse,
  Leaf,
  Sprout,
  Home,
  Sparkles,
  Soup,
  Trophy,
} from "lucide-react";

const images = ["/bg1.png", "/bg2.png"];

export default function HomePage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Shell>
      <main className="pt-10 font-poppins">
        {/* 1. Hero Section */}
        {/* Section 1: Hero Slideshow */}
        <section className="relative h-80 overflow-hidden py-4 px-4">
          {/* Slideshow Background with Image and Gradient */}
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                current === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={img}
                alt={`Background ${index}`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-slate-900/80" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />

              {/* Horizontally Mirrored SVG Shape */}
              <svg
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 scale-x-[-1] z-10 opacity-20 w-[2000px] h-auto"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z"
                  fill="#2A61AC"
                />
              </svg>
            </div>
          ))}

          {/* Hero Content */}
          <div className="relative z-20 max-w-7xl mx-auto text-white text-center">
            <div className="mb-16">
              <h1 className="font-[Montserrat] text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider transform -rotate-2 pt-20">
                <span>SERVE. </span>
                <span className="text-[#F3954A] font-bold drop-shadow-[2px_4px_0_#2A61AC] animate-fall-bounce">
                  SHARE.
                </span>

                <span> SHINE.</span>
              </h1>
            </div>
          </div>
        </section>
        {/* Section 2: Our Focus */}
        <section className="relative py-20 px-4 bg-white text-center overflow-hidden">
          {/* 🎶 Animated Abstract Sound Waves as Full Background */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <svg
              className="w-[200%] h-full"
              viewBox="0 0 1800 200"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Wave 1 */}
              <path
                fill="none"
                stroke="#2A61AC"
                strokeWidth="1"
                strokeOpacity="0.5"
              >
                <animate
                  attributeName="d"
                  dur="6s"
                  repeatCount="indefinite"
                  values="
          M0,100 C360,50 720,150 1080,100 S1440,150 1800,100;
          M0,100 C360,150 720,50 1080,100 S1440,50 1800,100;
          M0,100 C360,50 720,150 1080,100 S1440,150 1800,100
        "
                />
              </path>

              {/* Wave 2 */}
              <path
                fill="none"
                stroke="#2A61AC"
                strokeWidth="1"
                strokeOpacity="0.25"
              >
                <animate
                  attributeName="d"
                  dur="7s"
                  repeatCount="indefinite"
                  values="
          M0,110 C360,60 720,140 1080,110 S1440,140 1800,110;
          M0,110 C360,140 720,60 1080,110 S1440,60 1800,110;
          M0,110 C360,60 720,140 1080,110 S1440,140 1800,110
        "
                />
              </path>

              {/* Wave 3 */}
              <path
                fill="none"
                stroke="#2A61AC"
                strokeWidth="1"
                strokeOpacity="0.15"
              >
                <animate
                  attributeName="d"
                  dur="8s"
                  repeatCount="indefinite"
                  values="
          M0,90 C360,40 720,160 1080,90 S1440,160 1800,90;
          M0,90 C360,160 720,40 1080,90 S1440,40 1800,90;
          M0,90 C360,40 720,160 1080,90 S1440,160 1800,90
        "
                />
              </path>

              {/* Wave 4 */}
              <path
                fill="none"
                stroke="#2A61AC"
                strokeWidth="1"
                strokeOpacity="0.2"
              >
                <animate
                  attributeName="d"
                  dur="9s"
                  repeatCount="indefinite"
                  values="
          M0,95 C300,60 600,130 900,95 S1200,130 1500,95;
          M0,95 C300,130 600,60 900,95 S1200,60 1500,95;
          M0,95 C300,60 600,130 900,95 S1200,130 1500,95
        "
                />
              </path>

              {/* Wave 5 */}
              <path
                fill="none"
                stroke="#2A61AC"
                strokeWidth="1"
                strokeOpacity="0.1"
              >
                <animate
                  attributeName="d"
                  dur="10s"
                  repeatCount="indefinite"
                  values="
          M0,105 C320,70 640,140 960,105 S1280,140 1600,105;
          M0,105 C320,140 640,70 960,105 S1280,70 1600,105;
          M0,105 C320,70 640,140 960,105 S1280,140 1600,105
        "
                />
              </path>

              {/* Wave 6 */}
              <path
                fill="none"
                stroke="#2A61AC"
                strokeWidth="1"
                strokeOpacity="0.07"
              >
                <animate
                  attributeName="d"
                  dur="11s"
                  repeatCount="indefinite"
                  values="
          M0,85 C360,35 720,165 1080,85 S1440,165 1800,85;
          M0,85 C360,165 720,35 1080,85 S1440,35 1800,85;
          M0,85 C360,35 720,165 1080,85 S1440,165 1800,85
        "
                />
              </path>
            </svg>
          </div>

          {/* 📦 Content Layer (above wave bg) */}
          <div className="relative z-10 max-w-7xl mx-auto">
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: false, amount: 0.5 }}
              className="text-[#2A61AC] text-bold text-4xl md:text-5xl font-[Montserrat] mb-12"
            >
              <span>OUR </span>
              <span className="text-[#F3954A]">FOCUS</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* CHILDREN & YOUTH */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                className="bg-blue-100 bg-opacity-80 backdrop-blur-md rounded-lg shadow-md hover:shadow-xl transition duration-300 p-5 flex flex-col gap-2 text-left"
              >
                <h3 className="text-lg font-semibold text-[#2A61AC] flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" /> Children & Youth
                </h3>
                <ul className="text-sm text-gray-800 space-y-1">
                  <li className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> VALUES Advocacy
                  </li>
                  <li className="flex items-center gap-2">
                    <Backpack className="w-4 h-4" /> School supplies
                  </li>
                  <li className="flex items-center gap-2">
                    <Utensils className="w-4 h-4" /> Feeding program
                  </li>
                  <li className="flex items-center gap-2">
                    <LibraryBig className="w-4 h-4" /> Mobile library
                  </li>
                  <li className="flex items-center gap-2">
                    <ArchiveRestore className="w-4 h-4" /> Improve libraries
                  </li>
                  <li className="flex items-center gap-2">
                    <Trophy className="w-4 h-4" /> Sports & Music
                  </li>
                  <li className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" /> Scholarship
                  </li>
                </ul>
              </motion.div>

              {/* FAMILY */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: false, amount: 0.3 }}
                className="bg-blue-100 bg-opacity-80 backdrop-blur-md rounded-lg shadow-md hover:shadow-xl transition duration-300 p-5 flex flex-col gap-2 text-left"
              >
                <h3 className="text-lg font-semibold text-[#2A61AC] flex items-center gap-2">
                  <Home className="w-5 h-5" /> Family
                </h3>
                <ul className="text-sm text-gray-800 space-y-1">
                  <li className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Livelihood
                  </li>
                  <li className="flex items-center gap-2">
                    <Hammer className="w-4 h-4" /> Build better homes
                  </li>
                  <li className="flex items-center gap-2">
                    <Truck className="w-4 h-4" /> Relief & food aid
                  </li>
                </ul>
              </motion.div>

              {/* COMMUNITY */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: false, amount: 0.3 }}
                className="bg-blue-100 bg-opacity-80 backdrop-blur-md rounded-lg shadow-md hover:shadow-xl transition duration-300 p-5 flex flex-col gap-2 text-left"
              >
                <h3 className="text-lg font-semibold text-[#2A61AC] flex items-center gap-2">
                  <Leaf className="w-5 h-5" /> Community
                </h3>
                <ul className="text-sm text-gray-800 space-y-1">
                  <li className="flex items-center gap-2">
                    <HeartPulse className="w-4 h-4" /> Medical Mission
                  </li>
                  <li className="flex items-center gap-2">
                    <Leaf className="w-4 h-4" /> Environmental programs
                  </li>
                  <li className="flex items-center gap-2">
                    <Sprout className="w-4 h-4" /> Community gardens
                  </li>
                </ul>
              </motion.div>

              {/* ELDERLY */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: false, amount: 0.3 }}
                className="bg-blue-100 bg-opacity-80 backdrop-blur-md rounded-lg shadow-md hover:shadow-xl transition duration-300 p-5 flex flex-col gap-2 text-left"
              >
                <h3 className="text-lg font-semibold text-[#2A61AC] flex items-center gap-2">
                  <Soup className="w-5 h-5" /> Elderly
                </h3>
                <ul className="text-sm text-gray-800 space-y-1">
                  <li className="flex items-center gap-2">
                    <Home className="w-4 h-4" /> Home visits
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Make a Wish
                  </li>
                  <li className="flex items-center gap-2">
                    <HeartPulse className="w-4 h-4" /> Free check-ups
                  </li>
                  <li className="flex items-center gap-2">
                    <Soup className="w-4 h-4" /> Food assistance
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
        {/* 2. About Section */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center">
          <h2 className="text-3xl font-bold text-[#2A61AC] mb-4">
            About Uplift
          </h2>
          <p className="text-gray-700 max-w-2xl">
            Uplift is a community-driven platform designed to connect people,
            resources, and ideas. We aim to empower underserved communities by
            bridging the gap through education, support, and opportunity.
          </p>
        </section>
        {/* 3. How It Works Section */}
        <section className="bg-[#eef3fc] min-h-screen flex flex-col justify-center items-center px-6 text-center">
          <h2 className="text-3xl font-bold text-[#2A61AC] mb-10">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-10 max-w-5xl">
            <div>
              <h3 className="text-xl font-semibold text-[#2A61AC] mb-2">
                1. Sign Up
              </h3>
              <p className="text-gray-600">
                Create your free account to access community tools and support.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#2A61AC] mb-2">
                2. Connect
              </h3>
              <p className="text-gray-600">
                Join discussions, get matched with mentors, and explore
                resources.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#2A61AC] mb-2">
                3. Contribute
              </h3>
              <p className="text-gray-600">
                Share your skills or support others through donations and
                volunteering.
              </p>
            </div>
          </div>
        </section>
        {/* 4. Call to Action */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center">
          <h2 className="text-3xl font-bold text-[#2A61AC] mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-gray-700 max-w-xl mb-6">
            Every step you take brings someone closer to opportunity. Be a part
            of something meaningful.
          </p>
          <a
            href="/pages/donation"
            className="inline-block bg-[#2A61AC] text-white px-8 py-3 rounded-full font-semibold"
          >
            Donate Now
          </a>
        </section>
        {/* 5. Footer */}
        <footer className="bg-[#2A61AC] text-white min-h-screen flex flex-col justify-center items-center px-6 text-center">
          <div>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Uplift. All rights reserved.
            </p>
            <div className="mt-2 space-x-4">
              <a href="/pages/about" className="underline">
                About
              </a>
              <a href="/pages/donation" className="underline">
                Donate
              </a>
              <a href="/contact" className="underline">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </main>
    </Shell>
  );
}
