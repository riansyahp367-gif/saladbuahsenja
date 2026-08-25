"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Member = {
  [key: string]: any;
};

type Transaction = {
  [key: string]: any;
};

export default function MemberDetailPage() {
  const params = useParams();
  const memberId = params?.id as string;

  const [member, setMember] = useState<Member | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!memberId) return;

    const loadData = async () => {
      setLoading(true);
      setErrorMessage("");

      // Ambil data member
      const { data: memberData, error: memberError } = await supabase
        .from("members")
        .select("*")
        .eq("id", memberId)
        .single();

      if (memberError) {
        console.log("ERROR MEMBER:", memberError);
        setErrorMessage(memberError.message);
        setLoading(false);
        return;
      }

      setMember(memberData);

      // Ambil riwayat transaksi member
      const memberCode =
        memberData.member_code ??
        memberData.member_id ??
        "";

      const { data: transactionData, error: transactionError } =
        await supabase
          .from("member_point_transactions")
          .select("*")
          .eq("member_code", memberCode)
          .order("created_at", { ascending: false });

      if (!transactionError) {
        setTransactions(transactionData || []);
      }

      setLoading(false);
    };

    loadData();
  }, [memberId]);

  const getName = () => {
    return (
      member?.full_name ??
      member?.name ??
      "Tanpa Nama"
    );
  };

  const getCode = () => {
    return (
      member?.member_code ??
      member?.member_id ??
      "-"
    );
  };

  const getPhone = () => {
    return (
      member?.whatsapp ??
      member?.phone ??
      member?.phone_number ??
      member?.no_whatsapp ??
      "-"
    );
  };

  const getPoints = () => {
    return Number(
      member?.points ??
      member?.point ??
      member?.total_points ??
      0
    );
  };

  const getLevel = () => {
    return member?.level ?? "Bronze";
  };

  const getTransactionPoints = (transaction: Transaction) => {
    return Number(
      transaction.points ??
      transaction.point ??
      0
    );
  };

  const getTransactionType = (transaction: Transaction) => {
    return (
      transaction.transaction_type ??
      transaction.type ??
      "-"
    );
  };

  const getDescription = (transaction: Transaction) => {
    return (
      transaction.description ??
      transaction.keterangan ??
      "-"
    );
  };

  const formatDate = (date: string) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-pink-50 p-6">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-12 text-center shadow-lg">
          <div className="text-5xl">⏳</div>

          <p className="mt-4 font-semibold text-slate-600">
            Memuat data member...
          </p>
        </div>
      </main>
    );
  }

  if (errorMessage || !member) {
    return (
      <main className="min-h-screen bg-pink-50 p-6">
        <div className="mx-auto max-w-5xl">

          <a
            href="/admin/members"
            className="text-sm font-semibold text-pink-600"
          >
            ← Kembali ke Data Member
          </a>

          <div className="mt-6 rounded-3xl bg-white p-12 text-center shadow-lg">
            <div className="text-5xl">❌</div>

            <h1 className="mt-4 text-xl font-extrabold">
              Member tidak ditemukan
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {errorMessage || "Data member tidak tersedia."}
            </p>
          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-pink-50 px-4 py-6 md:px-8">

      <div className="mx-auto max-w-5xl">

        {/* BACK */}
        <a
          href="/admin/members"
          className="font-semibold text-pink-600 hover:text-pink-700"
        >
          ← Kembali ke Data Member
        </a>

        {/* HEADER */}
        <div className="mt-4 rounded-3xl bg-white p-6 shadow-lg">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-pink-100 text-4xl">
                👤
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Detail Member
                </p>

                <h1 className="text-3xl font-extrabold text-slate-900">
                  {getName()}
                </h1>

                <p className="font-bold text-pink-600">
                  {getCode()}
                </p>
              </div>

            </div>

            <div className="rounded-2xl bg-pink-50 px-6 py-4 text-center">
              <p className="text-xs text-slate-500">
                Level Member
              </p>

              <p className="text-2xl font-extrabold text-pink-600">
                {getLevel()}
              </p>
            </div>

          </div>

        </div>

        {/* INFO MEMBER */}
        <div className="mt-5 grid gap-4 md:grid-cols-3">

          <div className="rounded-3xl bg-white p-5 shadow-md">
            <p className="text-sm text-slate-500">
              🆔 Member ID
            </p>

            <p className="mt-2 font-extrabold text-slate-900">
              {getCode()}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-md">
            <p className="text-sm text-slate-500">
              📱 WhatsApp
            </p>

            <p className="mt-2 font-extrabold text-slate-900">
              {getPhone()}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-md">
            <p className="text-sm text-slate-500">
              ⭐ Total Poin
            </p>

            <p className="mt-2 text-2xl font-extrabold text-pink-600">
              {getPoints()}
            </p>
          </div>

        </div>

        {/* RIWAYAT */}
        <div className="mt-6 rounded-3xl bg-white p-6 shadow-lg">

          <div className="mb-5">
            <h2 className="text-2xl font-extrabold text-slate-900">
              📜 Riwayat Poin
            </h2>

            <p className="text-sm text-slate-500">
              Seluruh aktivitas tambah dan tukar poin member.
            </p>
          </div>

          {transactions.length === 0 ? (
            <div className="rounded-2xl bg-pink-50 p-8 text-center">
              <div className="text-4xl">📭</div>

              <p className="mt-3 font-semibold text-slate-600">
                Belum ada riwayat transaksi.
              </p>
            </div>
          ) : (
            <div className="space-y-3">

              {transactions.map((transaction, index) => {

                const points =
                  getTransactionPoints(transaction);

                const type =
                  getTransactionType(transaction);

                const isRedeem =
                  type === "redeem" ||
                  points < 0;

                return (
                  <div
                    key={
                      transaction.id ??
                      index
                    }
                    className="rounded-2xl border border-pink-100 p-4"
                  >

                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                      <div>
                        <div className="flex items-center gap-2">

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                              isRedeem
                                ? "bg-red-100 text-red-600"
                                : "bg-green-100 text-green-600"
                            }`}
                          >
                            {isRedeem
                              ? "Tukar Poin"
                              : "Tambah Poin"}
                          </span>

                        </div>

                        <p className="mt-2 font-semibold text-slate-800">
                          {getDescription(transaction)}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {formatDate(
                            transaction.created_at
                          )}
                        </p>
                      </div>

                      <div
                        className={`text-xl font-extrabold ${
                          isRedeem
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {points > 0
                          ? `+${points}`
                          : points}
                      </div>

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