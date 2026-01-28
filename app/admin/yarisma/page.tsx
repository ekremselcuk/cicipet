import Link from "next/link";

export default function YarismaListPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-white antialiased selection:bg-primary selection:text-background-dark min-h-screen pb-24">
            {/* Mobile Container */}
            <div className="relative flex w-full flex-col max-w-md mx-auto overflow-hidden">
                {/* Header */}
                <header className="flex flex-col gap-4 p-5 pb-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-primary text-xs font-bold tracking-widest uppercase mb-1">
                                CiciPet Admin
                            </p>
                            <h1 className="text-2xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white">
                                Yarışma<br />
                                Yönetimi
                            </h1>
                        </div>
                        <Link
                            href="/admin/yarisma/ekle"
                            className="flex items-center justify-center gap-2 bg-primary hover:bg-yellow-500 text-background-dark text-sm font-bold py-2.5 px-4 rounded-xl transition-transform active:scale-95 shadow-lg shadow-primary/20"
                        >
                            <span className="material-symbols-outlined text-[20px]">add</span>
                            <span>Yeni</span>
                        </Link>
                    </div>
                </header>

                {/* Search & Filter */}
                <div className="px-5 py-2">
                    <div className="relative mb-4">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            search
                        </span>
                        <input
                            className="w-full h-10 pl-10 pr-4 bg-white dark:bg-surface-dark border-none rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary shadow-sm"
                            placeholder="Yarışma ara..."
                            type="text"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                        <button className="flex h-8 shrink-0 items-center justify-center px-4 rounded-full bg-primary text-background-dark text-xs font-bold shadow-md">
                            Tümü
                        </button>
                        <button className="flex h-8 shrink-0 items-center justify-center px-4 rounded-full bg-white dark:bg-[#493b22] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-transparent text-xs font-medium hover:bg-gray-50 dark:hover:bg-opacity-80 transition-colors">
                            Aktif
                        </button>
                        <button className="flex h-8 shrink-0 items-center justify-center px-4 rounded-full bg-white dark:bg-[#493b22] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-transparent text-xs font-medium hover:bg-gray-50 dark:hover:bg-opacity-80 transition-colors">
                            Tamamlandı
                        </button>
                        <button className="flex h-8 shrink-0 items-center justify-center px-4 rounded-full bg-white dark:bg-[#493b22] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-transparent text-xs font-medium hover:bg-gray-50 dark:hover:bg-opacity-80 transition-colors">
                            Taslak
                        </button>
                    </div>
                </div>

                {/* Scrollable Main Content */}
                <div className="flex-1 overflow-y-auto hide-scrollbar">
                    {/* Metrics Dashboard */}
                    <div className="flex gap-3 overflow-x-auto hide-scrollbar px-5 py-2 snap-x">
                        {/* Metric 1 */}
                        <div className="snap-center min-w-[160px] flex-1 flex flex-col gap-1 rounded-2xl p-4 bg-gradient-to-br from-[#493b22] to-[#342a18] border border-white/5 shadow-md">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="p-1.5 rounded-full bg-green-500/20 text-green-500 material-symbols-outlined text-[18px]">
                                    play_circle
                                </span>
                                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                                    Aktif
                                </p>
                            </div>
                            <p className="text-white text-2xl font-bold">12</p>
                            <p className="text-gray-500 text-[10px]">Yarışma yayında</p>
                        </div>
                        {/* Metric 2 */}
                        <div className="snap-center min-w-[160px] flex-1 flex flex-col gap-1 rounded-2xl p-4 bg-gradient-to-br from-[#493b22] to-[#342a18] border border-white/5 shadow-md">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="p-1.5 rounded-full bg-primary/20 text-primary material-symbols-outlined text-[18px]">
                                    group
                                </span>
                                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                                    Bekleyen
                                </p>
                            </div>
                            <p className="text-white text-2xl font-bold">48</p>
                            <p className="text-gray-500 text-[10px]">
                                Onay bekleyen katılımcı
                            </p>
                        </div>
                        {/* Metric 3 */}
                        <div className="snap-center min-w-[160px] flex-1 flex flex-col gap-1 rounded-2xl p-4 bg-gradient-to-br from-[#493b22] to-[#342a18] border border-white/5 shadow-md">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="p-1.5 rounded-full bg-purple-500/20 text-purple-400 material-symbols-outlined text-[18px]">
                                    redeem
                                </span>
                                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                                    Ödüller
                                </p>
                            </div>
                            <p className="text-white text-2xl font-bold">₺2.5k</p>
                            <p className="text-gray-500 text-[10px]">Bugün dağıtılan</p>
                        </div>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent mx-5 my-4"></div>
                    {/* Contest List */}
                    <div className="flex flex-col gap-4 px-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                Son Yarışmalar
                            </h2>
                            <button className="text-xs text-primary font-medium hover:underline">
                                Tümünü Gör
                            </button>
                        </div>
                        {/* Card 1: Active */}
                        <div className="group relative flex flex-col rounded-2xl bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden transition-all hover:shadow-md">
                            <div className="flex p-4 gap-4">
                                {/* Thumbnail */}
                                <div
                                    className="w-20 h-20 rounded-xl bg-gray-200 dark:bg-gray-800 bg-cover bg-center shrink-0 shadow-inner"
                                    style={{
                                        backgroundImage:
                                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB0mYam2EoKS5ddggpaIBudAspxFr3-iF9wunMyhPFKB4VZjTNvO84DMztTSX2aMbYRXOjpqd8I04fwz7ozkiIFoxjssVMOpKgHIxdvvMjQ1F0dM_wMIjEP0ax_WQPNP9Cepc5DPmL7ffoftW9nsgYCtk5jYrrin8WyF4f7bzWuCCEoeI8zwa7TNjZLUc4wHrxX6KYxBNAdsElf0sLI2Z_zvdd3xGiFsSeWN6uS-5l8n_SpRt_OCuHm_EliYwF647Bk-e6vGTOwtCo')",
                                    }}
                                ></div>
                                {/* Content */}
                                <div className="flex flex-col flex-1 gap-1">
                                    <div className="flex items-start justify-between">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 uppercase tracking-wide">
                                            Aktif
                                        </span>
                                        <div className="flex gap-1">
                                            <button className="text-gray-400 hover:text-primary transition-colors p-1">
                                                <span className="material-symbols-outlined text-[18px]">
                                                    edit
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight mt-1">
                                        En Şirin Kedi 2023
                                    </h3>
                                    <div className="grid grid-cols-2 gap-y-1 gap-x-2 mt-2">
                                        <div className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[14px] text-gray-400">
                                                group
                                            </span>
                                            <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                                                150 Katılımcı
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[14px] text-gray-400">
                                                event
                                            </span>
                                            <span className="text-xs text-gray-600 dark:text-gray-300">
                                                Bitiş: 25 Eki
                                            </span>
                                        </div>
                                        <div className="col-span-2 flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[14px] text-primary">
                                                emoji_events
                                            </span>
                                            <span className="text-xs text-primary font-medium">
                                                Mama Paketi
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Footer Actions */}
                            <div className="flex border-t border-gray-100 dark:border-white/5 divide-x divide-gray-100 dark:divide-white/5">
                                <button className="flex-1 py-3 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-1">
                                    <span className="material-symbols-outlined text-[16px]">
                                        visibility
                                    </span>
                                    Katılımcıları Gör
                                </button>
                                <button className="flex-1 py-3 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors flex items-center justify-center gap-1">
                                    <span className="material-symbols-outlined text-[16px]">
                                        unpublished
                                    </span>
                                    Yayından Kaldır
                                </button>
                            </div>
                        </div>
                        {/* Card 2: Finished */}
                        <div className="group relative flex flex-col rounded-2xl bg-white dark:bg-surface-dark shadow-sm border border-l-4 border-l-primary border-y-gray-100 border-r-gray-100 dark:border-y-white/5 dark:border-r-white/5 overflow-hidden transition-all">
                            {/* ...content... */}
                            <div className="p-3 bg-gradient-to-r from-[#493b22] to-[#342a18] border-t border-white/5">
                                <button className="w-full flex items-center justify-center gap-2 bg-primary text-background-dark py-2.5 rounded-lg text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/10">
                                    <span className="material-symbols-outlined text-[20px]">
                                        trophy
                                    </span>
                                    Kazananları Onayla
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Spacer for scrolling past bottom nav */}
                    <div className="h-10"></div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 w-full bg-white dark:bg-[#1a150c] border-t border-gray-200 dark:border-white/5 px-6 py-3 flex justify-between items-center z-20 backdrop-blur-md bg-opacity-90 dark:bg-opacity-90">
                <Link
                    href="/admin"
                    className="flex flex-col items-center gap-1 text-gray-400 hover:text-primary transition-colors"
                >
                    <span className="material-symbols-outlined text-[24px]">
                        dashboard
                    </span>
                    <span className="text-[10px] font-medium">Panel</span>
                </Link>
                <Link
                    href="/admin/yarisma"
                    className="flex flex-col items-center gap-1 text-primary"
                >
                    <span className="material-symbols-outlined text-[24px] fill-current">
                        pets
                    </span>
                    <span className="text-[10px] font-bold">Yarışmalar</span>
                </Link>
                <div className="relative -top-6">
                    <button className="flex items-center justify-center w-12 h-12 bg-primary rounded-full text-background-dark shadow-lg shadow-primary/40 hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-[28px]">
                            qr_code_scanner
                        </span>
                    </button>
                </div>
                <Link
                    href="/admin/kullanicilar"
                    className="flex flex-col items-center gap-1 text-gray-400 hover:text-primary transition-colors"
                >
                    <span className="material-symbols-outlined text-[24px]">group</span>
                    <span className="text-[10px] font-medium">Üyeler</span>
                </Link>
                <Link
                    href="/admin/ayarlar"
                    className="flex flex-col items-center gap-1 text-gray-400 hover:text-primary transition-colors"
                >
                    <span className="material-symbols-outlined text-[24px]">
                        settings
                    </span>
                    <span className="text-[10px] font-medium">Ayarlar</span>
                </Link>
            </nav>
        </div>
    );
}
