
import { requireAuth } from "@/utils/supabase/check-auth";
import Link from "next/link";

export default async function LostAdPage() {
    await requireAuth();

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark pb-24">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-white/5 px-4 h-14 flex items-center gap-3">
                <Link href="/ilanlar" className="p-1 -ml-1 text-slate-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">Kayıp İlanı Ver</h1>
            </header>

            <main className="p-4">
                <form className="flex flex-col gap-6">
                    {/* Photo Upload Area */}
                    <div className="flex flex-col items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-red-300 rounded-2xl cursor-pointer bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-red-400">
                                <span className="material-symbols-outlined text-4xl mb-2">add_a_photo</span>
                                <p className="text-sm font-semibold">Kayıp Dostunun Fotoğrafını Ekle</p>
                                <p className="text-xs opacity-70">En net fotoğrafı seçmeye çalış</p>
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
                                <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-surface-dark peer-checked:border-red-500 peer-checked:bg-red-50 dark:peer-checked:bg-red-900/20 peer-checked:text-red-600 transition-all">
                                    <span className="material-symbols-outlined">pets</span>
                                    <span className="text-xs font-bold">Kedi</span>
                                </div>
                            </label>
                            <label className="cursor-pointer">
                                <input type="radio" name="category" value="kopek" className="peer hidden" />
                                <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-surface-dark peer-checked:border-red-500 peer-checked:bg-red-50 dark:peer-checked:bg-red-900/20 peer-checked:text-red-600 transition-all">
                                    <span className="material-symbols-outlined">cruelty_free</span>
                                    <span className="text-xs font-bold">Köpek</span>
                                </div>
                            </label>
                            <label className="cursor-pointer">
                                <input type="radio" name="category" value="diger" className="peer hidden" />
                                <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-surface-dark peer-checked:border-red-500 peer-checked:bg-red-50 dark:peer-checked:bg-red-900/20 peer-checked:text-red-600 transition-all">
                                    <span className="material-symbols-outlined">more_horiz</span>
                                    <span className="text-xs font-bold">Diğer</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 dark:text-gray-300 ml-1">Cinsi (Irkı)</label>
                            <input type="text" placeholder="Örn: Tekir" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all dark:text-white text-sm" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 dark:text-gray-300 ml-1">Yaşı</label>
                            <input type="number" placeholder="Örn: 2" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all dark:text-white text-sm" />
                        </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700 dark:text-gray-300 ml-1">Kaybolduğu Yer (İlçe/Semt)</label>
                        <div className="relative">
                            <span className="absolute left-3 top-3.5 material-symbols-outlined text-gray-400 text-[20px]">location_on</span>
                            <input type="text" placeholder="Örn: Kadıköy / Moda" className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all dark:text-white text-sm" />
                        </div>
                    </div>

                    {/* Description Textarea */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700 dark:text-gray-300 ml-1">Detaylı Açıklama</label>
                        <textarea rows={4} placeholder="Nasıl kayboldu? Tasması var mıydı? Belirgin özellikleri neler?" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all dark:text-white text-sm resize-none"></textarea>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full py-4 bg-red-500 text-white font-bold rounded-2xl shadow-lg shadow-red-500/30 hover:shadow-red-500/50 active:scale-[0.98] transition-all mt-2 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">campaign</span>
                        Kayıp İlanı Yayınla
                    </button>
                    <p className="text-[10px] text-center text-gray-400 px-4">
                        *İlanınız yönetici onayından geçtikten sonra yayınlanacaktır.
                    </p>

                </form>
            </main>
        </div>
    );
}
