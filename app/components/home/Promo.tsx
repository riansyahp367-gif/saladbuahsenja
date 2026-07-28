import Container from "../ui/Container";

export default function Promo() {
  return (
    <section className="py-20 bg-pink-600">
      <Container>
        <div className="rounded-[40px] bg-white p-12 text-center shadow-2xl">

          <span className="rounded-full bg-pink-100 px-5 py-2 text-sm font-bold text-pink-600">
            🎉 Promo Hari Ini
          </span>

          <h2 className="mt-6 text-5xl font-extrabold text-gray-900">
            Beli 3 Cup
          </h2>

          <h3 className="mt-2 text-4xl font-bold text-pink-600">
            Hemat 10%
          </h3>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Nikmati promo spesial untuk pembelian minimal 3 cup Salad Buah
            Senja. Cocok untuk keluarga, teman kantor, atau acara spesial.
          </p>

          <a
            href="https://wa.me/6281314720307?text=Halo%20Salad%20Buah%20Senja,%20saya%20ingin%20memesan%20promo."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block rounded-2xl bg-pink-600 px-10 py-4 text-lg font-bold text-white transition hover:bg-pink-700"
          >
            🍓 Klaim Promo Sekarang
          </a>

        </div>
      </Container>
    </section>
  );
}