import Link from "next/link";
import Container from "../ui/Container";

export default function Footer() {
  return (
    <footer className="bg-pink-600 text-white">
      <Container>

        <div className="grid gap-12 py-16 md:grid-cols-3">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-black">
              Salad Buah Senja 🍓
            </h2>

            <p className="mt-5 leading-8 text-pink-100">
              Salad buah premium dengan buah segar pilihan,
              saus creamy khas, dan taburan keju melimpah.
            </p>
          </div>

          {/* Menu */}
          <div>
            <h3 className="text-xl font-bold">
              Menu
            </h3>

            <ul className="mt-5 space-y-3 text-pink-100">

              <li>
                <Link href="/">
                  Beranda
                </Link>
              </li>

              <li>
                <Link href="/menu">
                  Menu
                </Link>
              </li>

              <li>
                <Link href="/member">
                  Member
                </Link>
              </li>

              <li>
                <Link href="/promo">
                  Promo
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div>

            <h3 className="text-xl font-bold">
              Hubungi Kami
            </h3>

            <div className="mt-5 space-y-3 text-pink-100">

              <p>📍 Palembang</p>

              <p>📱 0813-1472-0307</p>

              <p>📧 saladbuahsenja@gmail.com</p>

            </div>

          </div>

        </div>

        <div className="border-t border-pink-500 py-6 text-center text-sm text-pink-100">

          © {new Date().getFullYear()} Salad Buah Senja.
          All Rights Reserved.

        </div>

      </Container>
    </footer>
  );
}