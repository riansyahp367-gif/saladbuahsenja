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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "border-b border-pink-100 bg-white/95 shadow-md backdrop-blur-xl"
          : "border-b border-pink-100/50 bg-white/90 backdrop-blur-md"
      }`}
    >
      <Container className="flex h-[76px] items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 text-xl shadow-md transition duration-300 group-hover:scale-105">
            🍓
          </div>

          <div className="leading-none">
            <div className="text-lg font-black tracking-tight text-gray-900">
              Salad Buah
            </div>

            <div className="mt-1 text-[11px] font-bold tracking-[0.2em] text-pink-600">
              SENJA
            </div>
          </div>
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden items-center gap-8 lg:flex">
          {menus.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold text-gray-700 transition duration-200 hover:text-pink-600"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* ACTION DESKTOP */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/member/register"
            className="rounded-xl border border-pink-200 bg-white px-5 py-2.5 text-sm font-semibold text-pink-600 transition hover:bg-pink-50"
          >
            Daftar Member
          </Link>

          <a
            href="https://wa.me/6281314720307?text=Halo%20Salad%20Buah%20Senja,%20saya%20ingin%20memesan."
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-2.5 text-sm font-bold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Pesan Sekarang
          </a>
        </div>

        {/* MOBILE BUTTON */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-pink-200 bg-white text-xl text-pink-600 shadow-sm lg:hidden"
        >
          {open ? "✕" : "☰"}
        </button>

        {/* MOBILE MENU */}
        {open && (
          <div className="absolute left-4 right-4 top-[82px] rounded-2xl border border-pink-100 bg-white p-4 shadow-2xl lg:hidden">
            <nav className="flex flex-col">
              {menus.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 font-semibold text-gray-700 transition hover:bg-pink-50 hover:text-pink-600"
                >
                  {item.name}
                </Link>
              ))}

              <div className="mt-3 border-t border-pink-100 pt-3">
                <Link
                  href="/member/register"
                  onClick={() => setOpen(false)}
                  className="mb-2 block rounded-xl border border-pink-200 px-4 py-3 text-center font-semibold text-pink-600"
                >
                  Daftar Member
                </Link>

                <a
                  href="https://wa.me/6281314720307?text=Halo%20Salad%20Buah%20Senja,%20saya%20ingin%20memesan."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 px-4 py-3 text-center font-bold text-white"
                >
                  Pesan Sekarang
                </a>
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}