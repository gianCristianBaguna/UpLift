export default function GallerySection() {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#1c5091] mb-2">GALLERY</h2>
        <p className="text-orange-400 mb-6">Empowering Futures Through Education and Care</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-300 rounded-lg h-48"></div>
          ))}
        </div>
      </div>
    </section>
  );
}