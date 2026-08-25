"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

type Member = {
  id: string;
  member_code: string;
  full_name: string;
  whatsapp: string;
  points: number;
  level: string;
};

type Transaction = {
  id: string;
  member_code: string;
  full_name: string;
  transaction_type: string;
  points: number;
  description: string;
  created_at: string;
};

export default function MemberDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [member, setMember] = useState<Member | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadMember();
    }
  }, [id]);

  async function loadMember() {
    setLoading(true);

    const { data: memberData, error: memberError } = await supabase
      .from("members")
      .select("*")
      .eq("id", id)
      .single();

    if (memberError) {
      console.error("Gagal mengambil member:", memberError);
      setMember(null);
      setLoading(false);
      return;
    }

    setMember(memberData as Member);

    const { data: transactionData, error: transactionError } =
      await supabase
        .from("member_point_transactions")
        .select(
          "id, member_code, full_name, transaction_type, points, description, created_at"
        )
        .eq("member_code", memberData.member_code)
        .order("created_at", { ascending: false });

    if (transactionError) {
      console.error("Gagal mengambil transaksi:", transactionError);
      setTransactions([]);
    } else {
      setTransactions((transactionData || []) as Transaction[]);
    }

    setLoading(false);
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const totalEarn = transactions
    .filter((item) => item.transaction_type === "earn")
    .reduce((total, item) => total + Math.abs(Number(item.points || 0)), 0);

  const totalRedeem = transactions
    .filter((item) => item.transaction_type === "redeem")
    .reduce((total, item) => total + Math.abs(Number(item.points || 0)), 0);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-pink-50">
        <p className="font-semibold text-slate-600">
          Memuat detail member...
        </p>
      </main>
    );
  }

  if (!member) {
    return (
      <main className="min-h-screen bg-pink-50 px-5 py-8">
        <div className="mx-auto max-w-5xl">

          <a
            href="/admin/members"
            className="font-semibold text-pink-600"
          >
            ← Kembali ke Data Member
          </a>

          <div className="mt-6 rounded-3xl bg-white p-12 text-center shadow-lg">

            <div className="text-5xl">
              📭
            </div>

            <h1 className="mt-4 text-xl font-extrabold text-slate-900">
              Member tidak ditemukan
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Data member yang dicari tidak tersedia.
            </p>

          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-pink-50 px-4 py-5 md:px-8">

      <div className="mx-auto max-w-6xl">

        {/* BACK */}
        <a
          href="/admin/members"
          className="text-sm font-semibold text-pink-600 hover:text-pink-700"
        >
          ← Kembali ke Data Member
        </a>

        {/* HEADER */}
        <div className="mt-5 rounded-3xl bg-white p-6 shadow-lg">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-5">

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-pink-100 text-4xl">
                👤
              </div>

              <div>
                <h1 className="text-3xl font-extrabold text-slate-950">
                  {member.full_name}
                </h1>

                <p className="mt-1 font-bold text-pink-600">
                  {member.member_code}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  📱 {member.whatsapp}
                </p>
              </div>

            </div>

            <div className="rounded-2xl bg-pink-50 px-6 py-4 text-center">

              <p className="text-xs text-slate-500">
                Level Member
              </p>

              <p className="mt-1 text-xl font-extrabold text-pink-600">
                {member.level || "Bronze"}
              </p>

            </div>

          </div>

        </div>

        {/* STATISTICS */}
        <div className="mt-5 grid gap-4 md:grid-cols-3">

          <div className="rounded-3xl bg-white p-6 shadow-lg">

            <div className="text-3xl">
              ⭐
            </div>

            <p className="mt-3 text-sm text-slate-500">
              Poin Saat Ini
            </p>

            <p className="mt-1 text-3xl font-extrabold text-pink-600">
              {member.points ?? 0}
            </p>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">

            <div className="text-3xl">
              💰
            </div>

            <p className="mt-3 text-sm text-slate-500">
              Total Poin Ditambahkan
            </p>

            <p className="mt-1 text-3xl font-extrabold text-green-600">
              +{totalEarn}
            </p>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">

            <div className="text-3xl">
              🎁
            </div>

            <p className="mt-3 text-sm text-slate-500">
              Total Poin Ditukar
            </p>

            <p className="mt-1 text-3xl font-extrabold text-red-600">
              -{totalRedeem}
            </p>

          </div>

        </div>

        {/* MEMBER INFO */}
        <div className="mt-5 rounded-3xl bg-white p-6 shadow-lg">

          <h2 className="text-xl font-extrabold text-slate-950">
            👤 Informasi Member
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">

            <div className="rounded-2xl bg-pink-50 p-4">
              <p className="text-xs text-slate-500">
                Nama Lengkap
              </p>

              <p className="mt-1 font-bold text-slate-900">
                {member.full_name}
              </p>
            </div>

            <div className="rounded-2xl bg-pink-50 p-4">
              <p className="text-xs text-slate-500">
                Member ID
              </p>

              <p className="mt-1 font-bold text-pink-600">
                {member.member_code}
              </p>
            </div>

            <div className="rounded-2xl bg-pink-50 p-4">
              <p className="text-xs text-slate-500">
                Nomor WhatsApp
              </p>

              <p className="mt-1 font-bold text-slate-900">
                {member.whatsapp}
              </p>
            </div>

            <div className="rounded-2xl bg-pink-50 p-4">
              <p className="text-xs text-slate-500">
                Level
              </p>

              <p className="mt-1 font-bold text-pink-600">
                {member.level || "Bronze"}
              </p>
            </div>

          </div>

        </div>

        {/* HISTORY */}
        <div className="mt-5 rounded-3xl bg-white p-6 shadow-lg">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-xl font-extrabold text-slate-950">
                📋 Riwayat Transaksi
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Seluruh aktivitas poin member.
              </p>
            </div>

            <button
              onClick={loadMember}
              className="rounded-2xl bg-pink-600 px-5 py-3 text-sm font-bold text-white hover:bg-pink-700"
            >
              🔄 Refresh
            </button>

          </div>

          {transactions.length === 0 ? (
            <div className="mt-5 rounded-2xl bg-pink-50 p-10 text-center">

              <div className="text-4xl">
                📭
              </div>

              <p className="mt-3 font-bold text-slate-800">
                Belum ada transaksi
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Member ini belum memiliki aktivitas poin.
              </p>

            </div>
          ) : (
            <div className="mt-5 overflow-x-auto">

              <table className="w-full min-w-[750px]">

                <thead>
                  <tr className="border-b border-pink-100 text-left text-sm">

                    <th className="px-4 py-4 font-bold">
                      Tanggal
                    </th>

                    <th className="px-4 py-4 font-bold">
                      Aktivitas
                    </th>

                    <th className="px-4 py-4 font-bold">
                      Poin
                    </th>

                    <th className="px-4 py-4 font-bold">
                      Keterangan
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {transactions.map((item) => {

                    const isRedeem =
                      item.transaction_type === "redeem";

                    return (
                      <tr
                        key={item.id}
                        className="border-b border-slate-100 last:border-0"
                      >

                        <td className="px-4 py-4 text-sm text-slate-500">
                          {formatDate(item.created_at)}
                        </td>

                        <td className="px-4 py-4">

                          {isRedeem ? (
                            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
                              Tukar Poin
                            </span>
                          ) : (
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-600">
                              Tambah Poin
                            </span>
                          )}

                        </td>

                        <td className="px-4 py-4">

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

                        <td className="px-4 py-4 text-sm text-slate-600">
                          {item.description}
                        </td>

                      </tr>
                    );

                  })}

                </tbody>

              </table>

            </div>
          )}

          <div className="mt-5 text-center text-xs text-slate-500">
            {transactions.length} transaksi tercatat untuk member ini.
          </div>

        </div>

      </div>

    </main>
  );
}