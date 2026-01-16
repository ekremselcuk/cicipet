'use client';

import { useState } from 'react';

export default function ProofOfCare() {
    const [streak, setStreak] = useState(12);

    return (
        <section className="px-4 mb-8">
            <div className="bg-white rounded-[30px] p-6 shadow-soft border border-white relative overflow-hidden">
                {/* Decorative Blob */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-50"></div>

                <div className="flex justify-between items-start mb-6 relative z-10">
                    <div>
                        <h3 className="text-lg font-black text-gray-800">Günlük Bakım 🌿</h3>
                        <p className="text-xs text-gray-500 font-medium">Görevleri tamamla, sevgini göster!</p>
                    </div>
                    <div className="flex flex-col items-end bg-orange-50 px-3 py-1 rounded-xl">
                        <div className="flex items-center gap-1 text-orange-500">
                            <span className="text-xl animate-bounce-soft">🔥</span>
                            <span className="text-xl font-black">{streak}</span>
                        </div>
                        <span className="text-[9px] font-bold text-orange-300 uppercase">GÜN SERİ</span>
                    </div>
                </div>

                <div className="flex justify-between gap-3 relative z-10">
                    <CareButton icon="🍖" label="Besledim" color="bg-orange-100/50 text-orange-600 hover:bg-orange-200" activeColor="bg-orange-500 text-white" />
                    <CareButton icon="🎾" label="Oynadım" color="bg-blue-100/50 text-blue-600 hover:bg-blue-200" activeColor="bg-blue-500 text-white" />
                    <CareButton icon="🚿" label="Taradım" color="bg-purple-100/50 text-purple-600 hover:bg-purple-200" activeColor="bg-purple-500 text-white" />
                </div>
            </div>
        </section>
    );
}

function CareButton({ icon, label, color, activeColor }) {
    const [active, setActive] = useState(false);

    return (
        <button
            onClick={() => setActive(!active)}
            className={`flex-1 flex flex-col items-center justify-center py-4 rounded-2xl transition-all duration-300
        ${active
                    ? `${activeColor} shadow-floating transform scale-95 ring-2 ring-white`
                    : `${color} hover:-translate-y-1`
                }
      `}
        >
            <span className="text-3xl mb-1 filter drop-shadow-sm">{icon}</span>
            <span className="text-xs font-bold">{label}</span>
            {active && <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>}
        </button>
    );
}
