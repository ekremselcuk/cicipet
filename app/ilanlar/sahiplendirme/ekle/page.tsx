
import { requireAuth } from "@/utils/supabase/check-auth";
import Link from "next/link";

export default async function AdoptionAdPage() {
    await requireAuth();

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark pb-24">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-white/5 px-4 h-14 flex items-center gap-3">
                <Link href="/ilanlar" className="p-1 -ml-1 text-slate-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">Sahiplendir</h1>
            </header>

            <main className="p-4">
                <form className="flex flex-col gap-6">
                    {/* Photo Upload Area */}
                    <div className="flex flex-col items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-green-300 rounded-2xl cursor-pointer bg-green-50 dark:bg-green-900/10 hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-green-400">
                                <span className="material-symbols-outlined text-4xl mb-2">volunteer_activism</span>
                                <p className="text-sm font-semibold">Fotoğrafı Ekle</p>
                                <p className="text-xs opacity-70">Yeni yuva arayan dostumuz</p>
                            </div>
                            <input type="file" className="hidden" accept="image/*" />
                        </label>
                    </div>

                    {/* Category Selection */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-gray-300 ml-1">Kategorisi</label>
                        <div className="grid grid-cols-3 gap-3">
                            <label className="cursor-pointer">
                                <input type="radio" name="category" value="kedi" className="peer hidden" />
                                <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-surface-dark peer-checked:border-green-500 peer-checked:bg-green-50 dark:peer-checked:bg-green-900/20 peer-checked:text-green-600 transition-all">
                                    <span className="material-symbols-outlined">pets</span>
                                    <span className="text-xs font-bold">Kedi</span>
                                </div>
                            </label>
                            <label className="cursor-pointer">
                                <input type="radio" name="category" value="kopek" className="peer hidden" />
                                <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-surface-dark peer-checked:border-green-500 peer-checked:bg-green-50 dark:peer-checked:bg-green-900/20 peer-checked:text-green-600 transition-all">
                                    <span className="material-symbols-outlined">cruelty_free</span>
                                    <span className="text-xs font-bold">Köpek</span>
                                </div>
                            </label>
                            <label className="cursor-pointer">
                                <input type="radio" name="category" value="diger" className="peer hidden" />
                                <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-surface-dark peer-checked:border-green-500 peer-checked:bg-green-50 dark:peer-checked:bg-green-900/20 peer-checked:text-green-600 transition-all">
                                    <span className="material-symbols-outlined">more_horiz</span>
                                    <span className="text-xs font-bold">Diğer</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 dark:text-gray-300 ml-1">Cinsi</label>
                            <input type="text" placeholder="Örn: Tekir" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all dark:text-white text-sm" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 dark:text-gray-300 ml-1">Yaşı</label>
                            <input type="number" placeholder="Örn: 1" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all dark:text-white text-sm" />
                        </div>
                    </div>

                    {/* Description Textarea */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700 dark:text-gray-300 ml-1">Karakter Özellikleri / Hikayesi</label>
                        <textarea rows={4} placeholder="Neden sahiplendiriyorsunuz? Huyu nasıl? Aşıları tam mı?" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all dark:text-white text-sm resize-none"></textarea>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full py-4 bg-green-500 text-white font-bold rounded-2xl shadow-lg shadow-green-500/30 hover:shadow-green-500/50 active:scale-[0.98] transition-all mt-2 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">check_circle</span>
                        Sahiplendirme İlanı Oluştur
                    </button>
                    <p className="text-[10px] text-center text-gray-400 px-4">
                        *İlanınız yönetici onayından geçtikten sonra yayınlanacaktır.
                    </p>
                </form>
            </main>
        </div>
    );
}
