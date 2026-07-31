import { Gift, Star, Trophy, Crown, ArrowRight } from "lucide-react";
import Link from "next/link";

const rewards = [
  {
    icon: Gift,
    point: "100 Point",
    reward: "Diskon Rp10.000",
    color: "bg-pink-100 text-pink-600",
  },
  {
    icon: Star,
    point: "250 Point",
    reward: "Upgrade Ukuran Gratis",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: Trophy,
    point: "500 Point",
    reward: "Gratis Salad 200 ml",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Crown,
    point: "1000 Point",
    reward: "Voucher Rp100.000",
    color: "bg-purple-100 text-purple-600",
  },
];

export default function MemberRewards() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-rose-50 py-24">

      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-pink-200/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-rose-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">

          <span className="rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-600">
            🎁 Loyalty Program
          </span>

          <h2 className="mt-6 text-5xl font-extrabold text-gray-900">
            Kumpulkan Point,
            <span className="text-pink-600"> Nikmati Hadiahnya</span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Setiap belanja di <b>Salad Buah Senja</b> akan mendapatkan point.
            Semakin sering belanja, semakin banyak hadiah yang bisa ditukar.
          </p>

        </div>

        {/* Point Info */}
        <div className="mb-14 rounded-3xl bg-gradient-to-r from-pink-500 to-rose-500 p-8 text-center text-white shadow-2xl">

          <h3 className="text-3xl font-bold">
            🍓 1.000 Rupiah = 1 Point
          </h3>

          <p className="mt-3 text-lg text-pink-100">
            Belanja Rp20.000? Langsung dapat <b>20 Point</b>.
          </p>

        </div>

        {/* Reward Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {rewards.map((reward, index) => {
            const Icon = reward.icon;

            return (
              <div
                key={index}
                className="group rounded-3xl border border-pink-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >

                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${reward.color}`}
                >
                  <Icon size={30} />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-900">
                  {reward.point}
                </h3>

                <p className="mt-3 text-gray-600">
                  {reward.reward}
                </p>

              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">

          <Link
            href="/member/register"
            className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:scale-105"
          >
            Gabung Member Sekarang
            <ArrowRight size={20} />
          </Link>

          <p className="mt-5 text-sm text-gray-500">
            Gratis daftar • Point berlaku selamanya • Banyak hadiah menarik
          </p>

        </div>

      </div>

    </section>
  );
}