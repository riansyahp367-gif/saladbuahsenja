"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Container from "../ui/Container";

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
    const onScroll = () => setScrolled(window.scrollY > 30);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-pink-100"
          : "bg-transparent"
      }`}
    >
      <Container className="flex h-20 items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 text-2xl shadow-xl transition duration-300 group-hover:scale-105">
            🍓
          </div>

          <div>
            <h1 className="text-xl font-black tracking-tight text-gray-900">
              Salad Buah
            </h1>

            <p className="-mt-1 text-sm font-semibold tracking-wide text-pink-600">
              SENJA
            </p>
          </div>

        </Link>

        {/* Menu Desktop */}
        <nav className="hidden lg:flex items-center gap-10">

          {menus.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[15px] font-semibold text-gray-700 transition-all duration-300 hover:text-pink-600 hover:-translate-y-0.5"
            >
              {item.name}
            </Link>
          ))}

        </nav>

        {/* Action */}
        <div className="hidden lg:flex items-center gap-3">

          <Link
            href="/member/register"
            className="rounded-2xl border border-pink-200 px-5 py-3 font-semibold text-pink-600 transition hover:bg-pink-50"
          >
            Daftar Member
          </Link>

          <a
            href="https://wa.me/6281314720307?text=Halo%20Salad%20Buah%20Senja,%20saya%20ingin%20memesan."
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-3 font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            Pesan Sekarang
          </a>

        </div>

        {/* Mobile */}
        <button className="lg:hidden rounded-xl border border-pink-200 p-3">
          ☰
        </button>

      </Container>
    </header>
  );
}