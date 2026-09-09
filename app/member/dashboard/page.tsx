"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Member = {
  id: string;
  member_code: string;
  full_name: string;
  phone?: string | null;
  birth_date?: string | null;
};

type PointTransaction = {
  id: string;
  points: number;
  description: string | null;
  created_at: string;
};

export default function MemberDashboard() {
  const [memberCode, setMemberCode] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] =
    useState<Member | null>(null);

  const [transactions, setTransactions] = useState<
    PointTransaction[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [message, setMessage] = useState("");

  // =========================
  // AMBIL SEMUA MEMBER
  // =========================
  const loadMembers = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("members")
      .select("*")
      .order("member_code", { ascending: true });

    if (error) {
      console.error("ERROR MEMBER:", error);

      setMessage(
        `❌ Gagal membaca data member: ${error.message}`
      );

      setLoading(false);
      return;
    }

    console.log("DATA MEMBER:", data);

    setMembers(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadMembers();
  }, []);

  // =========================
  // AMBIL RIWAYAT POIN
  // =========================
  const loadTransactions = async (memberId: string) => {
    const { data, error } = await supabase
      .from("member_point_transactions")
      .select("*")
      .eq("member_id", memberId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("ERROR TRANSACTION:", error);
      setTransactions([]);
      return;
    }

    setTransactions(data || []);
  };

  // =========================
  // CEK MEMBER
  // =========================
  const handleCheckMember = async () => {
    const inputCode = memberCode
      .trim()
      .toUpperCase()
      .replace(/\s/g, "");

    if (!inputCode) {
      setSelectedMember(null);
      setTransactions([]);

      setMessage(
        "⚠️ Masukkan Member ID terlebih dahulu."
      );

      return;
    }

    setChecking(true);
    setMessage("");

    console.log("MENCARI MEMBER:", inputCode);
    console.log("DATA MEMBERS:", members);

    // Cari dari data yang sudah terbaca
    const foundMember = members.find((member) => {
      const databaseCode = String(member.member_code || "")
        .trim()
        .toUpperCase()
        .replace(/\s/g, "");

      return databaseCode === inputCode;
    });

    if (!foundMember) {
      setSelectedMember(null);
      setTransactions([]);

      setMessage(
        `❌ Member ID "${inputCode}" tidak ditemukan.`
      );

      setChecking(false);
      return;
    }

    console.log("MEMBER DITEMUKAN:", foundMember);

    setSelectedMember(foundMember);

    // Rapikan kode di input
    setMemberCode(foundMember.member_code);

    // Ambil riwayat poin
    await loadTransactions(foundMember.id);

    setChecking(false);
  };

  // =========================
  // HITUNG TOTAL POIN
  // =========================
  const totalPoints = transactions.reduce(
    (total, transaction) => {
      return total + Number(transaction.points || 0);
    },
    0
  );

  // =========================
  // TENTUKAN LEVEL
  // =========================
  const getLevel = (points: number) => {
    if (points >= 500) return "GOLD";
    if (points >= 100) return "SILVER";

    return "BRONZE";
  };

  const level = getLevel(totalPoints);

  // =========================
  // FORMAT TANGGAL
  // =========================
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-[#fff8fb] px-4 py-8 md:py-12">

      {/* ================= HEADER ================= */}

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

        {/* ================= FORM CARI ================= */}

        <div className="bg-white rounded-2xl shadow-lg p-5 mb-5">

          <h2 className="font-bold text-slate-800 mb-3">
            Cari Data Member
          </h2>

          <div className="flex flex-col sm:flex-row gap-3">

            <input
              type="text"
              value={memberCode}
              onChange={(e) => {
                setMemberCode(
                  e.target.value.toUpperCase()
                );
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCheckMember();
                }
              }}
              placeholder="Contoh: SBS00002"
              className="flex-1 border border-pink-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
            />

            <button
              onClick={handleCheckMember}
              disabled={checking}
              className="bg-pink-600 hover:bg-pink-700 disabled:bg-pink-400 text-white font-semibold px-6 py-3 rounded-xl transition"
            >
              {checking
                ? "Mengecek..."
                : "Cek Member"}
            </button>

          </div>

          {/* PESAN */}

          {message && (
            <div
              className={`mt-4 rounded-xl px-4 py-3 text-center ${
                message.includes("❌")
                  ? "bg-red-50 text-red-600"
                  : "bg-yellow-50 text-yellow-700"
              }`}
            >
              {message}
            </div>
          )}

        </div>

        {/* ================= MEMBER CARD ================= */}

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
                  {level}
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

                <h3 className="text-xl font-bold tracking-wide">
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

            {/* ================= INFO CARD ================= */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">

              <div className="bg-white rounded-2xl shadow p-5">

                <div className="text-2xl">
                  ⭐
                </div>

                <p className="text-sm text-slate-500 mt-3">
                  Total Point
                </p>

                <h3 className="text-xl font-bold text-pink-600">
                  {totalPoints}
                </h3>

              </div>

              <div className="bg-white rounded-2xl shadow p-5">

                <div className="text-2xl">
                  🏆
                </div>

                <p className="text-sm text-slate-500 mt-3">
                  Level
                </p>

                <h3 className="text-xl font-bold text-pink-600">
                  {level}
                </h3>

              </div>

              <div className="bg-white rounded-2xl shadow p-5">

                <div className="text-2xl">
                  🎁
                </div>

                <p className="text-sm text-slate-500 mt-3">
                  Reward
                </p>

                <h3 className="text-xl font-bold text-pink-600">
                  Segera hadir
                </h3>

              </div>

            </div>

            {/* ================= RIWAYAT POIN ================= */}

            <div className="bg-white rounded-2xl shadow-lg p-5 mb-6">

              <h2 className="font-bold text-slate-800 mb-4">
                📜 Riwayat Point
              </h2>

              {transactions.length === 0 ? (

                <div className="text-center text-slate-500 py-6">
                  Belum ada riwayat point.
                </div>

              ) : (

                <div className="space-y-3">

                  {transactions.map((transaction) => (

                    <div
                      key={transaction.id}
                      className="border border-slate-200 rounded-xl p-4 flex justify-between items-center"
                    >

                      <div>

                        <h3 className="font-bold text-slate-800">
                          ✚ Tambah Point
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          {transaction.description ||
                            "Transaksi point member"}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          {formatDate(
                            transaction.created_at
                          )}
                        </p>

                      </div>

                      <div className="font-bold text-green-600">
                        +{transaction.points}
                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>
          </>
        )}

        {/* ================= LOADING ================= */}

        {loading && (

          <div className="text-center text-slate-500 mt-6">
            Memuat data member...
          </div>

        )}

        {/* ================= LIST MEMBER ================= */}

        {!loading && members.length > 0 && (

          <div className="bg-white rounded-2xl shadow-lg p-5 mt-6">

            <h2 className="font-bold text-slate-800 mb-4">
              🔎 Data Member yang Dibaca Website
            </h2>

            <div className="space-y-2">

              {members.map((member) => (

                <button
                  key={member.id}
                  onClick={async () => {

                    setMemberCode(member.member_code);

                    setSelectedMember(member);

                    setMessage("");

                    await loadTransactions(member.id);
                  }}
                  className="w-full text-left bg-slate-50 hover:bg-pink-50 rounded-lg px-4 py-3 transition"
                >

                  <span className="font-bold text-slate-800">
                    {member.member_code}
                  </span>

                  <span className="text-slate-600">
                    {" "}— {member.full_name}
                  </span>

                </button>

              ))}

            </div>

          </div>

        )}

      </div>

    </main>
  );
}