import Link from 'next/link';

export default function SmartFeed() {
    const posts = [
        { id: 1, name: 'Tarçın', rank: 'Mahalle Yıldızı', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80', score: 1240, desc: 'Bugün parkta sincap kovaladım! 🐿️ #Avcı' },
        { id: 2, name: 'Limon', rank: 'Amatör Pati', image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80', score: 856, desc: 'Tırmalama tahtamı parçaladım, çok gururluyum. 😼 #Yaramaz' },
        { id: 3, name: 'Miya', rank: 'Uykucu', image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80', score: 2100, desc: 'Güneşte uyumak gibisi yok... ☀️ #Keyif' },
    ];

    return (
        <section className="px-4 pb-24 space-y-8">
            <h3 className="text-xl font-bold text-gray-700 px-2 flex items-center gap-2">
                Günün Yıldızları <span className="text-2xl animate-sparkle">✨</span>
            </h3>

            {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-[24px] overflow-hidden shadow-lg relative group transition-all hover:-translate-y-1">

                    {/* Header */}
                    <div className="p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-100 p-0.5 shadow-sm">
                                {/* Avatar Placeholder */}
                                <div className="w-full h-full rounded-full bg-gradient-to-tr from-orange-300 to-yellow-200"></div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-base font-bold text-gray-800 leading-snug">{post.name}</span>
                                <span className="text-[10px] text-paw-orange font-bold bg-orange-50 px-2 py-0.5 rounded-full w-max">{post.rank}</span>
                            </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 text-xl">
                            ⋮
                        </button>
                    </div>

                    {/* Image */}
                    <div className="relative aspect-square bg-gray-100 mx-4 rounded-2xl overflow-hidden shadow-inner">
                        <img src={post.image} alt={post.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>

                    {/* Actions Bar */}
                    <div className="p-4 flex justify-between items-center">

                        {/* Content */}
                        <div className="flex-1 pr-4">
                            <p className="text-sm text-gray-600 font-medium leading-relaxed">
                                {post.desc}
                            </p>
                        </div>

                        {/* Soft Like Button */}
                        <div className="flex flex-col items-center gap-1">
                            <button className="w-12 h-12 rounded-full bg-red-50 text-red-500 shadow-sm flex items-center justify-center text-2xl transition-transform active:scale-90 hover:bg-red-100 animate-heartbeat">
                                ❤️
                            </button>
                            <span className="text-xs font-bold text-gray-500">{post.score}</span>
                        </div>

                    </div>
                </div>
            ))}
        </section>
    );
}
