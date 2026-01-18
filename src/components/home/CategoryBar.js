'use client';



'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function CategoryBar({ title }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const sentinelRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            // Sentinel tepeye değdiğinde (görüşten çıktığında) shrink et
            setIsScrolled(!entry.isIntersecting);
        }, {
            root: null,
            threshold: 0,
            // top-16 (64px) + biraz pay. Sentinel'in pozisyonuna göre ayar.
            // Sentinel absolute ve yukarıda (-top-12 gibi).
            // -100px margin ile sentinel viewport üst sınırından 100px önce tetikler.
            rootMargin: '-70px 0px 0px 0px'
        });

        if (sentinelRef.current) observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, []);

    const categories = [
        { id: 1, title: 'En Karizmatik', type: 'Güzellik', image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80', path: '/podyum' },
        { id: 2, title: 'En Hızlı', type: 'Yetenek', image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80', path: '/yukselenler' },
        { id: 3, title: 'Mahalle', type: 'Yerel', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80', path: '/yeniler' },
        { id: 4, title: 'Komik Anlar', type: 'Eğlence', image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80', path: '/haftanin-enleri' },
        { id: 5, title: 'Sponsorlu', type: 'Marka', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80', path: '/odullu' },
    ];

    return (
        <>
            {/* Sentinel: Scroll tespiti için görünmez element */}
            <div ref={sentinelRef} className="absolute w-full h-px -translate-y-16 pointer-events-none opacity-0" />

            <div className={`sticky top-16 z-40 bg-bone-white/95 backdrop-blur-md border-b border-gray-100/50 shadow-sm transition-all duration-500 ease-out pl-4 py-2 flex flex-col justify-center
                ${isScrolled ? 'h-20' : 'h-28'}
            `}>
                <h4 className={`text-gray-800 font-bold px-1 flex items-center gap-2 transition-all duration-500 ${isScrolled ? 'mb-0 text-xs opacity-0 h-0 overflow-hidden' : 'mb-2 text-sm opacity-100 h-auto'}`}>
                    {title || 'Popüler Kategoriler'} <span className="bg-orange-100 text-orange-600 text-[10px] px-2 py-0.5 rounded-full">Yeni</span>
                </h4>

                <div className={`flex gap-3 overflow-x-auto pr-4 no-scrollbar items-center transition-all duration-500 h-full`}>
                    {categories.map((cat) => (
                        <Link
                            href={cat.path || '#'}
                            key={cat.id}
                            className={`relative rounded-[20px] overflow-hidden shadow-sm group cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-500
                                ${isScrolled ? 'min-w-[70px] h-16' : 'min-w-[90px] h-24'}
                            `}
                        >
                            {/* Background Image */}
                            <img src={cat.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={cat.title} />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                            {/* Content */}
                            <div className={`absolute left-0 right-0 text-white text-center transition-all duration-500 flex flex-col items-center justify-end h-full pb-2
                                ${isScrolled ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}
                            `}>
                                <span className="text-[9px] font-bold opacity-80 uppercase tracking-wider block mb-0.5">{cat.type}</span>
                                <span className="font-black leading-tight block text-xs px-1">{cat.title}</span>
                            </div>

                            {/* Simple Icon for Scrolled State */}
                            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isScrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                                <span className="text-xl">🐾</span>
                            </div>

                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
