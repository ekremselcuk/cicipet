export default function ProfileHeader() {
    return (
        <section className="relative mb-6">
            {/* Cover Image */}
            <div className="h-32 bg-gradient-to-r from-gray-800 to-black overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
            </div>

            {/* Avatar & Info */}
            <div className="px-4 flex flex-col items-center -mt-16">
                <div className="relative">
                    {/* Live Status Ring (Active/Sleeping/etc) */}
                    <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-gold-primary via-orange-500 to-purple-600 animate-pulse">
                        <div className="w-full h-full rounded-full border-4 border-dark-bg overflow-hidden relative">
                            <img
                                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                            {/* Live Status Badge */}
                            <div className="absolute bottom-2 right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-white shadow-lg z-10"></div>
                        </div>
                    </div>

                    {/* Rank Badge */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-dark-surface border border-gold-primary px-3 py-1 rounded-full shadow-xl flex items-center gap-1 min-w-max">
                        <span className="text-lg">⭐</span>
                        <span className="text-xs font-bold text-gold">Mahalle Yıldızı</span>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <h1 className="text-2xl font-black text-white">Boncuk</h1>
                    <p className="text-sm text-gray-400">Tekir • 2 Yaş • ♌ Aslan</p>
                    <p className="text-xs text-secondary mt-2 italic">"Profesyonel yumak avcısı ve koltuk sevdalısı."</p>
                </div>

                {/* Quick Stats */}
                <div className="flex gap-4 mt-6 w-full justify-center">
                    <div className="bg-dark-elem text-center p-2 rounded-lg flex-1 bg-white/5 backdrop-blur-sm">
                        <span className="block text-xl font-bold text-white">1.2K</span>
                        <span className="text-[10px] text-gray-400">Takipçi</span>
                    </div>
                    <div className="bg-dark-elem text-center p-2 rounded-lg flex-1 bg-white/5 backdrop-blur-sm">
                        <span className="block text-xl font-bold text-white">42</span>
                        <span className="text-[10px] text-gray-400">Galibiyet</span>
                    </div>
                    <div className="bg-dark-elem text-center p-2 rounded-lg flex-1 bg-white/5 backdrop-blur-sm">
                        <span className="block text-xl font-bold text-white">8.5</span>
                        <span className="text-[10px] text-gray-400">Skor</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
