"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/pages/about" },
  { label: "Events", href: "/pages/events" },
  { label: "Gallery", href: "/pages/gallery" },
  { label: "Donation", href: "/pages/donation" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
    <header className="fixed top-0 left-0 w-full z-50 bg-white/40 backdrop-blur text-black shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-30 px-6">
        <Link href="/" className=" hidden md:flex items-center ml-30">
          <Image
            src="/uplift-logo.png"
            alt="Uplift Logo"
            width={160}
            height={80}
            priority
          />
        </Link>

        <Link href="/" className="flex lg:hidden items-center ">
          <Image
            src="/uplift-logo.png"
            alt="Uplift Logo"
            width={160}
            height={80}
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-10 mr-30">
          {navLinks
            .filter((l) => l.label !== "Donation")
            .map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`font-[Montserrat] text-lg px-3 py-2 transition-colors
                    ${
                      isActive(link.href)
                        ? "text-[#F3954A] border-b-2 border-[#F3954A]"
                        : "text-[#2A61AC] hover:text-[#1f4b85]"
                    }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}

          <Link href="/pages/donation">
            <span
              className={`font-poppins text-lg font-bold rounded-full px-6 py-2 transition-colors
                ${
                  isActive("/pages/donation")
                    ? "bg-[#1f4b85] text-white"
                    : "bg-[#2A61AC] text-white hover:bg-[#1f4b85]"
                }`}
            >
              Donation
            </span>
          </Link>
        </nav>

        <button
          className="md:hidden text-[#2A61AC]"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="w-7 h-7" />
        </button>
      </div>

      

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </header><aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Image src="/uplift-logo.png" alt="Logo" width={100} height={40} />
          <button onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
            >
              <span
                className={`font-bold font-[Montserrat] text-lg transition-colors
                  ${
                    isActive(link.href)
                      ? "text-[#1f4b85]"
                      : "text-[#2A61AC] hover:text-[#1f4b85]"
                  }`}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </nav>
      </aside>
      </>
  );
}
