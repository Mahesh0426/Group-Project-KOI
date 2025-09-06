import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 shadow-md bg-gradient-to-r from-indigo-500 to-purple-600">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-white text-2xl font-bold">
          🔬 STEM Explorers Club
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-white font-semibold">
          <li>
            <a
              href="index.html"
              className="hover:bg-white/20 px-4 py-2 rounded-full transition"
              aria-current="page"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="about.html"
              className="hover:bg-white/20 px-4 py-2 rounded-full transition"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="programs.html"
              className="hover:bg-white/20 px-4 py-2 rounded-full transition"
            >
              Programs
            </a>
          </li>
          <li>
            <a
              href="gallery.html"
              className="bg-white/20 px-4 py-2 rounded-full transition"
            >
              Gallery
            </a>
          </li>
          <li>
            <a
              href="contact.html"
              className="hover:bg-white/20 px-4 py-2 rounded-full transition"
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="md:hidden text-white p-2 rounded hover:bg-white/10"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-indigo-500 to-purple-600 px-4 pb-4">
          <ul className="flex flex-col space-y-4 text-white font-semibold">
            <li>
              <a
                href="index.html"
                className="hover:bg-white/20 px-4 py-2 rounded-full transition block"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="about.html"
                className="hover:bg-white/20 px-4 py-2 rounded-full transition block"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="programs.html"
                className="hover:bg-white/20 px-4 py-2 rounded-full transition block"
              >
                Programs
              </a>
            </li>
            <li>
              <a
                href="gallery.html"
                className="bg-white/20 px-4 py-2 rounded-full transition block"
                aria-current="page"
              >
                Gallery
              </a>
            </li>
            <li>
              <a
                href="contact.html"
                className="hover:bg-white/20 px-4 py-2 rounded-full transition block"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
