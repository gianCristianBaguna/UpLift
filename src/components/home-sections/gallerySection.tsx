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
  return (
    <section className="bg-white py-16 px-4 overflow-visible">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#1c5091] mb-2">GALLERY</h2>
        <p className="text-orange-400 mb-8">
          Empowering Futures Through Education and Care
        </p>

        <div className="md:hidden mb-8">
          <GalleryCardMobile />
        </div>

        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <GalleryCard key={i} index={i} excludeIndices={[]} />
          ))}
        </div>

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

/*  Desktop: Independent infinite flipping with alternating borders */
function GalleryCard({
  excludeIndices = [],
  index,
}: {
  excludeIndices?: number[];
  index: number;
}) {
  const [frontIndex, setFrontIndex] = useState(() =>
    Math.floor(Math.random() * galleryImages.length)
  );
  const [backIndex, setBackIndex] = useState(() =>
    getNextIndex(frontIndex, excludeIndices)
  );
  const [flipped, setFlipped] = useState(false);

  const borderColor = index % 2 === 0 ? "border-[#1c5091]" : "border-orange-400";

  useEffect(() => {
    const startDelay = Math.random() * 3000 + 1000;
    let flipInterval: NodeJS.Timeout;

    const startFlipping = () => {
      flipInterval = setInterval(() => {
        setFlipped((prev) => !prev);
        setTimeout(() => {
          if (flipped) {
            setBackIndex((prev) => getNextIndex(prev, excludeIndices));
          } else {
            setFrontIndex((prev) => getNextIndex(prev, excludeIndices));
          }
        }, 600);
      }, 8000);
    };

    const delayTimeout = setTimeout(startFlipping, startDelay);

    return () => {
      clearTimeout(delayTimeout);
      clearInterval(flipInterval);
    };
  }, [flipped, excludeIndices]);

  return (
    <div className="relative h-64 w-full group [perspective:1000px] overflow-visible" id="gallery-card">
      <div
        className={`relative h-full w-full transition-transform duration-[1200ms] rounded-xl shadow-2xl ${
          flipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
        } ${borderColor} overflow-visible`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 rounded-xl bg-white overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image
            fill
            src={galleryImages[frontIndex]}
            alt="Gallery Front"
            className="object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
            <span className="text-white font-semibold">Featured Image</span>
          </div>
        </div>

        <div
          className="absolute inset-0 rounded-xl bg-white overflow-hidden [transform:rotateY(180deg)]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image
            fill
            src={galleryImages[backIndex]}
            alt="Gallery Back"
            className="object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
            <span className="text-white font-semibold">More from the Gallery</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Mobile Independent flip with alternating images */
function GalleryCardMobile() {
  const [frontIndex, setFrontIndex] = useState(0);
  const [backIndex, setBackIndex] = useState(1);
  const [flipped, setFlipped] = useState(false);
  const hoverRef = useRef(false);

  useEffect(() => {
    const startDelay = Math.random() * 2000 + 1000;
    let flipInterval: NodeJS.Timeout;

    const startFlipping = () => {
      flipInterval = setInterval(() => {
        if (hoverRef.current) return;
        setFlipped((prev) => !prev);
        setTimeout(() => {
          if (flipped) {
            setBackIndex((prev) => getNextIndex(prev, []));
          } else {
            setFrontIndex((prev) => getNextIndex(prev, []));
          }
        }, 600);
      }, 8000);
    };

    const delayTimeout = setTimeout(startFlipping, startDelay);

    return () => {
      clearTimeout(delayTimeout);
      clearInterval(flipInterval);
    };
  }, [flipped]);

  return (
    <div
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
      className="relative h-64 w-full group [perspective:1000px] overflow-visible"
    >
      <div
        className={`relative h-full w-full transition-transform duration-[800ms] rounded-xl shadow-2xl ${
          flipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
        } border-[#1c5091] overflow-visible`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 rounded-xl bg-white overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image
            fill
            src={galleryImages[frontIndex]}
            alt="Mobile Gallery Front"
            className="object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
            <span className="text-white font-semibold">Featured Image</span>
          </div>
        </div>

        <div
          className="absolute inset-0 rounded-xl bg-white overflow-hidden [transform:rotateY(180deg)]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image
            fill
            src={galleryImages[backIndex]}
            alt="Mobile Gallery Back"
            className="object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
            <span className="text-white font-semibold">More from the Gallery</span>
          </div>
        </div>
      </div>
    </div>
  );
}
