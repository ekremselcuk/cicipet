import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function HomeBottomBar() {
    // Aktif sayfayı belirlemek için (gelecekte kullanılabilir)
    // const pathname = usePathname(); 

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50 bg-white/90 backdrop-blur-xl border border-white/20 shadow-floating rounded-full px-2 py-2 flex justify-between items-center">

            {/* Home Tab */}
            <Link href="/" className="flex-1">
                <button className="w-full h-12 rounded-full flex items-center justify-center gap-2 transition-all group hover:bg-gray-50 active:scale-95">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-400 group-hover:text-gray-800 transition-colors">
                        <path d="M9.02 2.84L3.63 7.04C3.23 7.35 3 7.86 3 8.37V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V8.37C21 7.86 20.77 7.35 20.37 7.04L14.98 2.84C13.25 1.49 10.75 1.49 9.02 2.84Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 21V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </Link>

            {/* Arena Tab (Center - Featured) */}
            <Link href="/arena" className="flex-1 relative -top-6">
                <button className="w-16 h-16 mx-auto bg-gradient-to-tr from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-200 hover:scale-105 transition-all group active:scale-95 ring-4 ring-white">
                    {/* Sword Icon */}
                    <span className="text-2xl filter drop-shadow-md group-hover:animate-wiggle">⚔️</span>
                </button>
            </Link>

            {/* Market Tab */}
            <Link href="/market" className="flex-1">
                <button className="w-full h-12 rounded-full flex items-center justify-center gap-2 transition-all group hover:bg-gray-50 active:scale-95">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-400 group-hover:text-gray-800 transition-colors">
                        <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </Link>

        </div>
    );
}
