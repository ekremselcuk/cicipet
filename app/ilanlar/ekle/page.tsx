'use client';

import Link from "next/link";

export default function AddAdLandingPage() {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark pb-24 font-display">
            <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-white/5 px-4 h-14 flex items-center gap-3">
                <Link href="/profil" className="p-1 -ml-1 text-slate-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">İlan Ver</h1>
            </header>

            <main className="p-4 flex flex-col gap-4">
                <p className="text-sm text-gray-500 mb-2">Hangi konuda ilan vermek istiyorsunuz?</p>

                <Link href="/ilanlar/sahiplendirme/ekle" className="group flex items-center gap-4 p-4 bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 hover:border-green-500 hover:shadow-md transition-all">
                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[28px]">pets</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-slate-900 dark:text-white">Sahiplendirme</h3>
                        <p className="text-xs text-gray-500">Yuva arayan dostunuz için ilan oluşturun.</p>
                    </div>
                    <span className="material-symbols-outlined text-gray-300 group-hover:text-green-500">chevron_right</span>
                </Link>

                <Link href="/ilanlar/es-bulma/ekle" className="group flex items-center gap-4 p-4 bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 hover:border-pink-500 hover:shadow-md transition-all">
                    <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-slate-900 dark:text-white">Eş Bulma</h3>
                        <p className="text-xs text-gray-500">Dostunuz için oyun veya hayat arkadaşı bulun.</p>
                    </div>
                    <span className="material-symbols-outlined text-gray-300 group-hover:text-pink-500">chevron_right</span>
                </Link>

                <Link href="/ilanlar/kayip/ekle" className="group flex items-center gap-4 p-4 bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 hover:border-red-500 hover:shadow-md transition-all">
                    <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[28px]">campaign</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-slate-900 dark:text-white">Kayıp İlanı</h3>
                        <p className="text-xs text-gray-500">Kaybolan dostunuzu bulmak için destek isteyin.</p>
                    </div>
                    <span className="material-symbols-outlined text-gray-300 group-hover:text-red-500">chevron_right</span>
                </Link>

            </main>
        </div>
    );
}
