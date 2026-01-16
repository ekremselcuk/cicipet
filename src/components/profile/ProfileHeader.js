export default function ProfileHeader() {
    return (
        <section className="relative mb-6">
            {/* Cover Image (Soft Pattern) */}
            <div className="h-32 bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-50"></div>
            </div>

            {/* Avatar & Info */}
            <div className="px-4 flex flex-col items-center -mt-16 relative z-10">
                <div className="relative">
                    {/* Live Status Ring (Soft Glow) */}
                    <div className="w-28 h-28 rounded-full p-1 bg-white shadow-soft">
                        <div className="w-full h-full rounded-full border-4 border-white overflow-hidden relative">
                            <img
                                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                            {/* Status Badge */}
                            <div className="absolute bottom-1 right-1 bg-green-400 w-4 h-4 rounded-full border-2 border-white shadow-md z-10 animate-pulse"></div>
                        </div>
                    </div>

                    {/* Rank Badge */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-soft flex items-center gap-1 min-w-max border border-orange-100">
                        <span className="text-lg">⭐</span>
                        <span className="text-xs font-bold text-orange-500">Mahalle Yıldızı</span>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <h1 className="text-2xl font-black text-gray-800">Boncuk</h1>
                    <p className="text-sm font-bold text-gray-400">Tekir • 2 Yaş • ♌ Aslan</p>
                    <p className="text-sm text-gray-500 mt-2 italic bg-white px-3 py-1 rounded-lg shadow-sm inline-block">
                        "Profesyonel yumak avcısı 🧶"
                    </p>
                </div>

                {/* Quick Stats - Floating Cards */}
                <div className="flex gap-3 mt-6 w-full justify-center px-2">
                    <div className="bg-white p-3 rounded-2xl flex-1 shadow-soft border border-gray-50 flex flex-col items-center hover:-translate-y-1 transition-transform">
                        <span className="block text-xl font-black text-gray-800">1.2K</span>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">Takipçi</span>
                    </div>
                    <div className="bg-white p-3 rounded-2xl flex-1 shadow-soft border border-gray-50 flex flex-col items-center hover:-translate-y-1 transition-transform">
                        <span className="block text-xl font-black text-gray-800">42</span>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">Galibiyet</span>
                    </div>
                    <div className="bg-white p-3 rounded-2xl flex-1 shadow-soft border border-gray-50 flex flex-col items-center hover:-translate-y-1 transition-transform">
                        <span className="block text-xl font-black text-gray-800">8.5</span>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">Skor</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
