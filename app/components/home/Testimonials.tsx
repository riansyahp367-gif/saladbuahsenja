import Container from "../ui/Container";

const testimonials = [
  {
    name: "Ayu",
    city: "Bandar Lampung",
    text: "Saladnya segar banget, kejunya melimpah. Anak-anak di rumah suka semua!",
  },
  {
    name: "Rina",
    city: "Bandar Lampung",
    text: "Pelayanannya cepat, buahnya fresh, dan sausnya creamy. Pasti beli lagi.",
  },
  {
    name: "Dewi",
    city: "Bandar Lampung",
    text: "Harganya terjangkau tapi rasanya premium. Recommended banget!",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-pink-50 py-24">
      <Container>

        <div className="text-center">
          <span className="rounded-full bg-pink-100 px-5 py-2 text-sm font-semibold text-pink-600">
            ❤️ Testimoni Pelanggan
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Mereka Sudah Mencoba
          </h2>

          <p className="mt-4 text-lg text-gray-500">
            Kepuasan pelanggan adalah prioritas kami.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">

          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="text-2xl">⭐⭐⭐⭐⭐</div>

              <p className="mt-6 text-gray-600 leading-8">
                "{item.text}"
              </p>

              <div className="mt-8">
                <h3 className="font-bold text-gray-900">
                  {item.name}
                </h3>

                <p className="text-sm text-pink-600">
                  {item.city}
                </p>
              </div>

            </div>
          ))}

        </div>

      </Container>
    </section>
  );
}