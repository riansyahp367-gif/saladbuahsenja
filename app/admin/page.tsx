"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Transaction = {
  id?: string;
  member_code: string;
  full_name: string;
  transaction_type: string;
  points: number;
  description: string;
  created_at: string;
};

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [totalMembers, setTotalMembers] = useState(0);
  const [totalEarn, setTotalEarn] = useState(0);
  const [totalRedeem, setTotalRedeem] = useState(0);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setErrorMessage("");
    setRefreshing(true);

    try {
      // =========================
      // TOTAL MEMBER
      // =========================
      const {
        count: memberCount,
        error: memberError,
      } = await supabase
        .from("members")
        .select("*", {
          count: "exact",
          head: true,
        });

      if (memberError) {
        throw new Error(memberError.message);
      }

      // =========================
      // SEMUA TRANSAKSI
      // =========================
      const {
        data: allTransactions,
        error: transactionError,
      } = await supabase
        .from("member_point_transactions")
        .select(
          `
            id,
            member_code,
            full_name,
            transaction_type,
            points,
            description,
            created_at
          `
        )
        .order("created_at", {
          ascending: false,
        });

      if (transactionError) {
        throw new Error(transactionError.message);
      }

      const rows = (allTransactions || []) as Transaction[];

      // =========================
      // HITUNG TOTAL POIN
      // =========================
      const earn = rows
        .filter(
          (item) => item.transaction_type === "earn"
        )
        .reduce(
          (total, item) =>
            total + Number(item.points || 0),
          0
        );

      const redeem = rows
        .filter(
          (item) =>
            item.transaction_type === "redeem"
        )
        .reduce(
          (total, item) =>
            total +
            Math.abs(Number(item.points || 0)),
          0
        );

      // =========================
      // SIMPAN DATA
      // =========================
      setTotalMembers(memberCount || 0);
      setTotalEarn(earn);
      setTotalRedeem(redeem);

      // Hanya tampilkan 10 transaksi terbaru
      setTransactions(rows.slice(0, 10));
    } catch (error) {
      console.error(
        "Gagal memuat dashboard admin:",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Gagal mengambil data dashboard."
      );

      setTransactions([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();

    window.location.href = "/staff/login";
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-pink-50">
        <div className="rounded-3xl bg-white px-10 py-8 text-center shadow-lg">
          <div className="text-4xl">🍓</div>

          <p className="mt-4 font-bold text-gray-800">
            Memuat Dashboard Admin...
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Tunggu sebentar bro...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-pink-50">

      {/* ================= HEADER ================= */}
      <header className="border-b border-pink-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">
              🍓 Salad Buah Senja
            </h1>

            <p className="text-sm text-gray-500">
              Dashboard Admin
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
          >
            Logout
          </button>

        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* ================= TITLE ================= */}
        <div className="mb-8">

          <h2 className="text-3xl font-extrabold text-gray-900">
            📊 Dashboard Admin
          </h2>

          <p className="mt-1 text-gray-500">
            Pantau aktivitas member dan sistem poin
            Salad Buah Senja.
          </p>

        </div>

        {/* ================= ERROR ================= */}
        {errorMessage && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5">

            <p className="font-bold text-red-700">
              ❌ Gagal mengambil data
            </p>

            <p className="mt-1 text-sm text-red-600">
              {errorMessage}
            </p>

            <button
              onClick={loadDashboard}
              className="mt-4 rounded-xl bg-red-600 px-5 py-2 text-sm font-bold text-white hover:bg-red-700"
            >
              Coba Lagi
            </button>

          </div>
        )}

        {/* ================= STATISTICS ================= */}
        <div className="grid gap-5 md:grid-cols-3">

          {/* MEMBER */}
          <div className="rounded-3xl bg-white p-6 shadow-lg">

            <div className="text-4xl">
              👥
            </div>

            <p className="mt-4 text-sm text-gray-500">
              Total Member
            </p>

            <p className="mt-1 text-3xl font-extrabold text-pink-600">
              {totalMembers}
            </p>

          </div>

          {/* EARN */}
          <div className="rounded-3xl bg-white p-6 shadow-lg">

            <div className="text-4xl">
              ⭐
            </div>

            <p className="mt-4 text-sm text-gray-500">
              Total Poin Ditambahkan
            </p>

            <p className="mt-1 text-3xl font-extrabold text-pink-600">
              {totalEarn}
            </p>

          </div>

          {/* REDEEM */}
          <div className="rounded-3xl bg-white p-6 shadow-lg">

            <div className="text-4xl">
              🎁
            </div>

            <p className="mt-4 text-sm text-gray-500">
              Total Poin Ditukar
            </p>

            <p className="mt-1 text-3xl font-extrabold text-pink-600">
              {totalRedeem}
            </p>

          </div>

        </div>

        {/* ================= MENU ADMIN ================= */}
        <div className="mt-8 rounded-3xl bg-white p-6 shadow-lg">

          <div className="flex items-center justify-between">

            <h3 className="text-xl font-extrabold text-gray-900">
              ⚡ Menu Admin
            </h3>

          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">

            {/* DATA MEMBER */}
            <a
              href="/admin/members"
              className="rounded-2xl bg-pink-50 p-5 transition hover:bg-pink-100"
            >

              <div className="text-3xl">
                👥
              </div>

              <h4 className="mt-3 font-bold text-gray-900">
                Data Member
              </h4>

              <p className="mt-1 text-sm text-gray-500">
                Lihat seluruh data member.
              </p>

              <p className="mt-4 font-bold text-pink-600">
                Buka →
              </p>

            </a>

            {/* HISTORY */}
            <a
              href="/admin/history"
              className="rounded-2xl bg-pink-50 p-5 transition hover:bg-pink-100"
            >

              <div className="text-3xl">
                📋
              </div>

              <h4 className="mt-3 font-bold text-gray-900">
                Riwayat Transaksi
              </h4>

              <p className="mt-1 text-sm text-gray-500">
                Lihat seluruh aktivitas poin.
              </p>

              <p className="mt-4 font-bold text-pink-600">
                Buka →
              </p>

            </a>

            {/* KASIR */}
            <a
              href="/staff"
              className="rounded-2xl bg-pink-50 p-5 transition hover:bg-pink-100"
            >

              <div className="text-3xl">
                💳
              </div>

              <h4 className="mt-3 font-bold text-gray-900">
                Dashboard Kasir
              </h4>

              <p className="mt-1 text-sm text-gray-500">
                Kembali ke dashboard kasir.
              </p>

              <p className="mt-4 font-bold text-pink-600">
                Buka →
              </p>

            </a>

          </div>
        </div>

        {/* ================= TRANSACTIONS ================= */}
        <div className="mt-8 rounded-3xl bg-white p-6 shadow-lg">

          <div className="flex items-center justify-between">

            <div>
              <h3 className="text-xl font-extrabold text-gray-900">
                📋 Transaksi Terbaru
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                10 aktivitas poin terakhir.
              </p>
            </div>

            <button
              onClick={loadDashboard}
              disabled={refreshing}
              className="rounded-xl bg-pink-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-pink-700 disabled:opacity-50"
            >
              {refreshing
                ? "Memuat..."
                : "🔄 Refresh"}
            </button>

          </div>

          <div className="mt-5 overflow-x-auto">

            {transactions.length === 0 ? (

              <div className="rounded-2xl bg-pink-50 p-10 text-center">

                <div className="text-5xl">
                  📭
                </div>

                <p className="mt-3 font-bold text-gray-800">
                  Belum ada transaksi
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Transaksi poin member akan muncul di sini.
                </p>

              </div>

            ) : (

              <table className="w-full min-w-[750px] text-left text-sm">

                <thead>
                  <tr className="border-b border-pink-100">

                    <th className="px-4 py-3 font-bold">
                      Tanggal
                    </th>

                    <th className="px-4 py-3 font-bold">
                      Member
                    </th>

                    <th className="px-4 py-3 font-bold">
                      Aktivitas
                    </th>

                    <th className="px-4 py-3 font-bold">
                      Poin
                    </th>

                    <th className="px-4 py-3 font-bold">
                      Keterangan
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {transactions.map((item, index) => {

                    const isEarn =
                      item.transaction_type === "earn";

                    return (
                      <tr
                        key={
                          item.id ||
                          `${item.member_code}-${item.created_at}-${index}`
                        }
                        className="border-b border-gray-100 last:border-0 hover:bg-pink-50/50"
                      >

                        {/* DATE */}
                        <td className="px-4 py-4 text-gray-500">
                          {formatDate(item.created_at)}
                        </td>

                        {/* MEMBER */}
                        <td className="px-4 py-4">

                          <div className="font-bold text-gray-900">
                            {item.full_name}
                          </div>

                          <div className="mt-1 text-xs font-semibold text-pink-600">
                            {item.member_code}
                          </div>

                        </td>

                        {/* ACTIVITY */}
                        <td className="px-4 py-4">

                          {isEarn ? (

                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                              Tambah Poin
                            </span>

                          ) : (

                            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
                              Tukar Poin
                            </span>

                          )}

                        </td>

                        {/* POINT */}
                        <td className="px-4 py-4">

                          <span
                            className={`font-extrabold ${
                              isEarn
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {isEarn ? "+" : "-"}
                            {Math.abs(
                              Number(item.points || 0)
                            )}
                          </span>

                        </td>

                        {/* DESCRIPTION */}
                        <td className="px-4 py-4 text-gray-600">
                          {item.description}
                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            )}

          </div>

        </div>

      </div>

    </main>
  );
}