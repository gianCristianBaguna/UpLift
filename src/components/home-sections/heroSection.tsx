"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const images = ["/bg1.png", "/bg2.png"];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-80 overflow-hidden py-4 px-4">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            current === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image src={img} alt={`Background ${index}`} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-slate-900/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
          <svg className="absolute bottom-0 left-1/2 transform -translate-x-1/2 scale-x-[-1] z-10 opacity-20 w-[2000px] h-auto"
            viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z" fill="#2A61AC" />
          </svg>
        </div>
      ))}
      <div className="relative z-20 max-w-7xl mx-auto text-white text-center">
        <div className="mb-16">
          <h1 className="font-[Montserrat] text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider transform -rotate-2 pt-20">
            <span>SERVE. </span>
            <span className="text-[#F3954A] font-bold drop-shadow-[2px_4px_0_#2A61AC] animate-fall-bounce">SHARE.</span>
            <span> SHINE.</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
