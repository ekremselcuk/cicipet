export default function PetHeader() {
    return (
        <section className="relative mb-6">
            {/* Cover */}
            <div className="h-40 bg-gradient-to-br from-orange-100 to-amber-50 relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
            </div>

            <div className="px-4 flex flex-col items-center -mt-20 relative z-10">
                {/* Avatar */}
                <div className="relative">
                    <div className="w-36 h-36 rounded-full p-2 bg-white shadow-soft">
                        <div className="w-full h-full rounded-full border-4 border-gray-50 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full border-2 border-white shadow-md">
                        ONLINE
                    </div>
                </div>

                {/* Identity */}
                <div className="text-center mt-4">
                    <h1 className="text-3xl font-black text-gray-800 flex items-center justify-center gap-2">
                        Karabaş
                        <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-[10px] shadow-sm border border-white">✓</span>
                    </h1>
                    <p className="text-sm font-medium text-gray-500">Golden Retriever • 3 Yaş • ⭐ Efsanevi</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6 w-full max-w-sm">
                    <button className="flex-1 btn-primary text-sm py-3 shadow-floating hover:-translate-y-1">
                        Takip Et (+1.2K)
                    </button>
                    <button className="flex-1 bg-white text-gray-700 border border-gray-200 text-sm font-bold py-3 rounded-full hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-colors flex items-center justify-center gap-2 shadow-sm">
                        <span>⚔️</span> Düello
                    </button>
                </div>
            </div>
        </section>
    );
}
