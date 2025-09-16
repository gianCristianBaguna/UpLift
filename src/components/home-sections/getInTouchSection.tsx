import { MessageCircle } from "lucide-react";

export default function GetInTouchSection() {
  return (
    <div className="bg-white ">
      <section className="relative min-h-screen bg-white text-white py-20 overflow-hidden px-4" id="get-in-touch">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#F3954A]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#F3954A]/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F3954A]/5 rounded-full blur-3xl animate-pulse delay-500"></div>

          <div className="absolute inset-0 bg-[linear-gradient(rgba(243,149,74,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(243,149,74,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-6 text-orange-400">Get In Touch</h2>
            <p className="text-orange-500 text-lg max-w-4xl mx-auto leading-relaxed">
              Subscribe to our mailing list for inspiring stories and updates
              from Uplift Foundation International. Stay connected with our
              mission to empower children and youth through education,
              compassionate care, and strong community partnerships.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 min-h-[500px]">
              <div className="bg-gradient-to-br from-orange-400 to-orange-500 p-8 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-transparent bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle
                      className="w-12 h-12 text-white"
                      strokeWidth={2}
                    />
                  </div>

                  <h3 className="text-2xl font-bold mb-2">Let&apos;s Connect</h3>
                  <p className="text-orange-100">We&apos;d love to hear from you</p>
                </div>
              </div>

              <div className="p-8 bg-white">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[#1c5091] font-medium text-sm">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full border-b-2 border-orange-400 bg-transparent py-2 px-0 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[#1c5091] font-medium text-sm">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full border-b-2 border-orange-400 bg-transparent py-2 px-0 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[#1c5091] font-medium text-sm">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full border-b-2 border-orange-400 bg-transparent py-2 px-0 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[#1c5091] font-medium text-sm">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full border-b-2 border-orange-400 bg-transparent py-2 px-0 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                      placeholder="Enter your message"
                    ></textarea>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="bg-orange-400 hover:bg-orange-500 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
