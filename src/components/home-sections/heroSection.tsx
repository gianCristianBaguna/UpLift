"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const images = ["/event1.jpg", "/event2.jpg"];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative h-[700px] overflow-hidden bg-white shadow-md z-10 -mt-10"
      id="hero"
    >
      <div className="flex h-full mt-10">
        <div className="relative w-full h-full bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100 flex items-center justify-center p-12 overflow-hidden">
          {/* Background gradient blobs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-orange-200/40 to-amber-200/40 rounded-full blur-3xl transform -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-orange-300/30 to-amber-300/30 rounded-full blur-3xl transform translate-x-40 translate-y-40"></div>
          <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-gradient-to-r from-orange-100/50 to-amber-100/50 rounded-full blur-2xl"></div>

          {/* Floating Bubbles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Large bubbles */}
            <div className="absolute top-20 left-10 w-8 h-8 bg-gradient-to-br from-[#F3954A]/20 to-[#F3954A]/10 rounded-full animate-bounce-slow blur-sm"></div>
            <div className="absolute top-32 right-20 w-6 h-6 bg-gradient-to-br from-[#2A61AC]/25 to-[#2A61AC]/15 rounded-full animate-float-1 blur-sm"></div>
            <div className="absolute top-48 left-1/3 w-10 h-10 bg-gradient-to-br from-orange-300/30 to-orange-200/20 rounded-full animate-float-2"></div>
            <div className="absolute top-60 right-1/4 w-4 h-4 bg-gradient-to-br from-[#F3954A]/30 to-amber-300/20 rounded-full animate-bounce-slow delay-1000"></div>

            {/* Medium bubbles */}
            <div className="absolute top-16 left-1/2 w-5 h-5 bg-gradient-to-br from-blue-300/25 to-blue-200/15 rounded-full animate-float-3 blur-sm"></div>
            <div className="absolute top-40 left-20 w-7 h-7 bg-gradient-to-br from-[#2A61AC]/20 to-blue-300/15 rounded-full animate-float-1 delay-500"></div>
            <div className="absolute top-56 right-16 w-3 h-3 bg-gradient-to-br from-orange-400/35 to-amber-300/25 rounded-full animate-bounce-slow delay-700"></div>

            {/* Small bubbles */}
            <div className="absolute top-24 left-2/3 w-2 h-2 bg-gradient-to-br from-[#F3954A]/40 to-orange-300/30 rounded-full animate-float-2 delay-300"></div>
            <div className="absolute top-44 right-1/3 w-3 h-3 bg-gradient-to-br from-blue-400/30 to-[#2A61AC]/20 rounded-full animate-float-3 delay-800"></div>
            <div className="absolute top-52 left-16 w-4 h-4 bg-gradient-to-br from-amber-300/25 to-orange-200/15 rounded-full animate-bounce-slow delay-1200"></div>
            <div className="absolute top-36 right-12 w-2 h-2 bg-gradient-to-br from-[#2A61AC]/35 to-blue-300/25 rounded-full animate-float-1 delay-400"></div>

            {/* Tiny bubbles */}
            <div className="absolute top-28 left-1/4 w-1 h-1 bg-[#F3954A]/50 rounded-full animate-float-3 delay-600"></div>
            <div className="absolute top-50 right-1/5 w-1 h-1 bg-[#2A61AC]/50 rounded-full animate-bounce-slow delay-900"></div>
            <div className="absolute top-42 left-3/4 w-1 h-1 bg-orange-400/60 rounded-full animate-float-2 delay-1100"></div>

            <div className="absolute top-28 left-1/4 w-1 h-1 bg-[#F3954A]/50 rounded-full animate-float-3 delay-600"></div>
            <div className="absolute top-50 right-1/5 w-1 h-1 bg-[#2A61AC]/50 rounded-full animate-bounce-slow delay-900"></div>
            <div className="absolute top-42 left-3/4 w-1 h-1 bg-orange-400/60 rounded-full animate-float-2 delay-1100"></div>

            <div className="absolute top-28 left-1/4 w-1 h-1 bg-[#F3954A]/50 rounded-full animate-float-3 delay-600"></div>
            <div className="absolute top-50 right-1/5 w-1 h-1 bg-[#2A61AC]/50 rounded-full animate-bounce-slow delay-900"></div>
            <div className="absolute top-42 left-3/4 w-1 h-1 bg-orange-400/60 rounded-full animate-float-2 delay-1100"></div>

            <div className="absolute bottom-28 left-1/4 w-1 h-1 bg-[#F3954A]/50 rounded-full animate-float-3 delay-600"></div>
            <div className="absolute bottom-50 right-1/5 w-1 h-1 bg-[#2A61AC]/50 rounded-full animate-bounce-slow delay-900"></div>
            <div className="absolute bottom-42 left-3/4 w-1 h-1 bg-orange-400/60 rounded-full animate-float-2 delay-1100"></div>

            <div className="absolute bottom-28 left-1/4 w-1 h-1 bg-[#F3954A]/50 rounded-full animate-float-3 delay-600"></div>
            <div className="absolute bottom-50 right-1/5 w-1 h-1 bg-[#2A61AC]/50 rounded-full animate-bounce-slow delay-900"></div>
            <div className="absolute bottom-42 left-3/4 w-1 h-1 bg-orange-400/60 rounded-full animate-float-2 delay-1100"></div>

            {/* Additional floating elements */}
            <div className="absolute top-18 right-1/2 w-6 h-6 bg-gradient-to-br from-[#F3954A]/15 to-amber-200/10 rounded-full animate-float-1 delay-200 blur-sm"></div>
            <div className="absolute top-46 left-1/5 w-5 h-5 bg-gradient-to-br from-blue-300/20 to-[#2A61AC]/10 rounded-full animate-float-3 delay-1400"></div>
            <div className="absolute top-18 right-1/2 w-6 h-6 bg-gradient-to-br from-[#F3954A]/15 to-amber-200/10 rounded-full animate-float-1 delay-200 blur-sm"></div>
            <div className="absolute top-46 left-1/5 w-5 h-5 bg-gradient-to-br from-blue-300/20 to-[#2A61AC]/10 rounded-full animate-float-3 delay-1400"></div>
            <div className="absolute bottom-18 right-1/2 w-6 h-6 bg-gradient-to-br from-[#F3954A]/15 to-amber-200/10 rounded-full animate-float-1 delay-200 blur-sm"></div>
            <div className="absolute bottom-46 left-1/5 w-5 h-5 bg-gradient-to-br from-blue-300/20 to-[#2A61AC]/10 rounded-full animate-float-3 delay-1400"></div>
            <div className="absolute bottom-18 right-1/2 w-6 h-6 bg-gradient-to-br from-[#F3954A]/15 to-amber-200/10 rounded-full animate-float-1 delay-200 blur-sm"></div>
            <div className="absolute bottom-46 left-1/5 w-5 h-5 bg-gradient-to-br from-blue-300/20 to-[#2A61AC]/10 rounded-full animate-float-3 delay-1400"></div>
          </div>

          {/* 💻 Desktop View ONLY */}
          <div className="md:block">
            <div className="relative z-10 mt-20 max-w-lg text-left">
              {/* Small badge */}
              <div className="inline-block bg-[#F3954A] text-white text-sm font-medium px-4 py-2 rounded-full mb-6 shadow-lg">
                Making a Difference
              </div>
              <h1 className="font-[Montserrat] text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide mb-6 text-gray-800 leading-tight">
                <span>SERVE. </span>
                <span className="text-[#F3954A] font-bold">SHARE.</span>
                <span> SHINE.</span>
              </h1>
              <p className="text-lg md:text-xl font-light mb-8 text-gray-700 leading-relaxed">
                Join us in uplifting communities through{" "}
                <span className="text-[#F3954A] font-semibold">service</span>{" "}
                and{" "}
                <span className="text-[#F3954A] font-semibold">sharing</span>{" "}
                across our neighborhoods.
              </p>
              <div className="flex flex-row gap-4">
                <a
                  href="/pages/donation"
                  className="w-fit bg-[#F3954A] drop-shadow-[3px_4px_0_#2A61AC] text-white px-4 py-4 text-base font-semibold px-4 py-3 rounded-full hover:bg-[#e07f2f] hover:drop-shadow-[4px_8px_0_#2A61AC] transition-all transform hover:scale-105 duration-300 flex items-center justify-center"
                >
                  Donate Now
                </a>
                <a
                  href="/pages/about"
                  className="w-fit bg-white text-gray-700 text-lg font-semibold px-4 py-4 rounded-full shadow-md hover:shadow-lg border border-gray-200 hover:border-[#F3954A] transition-all transform hover:scale-105 duration-300 text-center"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full h-full overflow-hidden">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                current === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={
                  img ||
                  "/placeholder.svg?height=700&width=600&query=community service volunteers helping people" ||
                  "/placeholder.svg"
                }
                alt={`Community service ${index + 1}`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/5 to-orange-900/20" />
            </div>
          ))}
        </div>
      </div>
      <div className="md:hidden absolute inset-0 bg-gradient-to-b from-orange-50 to-amber-50">
        <div className="relative h-2/5 overflow-hidden">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                current === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={
                  img ||
                  "/placeholder.svg?height=400&width=400&query=community volunteers" ||
                  "/placeholder.svg"
                }
                alt={`Community service ${index + 1}`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-50/80" />
            </div>
          ))}
        </div>

        {/* Mobile bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none md:hidden">
          <div className="absolute top-1/3 left-8 w-6 h-6 bg-gradient-to-br from-[#F3954A]/25 to-orange-300/15 rounded-full animate-float-1"></div>
          <div className="absolute top-1/2 right-12 w-4 h-4 bg-gradient-to-br from-[#2A61AC]/30 to-blue-300/20 rounded-full animate-bounce-slow delay-500"></div>
          <div className="absolute top-2/3 left-1/3 w-5 h-5 bg-gradient-to-br from-amber-300/25 to-orange-200/15 rounded-full animate-float-2 delay-800"></div>
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-gradient-to-br from-[#F3954A]/35 to-amber-300/25 rounded-full animate-float-3 delay-300"></div>
        </div>
      </div>
    </section>
  );
}
