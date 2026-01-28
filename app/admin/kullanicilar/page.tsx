import Link from "next/link";

export default function KullanicilarPage() {
    return (
        <div className="relative flex flex-col h-full min-h-screen pb-20 overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white">
            {/* Top App Bar */}
            <header className="sticky top-0 z-50 bg-background-light dark:bg-background-dark/95 backdrop-blur-md border-b border-black/5 dark:border-white/5 px-4 py-3 flex items-center justify-between transition-colors duration-300">
                <div className="flex items-center gap-3">
                    <Link href="/admin" className="text-slate-900 dark:text-white p-2 -ml-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    </Link>
                    <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                        Kullanıcı Yönetimi
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <button className="text-slate-900 dark:text-white p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors relative">
                        <span className="material-symbols-outlined text-2xl">notifications</span>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-[#221c10]"></span>
                    </button>
                    <div
                        className="h-8 w-8 rounded-full bg-primary/20 bg-cover bg-center border border-white/10"
                        style={{
                            backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBBJIoHh18BWGcsOv2R7r7X71G3r7HWz_Mj72nC0yfl-dDTflPRwh1IyQArc2GFt9oqrZzccJbvOdQNuX805LfJOPOC_a9E9MYkqDtgIK1a1tYntNkFvglaqPuiNCDt27l63wDxSo5hX8MI7hDtwS4ZoYuqgqVpa4W9hOD_7s42tygGotxnH3_sZECqKDoNEiibtmKBdGoy_DenGEDexdb6hpPf6s1sWd6rGjTwWj3I_RO4ApCtkMUiXPpXajGF_2q00Eey6IgfqG8')",
                        }}
                    ></div>
                </div>
            </header>
            {/* Stats Overview */}
            <div className="grid grid-cols-2 gap-3 p-4">
                <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-black/5 dark:border-white/5 shadow-sm">
                    <p className="text-slate-500 dark:text-[#cbb690] text-xs font-medium mb-1 uppercase tracking-wider">
                        Toplam Kullanıcı
                    </p>
                    <div className="flex items-end gap-2">
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">
                            12,450
                        </span>
                        <span className="text-xs text-green-500 font-medium mb-1.5 flex items-center">
                            <span className="material-symbols-outlined text-sm">
                                arrow_upward
                            </span>{" "}
                            12%
                        </span>
                    </div>
                </div>
                <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-black/5 dark:border-white/5 shadow-sm">
                    <p className="text-slate-500 dark:text-[#cbb690] text-xs font-medium mb-1 uppercase tracking-wider">
                        Aktif Kullanıcı
                    </p>
                    <div className="flex items-end gap-2">
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">
                            11,200
                        </span>
                        <span className="text-xs text-slate-400 font-medium mb-1.5">
                            Bu ay
                        </span>
                    </div>
                </div>
            </div>
            {/* Search & Filter Bar */}
            <div className="px-4 pb-2 space-y-3">
                {/* Search Input */}
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                        <span className="material-symbols-outlined">search</span>
                    </div>
                    <input
                        className="block w-full pl-10 pr-3 py-2.5 border-none rounded-xl bg-white dark:bg-surface-dark text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-[#32281a] transition-all shadow-sm"
                        placeholder="İsim, e-posta veya ID ile ara..."
                        type="text"
                    />
                </div>
                {/* Filter Chips */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    <button className="flex shrink-0 items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-[#493b22] hover:bg-slate-300 dark:hover:bg-[#5a482b] transition-colors border border-transparent focus:border-primary">
                        <span className="text-slate-700 dark:text-white text-sm font-medium">
                            Şehir: Tümü
                        </span>
                        <span className="material-symbols-outlined text-sm text-slate-500 dark:text-white/70">
                            expand_more
                        </span>
                    </button>
                    <button className="flex shrink-0 items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-[#493b22] hover:bg-slate-300 dark:hover:bg-[#5a482b] transition-colors border border-transparent focus:border-primary">
                        <span className="text-slate-700 dark:text-white text-sm font-medium">
                            Kayıt: Bu Ay
                        </span>
                        <span className="material-symbols-outlined text-sm text-slate-500 dark:text-white/70">
                            expand_more
                        </span>
                    </button>
                    <button className="flex shrink-0 items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-[#493b22] hover:bg-slate-300 dark:hover:bg-[#5a482b] transition-colors border border-transparent focus:border-primary">
                        <span className="text-slate-700 dark:text-white text-sm font-medium">
                            Durum: Aktif
                        </span>
                        <span className="material-symbols-outlined text-sm text-slate-500 dark:text-white/70">
                            expand_more
                        </span>
                    </button>
                </div>
            </div>
            {/* User List */}
            <div className="flex flex-col px-4 pt-2 gap-3">
                {/* List Header */}
                <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-[#cbb690] px-2">
                    <span>Kullanıcı Listesi</span>
                    <span>Sıralama: En Yeni</span>
                </div>
                {/* User Card 1 */}
                <div className="group relative bg-white dark:bg-surface-dark rounded-xl p-3 shadow-sm border border-transparent hover:border-primary/30 transition-all">
                    <div className="flex items-start gap-3">
                        <div className="pt-1">
                            <input
                                className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary dark:bg-[#221c10] cursor-pointer"
                                type="checkbox"
                            />
                        </div>
                        <div className="relative shrink-0">
                            <div
                                className="w-12 h-12 rounded-full bg-gray-200 dark:bg-[#3a3a3a] bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCInElRzoHAL7zvxCanfQBlHQj3Rs8ctTmOQ8NTGq-KYcVlwSC9gIor4xQ1LiyQq0aIqALjAGersdXQ_y9W0j-pm8tAnoV4r9SYDLnMRNRrXXHeJG4iuJJzyu3U5Q_6QO40yyoekA4NFTold1DCHIQDH4wBf4MjRg_zsk0IcUvw9qVW0xO2npUyRMUpVjefToSCAxHdd74FHTsz7WeYd4VZXLo-r32q50JwncgDHnAqx2cdWJx062d9w-xkWHn0yTjpcFDXFynurEo')",
                                }}
                            ></div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-background-light dark:bg-surface-dark rounded-full flex items-center justify-center">
                                <span className="w-3 h-3 bg-green-500 rounded-full border border-white dark:border-surface-dark" title="Aktif"></span>
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">Ahmet Yılmaz</h3>
                                    <p className="text-xs text-slate-500 dark:text-white/60 truncate">ahmet.yilmaz@gmail.com</p>
                                </div>
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">Aktif</span>
                            </div>
                            <div className="mt-2 flex items-center gap-3 text-xs text-slate-600 dark:text-[#cbb690]">
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">pets</span> 2 Evcil
                                </span>
                                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-white/20"></span>
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px] text-primary">savings</span> 450 Puan
                                </span>
                            </div>
                            <div className="mt-1 text-[10px] text-slate-400 dark:text-white/40">Kayıt: 12 Ekim 2023</div>
                        </div>
                        <button className="shrink-0 text-slate-400 dark:text-white/50 hover:text-primary dark:hover:text-primary p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                            <span className="material-symbols-outlined">more_vert</span>
                        </button>
                    </div>
                </div>
            </div>
            {/* Floating Action Button */}
            <button className="fixed right-4 bottom-24 z-40 bg-primary text-slate-900 w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center hover:bg-amber-400 transition-colors hover:shadow-xl hover:-translate-y-1 transform duration-200">
                <span className="material-symbols-outlined text-3xl">add</span>
            </button>
            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-surface-dark border-t border-black/5 dark:border-white/5 pb-safe">
                <div className="flex justify-around items-center h-16">
                    <Link href="/admin" className="flex flex-col items-center justify-center w-full h-full text-slate-400 dark:text-white/40 hover:text-slate-600 dark:hover:text-white/70 gap-1 transition-colors">
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="text-[10px] font-medium">Panel</span>
                    </Link>
                    <Link href="/admin/kullanicilar" className="flex flex-col items-center justify-center w-full h-full text-primary gap-1">
                        <span className="material-symbols-outlined filled">group</span>
                        <span className="text-[10px] font-bold">Kullanıcılar</span>
                    </Link>
                    <Link href="/admin/petler" className="flex flex-col items-center justify-center w-full h-full text-slate-400 dark:text-white/40 hover:text-slate-600 dark:hover:text-white/70 gap-1 transition-colors">
                        <span className="material-symbols-outlined">pets</span>
                        <span className="text-[10px] font-medium">Evcil</span>
                    </Link>
                    <Link href="/admin/ayarlar" className="flex flex-col items-center justify-center w-full h-full text-slate-400 dark:text-white/40 hover:text-slate-600 dark:hover:text-white/70 gap-1 transition-colors">
                        <span className="material-symbols-outlined">settings</span>
                        <span className="text-[10px] font-medium">Ayarlar</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
}
