export default function EventSection() {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#1c5091] mb-6">EVENTS</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2].map((event) => (
            <div key={event} className="bg-[#1c5091] text-white rounded-2xl p-4 shadow-md relative overflow-hidden">
              <div className="h-40 bg-gradient-to-t from-green-200 to-green-100 rounded-xl mb-4"></div>
              <h3 className="font-semibold text-lg">Make a Change – Save A Life</h3>
              <p className="text-sm text-gray-200 mb-1">May 23, 2025</p>
              <p className="text-sm text-gray-200 mb-3">Interface, Don Salvador, Los Confianza</p>
              <button className="mt-auto bg-orange-400 text-white py-1 px-4 rounded-full text-sm hover:bg-orange-500 transition">
                Learn More
              </button>
            </div>
          ))}
          <div className="lg:col-span-1 flex flex-col justify-between gap-4">
            {[1, 2, 3].map((e) => (
              <div key={e} className="bg-white text-[#1c5091] shadow rounded-lg p-3 font-semibold">
                Make a Change – Save A Life
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}