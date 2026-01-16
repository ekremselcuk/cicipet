import Link from 'next/link';

export default function Header() {
    return (
        <header className="p-4 sticky top-0 z-50 glass-panel mb-6 mx-4 mt-4 shadow-sm">
            {/* Top Bar: Wallet & Daily Status */}
            <div className="flex justify-between items-center mb-4">
                {/* Wallet */}
                <div className="flex items-center gap-2 bg-white/60 p-2 pr-4 rounded-full shadow-inner border border-white/40">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 flex items-center justify-center text-white font-black shadow-md transform rotate-3">
                        P
                    </div>
                    <div className="flex flex-col">
                        <span className="text-color-paw-dark font-bold text-sm leading-none">1,250 PP</span>
                        <span className="text-[10px] text-text-muted font-semibold">3 Pati Doydu 🐾</span>
                    </div>
                </div>

                {/* Proof of Care Quick Actions */}
                <div className="flex gap-2">
                    <button className="care-btn w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-xl hover:scale-110 transition-transform active:shadow-inset">
                        🍖
                    </button>
                    <button className="care-btn w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-xl hover:scale-110 transition-transform active:shadow-inset">
                        🎾
                    </button>
                </div>
            </div>

            {/* Stories (Soft Circles) */}
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar pl-1">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex flex-col items-center gap-1 min-w-[64px] group cursor-pointer">
                        <div className={`w-16 h-16 rounded-full p-1 transition-transform group-hover:-translate-y-1 ${i === 1 ? 'bg-gradient-to-tr from-orange-300 to-red-400 shadow-lg shadow-orange-200' : 'bg-gray-200'}`}>
                            <div className="w-full h-full rounded-full bg-white border-2 border-white overflow-hidden">
                                <img src={`https://placehold.co/100x100?text=Pet${i}`} alt="Story" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <span className="text-xs font-bold text-gray-500 w-full text-center truncate group-hover:text-orange-400 transition-colors">Pet {i}</span>
                    </div>
                ))}
            </div>
        </header>
    );
}
