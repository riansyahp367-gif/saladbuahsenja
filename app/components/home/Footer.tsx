import Link from "next/link";
import Container from "../ui/Container";

const menuLinks = [
  { name: "Beranda", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Promo", href: "/promo" },
  { name: "Cabang", href: "/cabang" },
  { name: "Member", href: "/member" },
  { name: "Kontak", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-pink-600 via-pink-600 to-pink-700 text-white">

      <Container>

        {/* MAIN FOOTER */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div className="lg:col-span-2">

            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-lg">
                🍓
              </div>

              <div className="leading-none">
                <div className="text-2xl font-black">
                  Salad Buah
                </div>

                <div className="mt-1 text-sm font-bold tracking-[0.25em] text-pink-100">
                  SENJA
                </div>
              </div>
            </Link>

            <p className="mt-6 max-w-md leading-7 text-pink-100">
              Salad buah premium dengan buah segar pilihan,
              saus creamy khas, dan taburan keju melimpah.
              Cocok untuk menemani hari kamu dengan rasa yang
              segar dan nikmat.
            </p>

            {/* SOCIAL */}
            <div className="mt-6 flex flex-wrap gap-3">

              <a
                href="https://wa.me/6281314720307?text=Halo%20Salad%20Buah%20Senja,%20saya%20ingin%20memesan."
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-pink-600 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
              >
                💬 WhatsApp
              </a>

              <a
                href="https://www.instagram.com/senja.licious_/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-bold backdrop-blur transition hover:bg-white/20"
              >
                📸 Instagram
              </a>

              <a
                href="https://www.tiktok.com/@saladbuahsenja"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-bold backdrop-blur transition hover:bg-white/20"
              >
                🎵 TikTok
              </a>

            </div>

          </div>


          {/* MENU */}
          <div>

            <h3 className="text-lg font-black">
              Menu
            </h3>

            <ul className="mt-5 space-y-3">

              {menuLinks.map((item) => (
                <li key={item.name}>

                  <Link
                    href={item.href}
                    className="text-pink-100 transition hover:pl-1 hover:text-white"
                  >
                    {item.name}
                  </Link>

                </li>
              ))}

            </ul>

          </div>


          {/* CONTACT */}
          <div>

            <h3 className="text-lg font-black">
              Hubungi Kami
            </h3>

            <div className="mt-5 space-y-4 text-sm text-pink-100">

              <p className="flex gap-3">
                <span>📍</span>
                <span>
                  Palembang, Sumatera Selatan
                </span>
              </p>

              <p className="flex gap-3">
                <span>📱</span>
                <span>
                  0813-1472-0307
                </span>
              </p>

              <p className="flex gap-3 break-all">
                <span>📧</span>
                <span>
                  saladbuahsenja@gmail.com
                </span>
              </p>

            </div>

            {/* ORDER BUTTON */}
            <a
              href="https://wa.me/6281314720307?text=Halo%20Salad%20Buah%20Senja,%20saya%20ingin%20memesan."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-white px-5 py-3 font-bold text-pink-600 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              🛍️ Pesan Sekarang
            </a>

          </div>

        </div>


        {/* BOTTOM */}
        <div className="border-t border-white/20 py-6">

          <div className="flex flex-col items-center justify-between gap-3 text-center text-sm text-pink-100 md:flex-row md:text-left">

            <p>
              © {new Date().getFullYear()} Salad Buah Senja.
              All Rights Reserved.
            </p>

            <p>
              Dibuat dengan ❤️ untuk pecinta salad buah.
            </p>

          </div>

        </div>

      </Container>

    </footer>
  );
}