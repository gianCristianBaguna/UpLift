"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Shell from "@/components/navbar/shell";

interface GalleryItem {
  cover: string;
  title: string;
  description: string;
  images: string[];
}

interface CategoryItem {
  title: string;
  description: string;
  image: string;
  projects: string[];
}

const fallbackGallery: GalleryItem[] = [
  {
    title: "🚻 Comfort Room Donation",
    cover: "/gallery/gallery1.png",
    description:
      "Donation of a comfort room to La Castellana I District Office to promote hygiene and comfort in schools.",
    images: [
      "/gallery/gallery1.png",
      "/gallery/gallery2.png",
      "/gallery/gallery3.png",
    ],
  },
  {
    title: "📚 VALUES Project",
    cover: "/gallery/gallery4.png",
    description:
      "Promoting values and literacy through books, storytelling, and educational drives.",
    images: [
      "/gallery/gallery4.png",
      "/gallery/gallery5.png",
      "/gallery/gallery6.png",
    ],
  },
  {
    title: "🎒 Back‑to‑School Program",
    cover: "/gallery/gallery7.png",
    description:
      "100 school supply kits distributed in partnership with LCNHS Junior High SSLG.",
    images: [
      "/gallery/gallery7.png",
      "/gallery/gallery8.png",
      "/gallery/gallery9.png",
    ],
  },
];

