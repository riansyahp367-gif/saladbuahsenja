"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Member = {
  member_code: string;
  full_name: string;
  phone: string;
  birth_date: string | null;
  points: number;
  level: string;
};

export default function StaffMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadMembers = async () => {
    setLoading(true);
    setErrorMessage("");

    const { data, error } = await supabase
      .from("members")
      .select(
        "member_code, full_name, phone, birth_date, points, level"
      )
      .order("created_at", { ascending: false });

    setLoading(false);

    if (error) {
      console.error(error);
      setErrorMessage("Gagal mengambil data member.");
      return;
    }

    setMembers(data ?? []);
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const filteredMembers = members.filter((member) => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) return true;

    return (
      member.member_code.toLowerCase().includes(keyword) ||
      member.full_name.toLowerCase().includes(keyword) ||
      member.phone.toLowerCase().includes(keyword)
    );
  });

  return (
    <main className="min-h-screen bg-pink-50 px-6 py-10">

      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-8">

          <a
            href="/staff"
            className="text-sm font-semibold text-pink-600 hover:underline"
          >
            ← Kembali ke Dashboard
          </a>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <h1 className="text-4xl font-extrabold text-gray-900">
                👥 Data Member
              </h1>

              <p className="mt-2 text-gray-500">
                Kelola dan lihat data member Salad Buah Senja.
              </p>
            </div>

            <div className="rounded-2xl bg-white px-5 py-3 shadow-sm">
              <span className="text-sm text-gray-500">
                Total Member
              </span>

              <p className="text-2xl font-extrabold text-pink-600">
                {members.length}
              </p>
            </div>

          </div>

        </div>

        {/* SEARCH */}
        <div className="rounded-3xl bg-white p-6 shadow-xl">

          <label className="mb-2 block font-semibold text-gray-700">
            Cari Member
          </label>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari Member ID, nama, atau nomor WhatsApp..."
            className="w-full rounded-2xl border border-pink-200 px-5 py-4 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
          />

        </div>

        {/* ERROR */}
        {errorMessage && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-center font-medium text-red-600">
            ❌ {errorMessage}
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="mt-8 rounded-3xl bg-white p-10 text-center shadow-xl">
            <p className="font-semibold text-gray-600">
              Memuat data member...
            </p>
          </div>
        )}

        {/* EMPTY */}
        {!loading && filteredMembers.length === 0 && (
          <div className="mt-8 rounded-3xl bg-white p-10 text-center shadow-xl">
            <div className="text-5xl">🔍</div>

            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Member tidak ditemukan
            </h2>

            <p className="mt-2 text-gray-500">
              Coba gunakan Member ID, nama, atau nomor WhatsApp yang lain.
            </p>
          </div>
        )}

        {/* MEMBER CARDS */}
        {!loading && filteredMembers.length > 0 && (
          <div className="mt-8 grid gap-5">

            {filteredMembers.map((member) => (
              <div
                key={member.member_code}
                className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                  {/* IDENTITAS */}
                  <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-pink-100 text-2xl">
                      👤
                    </div>

                    <div>

                      <h2 className="text-xl font-extrabold text-gray-900">
                        {member.full_name}
                      </h2>

                      <p className="font-semibold text-pink-600">
                        {member.member_code}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        📱 {member.phone}
                      </p>

                    </div>

                  </div>

                  {/* POINT & LEVEL */}
                  <div className="grid grid-cols-2 gap-3 sm:min-w-[320px]">

                    <div className="rounded-2xl bg-pink-50 p-4 text-center">

                      <p className="text-sm text-gray-500">
                        Poin
                      </p>

                      <p className="mt-1 text-2xl font-extrabold text-pink-600">
                        {member.points ?? 0}
                      </p>

                    </div>

                    <div className="rounded-2xl bg-pink-50 p-4 text-center">

                      <p className="text-sm text-gray-500">
                        Level
                      </p>

                      <p className="mt-1 text-xl font-extrabold text-pink-600">
                        {member.level ?? "Bronze"}
                      </p>

                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </main>
  );
}