"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Transaction = {
  id: string;
  member_code: string;
  full_name: string;
  transaction_type: string;
  points: number;
  description: string;
  created_at: string;
};

export default function AdminHistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadTransactions = async () => {
    setLoading(true);
    setErrorMessage("");

    const { data, error } = await supabase
      .from("member_point_transactions")
      .select("*")
      .order("created_at", { ascending: false });

    console.log("TRANSAKSI ADMIN:", data);
    console.log("ERROR ADMIN:", error);

    if (error) {
      console.error(error);
      setErrorMessage(error.message);
      setTransactions([]);
      setLoading(false);
      return;
    }

    setTransactions((data || []) as Transaction[]);
    setLoading(false);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const filteredTransactions = transactions.filter((item) => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) return true;

    return (
      String(item.member_code || "")
        .toLowerCase()
        .includes(keyword) ||
      String(item.full_name || "")
        .toLowerCase()
        .includes(keyword) ||
      String(item.description || "")
        .toLowerCase()
        .includes(keyword)
    );
  });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <main className="min-h-screen bg-pink-50 px-4 py-5 md:px-8">

      {/* HEADER */}
      <div className="mb-6 flex items-start justify-between gap-4">

        <div>
          <a
            href="/admin"
            className="text-sm font-semibold text-pink-600 hover:text-pink-700"
          >
            ← Kembali ke Dashboard
          </a>

          <h1 className="mt-3 text-3xl font-extrabold text-slate-950">
            📋 Riwayat Transaksi
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Lihat seluruh aktivitas poin member Salad Buah Senja.
          </p>
        </div>

        <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">
          <p className="text-xs text-slate-500">
            Total Transaksi
          </p>

          <p className="mt-1 text-2xl font-extrabold text-pink-600">
            {transactions.length}
          </p>
        </div>

      </div>

      {/* SEARCH */}
      <section className="rounded-3xl bg-white p-5 shadow-lg">

        <label className="mb-3 block text-sm font-bold text-slate-800">
          Cari Transaksi
        </label>

        <div className="flex flex-col gap-3 md:flex-row">

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari Member ID, nama member, atau keterangan..."
            className="flex-1 rounded-2xl border border-pink-200 px-4 py-3 text-sm outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
          />

          <button
            type="button"
            onClick={loadTransactions}
            disabled={loading}
            className="rounded-2xl bg-pink-600 px-7 py-3 text-sm font-bold text-white hover:bg-pink-700 disabled:opacity-50"
          >
            🔄 {loading ? "Memuat..." : "Refresh"}
          </button>

        </div>

      </section>

      {/* ERROR */}
      {errorMessage && (
        <section className="mt-5 rounded-3xl border border-red-200 bg-red-50 p-6">

          <h2 className="font-bold text-red-700">
            ❌ Gagal mengambil data transaksi
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {errorMessage}
          </p>

          <button
            onClick={loadTransactions}
            className="mt-4 rounded-xl bg-red-600 px-5 py-2 text-sm font-bold text-white"
          >
            Coba Lagi
          </button>

        </section>
      )}

      {/* TRANSACTION LIST */}
      <section className="mt-5 overflow-hidden rounded-3xl bg-white shadow-lg">

        {loading ? (

          <div className="p-14 text-center">

            <div className="text-4xl">
              ⏳
            </div>

            <p className="mt-3 font-semibold text-slate-700">
              Memuat transaksi...
            </p>

          </div>

        ) : !errorMessage && filteredTransactions.length === 0 ? (

          <div className="p-14 text-center">

            <div className="text-5xl">
              📭
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              {transactions.length === 0
                ? "Belum ada transaksi"
                : "Transaksi tidak ditemukan"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {transactions.length === 0
                ? "Belum ada aktivitas poin yang tersimpan."
                : "Coba gunakan kata pencarian lain."}
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px]">

              <thead>

                <tr className="border-b border-pink-100 bg-pink-50/50 text-left">

                  <th className="px-6 py-4 text-sm font-bold text-slate-700">
                    Tanggal
                  </th>

                  <th className="px-6 py-4 text-sm font-bold text-slate-700">
                    Member
                  </th>

                  <th className="px-6 py-4 text-sm font-bold text-slate-700">
                    Aktivitas
                  </th>

                  <th className="px-6 py-4 text-sm font-bold text-slate-700">
                    Poin
                  </th>

                  <th className="px-6 py-4 text-sm font-bold text-slate-700">
                    Keterangan
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredTransactions.map((item) => {

                  const isRedeem =
                    item.transaction_type === "redeem" ||
                    Number(item.points) < 0;

                  return (

                    <tr
                      key={item.id}
                      className="border-b border-slate-100 hover:bg-pink-50/40"
                    >

                      {/* TANGGAL */}
                      <td className="px-6 py-5 text-sm text-slate-600">
                        {formatDate(item.created_at)}
                      </td>

                      {/* MEMBER */}
                      <td className="px-6 py-5">

                        <div className="font-bold text-slate-900">
                          {item.full_name || "-"}
                        </div>

                        <div className="mt-1 text-xs font-bold text-pink-600">
                          {item.member_code || "-"}
                        </div>

                      </td>

                      {/* AKTIVITAS */}
                      <td className="px-6 py-5">

                        {isRedeem ? (

                          <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
                            Tukar Poin
                          </span>

                        ) : (

                          <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-600">
                            Tambah Poin
                          </span>

                        )}

                      </td>

                      {/* POIN */}
                      <td className="px-6 py-5">

                        <span
                          className={`font-extrabold ${
                            isRedeem
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {Number(item.points) > 0 ? "+" : ""}
                          {item.points}
                        </span>

                      </td>

                      {/* KETERANGAN */}
                      <td className="px-6 py-5 text-sm text-slate-600">
                        {item.description || "-"}
                      </td>

                    </tr>

                  );

                })}

              </tbody>

            </table>

          </div>

        )}

      </section>

      {/* FOOTER */}
      {!loading &&
        !errorMessage &&
        filteredTransactions.length > 0 && (

          <div className="mt-4 text-center text-xs text-slate-500">
            Menampilkan {filteredTransactions.length} dari{" "}
            {transactions.length} transaksi.
          </div>

        )}

    </main>
  );
}