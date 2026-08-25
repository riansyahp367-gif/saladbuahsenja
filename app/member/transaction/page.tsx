"use client";

import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/home/Footer";
import { supabase } from "@/lib/supabase";

export default function MemberTransactionPage() {
  const [memberCode, setMemberCode] = useState("");
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [result, setResult] = useState<any>(null);

  const handleTransaction = async () => {
    const code = memberCode.trim().toUpperCase();
    const nominal = Number(amount);

    setMessage("");
    setErrorMessage("");
    setResult(null);

    if (!code) {
      setErrorMessage("Masukkan Member ID.");
      return;
    }

    if (!nominal || nominal < 1000) {
      setErrorMessage("Nominal transaksi minimal Rp1.000.");
      return;
    }

    setLoading(true);

    // Jalankan transaksi dan tambahkan poin
    const { data: pointsAdded, error } = await supabase.rpc(
      "record_member_transaction",
      {
        p_member_code: code,
        p_amount: nominal,
      }
    );

    if (error) {
      console.error(error);
      setLoading(false);
      setErrorMessage(error.message);
      return;
    }

    // Ambil data member terbaru
    const { data: member, error: memberError } = await supabase
      .from("members")
      .select("member_code, full_name, points, level")
      .eq("member_code", code)
      .single();

    setLoading(false);

    if (memberError) {
      console.error(memberError);
      setErrorMessage(
        "Transaksi berhasil, tetapi data member terbaru gagal diambil."
      );
      return;
    }

    setResult({
      member,
      pointsAdded,
    });

    setMessage("Transaksi berhasil dan poin telah ditambahkan.");

    setAmount("");
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-pink-50 px-6 py-12">

        <div className="mx-auto max-w-2xl">

          {/* HEADER */}
          <div className="text-center">

            <span className="rounded-full bg-pink-100 px-5 py-2 font-semibold text-pink-600">
              🧾 Kasir Member
            </span>

            <h1 className="mt-6 text-4xl font-extrabold text-gray-900">
              Tambah Poin Member
            </h1>

            <p className="mt-3 text-gray-500">
              Masukkan Member ID dan total belanja pelanggan.
            </p>

          </div>

          {/* FORM */}
          <div className="mt-10 rounded-3xl bg-white p-8 shadow-xl">

            <div>

              <label className="block font-semibold text-gray-800">
                Member ID
              </label>

              <input
                type="text"
                value={memberCode}
                onChange={(e) => setMemberCode(e.target.value)}
                placeholder="Contoh: SBS000001"
                className="mt-2 w-full rounded-2xl border border-pink-200 px-5 py-4 text-lg uppercase outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
              />

            </div>

            <div className="mt-5">

              <label className="block font-semibold text-gray-800">
                Total Belanja
              </label>

              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Contoh: 25000"
                min="1000"
                className="mt-2 w-full rounded-2xl border border-pink-200 px-5 py-4 text-lg outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
              />

            </div>

            {/* ERROR */}
            {errorMessage && (
              <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-center font-medium text-red-600">
                ❌ {errorMessage}
              </div>
            )}

            {/* SUCCESS */}
            {message && (
              <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-4 text-center font-medium text-green-600">
                ✅ {message}
              </div>
            )}

            <button
              type="button"
              onClick={handleTransaction}
              disabled={loading}
              className="mt-6 w-full rounded-2xl bg-pink-600 py-4 text-xl font-bold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Memproses..." : "Tambah Poin"}
            </button>

          </div>

          {/* RESULT */}
          {result && (
            <div className="mt-8 rounded-3xl bg-white p-8 text-center shadow-xl">

              <div className="text-5xl">
                🎉
              </div>

              <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
                Transaksi Berhasil
              </h2>

              <p className="mt-2 text-gray-500">
                {result.member.full_name}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">

                <div className="rounded-2xl bg-pink-50 p-5">
                  <p className="text-sm text-gray-500">
                    Poin Ditambahkan
                  </p>

                  <p className="mt-2 text-3xl font-extrabold text-pink-600">
                    +{result.pointsAdded}
                  </p>
                </div>

                <div className="rounded-2xl bg-pink-50 p-5">
                  <p className="text-sm text-gray-500">
                    Total Poin
                  </p>

                  <p className="mt-2 text-3xl font-extrabold text-pink-600">
                    {result.member.points}
                  </p>
                </div>

                <div className="rounded-2xl bg-pink-50 p-5">
                  <p className="text-sm text-gray-500">
                    Level
                  </p>

                  <p className="mt-2 text-2xl font-extrabold text-pink-600">
                    {result.member.level}
                  </p>
                </div>

              </div>

            </div>
          )}

        </div>

      </main>

      <Footer />
    </>
  );
}