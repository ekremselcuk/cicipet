export default function CharityHub() {
    return (
        <section className="mx-4 my-6 bg-white/50 backdrop-blur-md rounded-[20px] p-5 border border-white shadow-soft">
            <div className="flex justify-between items-end mb-3">
                <h4 className="text-sm font-bold text-green-600 flex items-center gap-2">
                    <span className="text-lg">🎗️</span> İyilik Haritası
                </h4>
                <span className="text-xs font-bold text-gray-400 bg-white px-2 py-1 rounded-lg shadow-sm">Kadıköy Barınağı</span>
            </div>

            {/* Soft Progress Bar */}
            <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner mb-2">
                <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-emerald-300 rounded-full" style={{ width: '82%' }}></div>
                {/* Shine effect */}
                <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-white/30 to-transparent"></div>
            </div>

            <div className="flex justify-between text-xs mb-4 px-1">
                <span className="text-green-600 font-black">%82 Tamamlandı</span>
                <span className="text-gray-500 font-bold">Hedef: 500kg Mama</span>
            </div>

            {/* Community Ticker (Chat Bubble Style) */}
            <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-lg">👩‍🦱</div>
                <p className="text-xs text-gray-600">
                    <span className="font-bold text-gray-800">Komşun Ayşe</span>, az önce <br />
                    <span className="text-orange-500 font-bold">500 PatiPuan</span> bağışladı! 🙏
                </p>
            </div>
        </section>
    );
}
