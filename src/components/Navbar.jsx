import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar({ user, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { name: "Home", to: "/" },
    { name: "Explore", to: "/explore" },
    { name: "Nearby", to: "/nearby" },
    { name: "Cultural Calendar", to: "/calendar" },
    { name: "Community", to: "/community" },
    { name: "Homestays", to: "/homestays" },
    { name: "Handicrafts", to: "/handicrafts" },
    { name: "Local Tours", to: "/tours" },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-gradient-to-r from-orange-100 via-amber-100 to-orange-200/70 backdrop-blur-md border-b border-orange-200/30 shadow-md transition-all">
  <div className="container mx-auto px-4 flex items-center justify-between py-3 md:py-4">
    {/* Logo */}
    <Link to="/" className="flex items-center gap-3">
      <img
        src="./assets/images/logo.jpg"
        alt="Monastery360"
        className="h-12 w-12 rounded-full shadow-sm"
      />
      <div>
        <div className="text-orange-800 font-bold text-xl">KoraView</div>
        <div className="text-sm text-orange-600">Explore Sikkim’s spiritual heritage</div>
      </div>
    </Link>

    {/* Desktop Menu */}
    <nav className="hidden md:flex items-center gap-5">
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className="px-3 py-1 rounded-lg text-orange-800 font-medium hover:bg-orange-200 hover:shadow-md transition-all duration-300"
        >
          {link.name}
        </Link>
      ))}

      {user ? (
        <>
          <span className="px-3 py-1 bg-orange-50 text-orange-800 rounded-lg text-sm font-medium shadow-inner">
            {user.role}
          </span>
          <button
            onClick={onLogout}
            className="ml-2 px-3 py-1 bg-orange-200/50 text-orange-800 rounded-lg font-medium hover:bg-orange-300 hover:shadow-md transition-all duration-300"
          >
            Logout
          </button>
        </>
      ) : (
        <Link
          to="/login"
          className="px-3 py-1 bg-orange-200/50 text-orange-800 rounded-lg font-medium hover:bg-orange-300 hover:shadow-md transition-all duration-300"
        >
          Login
        </Link>
      )}
    </nav>

    {/* Mobile Menu Button */}
    <div className="md:hidden flex items-center">
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="p-2 rounded-lg bg-orange-50/50 hover:bg-orange-100 transition-all duration-300 shadow-sm"
      >
        {mobileOpen ? <X className="w-6 h-6 text-orange-800" /> : <Menu className="w-6 h-6 text-orange-800" />}
      </button>
    </div>
  </div>

  {/* Mobile Menu Dropdown */}
  {mobileOpen && (
    <div className="md:hidden bg-gradient-to-b from-orange-100 via-amber-100 to-orange-200/50 backdrop-blur-md border-t border-orange-200/30 px-4 py-3 flex flex-col gap-2 rounded-b-2xl shadow-md">
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          onClick={() => setMobileOpen(false)}
          className="px-3 py-2 rounded-lg text-orange-800 font-medium hover:bg-orange-200 hover:shadow-md transition-all duration-300"
        >
          {link.name}
        </Link>
      ))}

      {user ? (
        <>
          <span className="px-3 py-2 bg-orange-50 text-orange-800 rounded-lg text-sm font-medium shadow-inner">
            {user.role}
          </span>
          <button
            onClick={() => { onLogout(); setMobileOpen(false); }}
            className="mt-2 px-3 py-2 bg-orange-200/50 text-orange-800 rounded-lg font-medium hover:bg-orange-300 hover:shadow-md transition-all duration-300"
          >
            Logout
          </button>
        </>
      ) : (
        <Link
          to="/login"
          onClick={() => setMobileOpen(false)}
          className="px-3 py-2 bg-orange-200/50 text-orange-800 rounded-lg font-medium hover:bg-orange-300 hover:shadow-md transition-all duration-300"
        >
          Login
        </Link>
      )}
    </div>
  )}
</header>

  );
}
