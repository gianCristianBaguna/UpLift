"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import clsx from "clsx";

const images = ["/event1.jpg", "/event2.jpg"];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
      className: "top-4/10 right-1/4 w-9 h-9",
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
      className: "bottom-1/6 right-1/4 w-10 h-10",
      colors: "from-[#2A61AC]/35 to-amber-300/35",
      animation: "animate-float-3 delay-300",
    },
  ];

  return (
    <section
      className="relative h-[750px] overflow-hidden bg-white shadow-md z-10 -mt-10"
      id="hero"
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* Left Content */}
        <div className="relative w-full md:w-1/2 h-full bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100 flex items-center justify-center px-6 py-10 md:p-12 overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-orange-200/40 to-amber-200/40 rounded-full blur-3xl -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-orange-300/30 to-amber-300/30 rounded-full blur-3xl translate-x-40 translate-y-40"></div>
          <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-gradient-to-r from-orange-100/50 to-amber-100/50 rounded-full blur-2xl"></div>
          {/* Mobile bubbles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {bubbles.map((b, idx) => (
              <div
                key={idx}
                className={clsx(
                  "absolute rounded-full",
                  b.className,
                  "bg-gradient-to-br",
                  b.colors,
                  b.animation
                )}
              ></div>
            ))}
          </div>
          {/* Floating bubbles (desktop only) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block"></div>

          <div className="relative z-10 mt-40 md:mt-40 max-w-md text-center md:text-left">
            <div className="inline-block bg-[#F3954A] text-white text-sm font-medium px-4 py-2 rounded-full mb-6 shadow-lg">
              Making a Difference
            </div>
            <h1 className="font-[Montserrat] text-3xl md:text-5xl lg:text-6xl font-bold tracking-wide mb-6 text-gray-800 leading-tight text-center md:text-left">
              <span>
                <span className="text-gray-800">SERVE.</span>{" "}
                <span className="text-[#F3954A]">SHARE.</span>{" "}
                <span className="text-gray-800">SHINE.</span>
              </span>
            </h1>

            <p className="text-lg md:text-xl font-light mb-8 text-gray-700 leading-relaxed">
              Join us in uplifting communities through{" "}
              <span className="text-[#F3954A] font-semibold">service</span> and{" "}
              <span className="text-[#F3954A] font-semibold">sharing</span>{" "}
              across our neighborhoods.
            </p>
            <div className="flex flex-row md:flex-row gap-4 items-center md:items-start justify-center md:justify-start">
              <a
                href="/pages/donation"
                className="bg-[#F3954A] drop-shadow-[3px_4px_0_#2A61AC] text-white text-base font-semibold px-4 py-3 rounded-full hover:bg-[#e07f2f] hover:drop-shadow-[4px_8px_0_#2A61AC] transition-all transform hover:scale-105 duration-300"
              >
                Donate Now
              </a>
              <a
                href="/pages/about"
                className="bg-white text-gray-700 text-lg font-semibold px-4 py-3 rounded-full shadow-md hover:shadow-lg border border-gray-200 hover:border-[#F3954A] transition-all transform hover:scale-105 duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* Image section (Responsive for both Desktop & Mobile) */}
        <div className="relative w-full md:w-1/2 h-[250px] md:h-full overflow-hidden z-0">
          {images.map((img, index) => (
            <div
              key={index}
              className={clsx(
                "absolute inset-0 w-full h-full transition-opacity duration-1000",
                current === index ? "opacity-100" : "opacity-0"
              )}
            >
              <Image
                src={img || "/placeholder.svg"}
                alt={`Community service ${index + 1}`}
                fill
                className="object-cover"
                priority
              />
              <div
                className={clsx(
                  "absolute inset-0",
                  "md:bg-gradient-to-l from-transparent via-black/5 to-orange-900/20",
                  "bg-gradient-to-b md:bg-none from-transparent to-orange-50/80"
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
