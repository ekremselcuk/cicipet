export default function ArenaCategories() {
    const categories = [
        { id: 1, title: 'En Karizmatik Bakış', type: 'Güzellik', entries: 124, icon: '😎' },
        { id: 2, title: 'En Hızlı Getir', type: 'Yetenek', entries: 42, icon: '⚡' },
        { id: 3, title: 'Mahallenin Muhtarı', type: 'Yerel', entries: 85, icon: '🏘️' },
        { id: 4, title: 'Şu An Ne Yapıyor?', type: 'Flash', entries: 312, icon: '📸', flash: true },
    ];

    return (
        <div className="space-y-4 mb-8">
            <h3 className="text-white font-bold px-4">Aktif Arenalar 🏟️</h3>

            <div className="flex gap-4 overflow-x-auto px-4 pb-4 no-scrollbar">
                {categories.map((cat) => (
                    <div key={cat.id} className={`min-w-[160px] p-4 rounded-xl border flex flex-col justify-between h-40 relative overflow-hidden group hover:scale-105 transition-transform
             ${cat.flash ? 'bg-red-900/40 border-red-500/50' : 'bg-dark-card border-white/5'}
           `}>
                        {cat.flash && <span className="absolute top-2 right-2 text-red-500 animate-pulse text-[10px] font-black uppercase">LIVE</span>}

                        <div>
                            <span className="text-3xl mb-2 block">{cat.icon}</span>
                            <span className="text-xs text-gray-400 uppercase tracking-wider">{cat.type}</span>
                            <h4 className="font-bold text-white text-sm leading-tight mt-1">{cat.title}</h4>
                        </div>

                        <div className="flex justify-between items-end mt-4">
                            <span className="text-[10px] text-gray-500">{cat.entries} Katılımcı</span>
                            <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold-primary hover:text-black transition-colors">
                                ➜
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
