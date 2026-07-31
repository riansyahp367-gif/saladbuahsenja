import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock3,
  AtSign,
  MessageCircle,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-pink-700 to-pink-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>

            <h2 className="text-3xl font-extrabold">
              🍓 Salad Buah Senja
            </h2>

            <p className="mt-5 leading-8 text-pink-100">
              Salad buah premium dengan buah segar pilihan,
              saus creamy premium, dan keju melimpah.
              Dibuat fresh setiap hari untuk pelanggan di
              Palembang.
            </p>

          </div>

          {/* Menu */}
          <div>

            <h3 className="mb-5 text-xl font-bold">
              Navigasi
            </h3>

            <ul className="space-y-3 text-pink-100">

              <li><Link href="/">Beranda</Link></li>

              <li><Link href="/menu">Menu</Link></li>

              <li><Link href="/member">Member</Link></li>

              <li><Link href="/contact">Kontak</Link></li>

            </ul>

          </div>

          {/* Kontak */}

          <div>

            <h3 className="mb-5 text-xl font-bold">
              Hubungi Kami
            </h3>

            <div className="space-y-4 text-pink-100">

              <p className="flex items-center gap-3">
                <Phone size={18}/>
                0813-1472-0307
              </p>

              <p className="flex items-center gap-3">
                <MapPin size={18}/>
                Palembang
              </p>

              <p className="flex items-center gap-3">
                <Clock3 size={18}/>
                09.00 - 21.00 WIB
              </p>

            </div>

          </div>

          {/* Sosial Media */}

          <div>

            <h3 className="mb-5 text-xl font-bold">
              Ikuti Kami
            </h3>

            <div className="space-y-4">

              <a
                href="https://instagram.com/saladbuahsenja"
                target="_blank"
                className="flex items-center gap-3 text-pink-100 transition hover:text-white"
              >
                <AtSign size={20}/>
                @saladbuahsenja
              </a>

              <a
                href="https://wa.me/6281314720307"
                target="_blank"
                className="flex items-center gap-3 text-pink-100 transition hover:text-white"
              >
                <MessageCircle size={20}/>
                WhatsApp
              </a>

              <a
                href="https://www.tiktok.com/@saladbuahsenja"
                target="_blank"
                className="rounded-2xl bg-white px-5 py-3 font-semibold text-pink-700 transition hover:scale-105"
              >
                Pesan Sekarang
              </a>

            </div>

          </div>

        </div>

        <div className="mt-14 border-t border-pink-500 pt-8 text-center text-sm text-pink-200">

          © {new Date().getFullYear()} <strong>Salad Buah Senja</strong>

          <br />

          Dibuat dengan ❤️ untuk menyajikan salad buah premium di Palembang.

        </div>

      </div>
    </footer>
  );
}