
import Link from "next/link";
import { requireAuth } from "@/utils/supabase/check-auth"; // Server-side auth check

export default async function AdsDashboard() {
    await requireAuth();

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark pb-24">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-white/5 px-4 h-14 flex items-center gap-3">
                <Link href="/profil" className="p-1 -ml-1 text-slate-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">İlan İşlemleri</h1>
            </header>

            <main className="p-4 flex flex-col gap-6">
                <div className="bg-gradient-to-br from-primary to-blue-400 rounded-3xl p-6 text-white shadow-lg shadow-primary/20">
                    <h2 className="text-2xl font-bold mb-2">Hangi İlanı Vermek İstersin?</h2>
                    <p className="text-white/90 text-sm">Sevimli dostlarımız için doğru yerdesin. İhtiyacına uygun kategoriyi seç ve ilanını oluştur.</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {/* Kayıp İlanı */}
                    <Link href="/ilanlar/kayip/ekle" className="flex items-center gap-4 bg-white dark:bg-surface-dark p-4 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:border-red-400 hover:shadow-md transition-all group">
                        <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-3xl">search</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Kayıp İlanı Ver</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Kaybolan dostunu bulmana yardım edelim.</p>
                        </div>
                        <span className="material-symbols-outlined text-gray-300 group-hover:text-red-500 transition-colors">chevron_right</span>
                    </Link>

                    {/* Eş Bulma */}
                    <Link href="/ilanlar/es-bulma/ekle" className="flex items-center gap-4 bg-white dark:bg-surface-dark p-4 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:border-pink-400 hover:shadow-md transition-all group">
                        <div className="w-14 h-14 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Eş Bul</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Dostuna uygun bir arkadaş bul.</p>
                        </div>
                        <span className="material-symbols-outlined text-gray-300 group-hover:text-pink-500 transition-colors">chevron_right</span>
                    </Link>

                    {/* Sahiplendirme */}
                    <Link href="/ilanlar/sahiplendirme/ekle" className="flex items-center gap-4 bg-white dark:bg-surface-dark p-4 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:border-green-400 hover:shadow-md transition-all group">
                        <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-3xl">volunteer_activism</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Sahiplendir</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Yeni bir yuva arayan dostlar için.</p>
                        </div>
                        <span className="material-symbols-outlined text-gray-300 group-hover:text-green-500 transition-colors">chevron_right</span>
                    </Link>

                    {/* Diğer (Future) */}
                    <div className="flex items-center gap-4 bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-transparent opacity-60 grayscale cursor-not-allowed">
                        <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-gray-500">
                            <span className="material-symbols-outlined text-3xl">more_horiz</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-slate-700 dark:text-gray-300 text-lg">Diğer İlanlar</h3>
                            <p className="text-xs text-gray-400">Yakında hizmetinizde.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
