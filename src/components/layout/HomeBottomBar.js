'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function HomeBottomBar() {
    // Aktif sayfayı belirlemek için (gelecekte kullanılabilir)
    // const pathname = usePathname(); 

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[448px] z-50 bg-white/90 backdrop-blur-2xl border border-white/40 shadow-floating rounded-[35px] px-2 py-2 flex justify-between items-center h-16">

            {/* 1. Home (Active) */}
            <Link href="/" className="flex-1 flex flex-col items-center gap-1 group">
                <div className="p-2 rounded-xl transition-all duration-300 bg-orange-50 text-orange-500">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:scale-110">
                        <path d="M9.02 2.84L3.63 7.04C3.23 7.35 3 7.86 3 8.37V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V8.37C21 7.86 20.77 7.35 20.37 7.04L14.98 2.84C13.25 1.49 10.75 1.49 9.02 2.84Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <span className="text-[10px] font-bold text-orange-600 opacity-100 transition-opacity">Anasayfa</span>
            </Link>

            {/* 2. Podyum */}
            <Link href="/podyum" className="flex-1 flex flex-col items-center gap-1 group">
                <div className="p-2 rounded-xl text-gray-400 transition-all duration-300 group-hover:bg-gray-50 group-hover:text-gray-800">
                    <span className="text-2xl filter grayscale group-hover:grayscale-0 transition-all">🏆</span>
                </div>
                <span className="text-[10px] font-medium text-gray-400 group-hover:text-gray-800 transition-opacity">Podyum</span>
            </Link>

            {/* 3. Camera (Center / Floating) */}
            <div className="relative -top-5 flex-1 flex justify-center">
                <button className="w-16 h-16 rounded-full bg-gradient-to-tr from-paw-orange to-red-500 flex items-center justify-center shadow-lg shadow-orange-200 border-[6px] border-[#f8f9fa] transform transition-transform hover:scale-105 active:scale-95 group">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white drop-shadow-md group-hover:rotate-12 transition-transform duration-300">
                        <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            {/* 4. Market */}
            <Link href="/market" className="flex-1 flex flex-col items-center gap-1 group">
                <div className="p-2 rounded-xl text-gray-400 transition-all duration-300 group-hover:bg-gray-50 group-hover:text-gray-800">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:scale-110">
                        <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <span className="text-[10px] font-medium text-gray-400 group-hover:text-gray-800 transition-opacity">Market</span>
            </Link>

            {/* 5. Profile */}
            <Link href="/profile" className="flex-1 flex flex-col items-center gap-1 group">
                <div className="p-2 rounded-xl text-gray-400 transition-all duration-300 group-hover:bg-gray-50 group-hover:text-gray-800">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:scale-110">
                        <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <span className="text-[10px] font-medium text-gray-400 group-hover:text-gray-800 transition-opacity">Profil</span>
            </Link>

        </div>
    );
}
