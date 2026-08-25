"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Transaction = {
  id: string;
  member_code: string;
  full_name: string;
  transaction_type: "earn" | "redeem";
  points: number;
  description: string;
  created_at: string;
};

export default function HistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadTransactions = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("member_point_transactions")
      .select(
        "id, member_code, full_name, transaction_type, points, description, created_at"
      )
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      console.error(error);
      setTransactions([]);
    } else {
      setTransactions(data ?? []);
    }

    setLoading(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const memberCode = params.get("member");

    if (memberCode) {
      setSearch(memberCode);
    }

    loadTransactions();
  }, []);

  const filteredTransactions = transactions.filter((item) => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) return true;

    return (
      item.member_code.toLowerCase().includes(keyword) ||
      item.full_name.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword)
    );
  });

  return (
    <main className="min-h-screen bg-pink-50 px-5 py-8">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-8">
          <a
            href="/staff"
            className="text-sm font-semibold text-pink-600 hover:text-pink-700"
          >
            ← Kembali ke Dashboard
          </a>

          <h1 className="mt-5 text-4xl font-extrabold text-gray-900">
            📋 Riwayat Transaksi
          </h1>

          <p className="mt-2 text-gray-500">
            Lihat seluruh aktivitas poin member Salad Buah Senja.
          </p>
        </div>

        {/* CARD */}
        <div className="rounded-3xl bg-white p-6 shadow-xl md:p-8">

          {/* SEARCH */}
          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Cari Transaksi
            </label>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari Member ID atau nama member..."
              className="w-full rounded-2xl border border-pink-200 bg-white px-5 py-4 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
            />
          </div>

          {/* INFO FILTER */}
          {search && (
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-pink-50 px-5 py-3">
              <p className="text-sm text-gray-600">
                Menampilkan transaksi untuk:
                <span className="ml-1 font-bold text-pink-600">
                  {search}
                </span>
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  window.history.replaceState({}, "", "/staff/history");
                }}
                className="text-sm font-bold text-pink-600 hover:text-pink-800"
              >
                Hapus Filter
              </button>
            </div>
          )}

          {/* REFRESH */}
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={loadTransactions}
              disabled={loading}
              className="rounded-xl bg-pink-600 px-5 py-3 font-bold text-white transition hover:bg-pink-700 disabled:opacity-50"
            >
              {loading ? "Memuat..." : "🔄 Refresh"}
            </button>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="py-12 text-center text-gray-500">
              Memuat riwayat transaksi...
            </div>
          )}

          {/* EMPTY */}
          {!loading && filteredTransactions.length === 0 && (
            <div className="mt-6 rounded-2xl bg-pink-50 p-10 text-center">
              <div className="text-5xl">📭</div>

              <p className="mt-4 font-semibold text-gray-700">
                Tidak ada transaksi ditemukan.
              </p>

              {search && (
                <p className="mt-2 text-sm text-gray-500">
                  Tidak ada transaksi yang cocok dengan pencarian tersebut.
                </p>
              )}
            </div>
          )}

          {/* TABLE */}
          {!loading && filteredTransactions.length > 0 && (
            <div className="mt-6 hidden overflow-x-auto md:block">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-pink-100 text-left">
                    <th className="px-4 py-4 text-sm font-bold">
                      Tanggal
                    </th>

                    <th className="px-4 py-4 text-sm font-bold">
                      Member
                    </th>

                    <th className="px-4 py-4 text-sm font-bold">
                      Aktivitas
                    </th>

                    <th className="px-4 py-4 text-sm font-bold">
                      Poin
                    </th>

                    <th className="px-4 py-4 text-sm font-bold">
                      Keterangan
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTransactions.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-100 hover:bg-pink-50"
                    >
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {new Date(item.created_at).toLocaleString("id-ID")}
                      </td>

                      <td className="px-4 py-4">
                        <p className="font-bold text-gray-900">
                          {item.full_name}
                        </p>

                        <p className="text-sm font-semibold text-pink-600">
                          {item.member_code}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        {item.transaction_type === "earn" ? (
                          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-600">
                            Tambah Poin
                          </span>
                        ) : (
                          <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-600">
                            Tukar Poin
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={
                            item.points > 0
                              ? "font-extrabold text-green-600"
                              : "font-extrabold text-red-600"
                          }
                        >
                          {item.points > 0 ? "+" : ""}
                          {item.points}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-600">
                        {item.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* MOBILE */}
          {!loading && filteredTransactions.length > 0 && (
            <div className="mt-6 space-y-4 md:hidden">
              {filteredTransactions.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-pink-100 bg-pink-50 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold text-gray-900">
                        {item.full_name}
                      </p>

                      <p className="text-sm font-semibold text-pink-600">
                        {item.member_code}
                      </p>
                    </div>

                    <p
                      className={
                        item.points > 0
                          ? "text-xl font-extrabold text-green-600"
                          : "text-xl font-extrabold text-red-600"
                      }
                    >
                      {item.points > 0 ? "+" : ""}
                      {item.points}
                    </p>
                  </div>

                  <div className="mt-4">
                    {item.transaction_type === "earn" ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-600">
                        Tambah Poin
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
                        Tukar Poin
                      </span>
                    )}
                  </div>

                  <p className="mt-4 text-sm text-gray-600">
                    {item.description}
                  </p>

                  <p className="mt-2 text-xs text-gray-400">
                    {new Date(item.created_at).toLocaleString("id-ID")}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </main>
  );
}