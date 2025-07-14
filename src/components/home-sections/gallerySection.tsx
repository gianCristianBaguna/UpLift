"use client";

import { useEffect, useState, useRef } from "react";
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

// Utility to get the next unique image index
const getNextImageIndex = (current: number, used: number[]) => {
  let next = (current + 1) % galleryImages.length;
  while (used.includes(next)) next = (next + 1) % galleryImages.length;
  return next;
};

export default function GallerySection() {
  /* ─────────── DESKTOP state (6 cards) ─────────── */
  const [indexes, setIndexes] = useState([0, 1, 2, 3, 4, 5]);
  const [fading, setFading] = useState(Array(6).fill(false));
  const hoverRef = useRef(Array(6).fill(false));

  /* ─────────── MOBILE state (1 card) ─────────── */
  const [mobileIndex, setMobileIndex] = useState(0);
  const [mobileFading, setMobileFading] = useState(false);
  const mobileHoverRef = useRef(false);

  /* ─────────── INTERVAL EFFECTS ─────────── */
  useEffect(() => {
    // desktop auto‑rotate
    const desktopIntervals = indexes.map((_, box) =>
      setInterval(() => {
        if (hoverRef.current[box]) return;
        setFading((p) => p.map((v, i) => (i === box ? true : v)));

        setTimeout(() => {
          setIndexes((prev) => {
            const used = prev.filter((_, i) => i !== box);
            const next = getNextImageIndex(prev[box], used);
            const clone = [...prev];
            clone[box] = next;
            return clone;
          });
          setFading((p) => p.map((v, i) => (i === box ? false : v)));
        }, 500);
      }, 5000)
    );

    // mobile auto‑rotate
    const mobileInterval = setInterval(() => {
      if (mobileHoverRef.current) return;
      setMobileFading(true);
      setTimeout(() => {
        setMobileIndex((prev) => getNextImageIndex(prev, []));
        setMobileFading(false);
      }, 500);
    }, 5000);

    return () => {
      desktopIntervals.forEach(clearInterval);
      clearInterval(mobileInterval);
    };
  }, []);

  /* ─────────── RENDER ─────────── */
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#1c5091] mb-2">GALLERY</h2>
        <p className="text-orange-400 mb-8">
          Empowering Futures Through Education and Care
        </p>

        {/* MOBILE (one card) */}
        <div className="md:hidden mb-8">
          <div
            onMouseEnter={() => (mobileHoverRef.current = true)}
            onMouseLeave={() => (mobileHoverRef.current = false)}
            className={`relative h-64 w-full rounded-xl overflow-hidden group shadow-lg transition-opacity duration-500 ${
              mobileFading ? "opacity-0" : "opacity-100"
            }`}
          >
            <Image
              fill
              src={galleryImages[mobileIndex]}
              alt="Mobile Gallery"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white font-semibold">Featured Image</span>
            </div>
          </div>
        </div>

        {/* DESKTOP (six‑card grid) */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {indexes.map((imgIdx, i) => (
            <div
              key={i}
              onMouseEnter={() => (hoverRef.current[i] = true)}
              onMouseLeave={() => (hoverRef.current[i] = false)}
              className={`relative h-64 w-full rounded-xl overflow-hidden group shadow-lg transition-opacity duration-500 ${
                fading[i] ? "opacity-0" : "opacity-100"
              }`}
            >
              <Image
                fill
                src={galleryImages[imgIdx]}
                alt={`Gallery ${i + 1}`}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-semibold">Featured Image</span>
              </div>
            </div>
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
