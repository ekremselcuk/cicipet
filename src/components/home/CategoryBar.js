export default function CategoryBar() {
    const categories = [
        { id: 1, title: 'En Karizmatik', type: 'Güzellik', icon: '😎', color: 'bg-blue-50 text-blue-500' },
        { id: 2, title: 'En Hızlı', type: 'Yetenek', icon: '⚡', color: 'bg-yellow-50 text-yellow-500' },
        { id: 3, title: 'Mahalle', type: 'Yerel', icon: '🏘️', color: 'bg-green-50 text-green-500' },
        { id: 4, title: 'Komik Anlar', type: 'Eğlence', icon: '🤣', color: 'bg-pink-50 text-pink-500' },
        { id: 5, title: 'Sponsorlu', type: 'Marka', icon: '⭐', color: 'bg-purple-50 text-purple-500' },
    ];

    return (
        <div className="py-2 pl-4">
            <h4 className="text-gray-800 font-bold mb-3 text-sm px-1 flex items-center gap-2">
                Popüler Kategoriler <span className="bg-orange-100 text-orange-600 text-[10px] px-2 py-0.5 rounded-full">Yeni</span>
            </h4>
            <div className="flex gap-3 overflow-x-auto pb-4 pr-4 no-scrollbar">
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        className="min-w-[110px] bg-white p-3 rounded-[20px] shadow-sm border border-gray-100 flex flex-col justify-between h-32 relative group transition-all duration-300 hover:shadow-md cursor-pointer hover:-translate-y-1"
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg mb-2 ${cat.color}`}>
                            {cat.icon}
                        </div>

                        <div>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">{cat.type}</span>
                            <span className="text-xs font-black text-gray-800 leading-tight block">{cat.title}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
