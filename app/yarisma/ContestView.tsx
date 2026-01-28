"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";

type Contest = {
    id: string;
    title: string;
    description: string;
    image_url: string;
    category: string;
    end_date: string;
    prize_details: string;
};

export default function ContestView({ contests }: { contests: Contest[] }) {
    const [activeCategory, setActiveCategory] = useState("Popüler");

    const categories = [
        { name: "Popüler", icon: "local_fire_department", color: "text-white" },
        { name: "Yerel", icon: "location_on", color: "text-[#2a9d8f]" },
        { name: "Yetenek", icon: "pets", color: "text-[#e76f51]" },
        { name: "Barınak Destek", icon: "volunteer_activism", color: "text-[#2a9d8f]" },
    ];

    // Filter contests based on activeCategory could go here, 
    // but for now we'll just show what we have or implement basic client-side filtering if metadata exists.

    // Using the first contest as "Günün Yarışması" if available
    const featuredContest = contests && contests.length > 0 ? contests[0] : null;

    return (
        <main className="flex flex-col gap-6 w-full mt-4 pb-24">
            <Header />
            <section className="px-4">
                {featuredContest ? (
                    <div className="group relative w-full overflow-hidden rounded-[2rem] bg-white dark:bg-slate-800 shadow-xl shadow-primary/5 ring-1 ring-slate-900/5 dark:ring-white/10 transition-all hover:shadow-2xl hover:shadow-primary/10">
                        <div className="absolute inset-0 z-0">
                            <div
                                className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{
                                    backgroundImage: `url('${featuredContest.image_url || 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=2070&auto=format&fit=crop'}')`,
                                }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                        </div>
                        <div className="relative z-10 flex flex-col justify-end p-6 pt-32 h-full">
                            <div className="mb-2 flex items-center gap-2 flex-wrap">
                                <span className="rounded-full bg-primary px-3 py-1 text-[10px] uppercase tracking-wider font-bold text-white shadow-sm">
                                    Günün Yarışması
                                </span>
                                <div className="flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-sm ring-1 ring-white/10">
                                    <span className="material-symbols-outlined text-[14px]">timer</span>
                                    <span>Bitmesine 2 gün kaldı</span>
                                </div>
                            </div>
                            <h2 className="mb-2 text-3xl font-extrabold leading-tight text-white">{featuredContest.title}</h2>
                            <div className="mb-5 flex items-center gap-3 text-white/90">
                                <span className="material-symbols-outlined text-primary fill-1">emoji_events</span>
                                <span className="text-sm font-medium">
                                    Ödül: <span className="font-bold text-white">{featuredContest.prize_details || "Sürpriz Ödül"}</span>
                                </span>
                            </div>
                            <button className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-slate-900 shadow-lg shadow-primary/25 transition-transform active:scale-95 hover:bg-amber-400">
                                Hemen Katıl
                                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="p-8 text-center bg-gray-100 rounded-2xl dark:bg-surface-dark">
                        <p>Henüz aktif bir yarışma yok.</p>
                    </div>
                )}
            </section>

            {/* Quick Vote Banner - Static for now */}
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

            {/* Categories */}
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

            {/* List of other contests could go here */}

        </main>
    );
}
