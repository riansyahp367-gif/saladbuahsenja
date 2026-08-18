const faqs = [
  {
    question: "Salad Buah Senja ada di mana?",
    answer:
      "Salad Buah Senja memiliki 4 outlet di Kota Palembang, yaitu Tanjung Barangan, Plaju Banten, Musi 6, dan Salad Senja UIN. Kamu bisa melihat alamat lengkap dan lokasi Google Maps masing-masing outlet di halaman cabang.",
  },
  {
    question: "Ada berapa outlet Salad Buah Senja di Palembang?",
    answer:
      "Saat ini Salad Buah Senja memiliki 4 outlet di Palembang: Tanjung Barangan, Plaju Banten, Musi 6, dan Salad Senja UIN.",
  },
  {
    question: "Jam berapa Salad Buah Senja buka?",
    answer:
      "Jam operasional berbeda di setiap outlet. Tanjung Barangan buka pukul 07.00–22.00 WIB, Plaju Banten 10.00–20.15 WIB, Musi 6 11.00–20.00 WIB, dan Salad Senja UIN 10.00–20.00 WIB.",
  },
  {
    question: "Apakah bisa pesan Salad Buah Senja lewat WhatsApp?",
    answer:
      "Bisa. Kamu dapat memesan langsung melalui WhatsApp Salad Buah Senja melalui tombol WhatsApp yang tersedia di website.",
  },
  {
    question: "Apakah Salad Buah Senja bisa ditemukan melalui Google Maps?",
    answer:
      "Bisa. Setiap outlet Salad Buah Senja memiliki tombol Google Maps sehingga kamu dapat melihat lokasi outlet dan mendapatkan petunjuk arah.",
  },
  {
    question: "Apa saja yang dijual Salad Buah Senja?",
    answer:
      "Salad Buah Senja menyediakan Salad Original, Salad Mangga, Salad Strawberry, Oreo Cheesecake, Red Velvet Cheesecake, dan Fruit Sandwich.",
  },
];

export default function LocalFAQ() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-6">

        {/* Heading */}
        <div className="text-center">
          <span className="inline-flex rounded-full bg-pink-100 px-5 py-2 text-sm font-semibold text-pink-600">
            ❓ Pertanyaan Umum
          </span>

          <h2 className="mt-5 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Pertanyaan Tentang Salad Buah Senja
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            Temukan informasi tentang outlet, jam buka, cara pesan,
            lokasi, dan menu Salad Buah Senja di Palembang.
          </p>
        </div>

        {/* FAQ */}
        <div className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-pink-100 bg-pink-50 p-5 shadow-sm transition hover:shadow-md"
            >
              <summary className="cursor-pointer list-none pr-8 font-bold text-gray-900">
                <span className="flex items-center justify-between gap-4">
                  {faq.question}

                  <span className="text-xl font-bold text-pink-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>

              <p className="mt-4 leading-7 text-gray-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        {/* Internal Links */}
        <div className="mt-12 rounded-3xl bg-pink-50 p-6 text-center">
          <h3 className="text-xl font-bold text-gray-900">
            Mau Pesan Salad Buah Senja? 🍓
          </h3>

          <p className="mx-auto mt-3 max-w-2xl leading-7 text-gray-600">
            Lihat pilihan menu, temukan outlet terdekat, atau cek promo
            terbaru Salad Buah Senja di Palembang.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">

            <a
              href="/menu"
              className="rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white transition hover:bg-pink-700"
            >
              🍓 Lihat Menu
            </a>

            <a
              href="/promo"
              className="rounded-xl border border-pink-600 bg-white px-6 py-3 font-semibold text-pink-600 transition hover:bg-pink-50"
            >
              🎁 Lihat Promo
            </a>

            <a
              href="/cabang"
              className="rounded-xl border border-pink-200 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:border-pink-400"
            >
              📍 Lihat Outlet
            </a>

          </div>
        </div>

      </div>
    </section>
  );
}