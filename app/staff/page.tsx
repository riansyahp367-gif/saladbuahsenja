"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function StaffDashboard() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user?.email) {
        setEmail(data.user.email);
      }
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/staff/login";
  };

  return (
    <main className="min-h-screen bg-pink-50">

      {/* HEADER */}
      <header className="border-b border-pink-100 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">
              🍓 Salad Buah Senja
            </h1>

            <p className="text-sm text-gray-500">
              Dashboard Kasir
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl bg-gray-900 px-5 py-3 font-bold text-white transition hover:bg-gray-700"
          >
            Logout
          </button>

        </div>
      </header>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-6 py-10">

        {/* WELCOME */}
        <div className="rounded-3xl bg-white p-8 shadow-xl">

          <h2 className="text-3xl font-extrabold text-gray-900">
            👋 Selamat Datang, Kasir
          </h2>

          {email && (
            <p className="mt-2 text-gray-500">
              {email}
            </p>
          )}

          {/* MENU */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {/* TAMBAH POIN */}
            <a
              href="/staff/points"
              className="group rounded-3xl bg-pink-50 p-7 transition hover:-translate-y-1 hover:bg-pink-100 hover:shadow-lg"
            >
              <div className="text-4xl">
                ⭐
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Tambah Poin
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Tambahkan poin member berdasarkan total transaksi.
              </p>

              <div className="mt-5 font-bold text-pink-600">
                Buka →
              </div>
            </a>

            {/* DATA MEMBER */}
            <a
              href="/staff/members"
              className="group rounded-3xl bg-pink-50 p-7 transition hover:-translate-y-1 hover:bg-pink-100 hover:shadow-lg"
            >
              <div className="text-4xl">
                👥
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Data Member
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Lihat dan cari data member Salad Buah Senja.
              </p>

              <div className="mt-5 font-bold text-pink-600">
                Buka →
              </div>
            </a>

            {/* TUKAR POIN */}
            <a
              href="/staff/redeem"
              className="group rounded-3xl bg-pink-50 p-7 transition hover:-translate-y-1 hover:bg-pink-100 hover:shadow-lg"
            >
              <div className="text-4xl">
                🎁
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Tukar Poin
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Proses penukaran poin member menjadi hadiah.
              </p>

              <div className="mt-5 font-bold text-pink-600">
                Buka →
              </div>
            </a>

            {/* RIWAYAT */}
            <a
              href="/staff/history"
              className="group rounded-3xl bg-pink-50 p-7 transition hover:-translate-y-1 hover:bg-pink-100 hover:shadow-lg"
            >
              <div className="text-4xl">
                📋
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Riwayat Transaksi
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Lihat seluruh aktivitas tambah dan penukaran poin member.
              </p>

              <div className="mt-5 font-bold text-pink-600">
                Buka →
              </div>
            </a>

          </div>

        </div>

        {/* INFO */}
        <div className="mt-8 rounded-3xl border border-pink-200 bg-white p-7 shadow-sm">

          <h3 className="text-xl font-bold text-gray-900">
            💡 Sistem Member
          </h3>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">

            <div className="rounded-2xl bg-pink-50 p-5">
              <p className="text-sm text-gray-500">
                Nilai Poin
              </p>

              <p className="mt-1 text-xl font-extrabold text-pink-600">
                Rp1.000 = 1 Poin
              </p>
            </div>

            <div className="rounded-2xl bg-pink-50 p-5">
              <p className="text-sm text-gray-500">
                Hadiah
              </p>

              <p className="mt-1 text-xl font-extrabold text-pink-600">
                100 Poin
              </p>
            </div>

            <div className="rounded-2xl bg-pink-50 p-5">
              <p className="text-sm text-gray-500">
                Reward
              </p>

              <p className="mt-1 text-xl font-extrabold text-pink-600">
                Salad 200 ml
              </p>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}