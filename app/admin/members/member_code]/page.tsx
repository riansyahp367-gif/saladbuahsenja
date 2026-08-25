"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Member = {
  id?: string;
  member_code?: string;
  full_name?: string;
  phone?: string;
  whatsapp?: string;
};

type Transaction = {
  id?: string;
  transaction_type?: string;
  points?: number;
  description?: string;
  created_at?: string;
};

export default function AdminMemberDetailPage() {
  const params = useParams();
  const memberCode = params.member_code as string;

  const [member, setMember] = useState<Member | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadData = async () => {
    setLoading(true);
    setErrorMessage("");

    // Ambil data member
    const { data: memberData, error: memberError } =
      await supabase
        .from("members")
        .select("*")
        .eq("member_code", memberCode)
        .single();

    if (memberError) {
      console.error(memberError);
      setErrorMessage("Data member tidak ditemukan.");
      setLoading(false);
      return;
    }

    setMember(memberData as Member);

    // Ambil riwayat transaksi poin
    const { data: transactionData, error: transactionError } =
      await supabase
        .from("member_point_transactions")
        .select(
          "id, transaction_type, points, description, created_at"
        )
        .eq("member_code", memberCode)
        .order("created_at", { ascending: false });

    if (transactionError) {
      console.error(transactionError);
      setErrorMessage("Gagal mengambil riwayat poin.");
      setLoading(false);
      return;
    }

    setTransactions(transactionData || []);
    setLoading(false);
  };

  useEffect(() => {
    if (memberCode) {
      loadData();
    }
  }, [memberCode]);

  const totalPoints = transactions.reduce(
    (total, transaction) =>
      total + Number(transaction.points || 0),
    0
  );

  const getLevel = (points: number) => {
    if (points >= 500) return "Gold";
    if (points >= 250) return "Silver";
    return "Bronze";
  };

  const formatDate = (date?: string) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("id-ID", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-pink-50 px-4 py-8">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 text-center shadow-lg">
          <div className="text-4xl">⏳</div>

          <p className="mt-3 font-semibold text-slate-700">
            Memuat data member...
          </p>
        </div>
      </main>
    );
  }

  if (errorMessage || !member) {
    return (
      <main className="min-h-screen bg-pink-50 px-4 py-8">
        <div className="mx-auto max-w-5xl">

          <Link
            href="/admin/members"
            className="text-sm font-medium text-pink-600"
          >
            ← Kembali ke Data Member
          </Link>

          <div className="mt-6 rounded-3xl bg-white p-10 text-center shadow-lg">
            <div className="text-5xl">📭</div>

            <h1 className="mt-4 text-xl font-bold text-slate-900">
              Member tidak ditemukan
            </h1>

            <p className="mt-2 text-sm text-red-500">
              {errorMessage}
            </p>
          </div>

        </div>
      </main>
    );
  }

  const phone = member.phone || member.whatsapp || "-";

  return (
    <main className="min-h-screen bg-pink-50 px-4 py-6 md:px-8">

      <div className="mx-auto max-w-5xl">

        {/* BACK */}
        <Link
          href="/admin/members"
          className="text-sm font-medium text-pink-600 hover:text-pink-700"
        >
          ← Kembali ke Data Member
        </Link>

        {/* HEADER */}
        <div className="mt-5">

          <h1 className="text-3xl font-extrabold text-slate-950">
            👤 Detail Member
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Informasi member dan riwayat aktivitas poin.
          </p>

        </div>

        {/* MEMBER CARD */}
        <div className="mt-6 rounded-3xl bg-white p-6 shadow-lg">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-100 text-3xl">
                👤
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-slate-950">
                  {member.full_name || "Tanpa Nama"}
                </h2>

                <p className="font-semibold text-pink-600">
                  {member.member_code || "-"}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  📱 {phone}
                </p>
              </div>

            </div>

            <button
              onClick={loadData}
              className="rounded-xl bg-pink-600 px-5 py-3 text-sm font-bold text-white hover:bg-pink-700"
            >
              🔄 Refresh
            </button>

          </div>

        </div>

        {/* POINT SUMMARY */}
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">

          <div className="rounded-3xl bg-white p-6 text-center shadow-lg">
            <p className="text-sm text-slate-500">
              Total Poin
            </p>

            <p className="mt-2 text-3xl font-extrabold text-pink-600">
              {totalPoints}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 text-center shadow-lg">
            <p className="text-sm text-slate-500">
              Level Member
            </p>

            <p className="mt-2 text-2xl font-extrabold text-pink-600">
              {getLevel(totalPoints)}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 text-center shadow-lg">
            <p className="text-sm text-slate-500">
              Total Aktivitas
            </p>

            <p className="mt-2 text-3xl font-extrabold text-pink-600">
              {transactions.length}
            </p>
          </div>

        </div>

        {/* HISTORY */}
        <div className="mt-6 rounded-3xl bg-white p-5 shadow-lg">

          <div className="mb-5">
            <h2 className="text-xl font-extrabold text-slate-950">
              📋 Riwayat Poin
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Seluruh aktivitas penambahan dan penukaran poin.
            </p>
          </div>

          {transactions.length === 0 ? (

            <div className="rounded-2xl bg-pink-50 p-8 text-center">
              <div className="text-4xl">📭</div>

              <p className="mt-3 font-semibold text-slate-700">
                Belum ada riwayat poin.
              </p>
            </div>

          ) : (

            <div className="space-y-3">

              {transactions.map((transaction, index) => {

                const points = Number(transaction.points || 0);

                const isRedeem =
                  transaction.transaction_type === "redeem";

                return (
                  <div
                    key={transaction.id || index}
                    className="flex flex-col gap-3 rounded-2xl bg-pink-50 p-4 md:flex-row md:items-center md:justify-between"
                  >

                    <div className="flex items-center gap-3">

                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                          isRedeem
                            ? "bg-red-100"
                            : "bg-green-100"
                        }`}
                      >
                        {isRedeem ? "🎁" : "⭐"}
                      </div>

                      <div>
                        <p className="font-bold text-slate-900">
                          {isRedeem
                            ? "Tukar Poin"
                            : "Tambah Poin"}
                        </p>

                        <p className="text-xs text-slate-500">
                          {formatDate(transaction.created_at)}
                        </p>

                        <p className="mt-1 text-xs text-slate-600">
                          {transaction.description || "-"}
                        </p>
                      </div>

                    </div>

                    <div
                      className={`text-lg font-extrabold ${
                        points < 0
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {points > 0 ? "+" : ""}
                      {points}
                    </div>

                  </div>
                );
              })}

            </div>

          )}

        </div>

      </div>

    </main>
  );
}