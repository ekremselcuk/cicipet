import Link from 'next/link';

export default function Header() {
    return (
        <header className="p-4 bg-dark-card sticky top-0 z-50 glass-panel mb-4" style={{ margin: '16px', marginTop: '16px' }}>
            {/* Top Bar: Wallet & Daily Status */}
            <div className="flex justify-between items-center mb-4">
                {/* Wallet */}
                <div className="flex items-center gap-2 bg-dark-surface p-2 rounded-full border border-gold-primary/20">
                    <div className="w-8 h-8 rounded-full bg-gold-primary flex items-center justify-center text-black font-bold">
                        P
                    </div>
                    <div className="flex flex-col pr-2">
                        <span className="text-gold font-bold text-sm">1,250 PP</span>
                        <span className="text-xs text-muted">Bugün 3 cana dokundun</span>
                    </div>
                </div>

                {/* Proof of Care Quick Actions */}
                <div className="flex gap-2">
                    <button className="care-btn p-2 rounded-full bg-dark-surface border border-gray-700 hover:border-gold-primary transition-colors">
                        🍖
                    </button>
                    <button className="care-btn p-2 rounded-full bg-dark-surface border border-gray-700 hover:border-gold-primary transition-colors">
                        🎾
                    </button>
                </div>
            </div>

            {/* Stories (Simplified for Prototype) */}
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex flex-col items-center gap-1 min-w-[60px]">
                        <div className={`w-14 h-14 rounded-full border-2 p-1 ${i === 1 ? 'border-gold-primary animate-pulse' : 'border-gray-700'}`}>
                            <div className="w-full h-full rounded-full bg-gray-600 overflow-hidden">
                                <img src={`https://placehold.co/100x100?text=Pet${i}`} alt="Story" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <span className="text-xs text-secondary truncate w-full text-center">Pet {i}</span>
                    </div>
                ))}
            </div>
        </header>
    );
}
