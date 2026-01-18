'use client';

import { useState } from 'react';

export default function DuelInterface() {
    const [voted, setVoted] = useState(false);

    return (
        <section className="px-4 mb-24">
            <div className="bg-white p-2 rounded-[30px] border border-orange-100 shadow-soft relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-100 rounded-full blur-3xl opacity-60"></div>

                <div className="rounded-[24px] p-2 text-center relative z-10">
                    <h3 className="font-black text-gray-800 mb-1 flex items-center justify-center gap-2 text-lg">
                        <span className="text-2xl animate-sparkle">🏆</span> ANLIK YARIŞMA
                    </h3>
                    <p className="text-xs text-gray-500 font-medium mb-6 bg-gray-50 inline-block px-3 py-1 rounded-full">
                        Hangisi daha <span className="text-orange-500 font-bold">"Uykucu"</span>?
                    </p>

                    <div className="flex justify-between items-center gap-3 relative h-72">
                        {/* Left Contestant */}
                        <div
                            onClick={() => setVoted('left')}
                            className={`flex-1 h-full rounded-[20px] overflow-hidden relative cursor-pointer transform transition-all duration-300 hover:scale-105 shadow-md hover:shadow-floating
                 ${voted === 'left' ? 'ring-4 ring-orange-400 scale-105 z-20 shadow-floating' : voted ? 'opacity-40 scale-95 grayscale' : ''}
               `}
                        >
                            <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-left">
                                <span className="text-white font-bold block text-lg shadow-black">Miya</span>
                                {voted === 'left' && <span className="text-yellow-300 font-bold text-xs animate-bounce-soft block mt-1">+50 Puan!</span>}
                            </div>
                        </div>

                        {/* VS Badge */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full flex items-center justify-center font-black text-orange-500 italic z-30 shadow-soft border-4 border-orange-50">
                            VS
                        </div>

                        {/* Right Contestant */}
                        <div
                            onClick={() => setVoted('right')}
                            className={`flex-1 h-full rounded-[20px] overflow-hidden relative cursor-pointer transform transition-all duration-300 hover:scale-105 shadow-md hover:shadow-floating
                 ${voted === 'right' ? 'ring-4 ring-orange-400 scale-105 z-20 shadow-floating' : voted ? 'opacity-40 scale-95 grayscale' : ''}
               `}
                        >
                            <img src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-left">
                                <span className="text-white font-bold block text-lg shadow-black">Garip</span>
                                {voted === 'right' && <span className="text-yellow-300 font-bold text-xs animate-bounce-soft block mt-1">+50 Puan!</span>}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setVoted(false)}
                        className="mt-6 text-xs font-bold text-gray-400 hover:text-orange-500 transition-colors bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md"
                    >
                        Sonrakine Geç ➜
                    </button>
                </div>
            </div>
        </section>
    );
}
