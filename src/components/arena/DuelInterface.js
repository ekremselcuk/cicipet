'use client';

import { useState } from 'react';

export default function DuelInterface() {
    const [voted, setVoted] = useState(false);

    return (
        <section className="px-4 mb-20">
            <div className="bg-gradient-to-b from-dark-surface to-black p-1 rounded-3xl border border-gold-primary/30 shadow-2xl">
                <div className="bg-dark-bg rounded-[20px] p-4 text-center">
                    <h3 className="font-bold text-gold mb-1 flex items-center justify-center gap-2">
                        <span>⚔️</span> ANLIK DÜELLO
                    </h3>
                    <p className="text-xs text-gray-400 mb-6">Hangisi daha "Uykucu"?</p>

                    <div className="flex justify-between items-center gap-2 relative h-64">
                        {/* Left Contestant */}
                        <div
                            onClick={() => setVoted('left')}
                            className={`flex-1 h-full rounded-2xl overflow-hidden relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10 bg-gray-800
                 ${voted === 'left' ? 'ring-4 ring-gold-primary scale-105 z-20 shadow-[0_0_30px_rgba(255,215,0,0.5)]' : voted ? 'opacity-30 blur-sm' : ''}
               `}
                        >
                            <img src="https://images.unsplash.com/photo-1541781777631-faafa1131b60?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black p-3">
                                <span className="text-white font-bold block">Miya</span>
                                {voted === 'left' && <span className="text-gold font-bold text-xs animate-slide-up">+50 Puan!</span>}
                            </div>
                        </div>

                        {/* VS Badge */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black rounded-full border-2 border-white flex items-center justify-center font-black text-white italic z-30 shadow-lg">
                            VS
                        </div>

                        {/* Right Contestant */}
                        <div
                            onClick={() => setVoted('right')}
                            className={`flex-1 h-full rounded-2xl overflow-hidden relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10 bg-gray-800
                 ${voted === 'right' ? 'ring-4 ring-gold-primary scale-105 z-20 shadow-[0_0_30px_rgba(255,215,0,0.5)]' : voted ? 'opacity-30 blur-sm' : ''}
               `}
                        >
                            <img src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black p-3">
                                <span className="text-white font-bold block">Garip</span>
                                {voted === 'right' && <span className="text-gold font-bold text-xs animate-slide-up">+50 Puan!</span>}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setVoted(false)}
                        className="mt-6 text-xs text-secondary hover:text-white underline decoration-dashed"
                    >
                        Sonrakine Geç ➜
                    </button>
                </div>
            </div>
        </section>
    );
}
