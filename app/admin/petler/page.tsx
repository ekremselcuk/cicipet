
import MenuTrigger from "@/components/admin/MenuTrigger";
import { requireAdmin } from "@/utils/supabase/check-auth"; // Server-side check
import { createClient } from "@/utils/supabase/server";
import Link from 'next/link';

export default async function AdminPetsPage() {
    await requireAdmin();
    const supabase = await createClient();

    const { data: pets } = await supabase
        .from('pets')
        .select('*')
        .order('id', { ascending: false });

    // Calculate stats
    const catCount = pets?.filter((p: any) => p.type === 'kedi').length || 0;
    const dogCount = pets?.filter((p: any) => p.type === 'kopek').length || 0;
    const otherCount = pets?.filter((p: any) => p.type !== 'kedi' && p.type !== 'kopek').length || 0;

    return (
        <div className="relative flex flex-col h-full min-h-screen pb-24">
            {/* Top Header */}
            <header className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-white/5 px-4 pt-4 pb-2">
                <div className="flex items-center justify-between mb-4">
                    {/* Menu Trigger Replaced */}
                    <MenuTrigger />
                    <h1 className="text-xl font-bold tracking-tight text-center flex-1 text-slate-900 dark:text-white">Pet Yönetimi</h1>
                    <div className="flex gap-2">
                        <button className="relative p-2 -mr-2 text-slate-600 dark:text-gray-300 hover:text-primary transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5">
                            <span className="material-symbols-outlined text-[24px]">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background-dark"></span>
                        </button>
                    </div>
                </div>
                {/* Search Bar */}
                <div className="relative w-full mb-2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-gray-400">search</span>
                    </div>
                    <input className="block w-full pl-10 pr-3 py-3 border-none rounded-xl text-sm font-medium bg-white dark:bg-surface-dark text-slate-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-surface-dark transition-all shadow-sm" placeholder="İsim, ID veya Sahip ara..." type="text" />
                </div>
            </header>

            {/* Main Content */}
            <main className="flex flex-col gap-6 p-4">
                {/* Stats Summary */}
                <section className="flex gap-3 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 snap-x">
                    <div className="snap-center shrink-0 min-w-[140px] flex-1 bg-white dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-gray-100 dark:border-white/5 flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                            <span className="material-symbols-outlined text-[20px] text-primary">pets</span>
                            <span className="text-xs font-semibold uppercase tracking-wider">Kedi</span>
                        </div>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">1,204</p>
                        <p className="text-xs text-green-500 font-medium flex items-center mt-1">
                            <span className="material-symbols-outlined text-[16px] mr-0.5">trending_up</span> +12%
                        </p>
                    </div>
                    <div className="snap-center shrink-0 min-w-[140px] flex-1 bg-white dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-gray-100 dark:border-white/5 flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                            <span className="material-symbols-outlined text-[20px] text-blue-400">pet_supplies</span>
                            <span className="text-xs font-semibold uppercase tracking-wider">Köpek</span>
                        </div>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">850</p>
                        <p className="text-xs text-green-500 font-medium flex items-center mt-1">
                            <span className="material-symbols-outlined text-[16px] mr-0.5">trending_up</span> +5%
                        </p>
                    </div>
                    <div className="snap-center shrink-0 min-w-[140px] flex-1 bg-white dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-gray-100 dark:border-white/5 flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                            <span className="material-symbols-outlined text-[20px] text-purple-400">cruelty_free</span>
                            <span className="text-xs font-semibold uppercase tracking-wider">Diğer</span>
                        </div>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">120</p>
                        <p className="text-xs text-gray-500 font-medium flex items-center mt-1">
                            <span className="material-symbols-outlined text-[16px] mr-0.5">remove</span> 0%
                        </p>
                    </div>
                </section>

                {/* Filters */}
                <section className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4">
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-primary text-black rounded-lg text-sm font-bold shrink-0 transition-transform active:scale-95">
                        <span className="material-symbols-outlined text-[18px]">filter_list</span>
                        Tümü
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-slate-700 dark:text-gray-300 rounded-lg text-sm font-medium shrink-0 whitespace-nowrap active:bg-gray-100 dark:active:bg-white/10">
                        Tür
                        <span className="material-symbols-outlined text-[18px] opacity-70">expand_more</span>
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-slate-700 dark:text-gray-300 rounded-lg text-sm font-medium shrink-0 whitespace-nowrap active:bg-gray-100 dark:active:bg-white/10">
                        Irk
                        <span className="material-symbols-outlined text-[18px] opacity-70">expand_more</span>
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-slate-700 dark:text-gray-300 rounded-lg text-sm font-medium shrink-0 whitespace-nowrap active:bg-gray-100 dark:active:bg-white/10">
                        Cinsiyet
                        <span className="material-symbols-outlined text-[18px] opacity-70">expand_more</span>
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-slate-700 dark:text-gray-300 rounded-lg text-sm font-medium shrink-0 whitespace-nowrap active:bg-gray-100 dark:active:bg-white/10">
                        Durum
                        <span className="material-symbols-outlined text-[18px] opacity-70">expand_more</span>
                    </button>
                </section>

                {/* Data List */}
                <section className="flex flex-col gap-4">
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest pl-1">Pet Listesi</h2>
                    {pets && pets.length > 0 ? (
                        pets.map((pet: any) => (
                            <div key={pet.id} className={`bg-white dark:bg-surface-dark rounded-xl p-4 shadow-sm border ${pet.status === 'pending' ? 'border-orange-200 dark:border-orange-500/20' : 'border-gray-200 dark:border-white/5'} flex flex-col gap-4`}>
                                <div className="flex items-start gap-4">
                                    <div className="relative shrink-0">
                                        <div className="w-16 h-16 rounded-lg bg-cover bg-center shadow-inner" style={{ backgroundImage: `url('${pet.image_url || "https://via.placeholder.com/150"}')` }}></div>
                                        <div className="absolute -bottom-1.5 -right-1.5 bg-background-light dark:bg-surface-dark p-0.5 rounded-full">
                                            <div className={`w-3 h-3 rounded-full border-2 border-white dark:border-surface-dark ${pet.status === 'approved' ? 'bg-emerald-500' : 'bg-orange-500'}`}></div>
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{pet.name || 'İsimsiz'}</h3>
                                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                                    <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">{pet.type || 'Bilinmiyor'}</span>
                                                    <span>•</span>
                                                    <span>{pet.breed || 'Melez'}</span>
                                                    <span>•</span>
                                                    <span>{pet.age || '?'} Yaşında</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
                                                <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                                                <span className="text-xs font-bold text-primary">0</span>
                                            </div>
                                        </div>
                                        <a className="mt-2 flex items-center gap-1 text-sm text-primary hover:underline w-fit" href={`/profil/${pet.owner_id}`}>
                                            <span className="material-symbols-outlined text-[16px]">person</span>
                                            ID: {pet.owner_id ? pet.owner_id.slice(0, 8) : 'Yok'}
                                        </a>
                                    </div>
                                </div>
                                <div className="border-t border-gray-100 dark:border-white/5 pt-3 flex items-center justify-between gap-2">
                                    <Link href={`/pet/${pet.id}`} className="flex-1 h-9 flex items-center justify-center gap-2 rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-xs font-semibold text-slate-600 dark:text-gray-300 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                                        Profili Gör
                                    </Link>
                                    <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-red-500/20 hover:text-red-500 text-slate-600 dark:text-gray-300 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-400">
                            Henüz kayıtlı pet yok.
                        </div>
                    )}
                </section>

                {/* Pagination / Load More */}
                <div className="flex justify-center pt-2 pb-6">
                    <button className="text-sm font-semibold text-gray-500 hover:text-primary transition-colors flex items-center gap-2">
                        Daha Fazla Göster
                        <span className="material-symbols-outlined text-[20px]">expand_more</span>
                    </button>
                </div>
            </main>

            {/* Floating Action Button */}
            <div className="fixed bottom-24 right-4 z-10">
                <button className="h-14 w-14 rounded-full bg-primary shadow-lg shadow-primary/30 flex items-center justify-center text-black hover:bg-primary/90 transition-colors">
                    <span className="material-symbols-outlined text-[28px]">add</span>
                </button>
            </div>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-background-light dark:bg-surface-dark border-t border-gray-200 dark:border-white/5 z-30 pb-safe">
                <div className="flex justify-around items-center h-16">
                    <button className="flex flex-col items-center justify-center gap-1 w-full h-full text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[24px]">dashboard</span>
                        <span className="text-[10px] font-medium">Panel</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-1 w-full h-full text-primary relative">
                        <span className="material-symbols-outlined text-[24px] fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
                        <span className="text-[10px] font-bold">Petler</span>
                        <span className="absolute top-0 w-full h-0.5 bg-primary"></span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-1 w-full h-full text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[24px]">group</span>
                        <span className="text-[10px] font-medium">Kullanıcılar</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-1 w-full h-full text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[24px]">trophy</span>
                        <span className="text-[10px] font-medium">Yarışmalar</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-1 w-full h-full text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[24px]">settings</span>
                        <span className="text-[10px] font-medium">Ayarlar</span>
                    </button>
                </div>
                {/* Safe area spacing for iOS Home Indicator */}
                <div className="h-safe-bottom"></div>
            </nav>
            <script dangerouslySetInnerHTML={{
                __html: `
            const style = document.createElement('style');
            style.innerHTML = \`
                .pb-safe { padding-bottom: env(safe-area-inset-bottom, 20px); }
                .h-safe-bottom { height: env(safe-area-inset-bottom, 0px); }
            \`;
            document.head.appendChild(style);
        ` }} />
        </div>
    );
}
