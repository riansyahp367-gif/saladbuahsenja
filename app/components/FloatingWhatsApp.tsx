export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/6281314720307?text=Halo%20Salad%20Buah%20Senja,%20saya%20ingin%20memesan."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-green-500 px-5 py-4 text-white shadow-2xl transition hover:scale-105 hover:bg-green-600"
    >
      <span className="text-2xl">💬</span>

      <div className="hidden sm:block">
        <p className="text-xs">Pesan via</p>
        <p className="font-bold">WhatsApp</p>
      </div>
    </a>
  );
}