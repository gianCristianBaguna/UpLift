"use client";

import Image from "next/image";
import Shell from "@/components/navbar/shell";
import { useEffect, useState } from "react";

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
        <section className="relative h-auto min-h-screen overflow-hidden py-20 px-4">
      {/* Slideshow Background */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
            current === index ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url('${img}')` }}
        >
          {/* Blue Overlay */}
          <div className="absolute inset-0 bg-blue-900/50"></div>
        </div>
      ))}

      {/* Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto text-white text-center">
        {/* Hero Text */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider transform -rotate-2">
            <span className="block">SERVE</span>
            <span className="block">SHARE</span>
            <span className="block">SHINE</span>
          </h1>
        </div>

        {/* Our Focus */}
        <div>
          <h2 className="text-4xl md:text-5xl font-serif mb-12 text-white">OUR FOCUS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="aspect-square bg-white/80 rounded-lg shadow-sm hover:shadow-md transition duration-300"
              >
                <div className="w-full h-full flex items-center justify-center text-gray-800">
                  <span className="text-sm font-semibold"></span>
                </div>
              </div>
            ))}
          </div>
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
