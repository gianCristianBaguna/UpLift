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
    <section className="relative h-[700px] overflow-hidden bg-white shadow-md z-10 -mt-10">
      <div className="flex h-full">
        <div className="relative w-full h-full bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100 flex items-center justify-center p-12 overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-orange-200/40 to-amber-200/40 rounded-full blur-3xl transform -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-orange-300/30 to-amber-300/30 rounded-full blur-3xl transform translate-x-40 translate-y-40"></div>
          <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-gradient-to-r from-orange-100/50 to-amber-100/50 rounded-full blur-2xl"></div>

          <div className="md:hidden px-6 py-12">
            <div className="relative z-10 w-full text-left">
              <div className="inline-block bg-[#F3954A] text-white text-sm font-medium px-4 py-2 rounded-full mb-4 shadow-lg">
                Making a Difference
              </div>

              <h1 className="font-[Montserrat] text-4xl font-bold tracking-wide mb-4 text-gray-800 leading-snug">
                <span>SERVE. </span>
                <span className="text-[#F3954A] font-bold">SHARE.</span>
                <span> SHINE.</span>
              </h1>

              <p className="text-base font-light mb-6 text-gray-700 leading-relaxed">
                Join us in uplifting communities through{" "}
                <span className="text-[#F3954A] font-semibold">service</span>{" "}
                and{" "}
                <span className="text-[#F3954A] font-semibold">sharing</span>{" "}
                across our neighborhoods.
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href="/pages/donation"
                  className="bg-[#F3954A] drop-shadow-[3px_6px_0_#2A61AC] text-white text-base font-semibold px-4 py-3 rounded-full hover:bg-[#e07f2f] hover:drop-shadow-[4px_8px_0_#2A61AC] transition-all transform hover:scale-105 duration-300 flex items-center justify-center"
                >
                  Donate Now
                </a>

                <a
                  href="/pages/about"
                  className="bg-white text-gray-700 text-base font-semibold px-4 py-3 rounded-full shadow-md hover:shadow-lg border border-gray-200 hover:border-[#F3954A] transition-all transform hover:scale-105 duration-300 flex items-center justify-center"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>

          {/* 💻 Desktop View ONLY */}
          <div className="hidden md:block">
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
                  className="w-fit bg-[#F3954A] drop-shadow-[3px_4px_0_#2A61AC] text-white text-base font-semibold px-4 py-3 rounded-full hover:bg-[#e07f2f] hover:drop-shadow-[4px_8px_0_#2A61AC] transition-all transform hover:scale-105 duration-300 flex items-center justify-center"
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
                  "/placeholder.svg?height=700&width=600&query=community service volunteers helping people"
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
                  "/placeholder.svg?height=400&width=400&query=community volunteers"
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
      </div>
    </section>
  );
}
