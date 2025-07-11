"use client";

import { useState } from "react";
import Image from "next/image";
import Shell from "@/components/navbar/shell";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Generate layout ONCE only (NOT inside render)
const rawImages = [
  "/gallery/gallery1.png",
  "/gallery/gallery2.png",
  "/gallery/gallery3.png",
  "/gallery/gallery4.png",
  "/gallery/gallery5.png",
  "/gallery/gallery6.png",
  "/gallery/gallery7.png",
  "/gallery/gallery8.png",
  "/gallery/gallery9.png",
  "/gallery/gallery1.png",
  "/gallery/gallery2.png",
  "/gallery/gallery3.png",
  "/gallery/gallery4.png",
];

const galleryImages = rawImages.map((src, i) => ({
  src,
  category: `Category ${i + 1}`,
  rowSpan: Math.floor(Math.random() * 20) + 10,
  colSpan: Math.random() > 0.7 ? "col-span-2" : "", // 30% chance wide
}));

export default function GalleryPage() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const openModal = (index: number) => setCurrentIndex(index);
  const closeModal = () => setCurrentIndex(null);
  const nextImage = () =>
    setCurrentIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null));
  const prevImage = () =>
    setCurrentIndex((prev) =>
      prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null
    );

  return (
    <Shell>
      <main className="bg-gray-50 py-20 px-6 mt-24 min-h-screen">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-[#1c5091] mb-4 tracking-wide">
            GALLERY
          </h1>
          <p className="text-orange-400 text-lg mb-12 font-medium">
            Empowering Futures Through Education and Care
          </p>

          {/* ✅ Stable Masonry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-[10px]">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                onClick={() => openModal(i)}
                className={`relative group cursor-pointer rounded-lg overflow-hidden border-4 bg-white shadow-md ${img.colSpan}`}
                style={{ gridRowEnd: `span ${img.rowSpan}` }}
              >
                <div className="relative w-full h-full aspect-[3/2]">
                  <Image
                    src={img.src}
                    alt={`Gallery Image ${i + 1}`}
                    fill
                    className="object-cover p-2 transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    Click to Preview
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Modal Preview */}
        {currentIndex !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center transition-opacity duration-300"
            onClick={closeModal}
          >
            <div
              className="relative w-[90vw] max-w-5xl max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[80vh]">
                <Image
                  src={galleryImages[currentIndex].src}
                  alt={`Preview Image ${currentIndex + 1}`}
                  fill
                  className="object-contain rounded-lg shadow-xl"
                  loading="eager"
                />
              </div>

              {/* Close */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white bg-black/30 hover:bg-black/70 rounded-full p-2"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev / Next */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/30 hover:bg-black/70 rounded-full p-2"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/30 hover:bg-black/70 rounded-full p-2"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Caption */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/60 px-4 py-2 rounded-full shadow-md font-medium">
                {galleryImages[currentIndex].category}
              </div>
            </div>
          </div>
        )}
      </main>
    </Shell>
  );
}
