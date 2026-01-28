import Link from "next/link";

export default function YarismaEklePage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased selection:bg-primary selection:text-black min-h-screen pb-24">
            {/* Top App Bar */}
            <div className="sticky top-0 z-50 flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-[#685531]/30 backdrop-blur-md bg-opacity-95 dark:bg-opacity-95">
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/yarisma"
                        className="text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <span className="material-symbols-outlined text-slate-900 dark:text-white">
                            arrow_back
                        </span>
                    </Link>
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                        Admin Panel
                    </h2>
                </div>
                <button className="flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                    <p className="text-primary text-sm font-bold leading-normal tracking-[0.015em]">
                        Yayınla
                    </p>
                </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 flex flex-col">
                {/* Section 1: Create Contest Form */}
                <div className="flex flex-col">
                    <div className="px-4 py-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-xl">
                            edit_document
                        </span>
                        <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
                            Yeni Yarışma
                        </h3>
                    </div>
                    {/* Title Input */}
                    <div className="px-4 pb-3">
                        <label className="flex flex-col w-full">
                            <span className="text-slate-500 dark:text-[#cbb690] text-xs font-medium uppercase tracking-wider pb-2 pl-1">
                                Yarışma Başlığı
                            </span>
                            <input
                                className="form-input flex w-full rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#cbb690]/50 bg-white dark:bg-[#342a18] border border-slate-200 dark:border-[#685531] focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 text-base font-medium transition-all"
                                placeholder="Örn: En Güzel Tekir 2024"
                                type="text"
                                defaultValue="En Güzel Tekir 2024"
                            />
                        </label>
                    </div>
                    {/* Category Chips */}
                    <div className="px-4 pb-3">
                        <span className="text-slate-500 dark:text-[#cbb690] text-xs font-medium uppercase tracking-wider pb-2 pl-1 block">
                            Kategori
                        </span>
                        <div className="flex gap-3 flex-wrap">
                            <button className="group flex h-9 items-center justify-center gap-x-2 rounded-lg bg-primary pl-3 pr-4 ring-1 ring-inset ring-primary transition-all">
                                <span className="material-symbols-outlined text-[#231c10] text-[18px]">
                                    spark
                                </span>
                                <span className="text-[#231c10] text-sm font-bold">
                                    Güzellik
                                </span>
                            </button>
                            <button className="group flex h-9 items-center justify-center gap-x-2 rounded-lg bg-slate-200 dark:bg-[#493b22] pl-3 pr-4 ring-1 ring-inset ring-transparent hover:ring-primary/50 transition-all">
                                <span className="material-symbols-outlined text-slate-600 dark:text-white text-[18px]">
                                    star
                                </span>
                                <span className="text-slate-700 dark:text-white text-sm font-medium">
                                    Yetenek
                                </span>
                            </button>
                            <button className="group flex h-9 items-center justify-center gap-x-2 rounded-lg bg-slate-200 dark:bg-[#493b22] pl-3 pr-4 ring-1 ring-inset ring-transparent hover:ring-primary/50 transition-all">
                                <span className="material-symbols-outlined text-slate-600 dark:text-white text-[18px]">
                                    location_on
                                </span>
                                <span className="text-slate-700 dark:text-white text-sm font-medium">
                                    Yerel
                                </span>
                            </button>
                        </div>
                    </div>
                    {/* Prize & Date Row */}
                    <div className="flex px-4 pb-4 gap-4">
                        {/* Prize Toggle */}
                        <div className="flex-1">
                            <span className="text-slate-500 dark:text-[#cbb690] text-xs font-medium uppercase tracking-wider pb-2 pl-1 block">
                                Ödül
                            </span>
                            <div className="flex h-12 w-full items-center rounded-xl bg-slate-200 dark:bg-[#493b22] p-1">
                                <label className="cursor-pointer h-full flex-1 flex items-center justify-center rounded-lg bg-white dark:bg-[#231c10] shadow-sm transition-all">
                                    <span className="text-slate-900 dark:text-white text-xs font-bold">
                                        500 Puan
                                    </span>
                                    <input
                                        defaultChecked
                                        className="hidden"
                                        name="prize"
                                        type="radio"
                                    />
                                </label>
                                <label className="cursor-pointer h-full flex-1 flex items-center justify-center rounded-lg text-slate-500 dark:text-[#cbb690] hover:text-slate-700 dark:hover:text-white transition-all">
                                    <span className="text-xs font-medium">Mama</span>
                                    <input className="hidden" name="prize" type="radio" />
                                </label>
                            </div>
                        </div>
                        {/* Date Input */}
                        <div className="flex-1">
                            <label className="flex flex-col w-full h-full">
                                <span className="text-slate-500 dark:text-[#cbb690] text-xs font-medium uppercase tracking-wider pb-2 pl-1">
                                    Bitiş
                                </span>
                                <div className="relative flex-1">
                                    <input
                                        className="form-input flex w-full h-12 rounded-xl text-slate-900 dark:text-white bg-white dark:bg-[#342a18] border border-slate-200 dark:border-[#685531] focus:border-primary focus:ring-0 px-3 text-sm font-medium appearance-none"
                                        type="date"
                                        defaultValue="2024-12-25"
                                    />
                                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#cbb690] pointer-events-none text-xl">
                                        calendar_today
                                    </span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="h-px w-full bg-slate-200 dark:bg-[#685531]/50 my-2"></div>
                {/* Section 2: Moderation */}
                <div className="flex flex-col">
                    <div className="px-4 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-xl">
                                fact_check
                            </span>
                            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
                                Moderasyon
                            </h3>
                        </div>
                        <span className="text-xs font-medium bg-red-500/20 text-red-500 dark:text-red-400 px-2 py-1 rounded-md">
                            4 Bekleyen
                        </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 px-4 pb-4">
                        {/* Card 1 */}
                        <div className="relative group overflow-hidden rounded-xl bg-slate-100 dark:bg-[#2d2415] border border-slate-200 dark:border-[#685531]/50 shadow-sm">
                            <div className="aspect-[4/5] w-full relative">
                                <div
                                    className="absolute inset-0 h-full w-full bg-cover bg-center transition-transform group-hover:scale-105 duration-500"
                                    style={{
                                        backgroundImage:
                                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCIBVEX8SRv0WITSseIXoFxzrniDKXYIXE5KNebi00-B5YLbfh6ja8KM1xGRiCJT6xe2L6anMaWynFXz8Ugs3xLTwzCzueAsE1bRiEwrl7eXu4p47PWEGy-mQYoge5U7DKmImJcgmz7y-a9YlkkmDgQ58EGTMNJRgXxJ0WmWoL3CsE4Mn0QP5TPHA9oGLwkMGqqUQRfEOjGiTbhJZAQmo_f3ItluerHnSs7gQC7i2N6myH2QcxWk9MMG32eGSclukN_Si9VCHFB3fM')",
                                    }}
                                ></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                                <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
                                    <span className="material-symbols-outlined text-white text-[14px]">
                                        person
                                    </span>
                                    <span className="text-[10px] font-medium text-white truncate max-w-[80px]">
                                        @kedican
                                    </span>
                                </div>
                                {/* Actions */}
                                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-4 px-2">
                                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/90 text-white backdrop-blur-sm shadow-lg hover:bg-red-600 hover:scale-110 transition-all">
                                        <span className="material-symbols-outlined text-xl">
                                            close
                                        </span>
                                    </button>
                                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/90 text-white backdrop-blur-sm shadow-lg hover:bg-green-600 hover:scale-110 transition-all">
                                        <span className="material-symbols-outlined text-xl">
                                            check
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Card 2 */}
                        <div className="relative group overflow-hidden rounded-xl bg-slate-100 dark:bg-[#2d2415] border border-slate-200 dark:border-[#685531]/50 shadow-sm">
                            <div className="aspect-[4/5] w-full relative">
                                <div
                                    className="absolute inset-0 h-full w-full bg-cover bg-center transition-transform group-hover:scale-105 duration-500"
                                    style={{
                                        backgroundImage:
                                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDOtj5Um-XJCU83nm-EMNNSMu14CQpoX9ICZC37ixrTNiH2JJeyIQuf0fa-BRbRisEU6E5ccQSMA2Yq2tPRD47Y1iG3VIugmbGU-clipEokNNuSYzJ_3EFOCGphHpLQ5FOTKsWAXq-nrR7W0GTg-his-pD9oKVMn5NAQCkscnaWnR8eMvK9b7T0IWn39thkSxjB9yCfUMDJwknY27y2lSRXfOC2JypIDdPSiLvqukiA7hUAKuh04iK3joKRooN_laLxW8bJq_Q-oSo')",
                                    }}
                                ></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                                <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
                                    <span className="material-symbols-outlined text-white text-[14px]">
                                        person
                                    </span>
                                    <span className="text-[10px] font-medium text-white truncate max-w-[80px]">
                                        @goldy
                                    </span>
                                </div>
                                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-4 px-2">
                                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/90 text-white backdrop-blur-sm shadow-lg hover:bg-red-600 hover:scale-110 transition-all">
                                        <span className="material-symbols-outlined text-xl">
                                            close
                                        </span>
                                    </button>
                                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/90 text-white backdrop-blur-sm shadow-lg hover:bg-green-600 hover:scale-110 transition-all">
                                        <span className="material-symbols-outlined text-xl">
                                            check
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-px w-full bg-slate-200 dark:bg-[#685531]/50 my-2"></div>
            </div>
        </div>
    );
}
