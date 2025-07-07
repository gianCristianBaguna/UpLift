export default function GetInTouchSection() {
  return (
    <section className="bg-[#1c5091] text-white py-12 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
        <p className="mb-8 text-orange-300">
          Subscribe to our mailing list for inspiring stories and updates from Uplift Foundation International. Stay connected with our mission to empower children and youth through education, compassionate care, and strong community partnerships.
        </p>
        <form className="bg-white text-black rounded-xl shadow-md p-6 grid gap-4 md:grid-cols-2">
          <input type="text" placeholder="First Name" className="border-b outline-none py-2 px-3 col-span-1" />
          <input type="text" placeholder="Last Name" className="border-b outline-none py-2 px-3 col-span-1" />
          <textarea placeholder="Message" className="border-b outline-none py-2 px-3 col-span-2" rows={3}></textarea>
          <div className="col-span-2 flex justify-center mt-4">
            <button type="submit" className="bg-orange-400 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-500 transition">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
