import { requireAuth } from "@/utils/supabase/check-auth";

export default async function ProfilPage() {
    await requireAuth();

    return (
        <main className="pb-24">
            <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm pt-safe px-4 py-3 flex items-center justify-between">
                <h1 className="text-2xl font-extrabold tracking-tight text-text-main dark:text-white">Profilim</h1>
                <button className="p-2 bg-white dark:bg-surface-dark rounded-full shadow-sm border border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">settings</span>
                </button>
            </header>
            <div className="px-4 space-y-6 pt-2">
                <section className="flex flex-col items-center pt-2 pb-4">
                    <div className="relative mb-3 group">
                        <div className="w-28 h-28 p-1 rounded-full bg-gradient-to-tr from-primary to-secondary shadow-lg shadow-primary/20">
                            <img alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-white dark:border-surface-dark bg-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuACdszP9Owo_giuD_cOFvDCsciUgRRjCl0ttEGK3iHXjRAhptbmyrguHv_21pMgTgv_Xodgo5ttPM5uce6UG2OXLM1Af-B7w3hzhZWDAlzu_DtLvxvUVsqJdBk01qAExuoaIDNx-zYh7UsvHr9QiiXKjXtn2RE6uKGGDLiCR387D6wmRHWR46SCtAlSm2scpx9_ShOKTMsrBvfT-HlFN3RofYqmBYTQD_6oHBzkn_z5W-Z2EQo82YaqmbmLDc66RiqsVPVpVrS6-u4" />
                        </div>
                        <button className="absolute bottom-1 right-1 bg-secondary text-white p-1.5 rounded-full border-4 border-white dark:border-surface-dark shadow-sm hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-[16px]">edit</span>
                        </button>
                    </div>
                    <h2 className="text-xl font-extrabold text-text-main dark:text-white mb-1">Ahmet Yılmaz</h2>
                    <div className="mt-2 flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-surface-dark rounded-full border border-primary/20 shadow-sm">
                        <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
                        <span className="text-primary-dark dark:text-primary font-bold text-sm tracking-wide">1,250 CP</span>
                    </div>
                </section>
                <section className="grid grid-cols-3 gap-3">
                    <div className="bg-white dark:bg-surface-dark p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center gap-1 hover:border-primary/30 transition-colors">
                        <span className="text-2xl font-extrabold text-text-main dark:text-white">12</span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase text-center leading-tight">Paylaşımlarım</span>
                    </div>
                    <div className="bg-white dark:bg-surface-dark p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center gap-1 hover:border-primary/30 transition-colors">
                        <span className="text-2xl font-extrabold text-secondary">45</span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase text-center leading-tight">Bağışlarım (kg)</span>
                    </div>
                    <div className="bg-white dark:bg-surface-dark p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center gap-1 hover:border-primary/30 transition-colors">
                        <span className="text-2xl font-extrabold text-primary">3</span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase text-center leading-tight">Yarışmalarım</span>
                    </div>
                </section>
                <section>
                    <div className="flex items-center justify-between mb-3 px-1">
                        <h3 className="text-lg font-bold text-text-main dark:text-white">Petlerim</h3>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar">
                        <div className="flex-shrink-0 flex flex-col items-center gap-2 group cursor-pointer">
                            <div className="w-20 h-20 rounded-2xl p-[2px] border-2 border-transparent group-hover:border-primary transition-colors">
                                <img alt="Pamuk" className="w-full h-full rounded-[14px] object-cover shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9HQsJt2bpMwKNBqssdTUu3kNrVZD8D1j1S_8aJQz333V_W2VCjHwAaCax9ntqN82zjZ1OXYji7ld0ZlpJo4wP7n7u6uMWkug1cw7ETLWQ8p7kfAE-RO10wjk1vjIjfbkElHS5i4LhijcurX5ewn71xo-1AeVH27wCzGTXuc8YtISFNzwzx3C9IULa_UGtIIVCvDcDMcibB-zye3RMDy9R4_-5cu3mETwofnBR7xL8MUAX4zHAmjlstYHbdXvoue68UkTtxbjvrh0" />
                            </div>
                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Pamuk</span>
                        </div>
                        <div className="flex-shrink-0 flex flex-col items-center gap-2 group cursor-pointer">
                            <div className="w-20 h-20 rounded-2xl p-[2px] border-2 border-transparent group-hover:border-primary transition-colors">
                                <img alt="Çiko" className="w-full h-full rounded-[14px] object-cover shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcnAWYs9BhTNJqOIuXUjh7lH3gimqzrooJvTJL084qMiSzezCvV8EY5AAMskZbngzfPFX0J1nC6V2j1Qw1nyafOmWzqoqCg5YXsN9TvQblPLZc9AGHecu9mfRCfbrwqiuTUK0zfqDRNVrmqs6ei0lswuScKzwiW8LRMXDcjRauQgJ_KkXLxGBOEt1etR3shNFL0RIVayFUYvjGl1LE8glz4P3HiA-wpK2tS6LZbQK6PNXF1CvqkYpP6Sm0zgcwqfQZ0bQHXjVNXCk" />
                            </div>
                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Çiko</span>
                        </div>
                        <button className="flex-shrink-0 flex flex-col items-center gap-2 group">
                            <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-surface-dark flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:border-primary group-hover:bg-primary/5 transition-all">
                                <span className="material-symbols-outlined text-[28px]">add</span>
                            </div>
                            <span className="text-xs font-bold text-gray-400 group-hover:text-primary transition-colors">Yeni Pet Ekle</span>
                        </button>
                    </div>
                </section>
                <section className="bg-white dark:bg-surface-dark rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <button className="w-full flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5 active:bg-gray-100 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">account_balance_wallet</span>
                            </div>
                            <span className="font-bold text-text-main dark:text-white text-sm">CiciCüzdanım</span>
                        </div>
                        <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors">chevron_right</span>
                    </button>
                    <button className="w-full flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5 active:bg-gray-100 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">campaign</span>
                            </div>
                            <span className="font-bold text-text-main dark:text-white text-sm">İlanlarım</span>
                        </div>
                        <span className="material-symbols-outlined text-gray-300 group-hover:text-secondary transition-colors">chevron_right</span>
                    </button>
                    <button className="w-full flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5 active:bg-gray-100 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-danger group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                            </div>
                            <span className="font-bold text-text-main dark:text-white text-sm">Favorilerim</span>
                        </div>
                        <span className="material-symbols-outlined text-gray-300 group-hover:text-danger transition-colors">chevron_right</span>
                    </button>
                    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 active:bg-gray-100 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">support_agent</span>
                            </div>
                            <span className="font-bold text-text-main dark:text-white text-sm">Yardım &amp; Destek</span>
                        </div>
                        <span className="material-symbols-outlined text-gray-300 group-hover:text-gray-500 transition-colors">chevron_right</span>
                    </button>
                </section>
                <button className="w-full py-3 text-red-400 font-bold text-sm hover:text-red-500 transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    Çıkış Yap
                </button>
            </div>
        </main>
    );
}
