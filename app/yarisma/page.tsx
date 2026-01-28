"use client";

import { useState } from "react";

export default function YarismaPage() {
    const [activeCategory, setActiveCategory] = useState("Popüler");

    const categories = [
        { name: "Popüler", icon: "local_fire_department", color: "text-white" },
        { name: "Yerel", icon: "location_on", color: "text-[#2a9d8f]" },
        { name: "Yetenek", icon: "pets", color: "text-[#e76f51]" },
        { name: "Barınak Destek", icon: "volunteer_activism", color: "text-[#2a9d8f]" },
    ];

    return (
        <main className="flex flex-col gap-6 w-full mt-4 pb-24">
            <section className="px-4">
                <div className="group relative w-full overflow-hidden rounded-[2rem] bg-white dark:bg-slate-800 shadow-xl shadow-primary/5 ring-1 ring-slate-900/5 dark:ring-white/10 transition-all hover:shadow-2xl hover:shadow-primary/10">
                    <div className="absolute inset-0 z-0">
                        <div
                            className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{
                                backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDVIQt70H6tXH2Dyj4ZlE9JXTEy1-0KxS-nyNnUqgdtVRRyaH4U5nZvjF74tAVrwmmxBwZiOjOM6_JF3_G6ihCWxny-i84qFTmekXK5e6yc_MyC0o5AxCyWViC1bA3HlHUDFpZt7w53aOlUd8JySa47Jty9zbR9n7z0uWHeO_tQIvDZjyQNe3RNZcqXiVFwYoz03XX55ZXobnIItxg1wtrKcO_u1RXG02Rci6hrNLo2Xl6uDJGXyijNIaurf_VEEAcOi4IhfZ7uzKg')",
                            }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    </div>
                    <div className="relative z-10 flex flex-col justify-end p-6 pt-32 h-full">
                        <div className="mb-2 flex items-center gap-2 flex-wrap">
                            <span className="rounded-full bg-primary px-3 py-1 text-[10px] uppercase tracking-wider font-bold text-white shadow-sm">
                                Günün Yarışması
                            </span>
                            <span className="flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-sm ring-1 ring-white/10">
                                <span className="material-symbols-outlined text-[14px]">timer</span>
                                04:23:12
                            </span>
                        </div>
                        <h2 className="mb-2 text-3xl font-extrabold leading-tight text-white">En Karizmatik Bakış</h2>
                        <div className="mb-5 flex items-center gap-3 text-white/90">
                            <span className="material-symbols-outlined text-primary fill-1">emoji_events</span>
                            <span className="text-sm font-medium">
                                Ödül: <span className="font-bold text-white">10kg Pro Plan Mama</span>
                            </span>
                        </div>
                        <button className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-slate-900 shadow-lg shadow-primary/25 transition-transform active:scale-95 hover:bg-amber-400">
                            Hemen Katıl
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </section>
            <section className="px-4">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#2a9d8f] to-[#264653] p-5 shadow-lg shadow-secondary/20">
                    <div className="absolute right-0 top-0 -mr-6 -mt-6 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
                    <div className="absolute bottom-0 left-10 -mb-6 h-24 w-24 rounded-full bg-black/10 blur-xl"></div>
                    <div className="relative z-10 flex items-center justify-between">
                        <div className="flex flex-col gap-1 text-white">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                                    <span className="material-symbols-outlined text-[20px]">bolt</span>
                                </div>
                                <h3 className="text-lg font-bold">Hızlı Oylama Modu</h3>
                            </div>
                            <p className="text-xs font-medium text-white/80 pl-10">Seri oy ver, bonus CiciPuan kazan!</p>
                        </div>
                        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-secondary shadow-md transition-transform active:scale-90">
                            <span className="material-symbols-outlined">play_arrow</span>
                        </button>
                    </div>
                </div>
            </section>
            <section className="w-full">
                <div className="scrollbar-hide flex w-full gap-3 overflow-x-auto px-4 pb-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => setActiveCategory(cat.name)}
                            className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10 transition-colors ${activeCategory === cat.name
                                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold"
                                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                                }`}
                        >
                            <span className={`material-symbols-outlined text-[18px] ${activeCategory === cat.name ? "" : cat.color}`}>
                                {cat.icon}
                            </span>
                            {cat.name}
                        </button>
                    ))}
                </div>
            </section>
            <section className="px-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">military_tech</span>
                        Haftanın Şampiyonları
                    </h3>
                    <a className="text-xs font-bold text-primary hover:underline" href="#">
                        Tümü Gör
                    </a>
                </div>
                <div className="relative w-full rounded-2xl bg-white dark:bg-slate-800 p-4 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10">
                    <div className="flex items-end justify-center gap-4 sm:gap-8">
                        <div className="flex flex-col items-center gap-1">
                            <div className="relative">
                                <div className="h-16 w-16 rounded-full border-2 border-slate-300 dark:border-slate-600 p-0.5 shadow-md">
                                    <div
                                        className="h-full w-full rounded-full bg-cover bg-center"
                                        style={{
                                            backgroundImage:
                                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD-xV2Ry5H6U89mVIRilVX-BdrZDN29vLCCnuYX9dmXk_F0Y5K4qJwLY9C5LM6BMFH_7GLNbwINbI97gyDJFywixSbrpyfrKoCaTbtesEzZDSRY09AdUPQxPFlon-yzGmH2iUFszKkT2Y_s-gCkYiKXtS-IVFRENfJhFFgmo9djQLKJsOXiV8Y8D8pICKH8ERFEhCyo6lc4ysZx755HNU83tvbcHuU7Hu7S5KnqSyjAYmfr3ZkdImnzK8QcUyPFme6jTxv7upvKGx0')",
                                        }}
                                    ></div>
                                </div>
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
                                    <span className="material-symbols-outlined text-slate-400 text-[20px] drop-shadow-sm fill-1">crown</span>
                                </div>
                                <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-400 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-800">
                                    2
                                </div>
                            </div>
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Mia</span>
                            <span className="text-[10px] font-medium text-secondary">720 P</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 -mt-4">
                            <div className="relative">
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 transform z-10">
                                    <span className="material-symbols-outlined text-primary text-[32px] drop-shadow-md fill-1">crown</span>
                                </div>
                                <div className="h-20 w-20 rounded-full border-[3px] border-primary p-0.5 shadow-xl shadow-primary/20">
                                    <div
                                        className="h-full w-full rounded-full bg-cover bg-center"
                                        style={{
                                            backgroundImage:
                                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDiH8fidrSk3pvSOsQK5wLjrSRWPUHP3z3AGt8Be1NhWbsieAyhqEqENyMfBJIQf_Q7b7lh_X2733uJCXaA2453jlXqAxO2UUkHUpVmKc9XOmFfYzW2uEPuU7-Nv4uWsPXWjZ9uMbt3tP06ZtJFgFQ7DfKnBg-qqUp7CNYmnT3FdImuYaDQrx2XAs53gbOwwQ9KWkhOhHUrcJUDSbCOOYLsRREitUcM1dGNFNVEC0uKRmHciYnLDVlSG929JZeRPX2pl5USKjDmL_Y')",
                                        }}
                                    ></div>
                                </div>
                                <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-800">
                                    1
                                </div>
                            </div>
                            <span className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">Boncuk</span>
                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">850 P</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <div className="relative">
                                <div className="h-16 w-16 rounded-full border-2 border-[#d68c45] p-0.5 shadow-md">
                                    <div
                                        className="h-full w-full rounded-full bg-cover bg-center"
                                        style={{
                                            backgroundImage:
                                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAKW_yokU29dIs7ZGSM36hbRuCKcWQ8qTwjTqqMw7nXPHzC76gu5tnphM1nUpZngEG3F3kVbB_xS2HLhEqw8jJ5AdZjaBwZnQtPKCATNTrs3vYs1U4qxXWyNYSvhhykWU60Y9MTkDpfNLjVatZSwcwXyL9PpVimQuttuvsVgwAMh11FbH4cVetrXJvrtMFx-Zuck3TcM_C16SygMVkMPrK4znlp6wkQNglteEguyGc_PCsuKTzNEuwrPlYGAIWuBWiBIAyVuJhFpHw')",
                                        }}
                                    ></div>
                                </div>
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
                                    <span className="material-symbols-outlined text-[#d68c45] text-[20px] drop-shadow-sm fill-1">crown</span>
                                </div>
                                <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#d68c45] text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-800">
                                    3
                                </div>
                            </div>
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Paşa</span>
                            <span className="text-[10px] font-medium text-secondary">640 P</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className="px-4 pb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Aktif Yarışmalar</h3>
                <div className="grid grid-cols-2 gap-4">
                    <article className="flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10 transition-all hover:shadow-md">
                        <div className="relative aspect-square w-full group">
                            <div
                                className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCWqux1XIhvybvFOJnRSXu_6qRkWLcuHb8HjtRDfOKzKd7hBiaQlWLH-Knd9DpCov43Qvatn2ThAFXdKJk3Y1r6JaTlZxZTCKCS8k6KjxOsD9Blz-S5c3JEen8SkWxKruMqK02_qLW7a_xdoi_XV-PQ-RuurXyGKXOdZyBkhbRcG0dRTtBSDI9gAO9HLrF7eSepVzPcvMWRSSGokuFb5iQcTu4nFlzUyIJoPx7V3h9czkGnxGpfxo5x-QvE12H1WTEf-bn3H851IA0')",
                                }}
                            ></div>
                            <div className="absolute top-2 right-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-slate-900 backdrop-blur-sm shadow-sm flex items-center gap-0.5">
                                <span className="material-symbols-outlined text-[10px] text-red-500">location_on</span>
                                Kadıköy
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col p-3">
                            <h3 className="mb-1 text-base font-bold leading-tight text-slate-900 dark:text-white line-clamp-1">
                                Kadıköy'ün Maskotu
                            </h3>
                            <p className="mb-3 text-xs font-medium text-slate-500 dark:text-slate-400">120 Katılımcı</p>
                            <button className="mt-auto flex w-full items-center justify-center gap-1.5 rounded-xl border border-primary/30 bg-primary/5 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-white dark:border-primary/50 dark:bg-primary/10 dark:hover:bg-primary">
                                <span className="material-symbols-outlined text-[16px] fill-1">how_to_vote</span>
                                Oy Ver
                            </button>
                        </div>
                    </article>
                    <article className="flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10 transition-all hover:shadow-md">
                        <div className="relative aspect-square w-full group">
                            <div
                                className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuADRPQ7eGHbEkuKdMO1ZsRc9swJZaKSzLt18wUQ4xLS6AN4U_mCHVVNl_Vxs3mEJKg2PhWs7AqKQEEnfCEq_KfBqZSn-RP5D2-r5tC7sRZUL28gbM_Dd0jsGYczTYQom9yZy9_CfPGn4x6XV5yH8Fm9AV32o9g5xhvvV68kGEfGx4Qsz6-Tnn5DY0_myL7bPzFAbQchVPZHvCv-iVzAecTm-CcM1Ueo1tqM4SdF_VaRbaPxezP81_HqHIx4vBPKOQu6pB6SekOb7BI')",
                                }}
                            ></div>
                            <div className="absolute top-2 right-2 rounded-full bg-secondary/90 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm shadow-sm">
                                💤 Uyku
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col p-3">
                            <h3 className="mb-1 text-base font-bold leading-tight text-slate-900 dark:text-white line-clamp-1">
                                En Komik Uyku
                            </h3>
                            <p className="mb-3 text-xs font-medium text-slate-500 dark:text-slate-400">85 Katılımcı</p>
                            <button className="mt-auto flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2 text-xs font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200 hover:border-secondary hover:text-secondary">
                                <span className="material-symbols-outlined text-[16px]">how_to_vote</span>
                                Oy Ver
                            </button>
                        </div>
                    </article>
                    <article className="flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10 transition-all hover:shadow-md">
                        <div className="relative aspect-square w-full group">
                            <div
                                className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCu9alSqQFJeggRAHXhUTT5Xe03q8exkd0Yp-cBerEYgh7USiLyjU9kM-dmYkVk0UbPC8lpYurh8-kTzqEW7bShH0Y5UWQbOJuRlRjQpWNcvFufkc2g3uoZEP_kAiuWlR4egfXY6L2acCyXne2PU1QzmXpcFQbFP_Tq2dY-8BdyGG251Jk7phvtWhLwSuatu5V6UthK0T6KQ01ed6cu0rDP9Zq-63qP5nGaztRmjFUMU8zDEuT3xKZzWqr2VFQVviXvHqpQO3w-1Ec')",
                                }}
                            ></div>
                            <div className="absolute top-2 right-2 rounded-full bg-accent/90 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm shadow-sm">
                                ⚡ Yetenek
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col p-3">
                            <h3 className="mb-1 text-base font-bold leading-tight text-slate-900 dark:text-white line-clamp-1">
                                Havada Yakala
                            </h3>
                            <p className="mb-3 text-xs font-medium text-slate-500 dark:text-slate-400">204 Katılımcı</p>
                            <button className="mt-auto flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2 text-xs font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200 hover:border-accent hover:text-accent">
                                <span className="material-symbols-outlined text-[16px]">how_to_vote</span>
                                Oy Ver
                            </button>
                        </div>
                    </article>
                    <article className="flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10 transition-all hover:shadow-md">
                        <div className="relative aspect-square w-full group">
                            <div
                                className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDLwanF9xbCAb4mBXURMr-yPnA73t8tHmafvwg6_9p0SeIL0oS-vwSicVI-LebXc64VsBrU2IrWlzqqJ-Pk0FOSWn6x3ltHP8fUtEgerPeWvlfGQuByRUrzX-vXmSHdcowiTP0U0SHC6j8Ir8-xAnYtR1nmYf_1Vpd_Ofot0tu6cNr6c5nHA4MEKr0i-A0fb5AkE5RXEmtRkkwJFVzwjZxN7XmhEvuX7Y2REXgOA83UG-pyuJy2YzY-kQQdXB9prl4UGvW5u4vYRos')",
                                }}
                            ></div>
                            <div className="absolute top-2 right-2 rounded-full bg-slate-800/80 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm shadow-sm">
                                😎 Duruş
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col p-3">
                            <h3 className="mb-1 text-base font-bold leading-tight text-slate-900 dark:text-white line-clamp-1">
                                En Ciddi Duruş
                            </h3>
                            <p className="mb-3 text-xs font-medium text-slate-500 dark:text-slate-400">56 Katılımcı</p>
                            <button className="mt-auto flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2 text-xs font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200">
                                <span className="material-symbols-outlined text-[16px]">how_to_vote</span>
                                Oy Ver
                            </button>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    );
}
