import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const testimonials = [
  {
    name: "Nabila",
    role: "Mahasiswi",
    text: "Buahnya fresh banget, sausnya creamy dan kejunya melimpah. Sekarang jadi langganan tiap minggu.",
    rating: "★★★★★",
  },
  {
    name: "Andi",
    role: "Karyawan",
    text: "Porsinya pas, rasanya premium, harganya masih ramah di kantong. Recommended banget.",
    rating: "★★★★★",
  },
  {
    name: "Rina",
    role: "Ibu Rumah Tangga",
    text: "Anak-anak di rumah suka sekali. Pengiriman cepat dan salad selalu datang dalam keadaan segar.",
    rating: "★★★★★",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-24">
      <Container>

        <SectionTitle
          badge="💖 Testimoni"
          title="Apa Kata"
          highlight="Pelanggan Kami?"
          description="Kepuasan pelanggan selalu menjadi prioritas utama Salad Buah Senja."
        />

        <div className="grid gap-8 lg:grid-cols-3">

          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl border border-pink-100 bg-pink-50 p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <p className="text-xl text-yellow-500">
                {item.rating}
              </p>

              <p className="mt-5 leading-8 text-gray-600">
                "{item.text}"
              </p>

              <div className="mt-8">
                <h3 className="font-bold text-gray-900">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.role}
                </p>
              </div>
            </div>
          ))}

        </div>

      </Container>
    </section>
  );
}