export default function ChampionHero() {
    return (
        <section className="p-4">
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg group">

                {/* Image Section */}
                <div className="relative w-full aspect-square overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1596492784531-6e6eb5ea9205?auto=format&fit=crop&q=80"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        alt="Champion"
                    />

                    {/* Badge */}
                    <div className="absolute top-4 right-4 bg-yellow-400 text-black font-black px-3 py-1 rounded-full text-xs shadow-lg flex items-center gap-1 animate-bounce-soft">
                        <span>🏆</span>
                        <span>SON ŞAMPİYON</span>
                    </div>
                </div>

                {/* Content Section (Separated from image to prevent overlap) */}
                <div className="p-4 flex flex-col gap-2">
                    <h2 className="text-2xl font-black text-gray-800 leading-snug">Pamuk</h2>
                    <div className="flex items-center gap-2">
                        <span className="bg-paw-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                            Mahalle Muhtarı
                        </span>
                        <span className="text-xs font-medium text-gray-500">Kadıköy, İstanbul</span>
                    </div>
                </div>

            </div>
        </section>
    );
}
