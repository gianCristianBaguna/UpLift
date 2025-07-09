"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, X } from "lucide-react";

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

export default function GallerySection() {
  const [showAll, setShowAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const visibleImages = showAll ? galleryImages : galleryImages.slice(0, 6);

  return (
    <section className="bg-white py-12 px-4 transition-all duration-500 ease-in-out">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#1c5091] mb-2">GALLERY</h2>
        <p className="text-orange-400 mb-6">
          Empowering Futures Through Education and Care
        </p>

        <div
          className={`grid grid-cols-2 md:grid-cols-3 gap-4 transition-all duration-700 ease-in-out ${
            showAll ? "mb-8" : "mb-6"
          }`}
        >
          {visibleImages.map((src, i) => (
            <div
              key={i}
              className="relative h-48 w-full rounded-lg overflow-hidden group cursor-pointer"
              onClick={() => setSelectedImage(src)}
            >
              <Image
                src={src}
                alt={`Gallery Image ${i + 1}`}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  Click to Preview
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-2 flex items-center justify-center mx-auto text-[#1c5091] hover:text-orange-400 transition duration-300"
        >
          {showAll ? (
            <>
              <ChevronUp className="w-6 h-6" />
              <span className="ml-1 font-semibold">Show Less</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-6 h-6" />
              <span className="ml-1 font-semibold">Show More</span>
            </>
          )}
        </button>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center transition-opacity duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-[90vw] max-w-4xl h-[80vh]">
            <Image
              src={selectedImage}
              alt="Full Preview"
              layout="fill"
              objectFit="contain"
              className="rounded-lg shadow-xl"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-black/20 hover:bg-black/70 rounded-full p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
