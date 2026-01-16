export default function Hero() {
    return (
        <section className="relative w-full h-[50vh] min-h-[400px] mb-8 overflow-hidden rounded-b-3xl">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80"
                    alt="Hero Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg/50 to-dark-bg"
                    style={{ background: 'linear-gradient(180deg, rgba(15,15,18,0) 0%, rgba(15,15,18,0.8) 70%, rgba(15,15,18,1) 100%)' }}></div>
            </div>

            {/* Content: Live Contest Widget */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center text-center z-10">
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 animate-pulse">
                    CANLI • SON 2 SAAT ⏳
                </span>

                <h2 className="text-3xl font-black text-white mb-2 leading-tight">
                    Mahallemizin En<br />
                    <span className="text-gold">Karizmatiği</span>
                </h2>

                <p className="text-gray-300 text-sm mb-6 max-w-[80%]">
                    Pamuk ve Karabaş liderlik için kapışıyor! Senin oyun kaderi değiştirebilir.
                </p>

                {/* Versus Visuals */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                        <img src="https://placehold.co/60x60" className="w-14 h-14 rounded-full border-2 border-gold-primary" />
                        <span className="absolute -bottom-2 right-0 bg-gold-primary text-black text-xs font-bold px-1 rounded">#1</span>
                    </div>
                    <span className="text-2xl font-bold text-white/50">VS</span>
                    <div className="relative">
                        <img src="https://placehold.co/60x60" className="w-14 h-14 rounded-full border-2 border-gray-600 grayscale" />
                        <span className="absolute -bottom-2 right-0 bg-gray-700 text-white text-xs font-bold px-1 rounded">#2</span>
                    </div>
                </div>

                <button className="btn-primary w-full shadow-lg shadow-gold-primary/20">
                    HEMEN OY VER
                </button>
            </div>

            {/* Floating Flash Event Notifier (Hidden by default, shown via state in real app) */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[90%] glass-panel p-3 flex items-center justify-between"
                style={{ display: 'none' }}>
                <div className="flex items-center gap-2">
                    <span className="text-xl">⚡</span>
                    <div className="flex flex-col text-left">
                        <span className="text-sm font-bold text-white">Flash Yarışma!</span>
                        <span className="text-xs text-gray-400">"Şu an ne yapıyor?" - Kalan: 58dk</span>
                    </div>
                </div>
                <button className="bg-white text-black text-xs font-bold px-3 py-1.5 rounded-full">KATIL</button>
            </div>
        </section>
    );
}
