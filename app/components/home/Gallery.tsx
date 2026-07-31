import Image from "next/image";
import Container from "../ui/Container";

const images = [
  "/images/hero-premium.jpg",
  "/images/hero-premium.jpg",
  "/images/hero-premium.jpg",
  "/images/hero-premium.jpg",
  "/images/hero-premium.jpg",
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-gradient-to-b from-white to-pink-50 py-24">
      <Container>

        <div className="text-center">

          <span className="rounded-full bg-pink-100 px-5 py-2 text-sm font-semibold text-pink-600">
            📸 Galeri Produk
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Fresh, Cantik, dan Menggugah Selera
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Setiap porsi dibuat dari buah pilihan dengan saus creamy premium
            dan keju melimpah agar setiap gigitan terasa istimewa.
          </p>

        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">

          {/* Foto Besar */}
          <div className="group overflow-hidden rounded-[32px] shadow-xl lg:col-span-2 lg:row-span-2">
            <Image
              src={images[0]}
              alt="Salad Buah Senja"
              width={900}
              height={900}
              className="h-full min-h-[620px] w-full object-cover transition duration-700 group-hover:scale-110"
            />
          </div>

          {/* Foto kecil */}
          {images.slice(1).map((image, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-[28px] shadow-lg"
            >
              <Image
                src={image}
                alt={`Gallery ${index + 2}`}
                width={600}
                height={600}
                className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
              />
            </div>
          ))}

        </div>

      </Container>
    </section>
  );
}