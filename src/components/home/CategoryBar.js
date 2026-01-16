export default function CategoryBar() {
    const categories = [
        { id: 1, name: 'Estetik', icon: '💅' },
        { id: 2, name: 'Yetenek', icon: '⚡' },
        { id: 3, name: 'Yerel', icon: '🏘️' },
        { id: 4, name: 'Tematik', icon: '🎃' },
        { id: 5, name: 'Sponsorlu', icon: '⭐' },
        { id: 6, name: 'Flash', icon: '📸' },
    ];

    return (
        <div className="bg-white border-b border-gray-100 py-3 shadow-sm sticky top-16 z-40">
            <div className="flex gap-3 overflow-x-auto px-4 no-scrollbar">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200 whitespace-nowrap shadow-sm hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 transition-all font-bold text-sm text-gray-600"
                    >
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
