import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Japan Map", href: "https://phjuan0408-code.github.io/nagoya-trip-2026/" },
  { label: "Takamatsu", path: "/takamatsu" },
  { label: "Tokushima", path: "/tokushima" },
  { label: "Matsuyama", path: "/matsuyama" },
  { label: "Food", path: "/food" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:text-blue-600 transition">
          Goshikoku
        </Link>

        {/* 電腦版選單 */}
        <ul className="hidden md:flex space-x-6 text-base font-medium">
          {navLinks.map(({ label, path, href }) => (
            <li key={label}>
              {href ? (
                <a
                  href={href}
                  className="hover:text-blue-500 transition text-gray-600"
                >
                  {label}
                </a>
              ) : (
                <Link
                  to={path}
                  className={`hover:text-blue-500 transition ${
                    pathname === path ? "text-blue-600 font-semibold" : "text-gray-600"
                  }`}
                >
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* 手機版選單按鈕 */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 手機版選單項目 */}
      {menuOpen && (
        <ul className="md:hidden px-4 pb-4 space-y-2 bg-white shadow">
          {navLinks.map(({ label, path, href }) => (
            <li key={label}>
              {href ? (
                <a
                  href={href}
                  className="block py-1 text-base text-gray-700"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              ) : (
                <Link
                  to={path}
                  className={`block py-1 text-base ${
                    pathname === path ? "text-blue-600 font-semibold" : "text-gray-700"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
