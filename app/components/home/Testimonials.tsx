import Container from "../ui/Container";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ayu Rahma",
    city: "Palembang",
    text: "Saladnya segar banget, buahnya manis dan sausnya creamy. Sekarang jadi langganan keluarga.",
  },
  {
    name: "Rina Putri",
    city: "Palembang",
    text: "Pengirimannya cepat, packing rapi, dan kejunya melimpah. Recommended banget!",
  },
  {
    name: "Dewi Lestari",
    city: "Palembang",
    text: "Harganya ramah di kantong tapi kualitasnya premium. Rasanya selalu konsisten setiap order.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gradient-to-b from-pink-50 to-white py-24">
      <Container>
        <div className="text-center">

          <span className="rounded-full bg-pink-100 px-5 py-2 text-sm font-semibold text-pink-600">
            ❤️ Testimoni Pelanggan
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Apa Kata Pelanggan Kami?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Kepuasan pelanggan adalah prioritas kami. Terima kasih atas
            kepercayaan yang telah diberikan kepada Salad Buah Senja.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">

          {testimonials.map((item) => (
            <div
              key={item.name}
              className="group rounded-[30px] border border-pink-100 bg-white p-8 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >

              {/* Rating */}
              <div className="flex gap-1 text-yellow-400">
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
              </div>

              {/* Isi */}
              <p className="mt-6 leading-8 text-gray-600 italic">
                "{item.text}"
              </p>

              {/* Profil */}
              <div className="mt-8 flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 text-xl font-bold text-pink-600 transition duration-500 group-hover:bg-pink-600 group-hover:text-white">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    {item.name}
                  </h3>

                  <p className="text-sm text-pink-600">
                    📍 {item.city}
                  </p>
                </div>

              </div>

            </div>
          ))}

        </div>
      </Container>
    </section>
  );
}