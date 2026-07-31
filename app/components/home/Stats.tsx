import Container from "../ui/Container";
import { Users, Star, MapPin, Truck } from "lucide-react";

const stats = [
  {
    icon: <Users size={34} />,
    number: "5.000+",
    title: "Pelanggan Bahagia",
  },
  {
    icon: <Star size={34} />,
    number: "4.9 / 5",
    title: "Rating Pelanggan",
  },
  {
    icon: <MapPin size={34} />,
    number: "Palembang",
    title: "Melayani Seluruh Kota",
  },
  {
    icon: <Truck size={34} />,
    number: "Fresh",
    title: "Dibuat Setiap Hari",
  },
];

export default function Stats() {
  return (
    <section className="bg-white py-16">
      <Container>
        <div className="mb-12 text-center">
          <span className="rounded-full bg-pink-100 px-5 py-2 text-sm font-semibold text-pink-600">
            ❤️ Dipercaya Pelanggan
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Bangga Melayani Pelanggan di Palembang
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Salad Buah Senja hadir dengan buah segar pilihan, saus creamy
            premium, dan pelayanan terbaik untuk menemani setiap momen
            spesial Anda.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.title}
              className="group rounded-3xl border border-pink-100 bg-gradient-to-b from-white to-pink-50 p-8 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pink-100 text-pink-600 transition duration-500 group-hover:scale-110 group-hover:bg-pink-600 group-hover:text-white">
                {item.icon}
              </div>

              <h3 className="mt-6 text-3xl font-extrabold text-gray-900">
                {item.number}
              </h3>

              <p className="mt-2 text-gray-500">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}