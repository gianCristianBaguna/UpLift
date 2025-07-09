import Image from "next/image";

const eventData = [
  {
    id: 1,
    image: "/event1.png",
    what: "Make a Change – Save A Life",
    when: "May 23, 2025",
    where: "Interface, Don Salvador, Los Confianza",
    why: "Because every life matters.",
    who: "Volunteers, donors, local health workers",
    how: "Community outreach and blood donation",
  },
  {
    id: 2,
    image: "/event2.png",
    what: "Free Medical Mission",
    when: "September 10, 8AM to 5PM",
    where: "La Castellana",
    why: "Up to you",
    who: "Medical, Minor Surgery, Dental, Circumcision, Pediatrics, Gynecology, Cardiology, Optometry, Health Expo, etc.",
    how: "Free medical mission",
  },
];

export default function EventSection() {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#1c5091] mb-6">EVENTS</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventData.map((event) => (
            <div
              key={event.id}
              className="bg-[#1c5091] text-white rounded-2xl p-4 shadow-md relative overflow-hidden flex flex-col transform transition-transform duration-300 hover:scale-[1.03]"
            >
              <div className="h-40 w-full rounded-xl mb-4 overflow-hidden relative group">
                <Image
                  src={event.image}
                  alt={`Event ${event.id}`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <h3 className="font-semibold text-lg mb-1">{event.what}</h3>
              <p className="text-sm text-gray-200 mb-1">
                <strong>When:</strong> {event.when}
              </p>
              <p className="text-sm text-gray-200 mb-1">
                <strong>Where:</strong> {event.where}
              </p>
              <p className="text-sm text-gray-200 mb-1">
                <strong>Why:</strong> {event.why}
              </p>
              <p className="text-sm text-gray-200 mb-1">
                <strong>Who:</strong> {event.who}
              </p>
              <p className="text-sm text-gray-200 mb-3">
                <strong>How:</strong> {event.how}
              </p>
              <button className="mt-auto bg-orange-400 text-white py-1 px-4 rounded-full text-sm hover:bg-orange-500 transition">
                Learn More
              </button>
            </div>
          ))}

          <div className="w-full lg:w-[350px] flex flex-col gap-4 min-h-[200px]">
            {eventData.map((event) => (
              <div
                key={event.id}
                className="bg-white text-[#1c5091] shadow-lg min-h-[100px] rounded-lg p-5 text-lg font-semibold hover:bg-[#1c5091] hover:text-white transition duration-200 cursor-pointer"
              >
                {event.what}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
