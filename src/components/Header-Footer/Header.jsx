import React, { useState, useEffect } from "react";
import { Menu, X, LogOut, User, Book } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { logoutUserAction } from "../../redux/auth/userAction";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  //logout function
  const logoutHandler = () => {
    dispatch(logoutUserAction());
    navigate("/");
  };

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
            ? "text-black "
            : "text-white bg-gradient-to-r from-indigo-500 to-purple-600 max-w-full"
        }`}
      >
        {/* Liquid Glass Background (only when scrolled) */}
        {isScrolled && (
          <div className="absolute inset-0 bg-white/20 backdrop-blur-xs animate-liquidGlass -z-10 rounded-3xl"></div>
        )}

        <div className="text-2xl font-bold relative z-10">
          🔬 STEM Explorers Club
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-semibold relative z-10">
          {["home", "about", "programs", "gallery", "contact"].map((item) => (
            <li key={item}>
              <Link
                to={item === "home" ? "/" : `/${item}`}
                className={`px-4 py-2 rounded-full transition ${
                  isScrolled
                    ? "hover:bg-black/10 text-black"
                    : "hover:bg-white/20 text-white"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            </li>
          ))}
          <li>
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar className="h-8 w-8 transition transform hover:scale-110">
                    <AvatarFallback className="bg-gradient-to-br bg-amber-400 text-black">
                      {user?.username?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="flex items-center gap-2">
                    <span className="font-medium">{user?.username}</span>
                  </DropdownMenuItem>
                  <Separator className=" my-2 w-full" />
                  <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                    <User size={18} />
                    <Link to="/my-profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                    <Book size={18} />
                    <Link to="/my-program">My Program</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                    <LogOut size={18} />
                    <span onClick={logoutHandler}>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to="/login"
                className={`px-4 py-2 rounded-full transition ${
                  isScrolled
                    ? "hover:bg-black/10 text-black"
                    : "hover:bg-white/20 text-white"
                }`}
              >
                Login
              </Link>
            )}
          </li>
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
              ? "bg-white/20 backdrop-blur-xs text-black"
              : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
          }`}
        >
          <ul className="flex flex-col space-y-4 font-semibold">
            {["home", "about", "programs", "gallery", "contact"].map((item) => (
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
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              </li>
            ))}
            <li>
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-to-br bg-amber-400 text-black">
                        {user?.username?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="flex items-center gap-2">
                      <span className="font-medium">{user?.username}</span>
                    </DropdownMenuItem>
                    <Separator className=" my-2 w-full" />

                    <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                      <User size={18} />
                      <span onClick={logoutHandler}>My Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                      <Book size={18} />
                      <span>My Program</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                      <LogOut size={18} />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-full transition ${
                    isScrolled
                      ? "hover:bg-black/10 text-black"
                      : "hover:bg-white/20 text-white"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
