"use client";

import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/home/Footer";
import { supabase } from "@/lib/supabase";

export default function MemberPage() {
  const [search, setSearch] = useState("");
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCheckMember = async () => {
    const keyword = search.trim();

    if (!keyword) {
      setErrorMessage("Masukkan Member ID atau nomor WhatsApp.");
      setMember(null);
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setMember(null);

    let data = null;
    let error = null;

    /*
     * CEK BERDASARKAN MEMBER ID
     * Contoh: SBS000001
     */
    if (keyword.toUpperCase().startsWith("SBS")) {
      const result = await supabase
        .from("members")
        .select(
          "member_code, full_name, phone, points, level"
        )
        .eq("member_code", keyword.toUpperCase())
        .maybeSingle();

      data = result.data;
      error = result.error;
    } else {
      /*
       * CEK BERDASARKAN NOMOR WHATSAPP
       *
       * Kita tidak menggunakan maybeSingle()
       * karena satu nomor bisa saja masih muncul
       * pada data testing.
       *
       * Untuk sementara kita mengambil member
       * yang paling baru dibuat.
       */
      const result = await supabase
        .from("members")
        .select(
          "member_code, full_name, phone, points, level"
        )
        .eq("phone", keyword)
        .order("created_at", { ascending: false })
        .limit(1);

      data = result.data?.[0] ?? null;
      error = result.error;
    }

    setLoading(false);

    if (error) {
      console.error("Supabase error:", error);

      setErrorMessage(
        "Gagal mengecek member. Silakan coba lagi."
      );

      return;
    }

    if (!data) {
      setErrorMessage(
        "Member tidak ditemukan. Periksa kembali Member ID atau nomor WhatsApp."
      );

      return;
    }

    setMember(data);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-pink-50">

        {/* HERO */}
        <section className="mx-auto max-w-5xl px-6 py-20 text-center">

          <span className="rounded-full bg-pink-100 px-5 py-2 font-semibold text-pink-600">
            🎁 Program Member
          </span>

          <h1 className="mt-6 text-5xl font-extrabold text-gray-900">
            Member Salad Buah Senja
          </h1>

          <p className="mt-5 text-lg text-gray-500">
            Belanja lebih hemat dan kumpulkan poin setiap transaksi.
          </p>

        </section>

        {/* CONTENT */}
        <section className="mx-auto max-w-6xl px-6 pb-20">

          <div className="rounded-3xl bg-white p-10 shadow-xl">

            {/* CEK MEMBER */}
            <div className="rounded-3xl border border-pink-200 bg-pink-50 p-8">

              <h2 className="text-center text-3xl font-bold text-gray-900">
                🔎 Cek Member
              </h2>

              <p className="mt-3 text-center text-gray-500">
                Masukkan Member ID atau nomor WhatsApp untuk melihat poin kamu.
              </p>

              <div className="mx-auto mt-6 max-w-2xl">

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCheckMember();
                    }
                  }}
                  placeholder="Contoh: SBS000001 atau 081234567890"
                  className="w-full rounded-2xl border border-pink-200 bg-white px-5 py-4 text-lg outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                />

                <button
                  type="button"
                  onClick={handleCheckMember}
                  disabled={loading}
                  className="mt-4 w-full rounded-2xl bg-pink-600 py-4 text-lg font-bold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Mengecek..." : "Cek Member"}
                </button>

              </div>

              {/* ERROR */}
              {errorMessage && (
                <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-red-200 bg-red-50 p-4 text-center font-medium text-red-600">
                  {errorMessage}
                </div>
              )}

              {/* MEMBER RESULT */}
              {member && (
                <div className="mx-auto mt-8 max-w-2xl rounded-3xl bg-white p-8 shadow-lg">

                  <div className="text-center">

                    <div className="text-5xl">
                      🎉
                    </div>

                    <h3 className="mt-4 text-3xl font-extrabold text-gray-900">
                      {member.full_name}
                    </h3>

                    <p className="mt-2 text-gray-500">
                      Member ID
                    </p>

                    <p className="text-xl font-bold text-pink-600">
                      {member.member_code}
                    </p>

                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">

                    {/* POINT */}
                    <div className="rounded-2xl bg-pink-50 p-6 text-center">

                      <div className="text-4xl">
                        ⭐
                      </div>

                      <p className="mt-2 text-gray-500">
                        Poin Anda
                      </p>

                      <p className="text-3xl font-extrabold text-pink-600">
                        {member.points ?? 0}
                      </p>

                    </div>

                    {/* LEVEL */}
                    <div className="rounded-2xl bg-pink-50 p-6 text-center">

                      <div className="text-4xl">
                        🏆
                      </div>

                      <p className="mt-2 text-gray-500">
                        Level Member
                      </p>

                      <p className="text-3xl font-extrabold text-pink-600">
                        {member.level ?? "Bronze"}
                      </p>

                    </div>

                  </div>

                  {/* INFO POINT */}
                  <div className="mt-6 rounded-2xl bg-pink-600 p-5 text-center text-white">

                    <p className="font-semibold">
                      Rp1.000 = 1 Poin
                    </p>

                    <p className="mt-1 text-sm opacity-90">
                      Kumpulkan 100 poin untuk mendapatkan 1 cup
                      Salad Buah Senja ukuran 200 ml.
                    </p>

                  </div>

                </div>
              )}

            </div>

            {/* CARA MENDAPATKAN POIN */}
            <h2 className="mt-14 text-center text-3xl font-bold">
              Cara Mendapatkan Poin
            </h2>

            <div className="mt-10 grid gap-8 md:grid-cols-3">

              <div className="rounded-2xl bg-pink-50 p-8 text-center">

                <div className="text-5xl">
                  🛍️
                </div>

                <h3 className="mt-5 text-2xl font-bold">
                  Belanja
                </h3>

                <p className="mt-3 text-gray-500">
                  Setiap transaksi senilai Rp1.000 mendapatkan{" "}
                  <strong>1 poin</strong>.
                </p>

              </div>

              <div className="rounded-2xl bg-pink-50 p-8 text-center">

                <div className="text-5xl">
                  ⭐
                </div>

                <h3 className="mt-5 text-2xl font-bold">
                  Kumpulkan
                </h3>

                <p className="mt-3 text-gray-500">
                  Semakin sering belanja, semakin banyak poin
                  yang terkumpul.
                </p>

              </div>

              <div className="rounded-2xl bg-pink-50 p-8 text-center">

                <div className="text-5xl">
                  🎉
                </div>

                <h3 className="mt-5 text-2xl font-bold">
                  Tukarkan
                </h3>

                <p className="mt-3 text-gray-500">
                  100 poin dapat ditukar dengan{" "}
                  <strong>
                    1 cup Salad Buah Senja ukuran 200 ml
                  </strong>.
                </p>

              </div>

            </div>

            {/* POINT INFO */}
            <div className="mt-12 rounded-3xl bg-pink-600 p-10 text-center text-white">

              <h2 className="text-4xl font-bold">
                Rp1.000 = 1 Poin
              </h2>

              <p className="mt-4 text-xl">
                Kumpulkan 100 poin dan nikmati hadiah gratis dari kami.
              </p>

            </div>

            {/* CARA MENJADI MEMBER */}
            <div className="mt-12 rounded-3xl border border-pink-200 bg-pink-50 p-8">

              <h3 className="text-2xl font-bold">
                Cara Menjadi Member
              </h3>

              <ol className="mt-5 list-decimal space-y-3 pl-6 text-gray-700">

                <li>
                  Belanja di salah satu cabang Salad Buah Senja.
                </li>

                <li>
                  Daftarkan nomor WhatsApp kamu kepada kasir.
                </li>

                <li>
                  Poin akan dicatat setiap transaksi.
                </li>

                <li>
                  Tukarkan poin ketika sudah memenuhi syarat.
                </li>

              </ol>

            </div>

            {/* DAFTAR MEMBER */}
            <a
              href="/member/register"
              className="mt-10 block rounded-2xl bg-pink-600 py-4 text-center text-xl font-bold text-white transition hover:bg-pink-700"
            >
              Daftar Member Sekarang
            </a>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}