const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState<number>(0);

  const galleryData = fallbackGallery;

  const openModal = (index: number) => {
    setModalIndex(index);
    setCurrentPreviewIndex(0);
  };

  const closeModal = () => setModalIndex(null);

  const prevImage = () => {
    if (modalIndex === null) return;
    const total = galleryData[modalIndex].images.length;
    setCurrentPreviewIndex((prev) => (prev - 1 + total) % total);
  };

  const nextImage = () => {
    if (modalIndex === null) return;
    const total = galleryData[modalIndex].images.length;
    setCurrentPreviewIndex((prev) => (prev + 1) % total);
  };

  const categoriesData: CategoryItem[] = [
    {
      title: "🚻 Infrastructure",
      description: "Comfort Room Donations & Facilities",
      image: "/gallery/comfort-room.jpg",
      projects: ["Comfort Room Donation to La Castellana I District Office"],
    },
    {
      title: "📚 Education",
      description: "VALUES & Educational Programs",
      image: "/gallery/values.jpg",
      projects: [
        "VALUES - Values Advocacy and Literacy Upliftment",
        "Educational Assistance",
        "Back-to-School Program",
      ],
    },
    {
      title: "🍽️ Feeding Program",
      description: "Nutrition & Food Security",
      image: "/gallery/feeding.jpg",
      projects: ["Community Feeding Programs", "Outreach Feeding for Evacuees"],
    },
    {
      title: "🎓 Educational Assistance",
      description: "Scholarships & School Supplies",
      image: "/gallery/education.jpg",
      projects: [
        "105 Loboc Children Educational Assistance",
        "School Supplies Distribution",
      ],
    },
    {
      title: "🏫 School Outreach",
      description: "Rural School Programs",
      image: "/gallery/outreach.jpg",
      projects: [
        "Tipolo Cabandungga Elem. School",
        "Odiong Elem. School",
        "Talaptap Elem. School",
      ],
    },
    {
      title: "🆘 Relief Operations",
      description: "Disaster Response & Emergency Aid",
      image: "/gallery/relief.jpg",
      projects: ["Mt. Kanla‑on Eruption Relief", "Typhoon Odette Response"],
    },
    {
      title: "🏠 Housing Assistance",
      description: "Shelter & Construction Materials",
      image: "/gallery/housing.jpg",
      projects: [
        "Housing Materials for 80 Families",
        "Post‑Disaster Reconstruction",
      ],
    },
    {
      title: "🏥 Medical Mission",
      description: "Healthcare & Medical Services",
      image: "/gallery/medical.jpg",
      projects: ["Community Health Programs", "Medical Outreach"],
    },
    {
      title: "🌍 International Outreach",
      description: "Global Community Support",
      image: "/gallery/international.jpg",
      projects: ["Parish Community Support in Africa"],
    },
  ];

  return (
    <Shell>
      <section className="relative py-16 bg-gray-50 mt-20  bg-gradient-to-b from-orange-100 via-orange-50 to-white ">
        <svg
          className="absolute bottom-0 left-0 w-full h-90 text-orange-200 rotate-180 pointer-events-none"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,64L60,58.7C120,53,240,43,360,58.7C480,75,600,117,720,117.3C840,117,960,75,1080,64C1200,53,1320,75,1380,85.3L1440,96V0H1380C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0H0Z"
          />
        </svg>

        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-2xl font-semibold text-[#1c5091]">
              UPLIFT Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our diverse range of community programs and initiatives.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-10">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`p-4 rounded-lg border-2 transition-all text-center ${
                selectedCategory === null
                  ? "border-orange-500 bg-orange-50 text-orange-700"
                  : "border-gray-200 hover:border-orange-300 bg-white"
              }`}
            >
              <div className="text-2xl mb-2">🌟</div>
              <div className="text-sm font-medium">All Programs</div>
            </button>
            {categoriesData.map((cat) => (
              <button
                key={cat.title}
                onClick={() => setSelectedCategory(cat.title)}
                className={`p-4 rounded-lg border-2 transition-all text-center ${
                  selectedCategory === cat.title
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-gray-200 hover:border-orange-300 bg-white"
                }`}
              >
                <div className="text-2xl mb-2">{cat.title.split(" ")[0]}</div>
                <div className="text-sm font-medium">
                  {cat.title.substring(2)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {cat.projects.length} projects
                </div>
              </button>
            ))}
          </div>

          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl p-6 mb-10"
            >
              {(() => {
                const cat = categoriesData.find(
                  (c) => c.title === selectedCategory
                );
                if (!cat) return null;
                return (
                  <div>
                    <h3 className="text-xl font-semibold text-[#1c5091] mb-2">
                      {cat.title}
                    </h3>
                    <p className="text-gray-700 mb-4">{cat.description}</p>
                    <h4 className="font-medium text-gray-800 mb-1">
                      Programs in this category:
                    </h4>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {cat.projects.map((p) => (
                        <li
                          key={p}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <span className="w-2 h-2 bg-orange-400 rounded-full mr-2" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })()}
            </motion.div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryData.map((item, index) => (
              <div
                key={item.title}
                onClick={() => openModal(index)}
                className="relative group cursor-pointer border rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-white"
              >
                <Image
                  src={item.cover || "/placeholder.svg"}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <span className="text-white text-lg font-medium">
                    🔍 Preview Gallery
                  </span>
                </div>
                <div className="p-4 space-y-1">
                  <h2 className="text-lg font-semibold text-[#1c5091]">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-700">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Modal */}
          <AnimatePresence>
            {modalIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
              >
                <div className="relative rounded-xl max-w-4xl w-full p-6">
                  <button
                    className="absolute top-4 right-4 text-white hover:text-red-500"
                    onClick={closeModal}
                  >
                    <X size={24} />
                  </button>

                  <div className="flex flex-col gap-4">
                    <div className="relative w-full h-[400px]">
                      <Image
                        src={
                          galleryData[modalIndex].images[currentPreviewIndex]
                        }
                        alt={`Preview ${currentPreviewIndex + 1}`}
                        layout="fill"
                        objectFit="contain"
                        className="rounded"
                      />
                      <button
                        onClick={prevImage}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-black/50 hover:bg-black/70 text-white rounded-r"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-black/50 hover:bg-black/70 text-white rounded-l"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </div>

                    <div className="flex overflow-x-auto gap-2 pt-2">
                      {galleryData[modalIndex].images.map((img, idx) => (
                        <button
                          key={img}
                          onClick={() => setCurrentPreviewIndex(idx)}
                          className={`w-20 h-16 border-2 rounded overflow-hidden transition-all ${
                            currentPreviewIndex === idx
                              ? "border-orange-500"
                              : "border-gray-300"
                          }`}
                        >
                          <Image
                            src={img}
                            alt={`Thumb ${idx + 1}`}
                            width={80}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Shell>
  );
};

export default GallerySection;
