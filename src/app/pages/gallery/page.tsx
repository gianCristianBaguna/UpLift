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
    title: "🚻 CR Donation - District Office",
    cover: "/gallery/gallery1.png",
    description: "New comfort room donated to La Castellana I District Office.",
    images: [
      "/gallery/gallery1.png",
      "/gallery/gallery2.png",
      "/gallery/gallery3.png",
    ],
    category: ["🚻 Infrastructure", "🏠 Housing Assistance"],
  },
  {
    title: "📚 VALUES Literacy Drive",
    cover: "/gallery/gallery4.png",
    description: "Books and storytelling activities in rural schools.",
    images: [
      "/gallery/gallery4.png",
      "/gallery/gallery5.png",
      "/gallery/gallery6.png",
    ],
    category: ["📚 Education"],
  },
  {
    title: "🎒 Back-to-School Kits",
    cover: "/gallery/gallery7.png",
    description: "Distribution of 100+ school supply kits.",
    images: [
      "/gallery/gallery7.png",
      "/gallery/gallery8.png",
      "/gallery/gallery9.png",
    ],
    category: ["🎓 Educational Assistance", "🏫 School Outreach"],
  },
  {
    title: "🍽️ Feeding for Evacuees",
    cover: "/gallery/feeding.jpg",
    description: "Nutritional meals served to disaster-affected families.",
    images: ["/gallery/feeding.jpg", "/gallery/gallery2.png"],
    category: ["🍽️ Feeding Program"],
  },
  {
    title: "🏥 Medical Outreach",
    cover: "/gallery/medical.jpg",
    description: "Free health consultations in underserved areas.",
    images: ["/gallery/medical.jpg"],
    category: ["🏥 Medical Mission"],
  },
  {
    title: "🆘 Typhoon Relief Goods",
    cover: "/gallery/relief.jpg",
    description: "Emergency aid distributed to typhoon victims.",
    images: ["/gallery/gallery3.png"],
    category: ["🆘 Relief Operations", "🍽️ Feeding Program"],
  },
  {
    title: "🏠 Housing Support - 80 Families",
    cover: "/gallery/gallery6.png",
    description: "Post-disaster materials for family homes.",
    images: ["/gallery/housing.jpg"],
    category: ["🏠 Housing Assistance", "🚻 Infrastructure"],
  },
  {
    title: "🏫 Tipolo Elementary Outreach",
    cover: "/gallery/gallery2.png",
    description: "School supplies and support to rural schools.",
    images: ["/gallery/outreach.jpg"],
    category: ["🏫 School Outreach"],
  },
  {
    title: "🌍 African Parish Aid",
    cover: "/gallery/gallery3.png",
    description: "International donation support to Africa.",
    images: ["/gallery/international.jpg"],
    category: ["🌍 International Outreach"],
  },
];

const categoriesData: CategoryItem[] = [
  {
    title: "🚻 Infrastructure",
    description: "Comfort Room Donations & Facilities",
    image: "",
    projects: [],
  },
  {
    title: "📚 Education",
    description: "VALUES & Educational Programs",
    image: "",
    projects: [],
  },
  {
    title: "🍽️ Feeding Program",
    description: "Nutrition & Food Security",
    image: "",
    projects: [],
  },
  {
    title: "🎓 Educational Assistance",
    description: "Scholarships & School Supplies",
    image: "",
    projects: [],
  },
  {
    title: "🏫 School Outreach",
    description: "Rural School Programs",
    image: "",
    projects: [],
  },
  {
    title: "🆘 Relief Operations",
    description: "Disaster Response & Emergency Aid",
    image: "",
    projects: [],
  },
  {
    title: "🏠 Housing Assistance",
    description: "Shelter & Construction Materials",
    image: "",
    projects: [],
  },
  {
    title: "🏥 Medical Mission",
    description: "Healthcare & Medical Services",
    image: "",
    projects: [],
  },
  {
    title: "🌍 International Outreach",
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
      <section className="relative py-16 bg-gradient-to-b from-orange-100 via-orange-50 to-white overflow-hidden mt-20">
        <svg
          className="absolute left-0 w-full h-90 text-orange-200 pointer-events-none -mt-20"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,64L60,58.7C120,53,240,43,360,58.7C480,75,600,117,720,117.3C840,117,960,75,1080,64C1200,53,1320,75,1380,85.3L1440,96V0H1380C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0H0Z"
          />
        </svg>

        <svg
          className="absolute -bottom-20 -right-20 w-96 h-96 text-[#1c5091]/20 blur-2xl pointer-events-none"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M46.2,-62.7C59,-52.4,67,-37.4,73.3,-21.3C79.5,-5.3,84,11.8,78.4,27.2C72.9,42.6,57.2,56.3,40.2,61.4C23.3,66.5,5.1,63, -12.4,67.2C-29.9,71.3,-47,82.9,-59.6,78.1C-72.2,73.3,-80.3,52.1,-81.3,32.4C-82.2,12.8,-76, -5.3,-71.6,-24.1C-67.2,-43,-64.7,-62.5,-53.4,-73.1C-42,-83.7,-21,-85.4,-3,-81.2C15,-77,29.9,-66.9,46.2,-62.7Z"
            transform="translate(100 100)"
          />
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

          <div className="block sm:hidden mb-6">
            <select
              value={selectedCategory ?? ""}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="w-full p-2 border border-gray-300 text-black rounded-md shadow-sm text-sm"
            >
              <option value="">🌟 All Programs</option>
              {categoriesData.map((cat) => (
                <option key={cat.title} value={cat.title}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          {/* Desktop: category buttons */}
          <div className="hidden sm:grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-10">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`p-1 rounded-md border text-sm font-medium transition text-left whitespace-nowrap text-black ${
                selectedCategory === null
                  ? "border-orange-500 bg-orange-50 text-orange-700"
                  : "border-gray-200 hover:border-orange-300 bg-white"
              }`}
            >
              🌟 All Programs
            </button>
            {categoriesData.map((cat) => (
              <button
                key={cat.title}
                onClick={() => setSelectedCategory(cat.title)}
                className={`p-1 rounded-md border text-sm font-medium transition text-left whitespace-nowrap text-black ${
                  selectedCategory === cat.title
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-gray-200 hover:border-orange-300 bg-white"
                }`}
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
