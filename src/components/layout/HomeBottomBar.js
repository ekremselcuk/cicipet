import Link from 'next/link';

export default function HomeBottomBar() {
    return (
        <div className="fixed bottom-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-t border-gray-100 px-4 py-4 flex justify-between items-center gap-4">

            {/* Left: Duel Button */}
            <Link href="/arena" className="flex-[2]">
                <button className="w-full h-14 bg-gradient-to-r from-paw-orange to-red-500 rounded-2xl flex items-center justify-center gap-2 shadow-lg text-white font-black text-lg hover:brightness-110 active:scale-95 transition-all">
                    <span className="text-2xl animate-pulse">⚔️</span>
                    <span>DÜELLO</span>
                </button>
            </Link>

            {/* Right: Market Button */}
            <Link href="/market" className="flex-1">
                <button className="w-full h-14 bg-white rounded-2xl flex items-center justify-center gap-2 shadow-sm text-gray-800 font-bold hover:bg-gray-50 active:scale-95 transition-all border border-gray-100">
                    <span className="text-2xl">🛍️</span>
                </button>
            </Link>
        </div>
    );
}
