"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

function getNextIndex(current: number, exclude: number[]) {
  let next = (current + 1) % galleryImages.length;
  while (exclude.includes(next)) next = (next + 1) % galleryImages.length;
  return next;
}

export default function GallerySection() {
  const [mobileIndex, setMobileIndex] = useState(0);
  const [mobileFlipping, setMobileFlipping] = useState(false);
  const mobileHoverRef = useRef(false);

  useEffect(() => {
    const mobileInterval = setInterval(() => {
      if (mobileHoverRef.current) return;
      setMobileFlipping(true);
      setTimeout(() => {
        setMobileIndex((prev) => getNextIndex(prev, []));
        setMobileFlipping(false);
      }, 600);
    }, 9000);

    return () => clearInterval(mobileInterval);
  }, []);

  return (
    <section className="bg-white py-16 px-4 overflow-visible">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#1c5091] mb-2">GALLERY</h2>
        <p className="text-orange-400 mb-8">
          Empowering Futures Through Education and Care
        </p>

        {/* 📱 Mobile: One card */}
        <div className="md:hidden mb-8">
          <div
            onMouseEnter={() => (mobileHoverRef.current = true)}
            onMouseLeave={() => (mobileHoverRef.current = false)}
            className="relative h-64 w-full group [perspective:1000px] overflow-visible"
          >
            <div
              className={`relative h-full w-full transition-transform duration-[1200ms] rounded-xl shadow-2xl ${
                mobileFlipping ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
              } border-4 border-[#1c5091] overflow-visible`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="absolute inset-0 rounded-xl bg-white overflow-visible"
                style={{ backfaceVisibility: "hidden" }}
              >
                <Image
                  fill
                  src={galleryImages[mobileIndex]}
                  alt="Mobile Gallery"
                  className="object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                  <span className="text-white font-semibold">Featured Image</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🖥️ Desktop: Independent rotating cards */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <GalleryCard key={i} excludeIndices={[]} />
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/pages/gallery"
          className="inline-flex items-center text-[#1c5091] hover:text-orange-400 transition font-semibold"
        >
          Show More
        </Link>
      </div>
    </section>
  );
}

/* 💠 Subcomponent: Each card is fully self-contained */
function GalleryCard({ excludeIndices = [] }: { excludeIndices?: number[] }) {
  const [index, setIndex] = useState(() =>
    Math.floor(Math.random() * galleryImages.length)
  );
  const [flipping, setFlipping] = useState(false);
  const hoverRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (hoverRef.current) return;
      setFlipping(true);
      setTimeout(() => {
        setIndex((prev) => getNextIndex(prev, excludeIndices));
        setFlipping(false);
      }, 600);
    }, Math.random() * 4000 + 9000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
      className="relative h-64 w-full group [perspective:1000px] overflow-visible"
    >
      <div
        className={`relative h-full w-full transition-transform duration-[1200ms] rounded-xl shadow-2xl ${
          flipping ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
        } border-4 border-[#1c5091] overflow-visible`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 rounded-xl bg-white overflow-visible"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image
            fill
            src={galleryImages[index]}
            alt={`Gallery Image`}
            className="object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
            <span className="text-white font-semibold">Featured Image</span>
          </div>
        </div>
      </div>
    </div>
  );
}
