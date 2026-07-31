"use client";

import { ShoppingBag } from "lucide-react";

type WhatsAppButtonProps = {
  productName: string;
  size: string;
};

export default function WhatsAppButton({
  productName,
  size,
}: WhatsAppButtonProps) {
  const message = encodeURIComponent(
    `Halo Salad Buah Senja 👋

Saya ingin memesan:

🥗 ${productName}
📦 Ukuran ${size}

Apakah masih tersedia? 😊`
  );

  return (
    <a
      href={`https://wa.me/6281314720307?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <ShoppingBag size={18} />
      Pesan Sekarang
    </a>
  );
}