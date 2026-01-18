'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DuelPreview() {
    // State sadece görsel efekt için, gerçek oylama Arena'da olacak
    const [voted, setVoted] = useState(false);

    return (
        <section className="px-4 mb-8 mt-6 relative z-0">
            <div className="bg-white p-1 rounded-[30px] border border-gray-100 shadow-sm relative overflow-hidden">

                {/* Header */}
                <div className="px-4 py-3 flex justify-between items-center">
                    <h3 className="font-black text-gray-800 text-lg tracking-tight">
                        Kimler Yarışıyor? 👀
                    </h3>
                    <Link href="/arena" className="text-xs font-bold text-orange-500 bg-orange-50 px-3 py-1.5 rounded-full hover:bg-orange-100 transition-colors">
                        Tümünü Gör ➜
                    </Link>
                </div>

                {/* Duel Content */}
                <div className="flex gap-2 h-64 p-2 pt-0">
                    {/* Left Pet */}
                    <div
                        className="flex-1 relative rounded-[24px] overflow-hidden group cursor-pointer"
                        onClick={() => window.location.href = '/arena'} // Basınca arenaya gitsin
                    >
                        <img
                            src="https://images.unsplash.com/photo-1541781777631-faafa1131b60?auto=format&fit=crop&q=80"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            alt="Pet 1"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-3 left-3 text-white">
                            <span className="font-bold block text-lg leading-none">Miya</span>
                            <span className="text-[10px] opacity-80 font-medium">Tekir, 2 yaşında</span>
                        </div>
                    </div>

                    {/* VS Separator (Minimal) */}
                    <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center">
                        <div className="w-1 h-12 bg-white/20 backdrop-blur-sm rounded-full absolute"></div>
                    </div>

                    {/* Right Pet */}
                    <div
                        className="flex-1 relative rounded-[24px] overflow-hidden group cursor-pointer"
                        onClick={() => window.location.href = '/arena'}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            alt="Pet 2"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-3 right-3 text-right text-white">
                            <span className="font-bold block text-lg leading-none">Garip</span>
                            <span className="text-[10px] opacity-80 font-medium">Golden, 9 aylık</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
