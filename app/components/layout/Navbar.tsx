"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const menus = [
  { name: "Beranda", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Promo", href: "/promo" },
  { name: "Cabang", href: "/cabang" },
  { name: "Member", href: "/member" },
  { name: "Kontak", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg border-b border-pink-100"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-600 text-xl text-white shadow-lg">
            🍓
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Salad Buah
            </h1>

            <p className="-mt-1 text-sm font-semibold text-pink-600">
              Senja
            </p>
          </div>

        </Link>

        {/* Menu */}
        <nav className="hidden items-center gap-8 font-medium text-gray-700 md:flex">
          {menus.map((menu) => (
            <Link
              key={menu.name}
              href={menu.href}
              className="transition duration-300 hover:text-pink-600"
            >
              {menu.name}
            </Link>
          ))}
        </nav>

        {/* Action */}
        <div className="hidden items-center gap-3 md:flex">

          <Link
            href="/member/register"
            className="rounded-xl border border-pink-200 px-5 py-3 font-semibold text-pink-600 transition hover:bg-pink-50"
          >
            Daftar Member
          </Link>

          <a
            href="https://wa.me/6281314720307?text=Halo%20Salad%20Buah%20Senja,%20saya%20ingin%20memesan."
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-pink-700 hover:scale-105"
          >
            Pesan Sekarang
          </a>

        </div>

      </div>
    </header>
  );
}