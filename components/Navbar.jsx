"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

function VitarLogo({ height = 30 }) {
  return (
    <img
      src="/logo.svg"
      alt="Vitar"
      style={{ height }}
      className="w-auto object-contain"
    />
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Solución", href: "#solucion" },
    { label: "Cómo funciona", href: "#como-funciona" },
    { label: "Beneficios", href: "#beneficios" },
    { label: "Planes", href: "#planes" },
    { label: "Seguridad", href: "#seguridad" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[#f2f2f2]/60 backdrop-blur-md shadow-sm transition-colors duration-300" : "bg-[#f2f2f2] backdrop-blur-sm border-b border-gray-100 transition-colors duration-300"
    }`}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#">
          <VitarLogo height={36} />
        </a>

        <div className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <a key={link.label} href={link.href}
              className={`text-sm font-medium ${scrolled ? "text-gray-700" : "text-gray-500"} hover:text-[#11325b] transition-colors`}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className={`text-sm ${scrolled ? "text-gray-700" : "text-gray-500"} hover:text-[#11325b] transition-colors`}
          >
            Iniciar sesión
          </Link>
          <a href="#demo"
            className="bg-[#e7ba61] hover:bg-[#d4a94f] text-[#11325b] text-sm font-bold px-5 py-2.5 rounded-lg transition-all duration-200">
            Solicitar demo
          </a>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2" aria-label="Menú">
          <span className={`block w-5 h-0.5 ${scrolled ? "bg-[#11325b]" : "bg-[#11325b]"} mb-1.5 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 ${scrolled ? "bg-[#11325b]" : "bg-[#11325b]"} mb-1.5 transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 ${scrolled ? "bg-[#11325b]" : "bg-[#11325b]"} transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 shadow-lg">
          {links.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-gray-700">
              {link.label}
            </a>
          ))}
          <hr className="border-gray-100" />
          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-medium text-gray-700"
          >
            Iniciar sesión
          </Link>
          <a href="#demo" onClick={() => setMenuOpen(false)}
            className="bg-[#e7ba61] text-[#11325b] text-sm font-bold px-5 py-3 rounded-lg text-center">
            Solicitar demo
          </a>
        </div>
      )}
    </nav>
  );
}