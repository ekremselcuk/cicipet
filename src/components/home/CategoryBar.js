'use client';



export default function CategoryBar({ title }) {

    const categories = [
        { id: 1, title: 'En Karizmatik', type: 'Güzellik', image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80' },
        { id: 2, title: 'En Hızlı', type: 'Yetenek', image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80' },
        { id: 3, title: 'Mahalle', type: 'Yerel', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80' },
        { id: 4, title: 'Komik Anlar', type: 'Eğlence', image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80' },
        { id: 5, title: 'Sponsorlu', type: 'Marka', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80' },
    ];

    return (
        <div className="sticky top-16 z-40 bg-bone-white/95 backdrop-blur-sm pl-4 border-b border-gray-100/50 shadow-sm transition-all duration-300 py-2">
            <h4 className="text-gray-800 font-bold px-1 flex items-center gap-2 mb-2 text-sm">
                {title || 'Popüler Kategoriler'} <span className="bg-orange-100 text-orange-600 text-[10px] px-2 py-0.5 rounded-full">Yeni</span>
            </h4>
            <div className="flex gap-3 overflow-x-auto pr-4 no-scrollbar pb-2">
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        className="relative rounded-[20px] overflow-hidden shadow-sm group cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300 min-w-[90px] h-24"
                    >
                        {/* Background Image */}
                        <img src={cat.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={cat.title} />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                        {/* Content */}
                        <div className="absolute left-3 right-3 text-white bottom-3">
                            <span className="text-[9px] font-bold opacity-80 uppercase tracking-wider block mb-0.5">{cat.type}</span>
                            <span className="font-black leading-tight block text-xs">{cat.title}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
