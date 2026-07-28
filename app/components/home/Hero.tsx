import Image from "next/image";
import { Star, Apple, Truck } from "lucide-react";

import Button from "../ui/Button";
import Badge from "../ui/Badge";
import Container from "../ui/Container";

export default function Hero() {
  return (
    <section className="bg-pink-50 py-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Kiri */}
          <div>
            <Badge>🍓 Premium Fruit Salad</Badge>

            <h1 className="mt-6 text-5xl font-bold text-gray-900">
              Salad Buah
              <span className="block text-pink-600">Senja</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600">
              Salad buah premium dengan buah segar pilihan,
              saus creamy, keju melimpah, dan dibuat fresh
              setiap hari.
            </p>

            <div className="mt-8 flex items-center gap-2 text-yellow-400">
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />

              <span className="ml-2 text-gray-700 font-semibold">
                Rating 4.9
              </span>
            </div>

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3">
                <Apple className="text-pink-600" />
                <span>Buah Segar Pilihan</span>
              </div>

              <div className="flex items-center gap-3">
                <Star className="text-pink-600" />
                <span>Keju Melimpah & Saus Premium</span>
              </div>

              <div className="flex items-center gap-3">
                <Truck className="text-pink-600" />
                <span>Siap Diantar Setiap Hari</span>
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              <Button href="https://wa.me/6281314720307">
                Pesan Sekarang
              </Button>

              <Button href="#menu" variant="secondary">
                Lihat Menu
              </Button>
            </div>
          </div>

          {/* Kanan */}
          <div className="flex justify-center">
            <Image
              src="/images/hero-premium.jpg"
              alt="Salad Buah Senja"
              width={500}
              height={500}
              className="rounded-3xl shadow-xl"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}