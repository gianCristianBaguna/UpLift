import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 items-start">
        <div>
          <Image
            src="/uplift-logo.png"
            alt="Uplift Logo"
            width={140}
            height={60}
            className="mb-4"
          />
          <p className="text-sm text-gray-600 max-w-xs">
            Empowering communities through education, outreach, and sustainable
            programs that uplift lives.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-[#1c5091] transition-colors" />
                Home
            </li>
            <li>
              <a href="/pages/about" className="hover:text-[#1c5091] transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="/pages/events" className="hover:text-[#1c5091] transition-colors">
                Events
              </a>
            </li>
            <li>
              <a href="/pages/gallery" className="hover:text-[#1c5091] transition-colors">
                Gallery
              </a>
            </li>
            <li>
              <a href="/pages/donation" className="hover:text-[#1c5091] transition-colors">
                Donate
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Stay Connected</h4>
          <p className="text-sm text-gray-600 mb-4">
            Reach out anytime. We&apos;re here to help and collaborate.
          </p>
          <div className="flex space-x-4">
            <a href="mailto:info@uplift.org" className="text-gray-600 hover:text-[#1c5091]">
              <Mail size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-[#1c5091]">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-[#1c5091]">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-[#1c5091]">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-[#1c5091]">
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Wisdomoustech Solutions. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <a href="#" className="hover:text-[#1c5091]">Terms</a>
          <a href="#" className="hover:text-[#1c5091]">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
