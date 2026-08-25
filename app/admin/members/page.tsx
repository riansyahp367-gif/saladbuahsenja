"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type Member = {
  id: string;
  member_code: string;
  full_name: string;
  phone: string | null;
  points: number;
};

type FormData = {
  full_name: string;
  phone: string;
};

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  const [form, setForm] = useState<FormData>({
    full_name: "",
    phone: "",
  });

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  // =========================
  // LOAD MEMBER
  // =========================
  async function loadMembers() {
    setLoading(true);

    const { data, error } = await supabase
      .from("members")
      .select("id, member_code, full_name, phone, points")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gagal mengambil member:", error);
      setMembers([]);
    } else {
      setMembers((data || []) as Member[]);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadMembers();
  }, []);

  // =========================
  // FILTER SEARCH
  // =========================
  const filteredMembers = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) return members;

    return members.filter((member) => {
      return (
        member.member_code?.toLowerCase().includes(keyword) ||
        member.full_name?.toLowerCase().includes(keyword) ||
        member.phone?.toLowerCase().includes(keyword)
      );
    });
  }, [members, search]);

  // =========================
  // LEVEL
  // =========================
  function getLevel(points: number) {
    if (points >= 500) return "Gold";
    if (points >= 250) return "Silver";
    return "Bronze";
  }

  // =========================
  // OPEN ADD
  // =========================
  function openAddModal() {
    setEditingMember(null);

    setForm({
      full_name: "",
      phone: "",
    });

    setShowModal(true);
  }

  // =========================
  // OPEN EDIT
  // =========================
  function openEditModal(member: Member) {
    setEditingMember(member);

    setForm({
      full_name: member.full_name,
      phone: member.phone || "",
    });

    setShowModal(true);
  }

  // =========================
  // CLOSE MODAL
  // =========================
  function closeModal() {
    if (saving) return;

    setShowModal(false);
    setEditingMember(null);

    setForm({
      full_name: "",
      phone: "",
    });
  }

  // =========================
  // GENERATE MEMBER CODE
  // =========================
  async function generateMemberCode() {
    const { data, error } = await supabase
      .from("members")
      .select("member_code")
      .order("member_code", { ascending: false })
      .limit(1);

    if (error) {
      throw new Error(error.message);
    }

    let nextNumber = 1;

    if (data && data.length > 0 && data[0].member_code) {
      const lastCode = data[0].member_code;

      const number = parseInt(
        lastCode.replace(/\D/g, ""),
        10
      );

      if (!isNaN(number)) {
        nextNumber = number + 1;
      }
    }

    return `SBS${String(nextNumber).padStart(6, "0")}`;
  }

  // =========================
  // SAVE MEMBER
  // =========================
  async function handleSave() {
    if (!form.full_name.trim()) {
      alert("Nama member wajib diisi.");
      return;
    }

    setSaving(true);

    try {
      // EDIT
      if (editingMember) {
        const { error } = await supabase
          .from("members")
          .update({
            full_name: form.full_name.trim(),
            phone: form.phone.trim(),
          })
          .eq("id", editingMember.id);

        if (error) {
          throw new Error(error.message);
        }

        alert("Data member berhasil diperbarui.");
      }

      // TAMBAH
      else {
        const memberCode = await generateMemberCode();

        const { error } = await supabase
          .from("members")
          .insert({
            member_code: memberCode,
            full_name: form.full_name.trim(),
            phone: form.phone.trim(),
            points: 0,
          });

        if (error) {
          throw new Error(error.message);
        }

        alert(`Member berhasil ditambahkan.\nID Member: ${memberCode}`);
      }

      closeModal();
      await loadMembers();
    } catch (error: any) {
      console.error("Gagal menyimpan member:", error);

      alert(
        `Gagal menyimpan member:\n${
          error?.message || "Terjadi kesalahan."
        }`
      );
    } finally {
      setSaving(false);
    }
  }

  // =========================
  // DELETE MEMBER
  // =========================
  async function handleDelete(member: Member) {
    const confirmed = confirm(
      `Hapus member "${member.full_name}"?\n\n` +
        `ID: ${member.member_code}\n` +
        `Poin: ${member.points}\n\n` +
        `Data yang sudah dihapus tidak dapat dikembalikan.`
    );

    if (!confirmed) return;

    setDeleting(member.id);

    try {
      const { error } = await supabase
        .from("members")
        .delete()
        .eq("id", member.id);

      if (error) {
        throw new Error(error.message);
      }

      alert("Member berhasil dihapus.");

      await loadMembers();
    } catch (error: any) {
      console.error("Gagal menghapus member:", error);

      alert(
        `Gagal menghapus member:\n${
          error?.message || "Terjadi kesalahan."
        }`
      );
    } finally {
      setDeleting(null);
    }
  }

  return (
    <main className="min-h-screen bg-pink-50 px-4 py-5 md:px-6">

      {/* ================= HEADER ================= */}
      <div className="mx-auto max-w-7xl">

        <div className="flex items-start justify-between gap-4">

          <div>
            <a
              href="/admin"
              className="text-sm font-semibold text-pink-600 hover:text-pink-700"
            >
              ← Kembali ke Dashboard
            </a>

            <div className="mt-5 flex items-center gap-3">
              <div className="text-3xl">
                👥
              </div>

              <div>
                <h1 className="text-3xl font-extrabold text-slate-950">
                  Data Member
                </h1>

                <p className="text-sm text-slate-500">
                  Kelola seluruh data member Salad Buah Senja.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">

            {/* TOTAL */}
            <div className="rounded-2xl bg-white px-6 py-4 shadow-sm">
              <p className="text-xs text-slate-500">
                Total Member
              </p>

              <p className="mt-1 text-2xl font-extrabold text-pink-600">
                {members.length}
              </p>
            </div>

            {/* TAMBAH */}
            <button
              type="button"
              onClick={openAddModal}
              className="rounded-2xl bg-pink-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-pink-700"
            >
              ＋ Tambah Member
            </button>

          </div>

        </div>

        {/* ================= SEARCH ================= */}
        <section className="mt-6 rounded-3xl bg-white p-5 shadow-lg">

          <label className="text-sm font-semibold text-slate-800">
            🔎 Cari Member
          </label>

          <div className="mt-3 flex gap-3">

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari Member ID, nama, atau nomor WhatsApp..."
              className="flex-1 rounded-2xl border border-pink-200 px-4 py-3 text-sm outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
            />

            <button
              type="button"
              onClick={loadMembers}
              className="rounded-2xl bg-pink-600 px-6 py-3 text-sm font-bold text-white hover:bg-pink-700"
            >
              🔄 Refresh
            </button>

          </div>

        </section>

        {/* ================= MEMBER LIST ================= */}
        <section className="mt-5">

          {loading ? (
            <div className="rounded-3xl bg-white p-12 text-center shadow-lg">
              <p className="font-semibold text-slate-500">
                Memuat data member...
              </p>
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="rounded-3xl bg-white p-14 text-center shadow-lg">

              <div className="text-5xl">
                📭
              </div>

              <h2 className="mt-4 text-xl font-bold text-slate-900">
                Member tidak ditemukan
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Coba gunakan kata pencarian lain.
              </p>

            </div>
          ) : (
            <div className="space-y-4">

              {filteredMembers.map((member) => {

                const level = getLevel(Number(member.points || 0));

                return (
                  <div
                    key={member.id}
                    className="rounded-3xl bg-white p-5 shadow-lg transition hover:-translate-y-0.5"
                  >

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

                      {/* MEMBER INFO */}
                      <div className="flex min-w-0 flex-1 items-center gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-100 text-2xl">
                          👤
                        </div>

                        <div className="min-w-0">

                          <h3 className="truncate text-lg font-extrabold text-slate-900">
                            {member.full_name}
                          </h3>

                          <p className="text-sm font-bold text-pink-600">
                            {member.member_code}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            📱 {member.phone || "-"}
                          </p>

                        </div>

                      </div>

                      {/* POINT */}
                      <div className="rounded-2xl bg-pink-50 px-8 py-4 text-center lg:min-w-[100px]">

                        <p className="text-xs text-slate-500">
                          Poin
                        </p>

                        <p className="mt-1 text-xl font-extrabold text-pink-600">
                          {member.points || 0}
                        </p>

                      </div>

                      {/* LEVEL */}
                      <div className="rounded-2xl bg-pink-50 px-8 py-4 text-center lg:min-w-[100px]">

                        <p className="text-xs text-slate-500">
                          Level
                        </p>

                        <p className="mt-1 text-sm font-extrabold text-pink-600">
                          {level}
                        </p>

                      </div>

                      {/* EDIT */}
                      <button
                        type="button"
                        onClick={() => openEditModal(member)}
                        className="rounded-2xl bg-blue-50 px-6 py-4 text-sm font-bold text-blue-600 transition hover:bg-blue-100"
                      >
                        ✏️ Edit
                      </button>

                      {/* DELETE */}
                      <button
                        type="button"
                        disabled={deleting === member.id}
                        onClick={() => handleDelete(member)}
                        className="rounded-2xl bg-red-50 px-6 py-4 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deleting === member.id
                          ? "Menghapus..."
                          : "🗑️ Hapus"}
                      </button>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </section>

        {/* FOOTER */}
        {!loading && filteredMembers.length > 0 && (
          <div className="mt-4 rounded-2xl border border-pink-200 bg-white px-5 py-3 text-center text-xs text-slate-500">
            Menampilkan {filteredMembers.length} dari{" "}
            {members.length} member.
          </div>
        )}

      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">

          <div className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl">

            {/* MODAL HEADER */}
            <div className="flex items-start justify-between">

              <div>
                <h2 className="text-2xl font-extrabold text-slate-950">
                  {editingMember
                    ? "✏️ Edit Member"
                    : "👤 Tambah Member"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingMember
                    ? "Perbarui data member."
                    : "Tambahkan member baru ke sistem."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="text-xl text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>

            </div>

            {/* FORM */}
            <div className="mt-6 space-y-4">

              {/* NAMA */}
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Nama Lengkap
                </label>

                <input
                  type="text"
                  value={form.full_name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      full_name: e.target.value,
                    })
                  }
                  placeholder="Masukkan nama lengkap..."
                  className="mt-2 w-full rounded-2xl border border-pink-200 px-4 py-3 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Nomor WhatsApp
                </label>

                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value,
                    })
                  }
                  placeholder="Contoh: 081314720307"
                  className="mt-2 w-full rounded-2xl border border-pink-200 px-4 py-3 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                />
              </div>

              {/* INFO */}
              {!editingMember && (
                <div className="rounded-2xl bg-pink-50 p-4 text-sm text-slate-600">
                  <p className="font-bold text-slate-900">
                    💡 Informasi
                  </p>

                  <p className="mt-1">
                    ID Member akan dibuat otomatis dan poin awal
                    adalah <b>0 poin</b>.
                  </p>
                </div>
              )}

              {editingMember && (
                <div className="rounded-2xl bg-pink-50 p-4 text-sm">

                  <div className="flex justify-between">
                    <span className="text-slate-500">
                      Member ID
                    </span>

                    <span className="font-bold text-pink-600">
                      {editingMember.member_code}
                    </span>
                  </div>

                  <div className="mt-2 flex justify-between">
                    <span className="text-slate-500">
                      Poin
                    </span>

                    <span className="font-bold text-pink-600">
                      {editingMember.points}
                    </span>
                  </div>

                </div>
              )}

            </div>

            {/* BUTTON */}
            <div className="mt-7 flex gap-3">

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="flex-1 rounded-2xl border border-slate-200 px-5 py-3 font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex-1 rounded-2xl bg-pink-600 px-5 py-3 font-bold text-white hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "Menyimpan..."
                  : editingMember
                  ? "💾 Simpan Perubahan"
                  : "＋ Tambah Member"}
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}