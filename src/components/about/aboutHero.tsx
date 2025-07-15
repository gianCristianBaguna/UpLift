"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const galleryImages = [
  "/gallery/gallery1.png",
  "/gallery/gallery2.png",
  "/gallery/gallery3.png",
  "/gallery/gallery4.png",
  "/gallery/gallery5.png",
  "/gallery/gallery6.png",
  "/gallery/gallery7.png",
  "/gallery/gallery8.png",
  "/gallery/gallery9.png",
];

export default function AboutHeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[70vh] overflow-hidden bg-white shadow-md z-10">
      {galleryImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            current === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={img}
            alt={`Gallery background ${index + 1}`}
            fill
            className="object-cover object-center"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      ))}

      <div className="relative z-20 max-w-7xl mx-auto flex items-center justify-start h-full px-6 md:px-16">
        <div className="text-white space-y-4 max-w-2xl text-left">
          <h1 className="font-[Montserrat] text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-wider leading-tight">
            <div className="transform -rotate-2">ABOUT</div>
            <div className="text-[#F3954A] drop-shadow-[2px_4px_0_#2A61AC] animate-fall-bounce transform -rotate-2">
              US
            </div>
          </h1>
          <p className="text-lg md:text-xl font-medium text-white/90">
            We are driven by the passion to{" "}
            <span className="text-[#F3954A] font-semibold">uplift</span>{" "}
            <span className="text-[#F3954A] font-semibold">marginalized communities</span>{" "}
            through{" "}
            <span className="text-[#F3954A] font-semibold">compassion</span>,{" "}
            <span className="text-[#F3954A] font-semibold">education</span>, and{" "}
            <span className="text-[#F3954A] font-semibold">opportunity</span>{" "}
            empowering people to{" "}
            <span className="text-[#F3954A] font-semibold">rise, thrive, and shine</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
