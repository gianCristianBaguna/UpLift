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
    <section className="relative h-[600px] overflow-hidden p-0 m-0 bg-white  shadow-md z-10 -mb-10">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${current === index ? "opacity-100" : "opacity-0"
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
        </div>
      ))}

      <div className="relative z-20 max-w-7xl mx-auto text-white text-center pt-45 pb-16">
        <h1 className="font-[Montserrat] text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider transform ">
          <span>SERVE. </span>
          <span className="text-[#F3954A] font-bold drop-shadow-[2px_4px_0_#2A61AC] animate-fall-bounce">
            SHARE.
          </span>
          <span> SHINE.</span>
        </h1>
        <div className="mt-10">
          Welcome to <span className="text-[#F3954A] font-bold drop-shadow-[1px_2px_0_#2A61AC] animate-fall-bounce">Uplift Foundation International!</span>  We are driven by the <span className="text-[#F3954A]">passion to empower</span> and <span className="text-[#F3954A]">uplift marginalized communities</span> , inspired by <span className="text-[#F3954A]">personal journeys</span>  and <span className="text-[#F3954A]">commitment to service.</span>
        </div >
        <div className="mt-10 flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-6">
          <a
            href="/pages/donation"
            className="drop-shadow-[2px_4px_0_#2A61AC] bg-[#F3954A] text-white text-lg font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-[#e07f2f] transition-transform transform hover:scale-105 duration-300"
          >
            Donate Now
          </a>
          <a
            href="/pages/about"
            className="bg-white text-black text-lg font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-[#e07f2f] transition-transform transform hover:scale-105 duration-300"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
