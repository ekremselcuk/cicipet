export default function Hero() {
    return (
        <section className="relative w-full mb-8 px-4">
            <div className="bg-gradient-to-b from-orange-100 to-white rounded-[30px] p-6 shadow-soft border border-white relative overflow-hidden">

                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 opacity-10 text-9xl transform translate-x-10 -translate-y-10">🐾</div>
                <div className="absolute bottom-0 left-0 opacity-10 text-8xl transform -translate-x-4 translate-y-4">🦴</div>

                {/* Content: Live Contest Widget */}
                <div className="relative z-10 flex flex-col items-center text-center">
                    <span className="bg-red-400 text-white text-[10px] font-bold px-3 py-1 rounded-full mb-3 animate-pulse shadow-md">
                        CANLI • SON 2 SAAT ⏳
                    </span>

                    <h2 className="text-2xl font-black text-gray-800 mb-2 leading-tight">
                        Mahallenin En<br />
                        <span className="text-orange-500 text-3xl">Tatlısı</span>
                    </h2>

                    <p className="text-gray-500 text-xs mb-6 max-w-[90%]">
                        Pamuk ve Karabaş, en tatlı bakış için yarışıyor! Senin oyun belirleyici olacak.
                    </p>

                    {/* Versus Visuals */}
                    <div className="flex items-center justify-center gap-6 mb-6 w-full">
                        <div className="relative transform hover:scale-105 transition-transform duration-300">
                            <div className="w-20 h-20 rounded-full border-4 border-white shadow-floating overflow-hidden">
                                <img src="https://placehold.co/100x100" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm border border-white">
                                #1
                            </div>
                        </div>

                        <span className="text-3xl font-black text-orange-300 italic">VS</span>

                        <div className="relative transform hover:scale-105 transition-transform duration-300">
                            <div className="w-20 h-20 rounded-full border-4 border-white shadow-soft overflow-hidden filter grayscale">
                                <img src="https://placehold.co/100x100" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gray-400 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm border border-white">
                                #2
                            </div>
                        </div>
                    </div>

                    <button className="btn-primary w-full shadow-floating animate-pop">
                        HEMEN OY VER!
                    </button>
                </div>
            </div>
        </section>
    );
}
