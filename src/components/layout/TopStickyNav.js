'use client';

import Link from 'next/link';

export default function TopStickyNav() {
    // Mock Auth State
    const isLoggedIn = true;

    const handleRefresh = () => {
        window.location.reload();
    }

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 h-16 px-4 flex justify-between items-center transition-all">
            {/* Left: Logo & Slogan */}
            <div
                onClick={handleRefresh}
                className="flex flex-col cursor-pointer hover:opacity-80 transition-opacity"
            >
                <div className="flex items-center gap-1">
                    <span className="text-2xl">🐾</span>
                    <span className="font-black text-xl text-paw-orange tracking-tight">CiciPet</span>
                </div>
                <span className="text-[10px] font-bold text-gray-400 -mt-1 tracking-wide">En Tatlı Yarışma</span>
            </div>

            {/* Right: Icon Group */}
            <div className="flex items-center gap-4">

                {/* Pet Icon */}
                <Link
                    href={isLoggedIn ? "/my-pet" : "/login"}
                    className={`flex flex-col items-center justify-center transition-all hover:scale-110 active:scale-95
            ${!isLoggedIn && 'opacity-50 grayscale'}
          `}
                >
                    <span className="text-2xl">🐶</span>
                </Link>

                {/* Competitions Icon */}
                <Link
                    href="/podyum"
                    className="flex flex-col items-center justify-center transition-all hover:scale-110 active:scale-95"
                >
                    <span className="text-2xl">🏆</span>
                </Link>

                {/* User Icon */}
                <Link
                    href={isLoggedIn ? "/profile" : "/login"}
                    className="flex flex-col items-center justify-center transition-all hover:scale-110 active:scale-95"
                >
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center border border-orange-200">
                        <span className="text-lg">👤</span>
                    </div>
                </Link>

            </div>
        </nav>
    );
}
