import Image from "next/image";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const gallery = [
  {
    image: "/images/products/original-200.jpg",
    title: "Salad Original",
  },
  {
    image: "/images/products/mangga-200.jpg",
    title: "Salad Mangga",
  },
  {
    image: "/images/products/strawberry-200.jpg",
    title: "Salad Strawberry",
  },
  {
    image: "/images/products/oreo-cheesecake.jpg",
    title: "Oreo Cheesecake",
  },
  {
    image: "/images/products/red-velvet.jpg",
    title: "Red Velvet Cheesecake",
  },
  {
    image: "/images/products/regal-cheesecake.jpg",
    title: "Regal Cheesecake",
  },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="bg-pink-50 py-24"
    >
      <Container>

        <SectionTitle
          badge="📷 Gallery"
          title="Lihat Kesegaran"
          highlight="Produk Kami"
          description="Dibuat dari buah segar pilihan dengan tampilan premium yang menggugah selera."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {gallery.map((item) => (
            <div
              key={item.title}
              className="group overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >

              <div className="relative aspect-[4/3] overflow-hidden">

                <Image
                  src={item.image}
                  alt={`${item.title} - Salad Buah Senja`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100">

                  <div className="p-5">
                    <p className="text-lg font-black text-white">
                      {item.title}
                    </p>

                    <p className="mt-1 text-sm text-white/90">
                      Salad Buah Senja
                    </p>
                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>

      </Container>
    </section>
  );
}