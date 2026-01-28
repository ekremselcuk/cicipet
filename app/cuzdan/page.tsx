import Header from "@/components/layout/Header";

export default function CuzdanPage() {
    return (
        <main className="flex flex-col gap-6 w-full mt-4 pb-24">
            <Header />
            <section className="px-4">
                <div className="relative w-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-[#fbbf24] to-secondary shadow-xl shadow-primary/20 p-6 text-white">
                    <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/20 blur-3xl"></div>
                    <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <span className="mb-1 text-sm font-semibold text-white/90 uppercase tracking-wide">
                            Toplam CiciPuan
                        </span>
                        <h2 className="text-5xl font-extrabold tracking-tight drop-shadow-sm">
                            1,250<span className="text-2xl ml-1 font-bold text-white/80">CP</span>
                        </h2>
                        <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur-sm">
                            <span>≈ 125.00 TL Değerinde</span>
                        </div>
                        <div className="mt-8 flex w-full gap-3">
                            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-3.5 text-sm font-bold text-primary shadow-lg shadow-black/5 transition-transform active:scale-95 hover:bg-slate-50">
                                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                                Mama Al
                            </button>
                            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/20 py-3.5 text-sm font-bold text-white shadow-none ring-1 ring-white/30 backdrop-blur-md transition-transform active:scale-95 hover:bg-white/30">
                                <span className="material-symbols-outlined text-[20px] fill-1">volunteer_activism</span>
                                Bağışla
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full">
                <div className="px-4 mb-3 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Puan Kazanma Yolları</h3>
                    <a className="text-xs font-bold text-secondary" href="#">
                        Tümü
                    </a>
                </div>
                <div className="scrollbar-hide flex w-full gap-3 overflow-x-auto px-4 pb-2">
                    <button className="flex shrink-0 w-32 flex-col items-center gap-3 rounded-2xl bg-white dark:bg-slate-800 p-4 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10 transition-transform active:scale-95">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <span className="material-symbols-outlined text-[24px] fill-1">emoji_events</span>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">Yarışmaya Katıl</span>
                            <span className="text-[10px] font-medium text-slate-500">+150 CP</span>
                        </div>
                    </button>
                    <button className="flex shrink-0 w-32 flex-col items-center gap-3 rounded-2xl bg-white dark:bg-slate-800 p-4 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10 transition-transform active:scale-95">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                            <span className="material-symbols-outlined text-[24px]">person_add</span>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">Arkadaşını Davet Et</span>
                            <span className="text-[10px] font-medium text-slate-500">+500 CP</span>
                        </div>
                    </button>
                    <button className="flex shrink-0 w-32 flex-col items-center gap-3 rounded-2xl bg-white dark:bg-slate-800 p-4 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10 transition-transform active:scale-95">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                            <span className="material-symbols-outlined text-[24px]">play_circle</span>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">Reklam İzle</span>
                            <span className="text-[10px] font-medium text-slate-500">+25 CP</span>
                        </div>
                    </button>
                    <button className="flex shrink-0 w-32 flex-col items-center gap-3 rounded-2xl bg-white dark:bg-slate-800 p-4 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10 transition-transform active:scale-95">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10 text-purple-600">
                            <span className="material-symbols-outlined text-[24px]">check_circle</span>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">Günlük Giriş</span>
                            <span className="text-[10px] font-medium text-slate-500">+10 CP</span>
                        </div>
                    </button>
                </div>
            </section>
            <section className="px-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">İyilik Raporum</h3>
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 rounded-2xl bg-[#2a9d8f]/10 p-4 border border-[#2a9d8f]/20">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2a9d8f] text-white">
                            <span className="material-symbols-outlined text-[20px]">pets</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-extrabold text-[#2a9d8f]">15 kg</span>
                            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase">Mama Bağışı</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl bg-primary/10 p-4 border border-primary/20">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                            <span className="material-symbols-outlined text-[20px]">favorite</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-extrabold text-primary">12</span>
                            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase">Mutlu Pati</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className="px-4 pb-4">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Son Hareketler</h3>
                    <button className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                        <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                    </button>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between rounded-2xl bg-white dark:bg-slate-800 p-3 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10">
                        <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 shrink-0">
                                <div
                                    className="h-full w-full rounded-full bg-cover bg-center"
                                    style={{
                                        backgroundImage:
                                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDVIQt70H6tXH2Dyj4ZlE9JXTEy1-0KxS-nyNnUqgdtVRRyaH4U5nZvjF74tAVrwmmxBwZiOjOM6_JF3_G6ihCWxny-i84qFTmekXK5e6yc_MyC0o5AxCyWViC1bA3HlHUDFpZt7w53aOlUd8JySa47Jty9zbR9n7z0uWHeO_tQIvDZjyQNe3RNZcqXiVFwYoz03XX55ZXobnIItxg1wtrKcO_u1RXG02Rci6hrNLo2Xl6uDJGXyijNIaurf_VEEAcOi4IhfZ7uzKg')",
                                    }}
                                ></div>
                                <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary border border-white dark:border-slate-800 text-white">
                                    <span className="material-symbols-outlined text-[10px] fill-1">emoji_events</span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-900 dark:text-white">Günün Yarışması Ödülü</span>
                                <span className="text-xs text-slate-500">En Karizmatik Bakış</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-bold text-secondary">+150 CP</span>
                            <span className="text-[10px] text-slate-400">Bugün, 14:20</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-white dark:bg-slate-800 p-3 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-50 text-accent dark:bg-red-900/20">
                                <span className="material-symbols-outlined text-[24px] fill-1">volunteer_activism</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-900 dark:text-white">Barınak Bağışı</span>
                                <span className="text-xs text-slate-500">Kadıköy Barınağı</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-bold text-accent">-500 CP</span>
                            <span className="text-[10px] text-slate-400">Dün, 09:15</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-white dark:bg-slate-800 p-3 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-500 dark:bg-blue-900/20">
                                <span className="material-symbols-outlined text-[24px]">group_add</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-900 dark:text-white">Arkadaş Daveti</span>
                                <span className="text-xs text-slate-500">Ayşe K. katıldı</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-bold text-secondary">+500 CP</span>
                            <span className="text-[10px] text-slate-400">12 Ekim</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-white dark:bg-slate-800 p-3 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10">
                        <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 shrink-0">
                                <div
                                    className="h-full w-full rounded-full bg-cover bg-center"
                                    style={{
                                        backgroundImage:
                                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuADRPQ7eGHbEkuKdMO1ZsRc9swJZaKSzLt18wUQ4xLS6AN4U_mCHVVNl_Vxs3mEJKg2PhWs7AqKQEEnfCEq_KfBqZSn-RP5D2-r5tC7sRZUL28gbM_Dd0jsGYczTYQom9yZy9_CfPGn4x6XV5yH8Fm9AV32o9g5xhvvV68kGEfGx4Qsz6-Tnn5DY0_myL7bPzFAbQchVPZHvCv-iVzAecTm-CcM1Ueo1tqM4SdF_VaRbaPxezP81_HqHIx4vBPKOQu6pB6SekOb7BI')",
                                    }}
                                ></div>
                                <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-700 border border-white dark:border-slate-800 text-white">
                                    <span className="material-symbols-outlined text-[10px]">shopping_cart</span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-900 dark:text-white">Market Alışverişi</span>
                                <span className="text-xs text-slate-500">Premium Yaş Mama</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-bold text-slate-500">-250 CP</span>
                            <span className="text-[10px] text-slate-400">10 Ekim</span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
