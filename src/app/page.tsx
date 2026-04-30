import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <span className="text-2xl font-black text-orange-500">🐾 CiciPet</span>
        <Link
          href="/auth"
          className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
        >
          Giriş Yap
        </Link>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 text-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4 opacity-90">
            Türkiye&apos;nin En Sevimli Yarışması
          </p>
          <h1 className="text-4xl sm:text-6xl font-black leading-tight mb-6">
            Petini Yarıştır,<br />Ödül Kazan! 🏆
          </h1>
          <p className="text-lg sm:text-xl opacity-90 mb-10 max-w-xl mx-auto">
            Kedinizi, köpeğinizi ya da diğer dostunuzun fotoğrafını yükleyin.
            Topluluk oylarıyla en sevimli pet seçilsin, siz ödülü kaptırın!
          </p>
          <Link
            href="/auth"
            className="inline-block rounded-full bg-white text-orange-500 font-black text-lg px-10 py-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            🎉 Şimdi Katıl — Ücretsiz!
          </Link>
        </div>
      </section>

      {/* Nasıl Çalışır */}
      <section className="py-20 px-6 bg-orange-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12 text-gray-900">
            Nasıl Çalışır?
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: "1", emoji: "📸", title: "Fotoğraf Çek", desc: "Petinin en şirin haline gelen fotoğrafını çek." },
              { step: "2", emoji: "⬆️", title: "Sisteme Yükle", desc: "CiciPet'e kayıt ol, pet bilgilerini ve fotoğrafını yükle." },
              { step: "3", emoji: "🎁", title: "Ödülleri Kap", desc: "Topluluk oylasın, sen kazan! Ödüller her ay dağıtılır." },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-3xl p-8 text-center shadow-sm">
                <div className="w-12 h-12 rounded-full bg-orange-500 text-white font-black text-xl flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ödüller */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-4 text-gray-900">Ödül Kategorileri</h2>
          <p className="text-center text-gray-500 mb-12">Her ay kazananlar bu ödüllerden birini ya da birkaçını alır.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { emoji: "🍖", label: "3 Aylık Mama", color: "bg-amber-100 text-amber-700" },
              { emoji: "🎀", label: "Aksesuar Seti", color: "bg-pink-100 text-pink-700" },
              { emoji: "🐶", label: "Özel Tasma", color: "bg-blue-100 text-blue-700" },
              { emoji: "🎫", label: "Hediye Çeki", color: "bg-green-100 text-green-700" },
            ].map((prize) => (
              <div key={prize.label} className={`${prize.color} rounded-3xl p-6 text-center`}>
                <div className="text-4xl mb-3">{prize.emoji}</div>
                <p className="font-bold text-sm">{prize.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center">
        <h2 className="text-3xl font-black mb-4">Petine bir şans ver!</h2>
        <p className="opacity-90 mb-8 text-lg">Katılım tamamen ücretsiz. Hemen başla!</p>
        <Link
          href="/auth"
          className="inline-block rounded-full bg-white text-purple-600 font-black text-lg px-10 py-4 shadow-lg hover:scale-105 transition-all"
        >
          🐾 Şimdi Katıl
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-gray-400 text-sm">
        <p>© 2025 CiciPet. Tüm hakları saklıdır.</p>
      </footer>
    </main>
  );
}
