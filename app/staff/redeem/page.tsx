"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Member = {
  id: string;
  member_code: string;
  full_name: string;
  phone: string | null;
  points: number;
};

type PointTransaction = {
  member_code: string;
  transaction_type: string;
  points: number;
};

const REDEEM_POINTS = 100;
const REWARD_NAME = "Salad Buah Senja 200 ml";

export default function RedeemPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    setLoading(true);
    setErrorMessage("");

    try {
      /*
       * AMBIL DATA MEMBER
       */
      const { data: memberData, error: memberError } = await supabase
        .from("members")
        .select(`
          id,
          member_code,
          full_name,
          phone,
          points
        `)
        .order("full_name", { ascending: true });

      if (memberError) {
        throw new Error(memberError.message);
      }

      /*
       * AMBIL SELURUH RIWAYAT POIN
       *
       * Saldo akan dihitung dari transaksi.
       */
      const { data: transactionData, error: transactionError } =
        await supabase
          .from("member_point_transactions")
          .select(`
            member_code,
            transaction_type,
            points
          `);

      if (transactionError) {
        throw new Error(transactionError.message);
      }

      /*
       * HITUNG SALDO BERDASARKAN TRANSAKSI
       */
      const pointMap: Record<string, number> = {};

      ((transactionData || []) as PointTransaction[]).forEach((transaction) => {
        const code = transaction.member_code;

        if (!pointMap[code]) {
          pointMap[code] = 0;
        }

        pointMap[code] += Number(transaction.points || 0);
      });

      /*
       * GABUNGKAN DATA MEMBER + SALDO TRANSAKSI
       */
      const formattedMembers: Member[] = (memberData || []).map((member) => {
        const calculatedPoints = pointMap[member.member_code];

        return {
          ...member,
          points:
            calculatedPoints !== undefined
              ? Math.max(0, calculatedPoints)
              : Number(member.points || 0),
        };
      });

      setMembers(formattedMembers);
    } catch (error) {
      console.error("Gagal mengambil data member:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Gagal mengambil data member."
      );

      setMembers([]);
    } finally {
      setLoading(false);
    }
  }

  /*
   * SEARCH MEMBER
   */
  const filteredMembers = members.filter((member) => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) return true;

    return (
      member.member_code?.toLowerCase().includes(keyword) ||
      member.full_name?.toLowerCase().includes(keyword) ||
      member.phone?.toLowerCase().includes(keyword)
    );
  });

  /*
   * BUKA KONFIRMASI
   */
  function openRedeem(member: Member) {
    setMessage("");
    setErrorMessage("");

    const points = Number(member.points || 0);

    if (points < REDEEM_POINTS) {
      setErrorMessage(
        `${member.full_name} belum memiliki cukup poin. Minimal ${REDEEM_POINTS} poin.`
      );
      return;
    }

    setSelectedMember(member);
    setShowConfirm(true);
  }

  /*
   * TUTUP MODAL
   */
  function closeConfirm() {
    if (processing) return;

    setShowConfirm(false);
    setSelectedMember(null);
  }

  /*
   * PROSES TUKAR POIN
   */
  async function handleRedeem() {
    if (!selectedMember) return;

    const currentPoints = Number(selectedMember.points || 0);

    if (currentPoints < REDEEM_POINTS) {
      setErrorMessage("Poin member tidak mencukupi.");
      setShowConfirm(false);
      return;
    }

    setProcessing(true);
    setMessage("");
    setErrorMessage("");

    try {
      const newPoints = currentPoints - REDEEM_POINTS;

      /*
       * 1. UPDATE SALDO MEMBER
       */
      const { error: updateError } = await supabase
        .from("members")
        .update({
          points: newPoints,
        })
        .eq("id", selectedMember.id);

      if (updateError) {
        throw new Error(updateError.message);
      }

      /*
       * 2. SIMPAN TRANSAKSI REDEEM
       */
      const { error: transactionError } = await supabase
        .from("member_point_transactions")
        .insert({
          member_code: selectedMember.member_code,
          full_name: selectedMember.full_name,
          transaction_type: "redeem",
          points: -REDEEM_POINTS,
          description: `Tukar poin dengan ${REWARD_NAME}`,
        });

      /*
       * JIKA INSERT TRANSAKSI GAGAL,
       * KEMBALIKAN SALDO MEMBER
       */
      if (transactionError) {
        await supabase
          .from("members")
          .update({
            points: currentPoints,
          })
          .eq("id", selectedMember.id);

        throw new Error(transactionError.message);
      }

      /*
       * 3. UPDATE TAMPILAN
       */
      setMembers((prev) =>
        prev.map((member) =>
          member.id === selectedMember.id
            ? {
                ...member,
                points: newPoints,
              }
            : member
        )
      );

      /*
       * 4. PESAN BERHASIL
       */
      setMessage(
        `Berhasil! ${selectedMember.full_name} menukar ${REDEEM_POINTS} poin dengan ${REWARD_NAME}.`
      );

      setShowConfirm(false);
      setSelectedMember(null);
    } catch (error) {
      console.error("Error redeem:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Penukaran poin gagal."
      );
    } finally {
      setProcessing(false);
    }
  }

  return (
    <main className="min-h-screen bg-pink-50 px-4 py-6 md:px-8">

      <div className="mx-auto max-w-6xl">

        {/* BACK */}
        <a
          href="/staff"
          className="text-sm font-semibold text-pink-600 hover:text-pink-700"
        >
          ← Kembali ke Dashboard
        </a>

        {/* HEADER */}
        <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

          <div>
            <div className="flex items-center gap-3">

              <div className="text-4xl">
                🎁
              </div>

              <div>
                <h1 className="text-3xl font-extrabold text-slate-950">
                  Tukar Poin
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Tukarkan poin member dengan hadiah.
                </p>
              </div>

            </div>
          </div>

          <div className="rounded-2xl bg-white px-6 py-4 shadow-sm">

            <p className="text-xs text-slate-500">
              Reward
            </p>

            <p className="mt-1 font-extrabold text-pink-600">
              {REWARD_NAME}
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-600">
              {REDEEM_POINTS} Poin
            </p>

          </div>

        </div>

        {/* SUCCESS */}
        {message && (
          <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-5 text-sm font-semibold text-green-700">
            ✅ {message}
          </div>
        )}

        {/* ERROR */}
        {errorMessage && (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-5">

            <p className="font-bold text-red-700">
              ❌ Terjadi kesalahan
            </p>

            <p className="mt-1 text-sm text-red-600">
              {errorMessage}
            </p>

            <button
              onClick={() => setErrorMessage("")}
              className="mt-3 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
            >
              Tutup
            </button>

          </div>
        )}

        {/* REWARD INFO */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-lg">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-sm font-semibold text-slate-500">
                🎁 Hadiah Penukaran
              </p>

              <h2 className="mt-1 text-xl font-extrabold text-slate-950">
                {REWARD_NAME}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Gunakan {REDEEM_POINTS} poin untuk mendapatkan hadiah.
              </p>

            </div>

            <div className="rounded-2xl bg-pink-50 px-6 py-4 text-center">

              <p className="text-xs text-slate-500">
                Poin Dibutuhkan
              </p>

              <p className="mt-1 text-2xl font-extrabold text-pink-600">
                {REDEEM_POINTS}
              </p>

            </div>

          </div>

        </section>

        {/* SEARCH */}
        <section className="mt-5 rounded-3xl bg-white p-5 shadow-lg">

          <div className="flex flex-col gap-3 md:flex-row md:items-end">

            <div className="flex-1">

              <label className="text-sm font-semibold text-slate-800">
                Cari Member
              </label>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari Member ID, nama, atau nomor WhatsApp..."
                className="mt-2 w-full rounded-2xl border border-pink-200 px-4 py-3 text-sm outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
              />

            </div>

            <button
              onClick={loadMembers}
              disabled={loading}
              className="rounded-2xl bg-pink-600 px-6 py-3 text-sm font-bold text-white hover:bg-pink-700 disabled:opacity-50"
            >
              🔄 Refresh
            </button>

          </div>

        </section>

        {/* MEMBER LIST */}
        <section className="mt-5">

          {loading ? (

            <div className="rounded-3xl bg-white p-12 text-center shadow-lg">
              <p className="font-semibold text-slate-500">
                Memuat data member...
              </p>
            </div>

          ) : filteredMembers.length === 0 ? (

            <div className="rounded-3xl bg-white p-12 text-center shadow-lg">

              <div className="text-5xl">
                📭
              </div>

              <h2 className="mt-4 text-lg font-extrabold text-slate-900">
                Member tidak ditemukan
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Coba gunakan nama atau Member ID lain.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {filteredMembers.map((member) => {

                const points = Number(member.points || 0);
                const canRedeem = points >= REDEEM_POINTS;
                const afterRedeem = points - REDEEM_POINTS;

                return (
                  <div
                    key={member.id}
                    className="rounded-3xl bg-white p-5 shadow-lg"
                  >

                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                      {/* MEMBER */}
                      <div className="flex items-center gap-4">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-2xl">
                          👤
                        </div>

                        <div>

                          <h3 className="font-extrabold text-slate-950">
                            {member.full_name}
                          </h3>

                          <p className="mt-1 text-sm font-bold text-pink-600">
                            {member.member_code}
                          </p>

                          {member.phone && (
                            <p className="mt-1 text-xs text-slate-500">
                              📱 {member.phone}
                            </p>
                          )}

                        </div>

                      </div>

                      {/* POINT */}
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                        <div className="rounded-2xl bg-pink-50 px-6 py-4 text-center">

                          <p className="text-xs text-slate-500">
                            Poin
                          </p>

                          <p className="mt-1 text-2xl font-extrabold text-pink-600">
                            {points}
                          </p>

                        </div>

                        <div className="rounded-2xl bg-slate-50 px-6 py-4 text-center">

                          <p className="text-xs text-slate-500">
                            Setelah Tukar
                          </p>

                          <p
                            className={`mt-1 text-2xl font-extrabold ${
                              canRedeem
                                ? "text-green-600"
                                : "text-slate-400"
                            }`}
                          >
                            {canRedeem ? afterRedeem : "-"}
                          </p>

                        </div>

                        <button
                          onClick={() => openRedeem(member)}
                          disabled={!canRedeem}
                          className={`rounded-2xl px-6 py-4 text-sm font-extrabold transition ${
                            canRedeem
                              ? "bg-pink-600 text-white hover:bg-pink-700"
                              : "cursor-not-allowed bg-slate-100 text-slate-400"
                          }`}
                        >
                          {canRedeem
                            ? "🎁 Tukar Poin"
                            : "🔒 Poin Kurang"}
                        </button>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </section>

        {/* FOOTER */}
        {!loading && (
          <div className="py-6 text-center text-xs text-slate-500">
            Menampilkan {filteredMembers.length} dari {members.length} member.
          </div>
        )}

      </div>

      {/* CONFIRM MODAL */}
      {showConfirm && selectedMember && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

          <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">

            <div className="text-center">

              <div className="text-5xl">
                🎁
              </div>

              <h2 className="mt-4 text-2xl font-extrabold text-slate-950">
                Konfirmasi Penukaran
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Pastikan data penukaran sudah benar.
              </p>

            </div>

            {/* MEMBER */}
            <div className="mt-6 rounded-2xl bg-pink-50 p-5">

              <p className="text-xs text-slate-500">
                Member
              </p>

              <p className="mt-1 font-extrabold text-slate-950">
                {selectedMember.full_name}
              </p>

              <p className="mt-1 text-sm font-bold text-pink-600">
                {selectedMember.member_code}
              </p>

            </div>

            {/* DETAIL */}
            <div className="mt-4 rounded-2xl border border-pink-100 p-5">

              <div className="flex justify-between gap-4">

                <span className="text-sm text-slate-500">
                  Hadiah
                </span>

                <span className="text-right text-sm font-bold text-slate-900">
                  {REWARD_NAME}
                </span>

              </div>

              <div className="my-4 h-px bg-pink-100" />

              <div className="flex justify-between">

                <span className="text-sm text-slate-500">
                  Poin saat ini
                </span>

                <span className="font-bold text-slate-900">
                  {selectedMember.points}
                </span>

              </div>

              <div className="mt-3 flex justify-between">

                <span className="text-sm text-slate-500">
                  Poin dipakai
                </span>

                <span className="font-extrabold text-red-600">
                  -{REDEEM_POINTS}
                </span>

              </div>

              <div className="my-4 h-px bg-pink-100" />

              <div className="flex justify-between">

                <span className="text-sm font-semibold text-slate-700">
                  Poin setelah tukar
                </span>

                <span className="text-xl font-extrabold text-pink-600">
                  {Number(selectedMember.points) - REDEEM_POINTS}
                </span>

              </div>

            </div>

            {/* BUTTON */}
            <div className="mt-5 grid grid-cols-2 gap-3">

              <button
                onClick={closeConfirm}
                disabled={processing}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                Batal
              </button>

              <button
                onClick={handleRedeem}
                disabled={processing}
                className="rounded-2xl bg-pink-600 px-4 py-3 text-sm font-extrabold text-white hover:bg-pink-700 disabled:opacity-50"
              >
                {processing
                  ? "⏳ Memproses..."
                  : "🎁 Konfirmasi"}
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}