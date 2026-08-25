"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Member = {
  member_code: string;
  full_name: string;
  points: number;
  level?: string | null;
};

type Result = {
  memberCode: string;
  name: string;
  amount: number;
  addedPoints: number;
  totalPoints: number;
  level: string;
};

export default function StaffPointsPage() {
  const [memberCode, setMemberCode] = useState("");
  const [totalBelanja, setTotalBelanja] = useState("");

  const [member, setMember] = useState<Member | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const [loadingMember, setLoadingMember] = useState(false);
  const [loadingTransaction, setLoadingTransaction] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  // =========================
  // FORMAT RUPIAH
  // =========================
  function formatRupiah(value: number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  }

  // =========================
  // HITUNG LEVEL
  // =========================
  function getLevel(points: number) {
    if (points >= 500) return "Gold";
    if (points >= 250) return "Silver";
    return "Bronze";
  }

  // =========================
  // CARI MEMBER
  // =========================
  async function handleFindMember() {
    const code = memberCode.trim().toUpperCase();

    setErrorMessage("");
    setResult(null);
    setMember(null);

    if (!code) {
      setErrorMessage("Masukkan Member ID terlebih dahulu.");
      return;
    }

    setLoadingMember(true);

    const { data, error } = await supabase
      .from("members")
      .select("member_code, full_name, points, level")
      .eq("member_code", code)
      .maybeSingle();

    setLoadingMember(false);

    if (error) {
      console.error("Gagal mencari member:", error);

      setErrorMessage(
        `Gagal mencari member: ${error.message}`
      );

      return;
    }

    if (!data) {
      setErrorMessage(
        `Member dengan ID ${code} tidak ditemukan.`
      );

      return;
    }

    setMember(data as Member);
  }

  // =========================
  // TAMBAH POIN
  // =========================
  async function handleAddPoints() {
    if (!member) {
      setErrorMessage("Cari dan pilih member terlebih dahulu.");
      return;
    }

    const amount = Number(totalBelanja);

    setErrorMessage("");
    setResult(null);

    if (!amount || amount < 1000) {
      setErrorMessage("Total belanja minimal Rp1.000.");
      return;
    }

    if (!Number.isFinite(amount)) {
      setErrorMessage("Nominal transaksi tidak valid.");
      return;
    }

    const addedPoints = Math.floor(amount / 1000);

    if (addedPoints < 1) {
      setErrorMessage("Transaksi belum menghasilkan poin.");
      return;
    }

    setLoadingTransaction(true);

    try {
      // =========================
      // RPC TAMBAH POIN
      // =========================
      const { error: pointsError } = await supabase.rpc(
        "add_member_points",
        {
          p_member_code: member.member_code,
          p_amount: amount,
        }
      );

      if (pointsError) {
        throw new Error(pointsError.message);
      }

      // =========================
      // AMBIL DATA MEMBER TERBARU
      // =========================
      const { data: updatedMember, error: updatedError } =
        await supabase
          .from("members")
          .select(
            "member_code, full_name, points, level"
          )
          .eq("member_code", member.member_code)
          .maybeSingle();

      if (updatedError) {
        throw new Error(updatedError.message);
      }

      if (!updatedMember) {
        throw new Error(
          "Transaksi berhasil, tetapi data member terbaru tidak ditemukan."
        );
      }

      const totalPoints = Number(
        updatedMember.points || 0
      );

      const level =
        updatedMember.level ||
        getLevel(totalPoints);

      setMember(updatedMember as Member);

      setResult({
        memberCode: updatedMember.member_code,
        name: updatedMember.full_name,
        amount,
        addedPoints,
        totalPoints,
        level,
      });

      setTotalBelanja("");
    } catch (error: any) {
      console.error("Gagal menambahkan poin:", error);

      setErrorMessage(
        `Gagal menambahkan poin: ${
          error?.message || "Terjadi kesalahan."
        }`
      );
    } finally {
      setLoadingTransaction(false);
    }
  }

  // =========================
  // RESET
  // =========================
  function handleReset() {
    setMemberCode("");
    setTotalBelanja("");
    setMember(null);
    setResult(null);
    setErrorMessage("");
  }

  return (
    <main className="min-h-screen bg-pink-50 px-4 py-6 md:px-6 md:py-10">

      <div className="mx-auto max-w-4xl">

        {/* ================= HEADER ================= */}
        <div className="mb-7">

          <a
            href="/staff"
            className="text-sm font-semibold text-pink-600 hover:text-pink-700"
          >
            ← Kembali ke Dashboard
          </a>

          <div className="mt-5 flex items-center gap-3">

            <div className="text-4xl">
              ⭐
            </div>

            <div>
              <h1 className="text-3xl font-extrabold text-slate-950">
                Tambah Poin
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Tambahkan poin member berdasarkan total transaksi.
              </p>
            </div>

          </div>

        </div>

        {/* ================= INFO SISTEM ================= */}
        <div className="mb-5 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-xs text-slate-500">
              Nilai Poin
            </p>

            <p className="mt-1 text-lg font-extrabold text-pink-600">
              Rp1.000 = 1 Poin
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-xs text-slate-500">
              Minimal Transaksi
            </p>

            <p className="mt-1 text-lg font-extrabold text-pink-600">
              Rp1.000
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-xs text-slate-500">
              Reward
            </p>

            <p className="mt-1 text-lg font-extrabold text-pink-600">
              100 Poin
            </p>
          </div>

        </div>

        {/* ================= FORM ================= */}
        <section className="rounded-3xl bg-white p-6 shadow-xl md:p-8">

          <h2 className="text-xl font-extrabold text-slate-900">
            🧾 Input Transaksi
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Cari member terlebih dahulu sebelum memasukkan transaksi.
          </p>

          <div className="mt-6 space-y-5">

            {/* MEMBER ID */}
            <div>

              <label className="mb-2 block text-sm font-bold text-slate-700">
                Member ID
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">

                <input
                  type="text"
                  value={memberCode}
                  onChange={(e) => {
                    setMemberCode(
                      e.target.value.toUpperCase()
                    );
                    setMember(null);
                    setResult(null);
                    setErrorMessage("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleFindMember();
                    }
                  }}
                  placeholder="Contoh: SBS000001"
                  className="flex-1 rounded-2xl border border-pink-200 px-5 py-4 text-sm font-semibold uppercase outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                />

                <button
                  type="button"
                  onClick={handleFindMember}
                  disabled={loadingMember}
                  className="rounded-2xl bg-pink-600 px-7 py-4 text-sm font-bold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loadingMember
                    ? "Mencari..."
                    : "🔎 Cari Member"}
                </button>

              </div>

            </div>

            {/* MEMBER FOUND */}
            {member && (
              <div className="rounded-3xl border border-pink-200 bg-pink-50 p-5">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                    👤
                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="text-lg font-extrabold text-slate-900">
                      {member.full_name}
                    </p>

                    <p className="text-sm font-bold text-pink-600">
                      {member.member_code}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Poin saat ini:{" "}
                      <b className="text-pink-600">
                        {member.points || 0}
                      </b>
                    </p>

                  </div>

                  <div className="hidden rounded-2xl bg-white px-5 py-3 text-center sm:block">

                    <p className="text-xs text-slate-500">
                      Level
                    </p>

                    <p className="mt-1 font-extrabold text-pink-600">
                      {member.level ||
                        getLevel(
                          Number(member.points || 0)
                        )}
                    </p>

                  </div>

                </div>

              </div>
            )}

            {/* TOTAL BELANJA */}
            <div>

              <label className="mb-2 block text-sm font-bold text-slate-700">
                Total Belanja
              </label>

              <div className="relative">

                <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                  Rp
                </span>

                <input
                  type="number"
                  value={totalBelanja}
                  onChange={(e) =>
                    setTotalBelanja(e.target.value)
                  }
                  placeholder="25000"
                  min="1000"
                  disabled={!member || loadingTransaction}
                  className="w-full rounded-2xl border border-pink-200 py-4 pl-12 pr-5 text-lg font-bold outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                />

              </div>

              {totalBelanja &&
                Number(totalBelanja) >= 1000 && (
                  <div className="mt-3 rounded-2xl bg-pink-50 px-5 py-4">

                    <div className="flex items-center justify-between">

                      <span className="text-sm text-slate-500">
                        Poin yang didapat
                      </span>

                      <span className="text-xl font-extrabold text-pink-600">
                        +{Math.floor(
                          Number(totalBelanja) / 1000
                        )} Poin
                      </span>

                    </div>

                  </div>
                )}

            </div>

            {/* ERROR */}
            {errorMessage && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4">

                <p className="font-semibold text-red-600">
                  ❌ {errorMessage}
                </p>

              </div>
            )}

            {/* BUTTON */}
            <div className="flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                onClick={handleAddPoints}
                disabled={
                  !member ||
                  !totalBelanja ||
                  loadingTransaction
                }
                className="flex-1 rounded-2xl bg-pink-600 py-4 text-lg font-extrabold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loadingTransaction
                  ? "⏳ Memproses..."
                  : "⭐ Tambahkan Poin"}
              </button>

              <button
                type="button"
                onClick={handleReset}
                disabled={loadingTransaction}
                className="rounded-2xl border border-slate-200 px-7 py-4 font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Reset
              </button>

            </div>

          </div>

        </section>

        {/* ================= RESULT ================= */}
        {result && (
          <section className="mt-6 rounded-3xl bg-white p-7 shadow-xl">

            <div className="text-center">

              <div className="text-5xl">
                🎉
              </div>

              <h2 className="mt-4 text-2xl font-extrabold text-slate-950">
                Transaksi Berhasil!
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Poin berhasil ditambahkan ke member.
              </p>

            </div>

            {/* MEMBER */}
            <div className="mt-6 rounded-2xl bg-pink-50 p-5">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs text-slate-500">
                    Member
                  </p>

                  <p className="mt-1 font-extrabold text-slate-900">
                    {result.name}
                  </p>

                  <p className="text-sm font-bold text-pink-600">
                    {result.memberCode}
                  </p>
                </div>

                <div className="text-right">

                  <p className="text-xs text-slate-500">
                    Transaksi
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {formatRupiah(result.amount)}
                  </p>

                </div>

              </div>

            </div>

            {/* RESULT CARDS */}
            <div className="mt-5 grid gap-4 sm:grid-cols-3">

              <div className="rounded-2xl bg-pink-50 p-5 text-center">

                <p className="text-sm text-slate-500">
                  Poin Ditambahkan
                </p>

                <p className="mt-2 text-3xl font-extrabold text-pink-600">
                  +{result.addedPoints}
                </p>

              </div>

              <div className="rounded-2xl bg-pink-50 p-5 text-center">

                <p className="text-sm text-slate-500">
                  Total Poin
                </p>

                <p className="mt-2 text-3xl font-extrabold text-pink-600">
                  {result.totalPoints}
                </p>

              </div>

              <div className="rounded-2xl bg-pink-50 p-5 text-center">

                <p className="text-sm text-slate-500">
                  Level
                </p>

                <p className="mt-2 text-2xl font-extrabold text-pink-600">
                  {result.level}
                </p>

              </div>

            </div>

            {/* NEW TRANSACTION */}
            <button
              type="button"
              onClick={() => {
                setMemberCode("");
                setTotalBelanja("");
                setMember(null);
                setResult(null);
                setErrorMessage("");
              }}
              className="mt-6 w-full rounded-2xl border border-pink-200 py-4 font-bold text-pink-600 transition hover:bg-pink-50"
            >
              ＋ Transaksi Member Lain
            </button>

          </section>
        )}

      </div>

    </main>
  );
}