export default function CharityHub() {
    return (
        <section className="bg-gradient-to-r from-green-900/40 to-blue-900/40 border-y border-white/5 py-6 my-8 backdrop-blur-sm">
            <div className="px-4">
                <div className="flex justify-between items-end mb-2">
                    <h4 className="text-sm font-bold text-accent-green flex items-center gap-2">
                        <span>🎗️</span> İyilik Haritası
                    </h4>
                    <span className="text-xs text-white/50">Kadıköy Barınağı</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden mb-2">
                    <div className="bg-gradient-to-r from-accent-green to-emerald-400 h-full rounded-full" style={{ width: '82%' }}></div>
                </div>

                <div className="flex justify-between text-xs mb-4">
                    <span className="text-white font-bold">%82 Tamamlandı</span>
                    <span className="text-gray-400">Hedef: 500kg Mama</span>
                </div>

                {/* Community Ticker */}
                <div className="flex items-center gap-3 bg-black/20 p-2 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0"></div>
                    <p className="text-xs text-gray-300">
                        <span className="text-white font-bold">Komşun Ayşe</span>, az önce 500 PatiPuan bağışladı! 🙏
                    </p>
                </div>
            </div>
        </section>
    );
}
