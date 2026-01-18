import Link from 'next/link';

export default function BottomNav() {
    return (
        <nav className="fixed bottom-6 left-4 right-4 max-w-[448px] mx-auto bg-white/90 backdrop-blur-xl border border-white p-3 rounded-[30px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex justify-between items-center z-50">
            <Link href="/" className="flex flex-col items-center text-gray-400 hover:text-orange-500 w-16 transition-colors">
                <span className="text-2xl mb-0.5">🏠</span>
                <span className="text-[10px] font-bold">Ev</span>
            </Link>

            <Link href="/arena" className="flex flex-col items-center text-gray-400 hover:text-orange-500 w-16 transition-colors">
                <span className="text-2xl mb-0.5">🏆</span>
                <span className="text-[10px] font-bold">Arena</span>
            </Link>

            <div className="relative -top-8">
                <button className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-400 to-yellow-400 flex items-center justify-center shadow-floating border-4 border-white transition-transform hover:-translate-y-1 active:scale-95">
                    <span className="text-3xl text-white drop-shadow-md">📸</span>
                </button>
            </div>

            <Link href="/market" className="flex flex-col items-center text-gray-400 hover:text-orange-500 w-16 transition-colors">
                <span className="text-2xl mb-0.5">🛍️</span>
                <span className="text-[10px] font-bold">Market</span>
            </Link>

            <Link href="/profile" className="flex flex-col items-center text-gray-400 hover:text-orange-500 w-16 transition-colors">
                <span className="text-2xl mb-0.5">👤</span>
                <span className="text-[10px] font-bold">Profil</span>
            </Link>
        </nav>
    );
}
