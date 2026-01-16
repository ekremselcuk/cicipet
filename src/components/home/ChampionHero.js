export default function ChampionHero() {
    return (
        <section className="p-4">
            <div className="relative w-full aspect-[4/3] rounded-[30px] overflow-hidden shadow-floating group">

                {/* Background Image */}
                <img
                    src="https://images.unsplash.com/photo-1596492784531-6e6eb5ea9205?auto=format&fit=crop&q=80"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt="Champion"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

                {/* Content */}
                <div className="absolute top-4 right-4 bg-yellow-400 text-black font-black px-3 py-1 rounded-full text-xs shadow-lg flex items-center gap-1 animate-bounce-soft">
                    <span>🏆</span>
                    <span>SON ŞAMPİYON</span>
                </div>

                <div className="absolute bottom-6 left-6 text-white">
                    <h2 className="text-3xl font-black mb-1 drop-shadow-md">Pamuk</h2>
                    <div className="flex items-center gap-2">
                        <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                            Mahalle Muhtarı
                        </span>
                        <span className="text-xs font-medium opacity-80">Kadıköy, İstanbul</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
