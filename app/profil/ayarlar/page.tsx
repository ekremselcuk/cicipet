
import { requireAuth } from "@/utils/supabase/check-auth";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
    const user = await requireAuth();
    const supabase = await createClient();

    // Fetch current data
    const { data: userProfile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

    const displayName = userProfile?.full_name || user.user_metadata?.full_name || "";
    const email = user.email || "";
    const phone = userProfile?.phone || "";

    // Server action could be here or separate file. 
    // For simplicity MVP we will render the form. For real implementation, 
    // we would use Server Actions `updateProfile`.

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark pb-safe">
            <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-white/5 px-4 h-14 flex items-center gap-3">
                <Link href="/profil" className="p-1 -ml-1 text-slate-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">Profil Ayarları</h1>
            </header>

            <main className="p-4 flex flex-col gap-6">
                <div className="flex flex-col items-center gap-4 py-4">
                    <div className="relative">
                        <img
                            src={userProfile?.avatar_url || user.user_metadata?.avatar_url || "https://via.placeholder.com/100"}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-surface-dark shadow-md"
                        />
                        <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full border-2 border-white dark:border-surface-dark shadow-sm">
                            <span className="material-symbols-outlined text-sm">photo_camera</span>
                        </button>
                    </div>
                    <p className="text-sm text-gray-500">Profil Fotoğrafını Değiştir</p>
                </div>

                <form className="flex flex-col gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700 dark:text-gray-300 ml-1">Ad Soyad</label>
                        <input
                            type="text"
                            defaultValue={displayName}
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                            placeholder="Adınız Soyadınız"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700 dark:text-gray-300 ml-1">E-posta</label>
                        <input
                            type="email"
                            defaultValue={email}
                            readOnly
                            className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-white/5 border border-transparent text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        />
                        <p className="text-[10px] text-gray-400 ml-1">E-posta adresi değiştirilemez.</p>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700 dark:text-gray-300 ml-1">Telefon Numarası</label>
                        <input
                            type="tel"
                            defaultValue={phone}
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                            placeholder="+90 5XX XXX XX XX"
                        />
                    </div>

                    <div className="space-y-1 mt-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-gray-300 ml-1">Şifre İşlemleri</label>
                        <button type="button" className="w-full py-3 px-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-surface-dark text-slate-700 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center justify-between group">
                            <span>Şifre Değiştir</span>
                            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">chevron_right</span>
                        </button>
                    </div>

                    <div className="flex-1"></div>

                    <button type="submit" className="w-full py-4 bg-primary text-slate-900 font-bold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] transition-all mt-4">
                        Değişiklikleri Kaydet
                    </button>
                </form>
            </main>
        </div>
    );
}
