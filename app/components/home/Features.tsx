import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const features = [
  {
    icon: "🍎",
    title: "Buah Segar Pilihan",
    description:
      "Setiap hari kami menggunakan buah segar pilihan agar rasa selalu manis, segar, dan berkualitas premium.",
  },
  {
    icon: "🥣",
    title: "Saus Premium",
    description:
      "Perpaduan saus creamy premium dengan taburan keju melimpah yang menjadi ciri khas Salad Buah Senja.",
  },
  {
    icon: "🚚",
    title: "Pesan Lebih Mudah",
    description:
      "Tersedia melalui WhatsApp, GoFood, GrabFood dan ShopeeFood dengan proses pemesanan yang praktis.",
  },
  {
    icon: "💖",
    title: "Member Reward",
    description:
      "Setiap transaksi mendapatkan point yang bisa ditukarkan dengan berbagai hadiah menarik.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-gradient-to-b from-white to-pink-50 py-24"
    >
      <Container>

        <SectionTitle
          badge="✨ Kenapa Memilih Kami"
          title="Lebih Dari Sekadar"
          highlight="Salad Buah"
          description="Kami menghadirkan salad premium dengan bahan berkualitas, pelayanan terbaik, dan pengalaman yang menyenangkan di setiap pembelian."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {features.map((item) => (
            <div
              key={item.title}
              className="group rounded-3xl border border-pink-100 bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-pink-50 text-5xl transition duration-500 group-hover:scale-110">
                {item.icon}
              </div>

              <h3 className="mt-6 text-2xl font-black text-gray-900">
                {item.title}
              </h3>

              <p className="mt-4 leading-8 text-gray-600">
                {item.description}
              </p>
            </div>
          ))}

        </div>

      </Container>
    </section>
  );
}