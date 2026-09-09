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

type TopMember = {
  member_code: string;
  full_name: string;
  points: number;
};

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [totalMembers, setTotalMembers] = useState(0);
  const [totalEarn, setTotalEarn] = useState(0);
  const [totalRedeem, setTotalRedeem] = useState(0);
  const [todayTransactions, setTodayTransactions] = useState(0);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [topMembers, setTopMembers] = useState<TopMember[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setErrorMessage("");
    setRefreshing(true);

    try {
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

      const {
        data: allTransactions,
        error: transactionError,
      } = await supabase
        .from("member_point_transactions")
        .select(`
          id,
          member_code,
          full_name,
          transaction_type,
          points,
          description,
          created_at
        `)
        .order("created_at", {
          ascending: false,
        });

      if (transactionError) {
        throw new Error(transactionError.message);
      }

      const rows = (allTransactions || []) as Transaction[];

      const earn = rows
        .filter((item) => item.transaction_type === "earn")
        .reduce(
          (total, item) =>
            total + Number(item.points || 0),
          0
        );

      const redeem = rows
        .filter((item) => item.transaction_type === "redeem")
        .reduce(
          (total, item) =>
            total + Math.abs(Number(item.points || 0)),
          0
        );

      const today = new Date();

      const todayCount = rows.filter((item) => {
        const date = new Date(item.created_at);

        return (
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear()
        );
      }).length;

      const memberPoints: Record<string, TopMember> = {};

      rows.forEach((item) => {
        const code = item.member_code;

        if (!memberPoints[code]) {
          memberPoints[code] = {
            member_code: code,
            full_name: item.full_name || "Member",
            points: 0,
          };
        }

        const point = Number(item.points || 0);

        if (item.transaction_type === "earn") {
          memberPoints[code].points += point;
        } else if (item.transaction_type === "redeem") {
          memberPoints[code].points -= Math.abs(point);
        }
      });

      const topMemberList = Object.values(memberPoints)
        .sort((a, b) => b.points - a.points)
        .slice(0, 5);

      setTotalMembers(memberCount || 0);
      setTotalEarn(earn);
      setTotalRedeem(redeem);
      setTodayTransactions(todayCount);

      setTransactions(rows.slice(0, 10));
      setTopMembers(topMemberList);
    } catch (error) {
      console.error("Gagal memuat dashboard admin:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Gagal mengambil data dashboard."
      );

      setTransactions([]);
      setTopMembers([]);
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
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-white to-pink-100">
        <div className="rounded-3xl bg-white px-12 py-10 text-center shadow-xl">
          <div className="animate-bounce text-5xl">🍓</div>

          <h2 className="mt-5 text-xl font-extrabold text-gray-900">
            Memuat Dashboard...
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Mengambil data Salad Buah Senja
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
      
      {/* HEADER */}
      <header className="border-b border-pink-100 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          
          <div>
            <h1 className="text-xl font-extrabold text-gray-900 md:text-2xl">
              🍓 Salad Buah{" "}
              <span className="text-pink-600">Senja</span>
            </h1>

            <p className="text-xs text-gray-500 md:text-sm">
              Dashboard Admin
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={loadDashboard}
              disabled={refreshing}
              className="rounded-xl bg-pink-100 px-4 py-2 text-sm font-bold text-pink-600 transition hover:bg-pink-200 disabled:opacity-50"
            >
              🔄
            </button>

            <button
              onClick={handleLogout}
              className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-gray-800"
            >
              Logout
            </button>
          </div>

        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">

        {/* TITLE */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            📊 Dashboard Admin
          </h2>

          <p className="mt-2 text-gray-500">
            Pantau member, poin, dan aktivitas Salad Buah Senja 🍓
          </p>
        </div>

        {/* ERROR */}
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

        {/* STATISTICS */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          
          <StatCard
            icon="👥"
            title="Total Member"
            value={totalMembers}
            color="text-pink-600"
          />

          <StatCard
            icon="⭐"
            title="Poin Ditambahkan"
            value={totalEarn}
            color="text-green-600"
          />

          <StatCard
            icon="🎁"
            title="Poin Ditukar"
            value={totalRedeem}
            color="text-orange-500"
          />

          <div className="rounded-3xl bg-gradient-to-br from-pink-500 to-pink-700 p-6 text-white shadow-lg">
            <div className="text-4xl">📅</div>

            <p className="mt-4 text-sm text-pink-100">
              Transaksi Hari Ini
            </p>

            <p className="mt-1 text-3xl font-extrabold">
              {todayTransactions}
            </p>
          </div>

        </div>

        {/* MENU ADMIN */}
        <section className="mt-8 rounded-3xl bg-white p-6 shadow-lg">
          <h3 className="text-xl font-extrabold text-gray-900">
            ⚡ Menu Admin
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Kelola sistem member dengan cepat.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            
            <AdminMenu
              href="/admin/members"
              icon="👥"
              title="Data Member"
              description="Lihat seluruh data member."
            />

            <AdminMenu
              href="/admin/history"
              icon="📋"
              title="Riwayat Transaksi"
              description="Lihat semua aktivitas poin."
            />

            <AdminMenu
              href="/staff"
              icon="💳"
              title="Dashboard Kasir"
              description="Kembali ke dashboard kasir."
            />

          </div>
        </section>

        {/* TOP MEMBER */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          
          <section className="rounded-3xl bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-gray-900">
                  🏆 Top Member
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Member dengan poin tertinggi.
                </p>
              </div>

              <div className="text-3xl">🥇</div>
            </div>

            <div className="mt-6 space-y-3">
              {topMembers.length === 0 ? (
                <div className="rounded-2xl bg-pink-50 p-8 text-center">
                  <div className="text-4xl">📭</div>

                  <p className="mt-3 text-sm text-gray-500">
                    Belum ada data poin member.
                  </p>
                </div>
              ) : (
                topMembers.map((member, index) => (
                  <div
                    key={member.member_code}
                    className="flex items-center justify-between rounded-2xl bg-pink-50 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-extrabold text-pink-600 shadow-sm">
                        #{index + 1}
                      </div>

                      <div>
                        <p className="font-bold text-gray-900">
                          {member.full_name}
                        </p>

                        <p className="text-xs font-semibold text-gray-500">
                          {member.member_code}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-extrabold text-pink-600">
                        ⭐ {member.points}
                      </p>

                      <p className="text-xs text-gray-500">
                        POINT
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* RINGKASAN */}
          <section className="rounded-3xl bg-gradient-to-br from-pink-600 to-pink-800 p-6 text-white shadow-lg">
            <div className="text-4xl">🍓</div>

            <h3 className="mt-4 text-2xl font-extrabold">
              Salad Buah Senja
            </h3>

            <p className="mt-2 text-pink-100">
              Sistem Member & Loyalty Point
            </p>

            <div className="mt-8 space-y-4">
              
              <SummaryRow
                label="👥 Member"
                value={totalMembers}
              />

              <SummaryRow
                label="⭐ Total Poin Masuk"
                value={totalEarn}
              />

              <SummaryRow
                label="🎁 Poin Ditukar"
                value={totalRedeem}
              />

            </div>
          </section>

        </div>

        {/* TRANSAKSI */}
        <section className="mt-8 rounded-3xl bg-white p-6 shadow-lg">
          
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
              className="rounded-xl bg-pink-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-pink-700 disabled:opacity-50"
            >
              {refreshing ? "Memuat..." : "🔄 Refresh Data"}
            </button>
          </div>

          <div className="mt-6 overflow-x-auto">
            {transactions.length === 0 ? (
              <div className="rounded-2xl bg-pink-50 p-12 text-center">
                <div className="text-5xl">📭</div>

                <h4 className="mt-4 font-bold text-gray-800">
                  Belum ada transaksi
                </h4>

                <p className="mt-1 text-sm text-gray-500">
                  Aktivitas poin member akan muncul di sini.
                </p>
              </div>
            ) : (
              <table className="w-full min-w-[750px] text-left text-sm">
                <thead>
                  <tr className="border-b border-pink-100 text-gray-500">
                    <th className="px-4 py-4 font-bold">Tanggal</th>
                    <th className="px-4 py-4 font-bold">Member</th>
                    <th className="px-4 py-4 font-bold">Aktivitas</th>
                    <th className="px-4 py-4 font-bold">Poin</th>
                    <th className="px-4 py-4 font-bold">Keterangan</th>
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
                        className="border-b border-gray-100 transition hover:bg-pink-50"
                      >
                        <td className="px-4 py-4 text-gray-500">
                          {formatDate(item.created_at)}
                        </td>

                        <td className="px-4 py-4">
                          <p className="font-bold text-gray-900">
                            {item.full_name}
                          </p>

                          <p className="mt-1 text-xs font-semibold text-pink-600">
                            {item.member_code}
                          </p>
                        </td>

                        <td className="px-4 py-4">
                          {isEarn ? (
                            <span className="rounded-full bg-green-100 px-3 py-2 text-xs font-bold text-green-700">
                              ⭐ Tambah Poin
                            </span>
                          ) : (
                            <span className="rounded-full bg-red-100 px-3 py-2 text-xs font-bold text-red-600">
                              🎁 Tukar Poin
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`text-base font-extrabold ${
                              isEarn
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {isEarn ? "+" : "-"}
                            {Math.abs(Number(item.points || 0))}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-gray-600">
                          {item.description || "-"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </section>

        <footer className="py-10 text-center text-sm text-gray-400">
          🍓 Salad Buah Senja — Sistem Member & Loyalty Point
        </footer>

      </div>
    </main>
  );
}

function StatCard({
  icon,
  title,
  value,
  color,
}: {
  icon: string;
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1">
      <div className="text-4xl">{icon}</div>

      <p className="mt-4 text-sm text-gray-500">
        {title}
      </p>

      <p className={`mt-1 text-3xl font-extrabold ${color}`}>
        {value}
      </p>
    </div>
  );
}

function AdminMenu({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <a
      href={href}
      className="rounded-2xl bg-pink-50 p-5 transition hover:bg-pink-100 hover:shadow-md"
    >
      <div className="text-4xl">{icon}</div>

      <h4 className="mt-4 font-bold text-gray-900">
        {title}
      </h4>

      <p className="mt-1 text-sm text-gray-500">
        {description}
      </p>

      <p className="mt-4 font-bold text-pink-600">
        Buka →
      </p>
    </a>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white/15 p-4">
      <span className="text-pink-100">
        {label}
      </span>

      <span className="text-xl font-extrabold">
        {value}
      </span>
    </div>
  );
}