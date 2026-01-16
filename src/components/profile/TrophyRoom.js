export default function TrophyRoom() {
    return (
        <div className="space-y-6 px-4 mb-8">
            {/* Trophy Section */}
            <section>
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        🏆 Kupa Odası
                    </h3>
                    <button className="text-xs text-gold">Tümünü Gör</button>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="min-w-[100px] flex flex-col items-center bg-dark-card p-3 rounded-xl border border-white/5 shadow-lg">
                            <span className="text-4xl mb-2 drop-shadow-md">🏆</span>
                            <span className="text-[10px] font-bold text-white text-center">Güzellik 2024</span>
                            <span className="text-[9px] text-gray-500">1.lik</span>
                        </div>
                    ))}
                    <div className="min-w-[100px] flex flex-col items-center justify-center bg-white/5 p-3 rounded-xl border border-white/5 border-dashed">
                        <span className="text-2xl text-gray-600">+</span>
                    </div>
                </div>
            </section>

            {/* Gifting Wall */}
            <section>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    🎁 Hediye Duvarı
                </h3>
                <div className="grid grid-cols-4 gap-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="aspect-square bg-white/5 rounded-lg flex items-center justify-center border border-white/5 hover:border-gold-primary transition-colors">
                            <span className="text-2xl">🦴</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
