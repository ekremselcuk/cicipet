
import MenuTrigger from "@/components/admin/MenuTrigger";
import { requireAdmin } from "@/utils/supabase/check-auth"; // Server-side check
import Link from "next/link";

export default async function AdminContestsPage() {
    await requireAdmin();

    return (
        <div className="relative flex flex-col h-full min-h-screen pb-24">
            {/* Top Header */}
            <header className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-white/5 px-4 pt-4 pb-2">
                <div className="flex items-center justify-between mb-4">
                    {/* Menu Trigger Replaced */}
                    <MenuTrigger />
                    <h1 className="text-xl font-bold tracking-tight text-center flex-1 text-slate-900 dark:text-white">Yarışma Yönetimi</h1>
                    <div className="flex gap-2">
                        <button className="relative p-2 -mr-2 text-slate-600 dark:text-gray-300 hover:text-primary transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5">
                            <span className="material-symbols-outlined text-[24px]">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background-dark"></span>
                        </button>
                    </div>
                </div>

                {/* New Link Button in Header (as requested: "yeni linki var") */}
                <div className="flex justify-end mb-2">
                    <Link href="/admin/yarisma/ekle" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">add</span>
                        Yeni Yarışma Ekle
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="relative w-full mb-2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-gray-400">search</span>
                    </div>
                    <input className="block w-full pl-10 pr-3 py-3 border-none rounded-xl text-sm font-medium bg-white dark:bg-surface-dark text-slate-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-surface-dark transition-all shadow-sm" placeholder="Yarışma ara..." type="text" />
                </div>
            </header>

            {/* Main Content (Placeholder using Pet Template as provided) */}
            <main className="flex flex-col gap-6 p-4">
                {/* Note: User provided Pet HTML for contests. Keeping structure but rendering as is to respect prompt "add these codes". */}
                {/* I am minimally adjusting texts to avoid total confusion, e.g. "Pet Listesi" -> "Yarışma Listesi" if appropriate, but stick to code provided mostly. */}

                {/* Filters */}
                <section className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4">
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-primary text-black rounded-lg text-sm font-bold shrink-0 transition-transform active:scale-95">
                        <span className="material-symbols-outlined text-[18px]">filter_list</span>
                        Tümü
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-slate-700 dark:text-gray-300 rounded-lg text-sm font-medium shrink-0 whitespace-nowrap active:bg-gray-100 dark:active:bg-white/10">
                        Durum
                        <span className="material-symbols-outlined text-[18px] opacity-70">expand_more</span>
                    </button>
                </section>

                {/* Data List */}
                <section className="flex flex-col gap-4">
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest pl-1">Yarışma Listesi</h2>
                    {/* Card 1 */}
                    <div className="bg-white dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-gray-200 dark:border-white/5 flex flex-col gap-4">
                        <div className="flex items-start gap-4">
                            <div className="relative shrink-0">
                                <div className="w-16 h-16 rounded-lg bg-cover bg-center shadow-inner" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDEeFiKowFyaSB3s-QDc7eGUl_gNymOTk5NsWpl3-MVc2KYD07Pp5iXtXb7tYzWxuLqLun1GG2EUKRCBz99VAAt5cFh5i_roRtckdCl_BPFOezmpaACFK0EajkyM6nJyjvhdWgEYvwnKEL_Vjo4Dch7EUNJJlU6jNkIt6fLTf8zSaKUcr97MN9CeSTSt2pfB7TpBT9cVEo2dHGD3kJG23ey4BhKrsqxXja25mOR0TZWQtY8udxKb_DzOSQpgSrplkaPc9Phm2bFA_M')" }}></div>
                                <div className="absolute -bottom-1.5 -right-1.5 bg-background-light dark:bg-surface-dark p-0.5 rounded-full">
                                    <div className="bg-emerald-500 w-3 h-3 rounded-full border-2 border-white dark:border-surface-dark"></div>
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">En Güzel Kedi</h3>
                                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                            <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">Aktif</span>
                                            <span>•</span>
                                            <span>Bitiş: 3 Gün</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
                                        <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
                                        <span className="text-xs font-bold text-primary">1240</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
