export default function ArenaCategories() {
    const categories = [
        { id: 1, title: 'En Karizmatik Bakış', type: 'Güzellik', entries: 124, icon: '😎' },
        { id: 2, title: 'En Hızlı Getir', type: 'Yetenek', entries: 42, icon: '⚡' },
        { id: 3, title: 'Mahallenin Muhtarı', type: 'Yerel', entries: 85, icon: '🏘️' },
        { id: 4, title: 'Şu An Ne Yapıyor?', type: 'Flash', entries: 312, icon: '📸', flash: true },
    ];

    return (
        <div className="space-y-6 mb-8">
            <div className="flex justify-between items-end px-4">
                <h3 className="text-gray-800 font-black text-xl">Aktif Arenalar 🏟️</h3>
                <span className="text-xs text-orange-500 font-bold bg-orange-50 px-2 py-1 rounded-lg">4 Yarışma</span>
            </div>

            <div className="flex gap-4 overflow-x-auto px-4 pb-6 pl-1 no-scrollbar">
                {categories.map((cat) => (
                    <div key={cat.id} className={`min-w-[160px] p-5 rounded-[24px] flex flex-col justify-between h-44 relative group transition-all duration-300 hover:-translate-y-2 hover:shadow-floating
             ${cat.flash
                            ? 'bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-lg shadow-red-200'
                            : 'bg-white text-gray-800 shadow-soft border border-white'
                        }
           `}>
                        {cat.flash && <span className="absolute top-3 right-3 bg-white text-red-500 text-[9px] font-black px-2 py-0.5 rounded-full animate-bounce-soft">LIVE</span>}

                        <div>
                            <span className="text-4xl mb-2 block filter drop-shadow-sm">{cat.icon}</span>
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${cat.flash ? 'text-white/80' : 'text-gray-400'}`}>{cat.type}</span>
                            <h4 className="font-bold text-lg leading-tight mt-1">{cat.title}</h4>
                        </div>

                        <div className="flex justify-between items-end mt-4">
                            <span className={`text-[10px] font-medium ${cat.flash ? 'text-white/80' : 'text-gray-400'}`}>{cat.entries} Katılımcı</span>
                            <button className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm
                 ${cat.flash ? 'bg-white text-red-500' : 'bg-gray-100 group-hover:bg-orange-500 group-hover:text-white'}
               `}>
                                ➜
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
