import Container from "../ui/Container";

const features = [
  {
    icon: "🍎",
    title: "Buah Segar Pilihan",
    description:
      "Kami menggunakan buah segar pilihan setiap hari agar rasa tetap manis, segar, dan berkualitas.",
  },
  {
    icon: "🥣",
    title: "Saus Premium",
    description:
      "Saus creamy premium yang lembut dipadukan dengan keju melimpah di setiap porsi.",
  },
  {
    icon: "🚚",
    title: "Siap Diantar",
    description:
      "Pesan dengan mudah melalui WhatsApp, GoFood, GrabFood, dan ShopeeFood.",
  },
  {
    icon: "💰",
    title: "Harga Bersahabat",
    description:
      "Mulai dari Rp10.000 dengan kualitas premium yang cocok untuk semua kalangan.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-white py-24"
    >
      <Container>

        <div className="text-center">

          <span className="rounded-full bg-pink-100 px-5 py-2 text-sm font-semibold text-pink-600">
            Kenapa Memilih Kami
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Dibuat Dengan Sepenuh Hati ❤️
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Kami percaya salad buah yang enak bukan hanya soal rasa,
            tetapi juga kualitas buah, saus premium, dan pelayanan terbaik.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-pink-100 bg-pink-50 p-8 text-center transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl shadow">
                {item.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">
                {item.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {item.description}
              </p>

            </div>
          ))}

        </div>

      </Container>
    </section>
  );
}