"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/' && pathname === '/') return true;
        if (path !== '/' && pathname.startsWith(path)) return true;
        return false;
    };

    const getItemClass = (path: string) => {
        const active = isActive(path);
        // Active: Primary Color, Full Opacity. Inactive: Slate-400, Lower opacity or just gray.
        // User asked: "soluk olsun" for others. Active one "belirgin olsun".
        return `flex flex-col items-center gap-1 p-2 transition-colors ${active
                ? 'text-primary dark:text-primary font-bold'
                : 'text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400'
            }`;
    };

    return (
        <nav className="fixed bottom-0 z-50 w-full border-t border-slate-200 bg-white/95 dark:bg-background-dark/95 dark:border-slate-800 pb-safe backdrop-blur-lg transition-all duration-300">
            <div className="flex h-16 items-center justify-around px-2">
                <Link href="/" className={getItemClass('/')}>
                    <span className={`material-symbols-outlined text-2xl ${isActive('/') ? 'filled' : ''}`} style={isActive('/') ? { fontVariationSettings: "'FILL' 1" } : {}}>home</span>
                    <span className="text-[10px] font-medium">Anasayfa</span>
                </Link>

                <Link href="/pazar" className={getItemClass('/pazar')}>
                    <span className={`material-symbols-outlined text-2xl ${isActive('/pazar') ? 'filled' : ''}`} style={isActive('/pazar') ? { fontVariationSettings: "'FILL' 1" } : {}}>storefront</span>
                    <span className="text-[10px] font-medium">Pazar</span>
                </Link>

                <div className="relative -top-5">
                    <Link href="/yarisma">
                        {/* Center button always kept same design, maybe just slightly fade if not active? User said "design shouldn't change". I will keep it as is. */}
                        <button className={`flex h-14 w-14 flex-col items-center justify-center rounded-full shadow-lg shadow-primary/40 ring-4 ring-white dark:ring-background-dark transition-transform active:scale-95 ${isActive('/yarisma') ? 'bg-primary' : 'bg-primary/90'}`}>
                            <span className="material-symbols-outlined text-3xl text-white fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                        </button>
                        <span className={`absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-bold whitespace-nowrap ${isActive('/yarisma') ? 'text-primary' : 'text-primary/70'}`}>Yarışmalar</span>
                    </Link>
                </div>

                <Link href="/barinaklar" className={getItemClass('/barinaklar')}>
                    <span className={`material-symbols-outlined text-2xl ${isActive('/barinaklar') ? 'filled' : ''}`} style={isActive('/barinaklar') ? { fontVariationSettings: "'FILL' 1" } : {}}>volunteer_activism</span>
                    <span className="text-[10px] font-medium">Barınaklar</span>
                </Link>

                <Link href="/profil" className={getItemClass('/profil')}>
                    <span className={`material-symbols-outlined text-2xl ${isActive('/profil') ? 'filled' : ''}`} style={isActive('/profil') ? { fontVariationSettings: "'FILL' 1" } : {}}>person</span>
                    <span className="text-[10px] font-medium">Profil</span>
                </Link>
            </div>
            <div className="h-4 w-full"></div>
        </nav>
    );
}
