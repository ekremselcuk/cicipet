export default function TrophyRoom() {
    return (
        <div className="space-y-8 px-4 mb-4">
            {/* Trophy Section */}
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                        🏆 Kupa Odası
                    </h3>
                    <button className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-lg">Tümünü Gör</button>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-6 pl-1 no-scrollbar">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="min-w-[110px] flex flex-col items-center bg-white p-4 rounded-[20px] shadow-soft border border-white hover:-translate-y-2 transition-transform duration-300">
                            <span className="text-5xl mb-3 drop-shadow-md transform hover:scale-110 transition-transform">🏆</span>
                            <span className="text-[10px] font-black text-gray-800 text-center uppercase tracking-wide">Güzellik 2024</span>
                            <span className="text-[9px] font-bold text-orange-400 bg-orange-50 px-2 py-0.5 rounded-full mt-1">1.lik</span>
                        </div>
                    ))}
                    <div className="min-w-[110px] flex flex-col items-center justify-center bg-gray-50 p-4 rounded-[20px] border-2 border-dashed border-gray-200">
                        <span className="text-2xl text-gray-300 font-black">+</span>
                    </div>
                </div>
            </section>

            {/* Gifting Wall */}
            <section>
                <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                    🎁 Hediye Duvarı
                </h3>
                <div className="grid grid-cols-4 gap-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="aspect-square bg-white rounded-2xl shadow-sm flex items-center justify-center border border-gray-100 hover:shadow-floating hover:-translate-y-1 transition-all cursor-pointer">
                            <span className="text-2xl transform hover:rotate-12 transition-transform">🦴</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
