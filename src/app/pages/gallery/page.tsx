import Image from "next/image";
import Shell from "@/components/navbar/shell";

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

export default function GalleryPage() {
  return (
        <Shell>
    <main className="bg-white py-16 px-6 mt-24">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-[#1c5091] mb-4">Full Gallery</h1>
        <p className="text-orange-400 mb-10">
          Explore all captured moments and milestones
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {galleryImages.map((src, i) => (
            <div key={i} className="relative h-48 w-full rounded-xl overflow-hidden shadow-md group cursor-pointer">
              <Image
                src={src}
                alt={`Gallery Image ${i + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
    </Shell>
  );
}
