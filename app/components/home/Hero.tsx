import Image from "next/image";
import { Star, Apple, Truck, MapPin, Sparkles } from "lucide-react";

import Button from "../ui/Button";
import Badge from "../ui/Badge";
import Container from "../ui/Container";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-pink-100 pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="absolute -top-32 -left-20 h-72 w-72 rounded-full bg-pink-300/30 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-pink-200/40 blur-3xl"></div>

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* ================= LEFT ================= */}
          <div>

            <Badge>
              🍓 Premium Fruit Salad
            </Badge>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight text-gray-900 lg:text-7xl">
              Salad Buah
              <span className="block text-pink-600">
                Senja
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Nikmati kesegaran buah pilihan dengan saus creamy premium,
              keju melimpah, dan rasa yang bikin ketagihan.
              Dibuat fresh setiap hari khusus untuk pelanggan di
              <span className="font-semibold text-pink-600">
                {" "}Palembang.
              </span>
            </p>

            {/* Rating */}

            <div className="mt-8 flex items-center gap-2">

              <div className="flex text-yellow-400">
                <Star fill="currentColor" size={22}/>
                <Star fill="currentColor" size={22}/>
                <Star fill="currentColor" size={22}/>
                <Star fill="currentColor" size={22}/>
                <Star fill="currentColor" size={22}/>
              </div>

              <span className="ml-2 font-semibold text-gray-700">
                4.9 / 5.0
              </span>

            </div>

            {/* Info */}

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3">
                <Apple className="text-pink-600"/>
                <span>Buah Segar Pilihan</span>
              </div>

              <div className="flex items-center gap-3">
                <Sparkles className="text-pink-600"/>
                <span>Saus Creamy Premium & Keju Melimpah</span>
              </div>

              <div className="flex items-center gap-3">
                <Truck className="text-pink-600"/>
                <span>Siap Diantar Setiap Hari</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-pink-600"/>
                <span>Melayani Kota Palembang</span>
              </div>

            </div>

            {/* Harga */}

            <div className="mt-8">

              <span className="rounded-full bg-pink-100 px-5 py-2 text-lg font-bold text-pink-700">
                Mulai Rp10.000
              </span>

            </div>

            {/* Button */}

            <div className="mt-10 flex flex-wrap gap-4">

              <Button href="https://wa.me/6281314720307">
                Pesan Sekarang
              </Button>

              <Button href="#menu" variant="secondary">
                Lihat Menu
              </Button>

            </div>

          </div>

          {/* ================= RIGHT ================= */}

          <div className="relative flex justify-center">

            {/* Glow */}

            <div className="absolute h-[420px] w-[420px] rounded-full bg-pink-200 blur-3xl opacity-60"></div>

            <Image
              src="/images/hero-banner.png"
              alt="Salad Buah Senja"
              width={650}
              height={650}
              priority
              className="
                relative
                rounded-[35px]
                shadow-2xl
                transition
                duration-500
                hover:scale-105
              "
            />

          </div>

        </div>
      </Container>
    </section>
  );
}