'use client';

import Link from 'next/link';

export default function TopStickyNav() {
    // Mock Auth State
    const isLoggedIn = true;

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 h-16 px-4 flex justify-between items-center transition-all">
            {/* Left: Logo & Slogan */}
            <Link
                href="/"
                className="flex flex-col hover:opacity-80 transition-opacity"
            >
                <div className="flex items-center gap-1">
                    <span className="text-2xl text-turkuaz-blue">🐾</span>
                    <h1 className="font-black text-xl tracking-tight">
                        <span className="text-paw-orange">Cici</span>
                        <span className="text-turkuaz-blue">Pet</span>
                    </h1>
                </div>
                <span className="text-[10px] font-bold text-gray-400 -mt-1 tracking-wide">En Tatlı Yarışma</span>
            </Link>

            {/* Right: Icon Group */}
            <div className="flex items-center gap-5">

                {/* Pet Icon */}
                <Link
                    href={isLoggedIn ? "/my-pet" : "/login"}
                    className={`flex flex-col items-center justify-center transition-all hover:scale-110 active:scale-95 text-gray-500 hover:text-turkuaz-blue
            ${!isLoggedIn && 'opacity-50 grayscale'}
          `}
                >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4.5 9.5V19a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V9.5" />
                        <path d="M6.5 9.5C6.5 7 9 5 12 5s5.5 2 5.5 4.5" />
                        <path d="M12 13a2 2 0 0 0-2-2 2 2 0 0 0-2 2" />
                        <path d="M12 13a2 2 0 0 1 2-2 2 2 0 0 1 2 2" />
                        <path d="M9 13v2" />
                        <path d="M15 13v2" />
                    </svg>
                </Link>

                {/* Competitions Icon */}
                <Link
                    href="/podyum"
                    className="flex flex-col items-center justify-center transition-all hover:scale-110 active:scale-95 text-gray-500 hover:text-turkuaz-blue"
                >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                        <path d="M4 22h16" />
                        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                    </svg>
                </Link>

                {/* User Icon */}
                <Link
                    href={isLoggedIn ? "/profile" : "/login"}
                    className="flex flex-col items-center justify-center transition-all hover:scale-110 active:scale-95 text-gray-500 hover:text-turkuaz-blue"
                >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                </Link>

            </div>
        </nav>
    );
}
