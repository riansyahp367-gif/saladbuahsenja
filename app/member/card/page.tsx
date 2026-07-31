export default function MemberCardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-white flex items-center justify-center p-6">

      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="bg-pink-600 text-white p-8 text-center">

          <h1 className="text-3xl font-bold">
            🍓 Salad Buah Senja
          </h1>

          <p className="mt-2 opacity-90">
            DIGITAL MEMBER CARD
          </p>

        </div>

        {/* Body */}

        <div className="p-8 space-y-6">

          <div>

            <p className="text-gray-500 text-sm">
              Nama Member
            </p>

            <h2 className="text-2xl font-bold">
              Riansyah Budiman
            </h2>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="bg-pink-50 rounded-xl p-4">

              <p className="text-sm text-gray-500">
                Member ID
              </p>

              <h3 className="font-bold text-pink-600">
                SBS000001
              </h3>

            </div>

            <div className="bg-pink-50 rounded-xl p-4">

              <p className="text-sm text-gray-500">
                Point
              </p>

              <h3 className="font-bold text-pink-600">
                0 Point
              </h3>

            </div>

          </div>

          <div className="bg-yellow-50 rounded-xl p-4">

            <p className="text-sm text-gray-500">
              Level Member
            </p>

            <h3 className="font-bold text-yellow-600">
              🥉 Bronze
            </h3>

          </div>

          {/* QR Placeholder */}

          <div className="border-2 border-dashed rounded-2xl p-8 flex justify-center">

            <div className="w-40 h-40 bg-gray-200 rounded-xl flex items-center justify-center">

              QR CODE

            </div>

          </div>

          <button className="w-full bg-pink-600 hover:bg-pink-700 transition text-white rounded-xl py-4 font-semibold">

            Kembali ke Beranda

          </button>

        </div>

      </div>

    </main>
  );
}