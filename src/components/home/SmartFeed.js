import Link from 'next/link';

export default function SmartFeed() {
    const posts = [
        { id: 1, name: 'Tarçın', rank: 'Mahalle Yıldızı', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80', score: 1240 },
        { id: 2, name: 'Limon', rank: 'Amatör Pati', image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80', score: 856 },
    ];

    return (
        <section className="px-4 pb-24 space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">Günün Yıldızları ✨</h3>

            {posts.map((post) => (
                <div key={post.id} className="bg-dark-card rounded-2xl overflow-hidden shadow-lg border border-white/5 relative group">

                    {/* Header */}
                    <div className="p-3 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent absolute top-0 w-full z-10">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-700 border border-gold-primary">
                                {/* Avatar */}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-white shadow-black drop-shadow-md">{post.name}</span>
                                <span className="text-[10px] text-gold-primary uppercase tracking-wider">{post.rank}</span>
                            </div>
                        </div>
                        <button className="bg-black/50 backdrop-blur-sm p-1.5 rounded-full text-white/80 hover:bg-white/20 transition">
                            ⋮
                        </button>
                    </div>

                    {/* Image */}
                    <div className="relative aspect-[4/5] bg-gray-800">
                        <img src={post.image} alt={post.name} className="w-full h-full object-cover" loading="lazy" />

                        {/* Double Tap Heart Animation (Placeholder) */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <span className="text-6xl animate-heart">❤️</span>
                        </div>
                    </div>

                    {/* Actions Bar */}
                    <div className="p-3 bg-dark-card flex justify-between items-center">

                        {/* Smart Like Button */}
                        <div className="flex flex-col items-center">
                            <button className="text-3xl transition-transform active:scale-125 hover:text-red-500">
                                🐾
                            </button>
                            <span className="text-xs text-secondary mt-1">{post.score}</span>
                        </div>

                        {/* Center Info */}
                        <div className="flex-1 px-4">
                            <p className="text-sm text-gray-300 line-clamp-2">
                                Bugün parkta çok koştuk! 🌿 #GoldenHour #ParkKeyfi
                            </p>
                        </div>

                        {/* Duel Button */}
                        <Link href="/arena" className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-dark-surface border border-gray-600 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500 transition-colors">
                                <span className="text-lg">⚔️</span>
                            </div>
                            <span className="text-[10px] text-muted mt-1 uppercase">Düello</span>
                        </Link>
                    </div>
                </div>
            ))}
        </section>
    );
}
