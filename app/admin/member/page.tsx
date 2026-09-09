"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Member = {
  id: string;
  member_code: string;
  full_name: string;
  phone: string;
  birth_date: string | null;
};

type PointTransaction = {
  id: string;
  member_code: string;
  points: number;
  transaction_type: string;
  created_at: string;
};

export default function MemberDashboard() {
  const [memberCode, setMemberCode] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const [totalPoints, setTotalPoints] = useState(0);
  const [transactions, setTransactions] = useState<PointTransaction[]>([]);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // =========================
  // LOAD SEMUA MEMBER
  // =========================
  const loadMembers = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("members")
      .select("*")
      .order("member_code", { ascending: true });

    if (error) {
      console.error(error);
      setMessage(`❌ Gagal membaca data member: ${error.message}`);
      setLoading(false);
      return;
    }

    setMembers(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadMembers();
  }, []);

  // =========================
  // HITUNG TOTAL POINT
  // =========================
  const loadMemberPoints = async (code: string) => {
    const { data, error } = await supabase
      .from("member_point_transactions")
      .select("*")
      .eq("member_code", code)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("ERROR POINT:", error);
      setTotalPoints(0);
      setTransactions([]);
      return;
    }

    const transactionData = data || [];

    setTransactions(transactionData);

    let total = 0;

    transactionData.forEach((transaction) => {
      if (transaction.transaction_type === "earn") {
        total += Number(transaction.points);
      }

      if (transaction.transaction_type === "redeem") {
        total -= Number(transaction.points);
      }
    });

    setTotalPoints(total);
  };

  // =========================
  // CEK MEMBER
  // =========================
  const handleCheckMember = async () => {
    const inputCode = memberCode.trim().toUpperCase();

    if (!inputCode) {
      setMessage("⚠️ Masukkan Member ID terlebih dahulu.");
      setSelectedMember(null);
      return;
    }

    const foundMember = members.find(
      (member) =>
        member.member_code.trim().toUpperCase() === inputCode
    );

    if (!foundMember) {
      setSelectedMember(null);
      setTotalPoints(0);
      setTransactions([]);
      setMessage(`❌ Member ID "${inputCode}" tidak ditemukan.`);
      return;
    }

    setSelectedMember(foundMember);
    setMessage("");

    await loadMemberPoints(foundMember.member_code);
  };

  // =========================
  // LEVEL MEMBER
  // =========================
  const getLevel = () => {
    if (totalPoints >= 500) return "Gold";
    if (totalPoints >= 100) return "Silver";
    return "Bronze";
  };

  const level = getLevel();

  return (
    <main className="min-h-screen bg-[#fff8fb] px-4 py-10">

      {/* HEADER */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
          Member{" "}
          <span className="text-pink-600">
            Salad Buah Senja
          </span>
        </h1>

        <p className="text-slate-500 mt-2">
          Cek poin dan keuntungan member kamu 🍓
        </p>
      </div>

      <div className="max-w-2xl mx-auto">

        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-5">

          <h2 className="font-bold text-slate-800 mb-3">
            Cari Data Member
          </h2>

          <div className="flex flex-col md:flex-row gap-3">

            <input
              type="text"
              value={memberCode}
              onChange={(e) =>
                setMemberCode(e.target.value.toUpperCase())
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCheckMember();
                }
              }}
              placeholder="Masukkan Member ID"
              className="flex-1 border border-pink-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
            />

            <button
              onClick={handleCheckMember}
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-xl transition"
            >
              Cek Member
            </button>

          </div>

          {message && (
            <div className="mt-4 bg-red-50 text-red-600 rounded-xl px-4 py-3 text-center">
              {message}
            </div>
          )}

        </div>

        {/* MEMBER CARD */}
        {selectedMember && (
          <>
            <div className="bg-gradient-to-br from-pink-500 to-pink-700 rounded-2xl shadow-xl p-6 text-white mb-5">

              <div className="flex justify-between items-start">

                <div>
                  <p className="text-xs font-semibold opacity-80">
                    SALAD BUAH SENJA
                  </p>

                  <h2 className="text-2xl font-bold mt-2">
                    Member Card 🍓
                  </h2>
                </div>

                <div className="bg-white/20 px-4 py-2 rounded-full text-sm font-bold">
                  {level.toUpperCase()}
                </div>

              </div>

              <div className="mt-8">

                <p className="text-sm opacity-80">
                  Nama Member
                </p>

                <h3 className="text-xl font-bold">
                  {selectedMember.full_name}
                </h3>

                <p className="text-sm opacity-80 mt-4">
                  Member ID
                </p>

                <h3 className="text-xl font-bold">
                  {selectedMember.member_code}
                </h3>

                <p className="text-sm opacity-80 mt-4">
                  Total Point
                </p>

                <h3 className="text-3xl font-bold">
                  {totalPoints} POINT
                </h3>

              </div>

            </div>

            {/* INFO */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="bg-white rounded-2xl shadow p-5">
                <div className="text-2xl">⭐</div>

                <p className="text-sm text-slate-500 mt-3">
                  Total Point
                </p>

                <h3 className="text-xl font-bold text-pink-600">
                  {totalPoints}
                </h3>
              </div>

              <div className="bg-white rounded-2xl shadow p-5">
                <div className="text-2xl">🏆</div>

                <p className="text-sm text-slate-500 mt-3">
                  Level
                </p>

                <h3 className="text-xl font-bold text-pink-600">
                  {level}
                </h3>
              </div>

              <div className="bg-white rounded-2xl shadow p-5">
                <div className="text-2xl">🎁</div>

                <p className="text-sm text-slate-500 mt-3">
                  Reward
                </p>

                <h3 className="text-xl font-bold text-pink-600">
                  Segera hadir
                </h3>
              </div>

            </div>

            {/* RIWAYAT POINT */}
            <div className="bg-white rounded-2xl shadow-lg p-5 mt-6">

              <h2 className="font-bold text-slate-800 mb-4">
                📋 Riwayat Point
              </h2>

              {transactions.length === 0 ? (

                <p className="text-slate-500">
                  Belum ada transaksi point.
                </p>

              ) : (

                <div className="space-y-3">

                  {transactions.map((transaction) => (

                    <div
                      key={transaction.id}
                      className="flex justify-between items-center bg-slate-50 rounded-xl p-4"
                    >

                      <div>

                        <p className="font-semibold text-slate-800">

                          {transaction.transaction_type === "earn"
                            ? "➕ Point Masuk"
                            : "🎁 Point Ditukar"}

                        </p>

                        <p className="text-sm text-slate-500">
                          {new Date(
                            transaction.created_at
                          ).toLocaleString("id-ID")}
                        </p>

                      </div>

                      <div
                        className={`font-bold text-lg ${
                          transaction.transaction_type === "earn"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >

                        {transaction.transaction_type === "earn"
                          ? "+"
                          : "-"}

                        {transaction.points}

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>
          </>
        )}

        {/* LOADING */}
        {loading && (
          <div className="text-center text-slate-500 mt-6">
            Memuat data member...
          </div>
        )}

      </div>
    </main>
  );
}