export default function PetHeader() {
    return (
        <section className="relative mb-6">
            {/* Cover */}
            <div className="h-40 bg-gradient-to-br from-indigo-900 via-purple-900 to-black relative">
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

            <div className="px-4 flex flex-col items-center -mt-20 relative z-10">
                {/* Avatar */}
                <div className="relative">
                    <div className="w-36 h-36 rounded-full p-1.5 bg-gradient-to-tr from-accent-blue via-white to-accent-green shadow-2xl">
                        <div className="w-full h-full rounded-full border-4 border-dark-bg overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-dark-bg">
                        ONLINE
                    </div>
                </div>

                {/* Identity */}
                <div className="text-center mt-4">
                    <h1 className="text-3xl font-black text-white flex items-center justify-center gap-2">
                        Karabaş
                        <span className="text-xl bg-gold-primary text-black rounded-full w-6 h-6 flex items-center justify-center text-[10px] border border-white">✓</span>
                    </h1>
                    <p className="text-sm text-gray-300">Golden Retriever • 3 Yaş • ⭐ Efsanevi</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6 w-full max-w-sm">
                    <button className="flex-1 btn-primary py-3 text-sm">
                        Takip Et (+1.2K)
                    </button>
                    <button className="flex-1 bg-dark-surface border border-red-500/50 text-white text-sm font-bold py-3 rounded-full hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2">
                        <span>⚔️</span> Düello
                    </button>
                </div>
            </div>
        </section>
    );
}
