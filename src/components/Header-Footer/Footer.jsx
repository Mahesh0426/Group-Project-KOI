import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-[linear-gradient(135deg,_#2d3748_0%,_#1a202c_100%)] text-white py-12 px-4">
    <div className="max-w-screen-xl mx-auto">
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div>
          <h3 className="mb-4 text-xl font-bold">STEM Explorers Club</h3>
          <p className="text-gray-300 mb-4">
            Inspiring young minds through hands-on STEM education.
          </p>
          <div className="flex gap-4 mt-4">
            <a
              aria-label="Facebook"
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-125 text-gray-300 hover:text-blue-400"
            >
              <Facebook size={24} />
            </a>
            <a
              aria-label="Instagram"
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-125 text-gray-300 hover:text-pink-400"
            >
              <Instagram size={24} />
            </a>
            <a
              aria-label="Twitter"
              href="https://x.com/home"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-125 text-gray-300 hover:text-blue-300"
            >
              <Twitter size={24} />
            </a>
            <a
              aria-label="YouTube"
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-125 text-gray-300 hover:text-red-500"
            >
              <Youtube size={24} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
          <ul>
            <li className="mb-2">
              <Link
                to="/about"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                About Us
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/programs"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                Programs
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/gallery"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                Gallery
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/contact"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-lg font-semibold">Contact Info</h4>
          <p className="mb-2">📧 info@stemexplorers.com</p>
          <p className="mb-2">📞 0426182792</p>
          <p className="mb-2">
            📍 Levels 1 and 2, 17 O’Connell Street Sydney, NSW, 2000
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-lg font-semibold">Hours</h4>
          <p className="mb-2">Monday - Friday: 3:00 PM - 7:00 PM</p>
          <p className="mb-2">Saturday: 9:00 AM - 5:00 PM</p>
          <p className="mb-2">Sunday: 10:00 AM - 4:00 PM</p>
        </div>
      </div>
      <div className="border-t border-gray-700 pt-4 text-center text-gray-400">
        &copy; 2025 STEM Explorers Club. All rights reserved.
      </div>
    </div>
  </footer>
);
export default Footer;
