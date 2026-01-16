'use client'; // Needs interaction

import { useState } from 'react';

export default function ProofOfCare() {
    const [streak, setStreak] = useState(12);

    return (
        <section className="px-4 mb-8">
            <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl p-5 border border-white/10 shadow-xl relative overflow-hidden">
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-primary/10 rounded-full blur-3xl -mr-10 -mt-10"></div>

                <div className="flex justify-between items-start mb-6 relative z-10">
                    <div>
                        <h3 className="text-lg font-bold text-white">Günlük Bakım</h3>
                        <p className="text-xs text-gray-400">Bugünkü görevlerini tamamla, enerjiyi fulle!</p>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1 text-orange-500">
                            <span className="text-xl animate-pulse">🔥</span>
                            <span className="text-2xl font-black italic">{streak}</span>
                        </div>
                        <span className="text-[9px] text-gray-500 uppercase tracking-widest">GÜNLÜK SERİ</span>
                    </div>
                </div>

                <div className="flex justify-between gap-2 relative z-10">
                    <CareButton icon="🍖" label="Besledim" />
                    <CareButton icon="🎾" label="Oynadım" />
                    <CareButton icon="🚿" label="Taradım" />
                </div>
            </div>
        </section>
    );
}

function CareButton({ icon, label }) {
    const [active, setActive] = useState(false);

    return (
        <button
            onClick={() => setActive(!active)}
            className={`flex-1 flex flex-col items-center justify-center py-4 rounded-xl border transition-all duration-300
        ${active
                    ? 'bg-gold-primary text-black border-gold-primary shadow-[0_0_15px_rgba(255,215,0,0.5)] transform scale-95'
                    : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                }
      `}
        >
            <span className="text-2xl mb-1">{icon}</span>
            <span className="text-xs font-bold">{label}</span>
        </button>
    );
}
