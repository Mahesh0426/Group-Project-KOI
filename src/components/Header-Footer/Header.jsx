// import React, { useState } from "react";
// import { Menu, X } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => setIsOpen(!isOpen);

//   return (
//     <header className="sticky top-0 z-50 shadow-md bg-gradient-to-r from-indigo-500 to-purple-600">
//       <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
//         <div className="text-white text-2xl font-bold">
//           🔬 STEM Explorers Club
//         </div>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex space-x-8 text-white font-semibold">
//           <li>
//             <a
//               href="index.html"
//               className="hover:bg-white/20 px-4 py-2 rounded-full transition"
//               aria-current="page"
//             >
//               Home
//             </a>
//           </li>
//           <li>
//             <a
//               href="about.html"
//               className="hover:bg-white/20 px-4 py-2 rounded-full transition"
//             >
//               About
//             </a>
//           </li>
//           <li>
//             <a
//               href="programs.html"
//               className="hover:bg-white/20 px-4 py-2 rounded-full transition"
//             >
//               Programs
//             </a>
//           </li>
//           <li>
//             <a
//               href="gallery.html"
//               className="bg-white/20 px-4 py-2 rounded-full transition"
//             >
//               Gallery
//             </a>
//           </li>
//           <li>
//             <a
//               href="contact.html"
//               className="hover:bg-white/20 px-4 py-2 rounded-full transition"
//             >
//               Contact
//             </a>
//           </li>
//         </ul>

//         {/* Hamburger Menu (Mobile) */}
//         <button
//           className="md:hidden text-white p-2 rounded hover:bg-white/10"
//           onClick={toggleMenu}
//           aria-label="Toggle navigation menu"
//         >
//           {isOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </nav>

//       {/* Mobile Dropdown */}
//       {isOpen && (
//         <div className="md:hidden bg-gradient-to-r from-indigo-500 to-purple-600 px-4 pb-4">
//           <ul className="flex flex-col space-y-4 text-white font-semibold">
//             <li>
//               <a
//                 href="index.html"
//                 className="hover:bg-white/20 px-4 py-2 rounded-full transition block"
//               >
//                 Home
//               </a>
//             </li>
//             <li>
//               <a
//                 href="about.html"
//                 className="hover:bg-white/20 px-4 py-2 rounded-full transition block"
//               >
//                 About
//               </a>
//             </li>
//             <li>
//               <a
//                 href="programs.html"
//                 className="hover:bg-white/20 px-4 py-2 rounded-full transition block"
//               >
//                 Programs
//               </a>
//             </li>
//             <li>
//               <a
//                 href="gallery.html"
//                 className="bg-white/20 px-4 py-2 rounded-full transition block"
//                 aria-current="page"
//               >
//                 Gallery
//               </a>
//             </li>
//             <li>
//               <a
//                 href="contact.html"
//                 className="hover:bg-white/20 px-4 py-2 rounded-full transition block"
//               >
//                 Contact
//               </a>
//             </li>
//           </ul>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav
        className={`relative flex items-center justify-between max-w-7xl mx-auto px-4 py-4 transition-all duration-300 ${
          isScrolled
            ? "text-black"
            : "text-white bg-gradient-to-r from-indigo-500 to-purple-600 max-w-full"
        }`}
      >
        {/* Liquid Glass Background (only when scrolled) */}
        {isScrolled && (
          <div className="absolute inset-0 bg-white/20 backdrop-blur-md animate-liquidGlass -z-10 rounded-3xl"></div>
        )}

        <div className="text-2xl font-bold relative z-10">
          🔬 STEM Explorers Club
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-semibold relative z-10">
          {["home", "about", "programs", "gallery", "contact", "login"].map(
            (item) => (
              <li key={item}>
                <Link
                  to={item === "home" ? "/" : `/${item}`}
                  className={`px-4 py-2 rounded-full transition ${
                    isScrolled
                      ? "hover:bg-black/10 text-black"
                      : "hover:bg-white/20 text-white"
                  }`}
                >
                  {item}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Hamburger Menu */}
        <button
          className={`md:hidden p-2 rounded transition relative z-10 ${
            isScrolled
              ? "text-black hover:bg-black/10"
              : "text-white hover:bg-white/10"
          }`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div
          className={`md:hidden px-4 pb-4 transition ${
            isScrolled
              ? "bg-white/20 backdrop-blur-md text-black"
              : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
          }`}
        >
          <ul className="flex flex-col space-y-4 font-semibold">
            {["home", "about", "programs", "gallery", "contact", "login"].map(
              (item) => (
                <li key={item}>
                  <Link
                    to={item === "home" ? "/" : `/${item}`}
                    className={`px-4 py-2 rounded-full transition ${
                      isScrolled
                        ? "hover:bg-black/10 text-black"
                        : "hover:bg-white/20 text-white"
                    }`}
                    onClick={() => setIsOpen(false)} // Close mobile menu on click
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
