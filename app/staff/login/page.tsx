"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function StaffLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setErrorMessage("");

    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      setLoading(false);
      setErrorMessage("Email dan password wajib diisi.");
      return;
    }

    try {
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

      console.log("LOGIN DATA:", data);
      console.log("LOGIN ERROR:", error);

      if (error) {
        setErrorMessage(
          error.message || "Email atau password salah."
        );
        setLoading(false);
        return;
      }

      if (!data.user) {
        setErrorMessage("Login gagal. User tidak ditemukan.");
        setLoading(false);
        return;
      }

      // Login berhasil
      window.location.replace("/staff");

    } catch (err) {
      console.error("LOGIN EXCEPTION:", err);

      setErrorMessage(
        "Terjadi kesalahan saat login. Silakan coba lagi."
      );

      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-pink-50 px-6">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

        <div className="text-center">

          <div className="text-5xl">
            🔐
          </div>

          <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
            Login Kasir
          </h1>

          <p className="mt-2 text-gray-500">
            Masuk untuk mengelola poin member.
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >

          {/* EMAIL */}
          <div>

            <label className="mb-2 block font-semibold text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email"
              autoComplete="email"
              required
              disabled={loading}
              className="w-full rounded-2xl border border-pink-200 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200 disabled:bg-gray-100"
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="mb-2 block font-semibold text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              autoComplete="current-password"
              required
              disabled={loading}
              className="w-full rounded-2xl border border-pink-200 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200 disabled:bg-gray-100"
            />

          </div>

          {/* ERROR */}
          {errorMessage && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-center font-medium text-red-600">
              ❌ {errorMessage}
            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-pink-600 py-4 font-bold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Login Kasir"}
          </button>

        </form>

      </div>

    </main>
  );
}