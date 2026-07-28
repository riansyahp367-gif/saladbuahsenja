import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-pink-600 text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold">
              🍓 Salad Buah Senja
            </h2>

            <p className="mt-4 text-pink-100 leading-7">
              Salad buah premium dengan buah pilihan segar,
              saus creamy premium, dan harga yang ramah di kantong.
            </p>
          </div>

          {/* Menu */}
          <div>
            <h3 className="mb-4 text-xl font-bold">
              Menu
            </h3>

            <ul className="space-y-3 text-pink-100">
              <li>
                <Link href="/">Beranda</Link>
              </li>

              <li>
                <Link href="/menu">Menu</Link>
              </li>

              <li>
                <Link href="/member">Member</Link>
              </li>

              <li>
                <Link href="/contact">Kontak</Link>
              </li>
            </ul>
          </div>

          {/* Cabang */}
          <div>
            <h3 className="mb-4 text-xl font-bold">
              📍 Cabang Kami
            </h3>

            <ul className="space-y-3 text-pink-100 text-sm leading-6">

              <li>
                <strong>Tanjung Barangan</strong><br />
                Jl. Tanjung Bubuk, Bukit Baru, Palembang
              </li>

              <li>
                <strong>UIN</strong><br />
                Jl. Rawa Jaya, Belakang Kampus UIN
              </li>

              <li>
                <strong>Musi 6</strong><br />
                Jl. Walikota H. Husni, 3–4 Ulu
              </li>

              <li>
                <strong>Plaju</strong><br />
                Jl. KH. Balqi, Plaju
              </li>

            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="mb-4 text-xl font-bold">
              Hubungi Kami
            </h3>

            <div className="space-y-4 text-pink-100">

              <p>
                📞 0813-1472-0307
              </p>

              <p>
                📸 Instagram<br />
                @saladbuahsenja
              </p>

              <p>
                🎵 TikTok<br />
                @saladbuahsenja
              </p>

              <p>
                🕘 Buka Setiap Hari<br />
                09.00 – 21.00 WIB
              </p>

              <a
                href="https://wa.me/6281314720307?text=Halo%20Salad%20Buah%20Senja,%20saya%20ingin%20memesan."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block rounded-xl bg-white px-5 py-3 font-semibold text-pink-600 transition hover:bg-pink-100"
              >
                Chat WhatsApp
              </a>

            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-pink-400 pt-6 text-center text-sm text-pink-100">
          © {new Date().getFullYear()} <strong>Salad Buah Senja</strong>.
          All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}