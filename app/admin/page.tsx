import { requireAdmin } from "@/utils/supabase/check-auth";
import MenuTrigger from "@/components/admin/MenuTrigger";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function AdminPage() {
    await requireAdmin();
    const supabase = await createClient();

    // Fetch Stats
    const { count: userCount } = await supabase.from('users').select('*', { count: 'exact', head: true });
    const { count: petCount } = await supabase.from('pets').select('*', { count: 'exact', head: true });
    const { count: adCount } = await supabase.from('ads').select('*', { count: 'exact', head: true });

    const { count: pendingPetCount } = await supabase.from('pets').select('*', { count: 'exact', head: true }).eq('status', 'pending');
    const { count: pendingAdCount } = await supabase.from('ads').select('*', { count: 'exact', head: true }).eq('status', 'pending');


    return (
        <div className="relative flex min-h-screen w-full flex-col pb-24 bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-x-hidden antialiased">
            {/* Top App Bar - Admin */}
            <header className="sticky top-0 z-50 flex items-center justify-between bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 pb-2 border-b border-black/5 dark:border-[#362b1b]">
                <div className="flex items-center gap-4">
                    <MenuTrigger />
                    <h1 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">Admin Paneli</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button className="relative flex items-center justify-center rounded-full p-2 text-slate-600 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-2xl">notifications</span>
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
                    </button>
                    <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary cursor-pointer">
                        <img
                            alt="Admin Profile Picture"
                            className="h-full w-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZ94qgkbollPIvN49rtKnnkvvMZ-_pA4dd8xXSs2W-0VLnAVLS61R_P7-ufL0cZUWaXs_uz0FtHFI2IWOid9tdUBLgmnmsytbn72Z-GaXnWu7_xhgrOaRMGyUXdr3vOd2yH4TxCYgbMapVfeYlE1ZcKdQ7xXhCgTo6wbqbqAa2ehFwvY2O_P4D8PtgM9GgfNj8l6jQyYdD0QPMt1WLFgFsWH9G5bTJ21MfT5x9OVGwOtwNI6orxVhgBidITVShGVZBZGj0-WxwC88"
                        />
                    </div>
                </div>
            </header>

            {/* Search Bar */}
            <div className="px-4 py-4">
                <div className="relative flex w-full items-center rounded-xl bg-[#362b1b] h-12">
                    <div className="flex items-center justify-center pl-4 text-[#cbb690]">
                        <span className="material-symbols-outlined text-2xl">search</span>
                    </div>
                    <input
                        className="flex w-full flex-1 bg-transparent px-4 py-2 text-base text-white placeholder-[#cbb690] focus:outline-none focus:ring-0 border-none rounded-xl"
                        placeholder="Kullanıcı, Pet veya Yarışma ara..."
                        type="text"
                    />
                </div>
            </div>

            {/* Section: Genel Bakış (Stats) */}
            <div className="px-4 pb-2">
                <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight mb-4">Genel Bakış</h2>
                <div className="grid grid-cols-2 gap-3">
                    {/* Stat Card 1 - Users */}
                    <Link href="/admin/kullanicilar" className="flex flex-col gap-2 rounded-xl bg-white dark:bg-[#362b1b] p-4 shadow-sm border border-black/5 dark:border-transparent hover:border-primary/50 transition-colors">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                                <span className="material-symbols-outlined text-lg">group</span>
                            </div>
                            <p className="text-slate-500 dark:text-[#cbb690] text-sm font-medium">Kullanıcılar</p>
                        </div>
                        <div>
                            <p className="text-slate-900 dark:text-white text-2xl font-bold">{userCount || 0}</p>
                            <p className="text-[#0bda19] text-xs font-medium flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">trending_up</span> Aktif
                            </p>
                        </div>
                    </Link>
                    {/* Stat Card 2 - Pets */}
                    <Link href="/admin/petler" className="flex flex-col gap-2 rounded-xl bg-white dark:bg-[#362b1b] p-4 shadow-sm border border-black/5 dark:border-transparent hover:border-primary/50 transition-colors">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                                <span className="material-symbols-outlined text-lg">pets</span>
                            </div>
                            <p className="text-slate-500 dark:text-[#cbb690] text-sm font-medium">Petler</p>
                        </div>
                        <div>
                            <p className="text-slate-900 dark:text-white text-2xl font-bold">{petCount || 0}</p>
                            <p className="text-slate-400 dark:text-gray-400 text-xs font-medium flex items-center gap-1">
                                {(pendingPetCount || 0) > 0 ? (
                                    <span className="text-orange-500 font-bold">{pendingPetCount} Onay Bekliyor</span>
                                ) : (
                                    <span>Tümü Onaylı</span>
                                )}
                            </p>
                        </div>
                    </Link>
                    {/* Stat Card 3 - Ads */}
                    <Link href="/admin/moderasyon" className="flex flex-col gap-2 rounded-xl bg-white dark:bg-[#362b1b] p-4 shadow-sm border border-black/5 dark:border-transparent hover:border-primary/50 transition-colors">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                                <span className="material-symbols-outlined text-lg">campaign</span>
                            </div>
                            <p className="text-slate-500 dark:text-[#cbb690] text-sm font-medium">İlanlar</p>
                        </div>
                        <div>
                            <p className="text-slate-900 dark:text-white text-2xl font-bold">{adCount || 0}</p>
                            <p className="text-slate-400 dark:text-gray-400 text-xs font-medium flex items-center gap-1">
                                {(pendingAdCount || 0) > 0 ? (
                                    <span className="text-orange-500 font-bold">{pendingAdCount} Onay Bekliyor</span>
                                ) : (
                                    <span>Tümü Onaylı</span>
                                )}
                            </p>
                        </div>
                    </Link>
                    {/* Stat Card 4 - Contests (Static) */}
                    <div className="flex flex-col gap-2 rounded-xl bg-white dark:bg-[#362b1b] p-4 shadow-sm border border-black/5 dark:border-transparent">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                                <span className="material-symbols-outlined text-lg">emoji_events</span>
                            </div>
                            <p className="text-slate-500 dark:text-[#cbb690] text-sm font-medium">Yarışmalar</p>
                        </div>
                        <div>
                            <p className="text-slate-900 dark:text-white text-2xl font-bold">0</p>
                            <p className="text-[#cbb690] text-xs font-medium">Yakında</p>
                        </div>
                    </div>
                </div>
            </div>




            {/* Floating Action Button */}
            <button className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-[#221c10] shadow-lg shadow-black/40 hover:scale-105 transition-transform z-50">
                <span className="material-symbols-outlined text-3xl font-bold">add</span>
            </button>
        </div>
    );
}
