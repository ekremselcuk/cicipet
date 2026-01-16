import Link from 'next/link';

export default function BottomNav() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-dark-bg/90 backdrop-blur-md border-t border-white/10 p-4 flex justify-between items-center z-50">
            <Link href="/" className="flex flex-col items-center text-gold">
                <span className="text-2xl">🏠</span>
                <span className="text-xs mt-1">Ev</span>
            </Link>

            <Link href="/arena" className="flex flex-col items-center text-secondary hover:text-white transition-colors">
                <span className="text-2xl">⚔️</span>
                <span className="text-xs mt-1">Arena</span>
            </Link>

            <div className="relative -top-6">
                <button className="w-14 h-14 rounded-full bg-gold-primary flex items-center justify-center shadow-lg shadow-gold-primary/30 animate-pulse">
                    <span className="text-2xl text-black">📸</span>
                </button>
            </div>

            <Link href="/market" className="flex flex-col items-center text-secondary hover:text-white transition-colors">
                <span className="text-2xl">🛍️</span>
                <span className="text-xs mt-1">Market</span>
            </Link>

            <Link href="/profile" className="flex flex-col items-center text-secondary hover:text-white transition-colors">
                <span className="text-2xl">👤</span>
                <span className="text-xs mt-1">Profil</span>
            </Link>
        </nav>
    );
}
