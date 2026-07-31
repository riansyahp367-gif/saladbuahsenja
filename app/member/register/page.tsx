"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterMemberPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    // Membuat Member Code otomatis
    const { data: memberCode, error: codeError } = await supabase.rpc(
      "generate_member_code"
    );

    if (codeError) {
      setLoading(false);
      alert(`Gagal membuat Member ID:\n${codeError.message}`);
      return;
    }

    // Simpan data member
    const { error } = await supabase.from("members").insert([
      {
        member_code: memberCode,
        full_name: fullName,
        phone: phone,
        birth_date: birthDate,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      alert(`Gagal menyimpan data:\n${error.message}`);
      return;
    }

    alert(
      `🎉 Pendaftaran berhasil!\n\nMember ID Anda:\n${memberCode}`
    );

    setFullName("");
    setPhone("");
    setBirthDate("");
  };

  return (
    <main className="min-h-screen bg-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">

        <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">
          Daftar Member
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-1 font-medium">
              Nama Lengkap
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border rounded-lg p-3"
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Nomor WhatsApp
            </label>

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg p-3"
              placeholder="08xxxxxxxxxx"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Tanggal Lahir
            </label>

            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 text-white rounded-lg py-3 font-semibold hover:bg-pink-700 transition disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Daftar Member"}
          </button>

        </form>

      </div>
    </main>
  );
}