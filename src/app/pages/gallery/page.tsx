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
  category: string[];
}

interface CategoryItem {
  title: string;
  description: string;
  image: string;
  projects: string[];
}

const fallbackGallery: GalleryItem[] = [
  {
    title: " CR Donation - District Office",
    cover: "/gallery/gallery1.png",
    description: "New comfort room donated to La Castellana I District Office.",
    images: [
      "/gallery/gallery1.png",
      "/gallery/gallery2.png",
      "/gallery/gallery3.png",
    ],
    category: [" Infrastructure", "Housing Assistance"],
  },
  {
    title: " VALUES Literacy Drive",
    cover: "/gallery/gallery4.png",
    description: "Books and storytelling activities in rural schools.",
    images: [
      "/gallery/gallery4.png",
      "/gallery/gallery5.png",
      "/gallery/gallery6.png",
    ],
    category: [" Education"],
  },
  {
    title: " Back-to-School Kits",
    cover: "/gallery/gallery7.png",
    description: "Distribution of 100+ school supply kits.",
    images: [
      "/gallery/gallery7.png",
      "/gallery/gallery8.png",
      "/gallery/gallery9.png",
    ],
    category: [" Educational Assistance", " School Outreach"],
  },
  {
    title: " Feeding for Evacuees",
    cover: "/gallery/feeding.jpg",
    description: "Nutritional meals served to disaster-affected families.",
    images: ["/gallery/feeding.jpg", "/gallery/gallery2.png"],
    category: [" Feeding Program"],
  },
  {
    title: " Medical Outreach",
    cover: "/gallery/medical.jpg",
    description: "Free health consultations in underserved areas.",
    images: ["/gallery/medical.jpg"],
    category: [" Medical Mission"],
  },
  {
    title: " Typhoon Relief Goods",
    cover: "/gallery/relief.jpg",
    description: "Emergency aid distributed to typhoon victims.",
    images: ["/gallery/gallery3.png"],
    category: [" Relief Operations", " Feeding Program"],
  },
  {
    title: "Housing Support - 80 Families",
    cover: "/gallery/gallery6.png",
    description: "Post-disaster materials for family homes.",
    images: ["/gallery/housing.jpg"],
    category: ["Housing Assistance", " Infrastructure"],
  },
  {
    title: " Tipolo Elementary Outreach",
    cover: "/gallery/gallery2.png",
    description: "School supplies and support to rural schools.",
    images: ["/gallery/outreach.jpg"],
    category: [" School Outreach"],
  },
  {
    title: "African Parish Aid",
    cover: "/gallery/gallery3.png",
    description: "International donation support to Africa.",
    images: ["/gallery/international.jpg"],
    category: ["International Outreach"],
  },
];

const categoriesData: CategoryItem[] = [
  {
    title: " Infrastructure",
    description: "Comfort Room Donations & Facilities",
    image: "",
    projects: [],
  },
  {
    title: " Education",
    description: "VALUES & Educational Programs",
    image: "",
    projects: [],
  },
  {
    title: " Feeding Program",
    description: "Nutrition & Food Security",
    image: "",
    projects: [],
  },
  {
    title: " Educational Assistance",
    description: "Scholarships & School Supplies",
    image: "",
    projects: [],
  },
  {
    title: " School Outreach",
    description: "Rural School Programs",
    image: "",
    projects: [],
  },
  {
    title: " Relief Operations",
    description: "Disaster Response & Emergency Aid",
    image: "",
    projects: [],
  },
  {
    title: "Housing Assistance",
    description: "Shelter & Construction Materials",
    image: "",
    projects: [],
  },
  {
    title: " Medical Mission",
    description: "Healthcare & Medical Services",
    image: "",
    projects: [],
  },
  {
    title: "International Outreach",
    description: "Global Community Support",
    image: "",
    projects: [],
  },
];

const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState<number>(0);

  const galleryData = fallbackGallery;
  const filteredGallery = selectedCategory
    ? galleryData.filter((item) => item.category.includes(selectedCategory))
    : galleryData;

  const openModal = (index: number) => {
    setModalIndex(index);
    setCurrentPreviewIndex(0);
  };

  const closeModal = () => setModalIndex(null);

  const prevImage = () => {
    if (modalIndex === null) return;
    const total = filteredGallery[modalIndex].images.length;
    setCurrentPreviewIndex((prev) => (prev - 1 + total) % total);
  };

  const nextImage = () => {
    if (modalIndex === null) return;
    const total = filteredGallery[modalIndex].images.length;
    setCurrentPreviewIndex((prev) => (prev + 1) % total);
  };

  return (
    <Shell>
      <section className="relative min-h-screen w-full py-16 bg-gradient-to-br from-[#e0f7fa] via-[#fceabb] to-[#f8b500] overflow-hidden mt-20">
        <svg
          className="absolute left-0 top-0 w-full h-80 text-[#f8b500]/20 pointer-events-none"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,160L80,149.3C160,139,320,117,480,122.7C640,128,800,160,960,154.7C1120,149,1280,107,1360,85.3L1440,64V0H1360C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0H0Z"
          />
        </svg>
        <svg
          className="absolute right-0 bottom-0 w-96 h-96 text-[#1c5091]/10 blur-2xl pointer-events-none"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="80" fill="currentColor" />
        </svg>

        <div className="relative container mx-auto px-4">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-2xl font-semibold text-[#1c5091]">
              UPLIFT Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our diverse range of community programs and initiatives.
            </p>
          </div>

          {/* Mobile: modern select */}
          <div className="block sm:hidden mb-6">
            <select
              value={selectedCategory ?? ""}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="w-full p-3 border border-[#f8b500] bg-white text-black rounded-lg shadow focus:ring-2 focus:ring-[#f8b500] text-base"
            >
              <option value="">🌟 All Programs</option>
              {categoriesData.map((cat) => (
                <option key={cat.title} value={cat.title}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          {/* Desktop: modern category chips */}
          <div className="hidden sm:flex flex-wrap gap-3 justify-center mb-10">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm font-medium transition whitespace-nowrap shadow-sm ${
                selectedCategory === null
                  ? "border-[#f8b500] bg-[#f8b500]/10 text-[#f8b500] scale-105"
                  : "border-gray-200 bg-white hover:border-[#f8b500] hover:bg-[#f8b500]/5 text-gray-700"
              }`}
            >
              🌟 All Programs
            </button>
            {categoriesData.map((cat) => (
              <button
                key={cat.title}
                onClick={() => setSelectedCategory(cat.title)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm font-medium transition whitespace-nowrap shadow-sm ${
                  selectedCategory === cat.title
                    ? "border-[#1c5091] bg-[#1c5091]/10 text-[#1c5091] scale-105"
                    : "border-gray-200 bg-white hover:border-[#1c5091] hover:bg-[#1c5091]/5 text-gray-700"
                }`}
                title={cat.description}
              >
                {cat.title}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item, index) => (
              <div
                key={item.title}
                onClick={() => openModal(index)}
                className="relative group cursor-pointer border rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-white"
              >
                <Image
                  src={item.cover}
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
                          filteredGallery[modalIndex].images[
                            currentPreviewIndex
                          ]
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
                      {filteredGallery[modalIndex].images.map((img, idx) => (
                        <button
                          key={img}
                          onClick={() => setCurrentPreviewIndex(idx)}
                          className={`w-20 h-16 border-2 rounded overflow-hidden transition-all ${
                            currentPreviewIndex === idx
                              ? "border-[#f8b500]"
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
