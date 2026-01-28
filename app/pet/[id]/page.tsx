
export default function PetDetailPage() {
    return (
        <main className="bg-background-light dark:bg-background-dark font-display text-text-main dark:text-white pb-28">
            <div className="relative h-[45vh] w-full group">
                <img alt="Pamuk" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeKabjMNCgA043Na8n0sLGuV9D2ty6g1FvAys61JW-y1VfGl5P8qH2rsBCLpnDf0KKWxYtGA6h5rKxHG0QUrkWZ6foDavFn-rQb02nk_16nL2gL3z4KwmF5xPTA60y1_nywVEJAN1lENN1FnoM6z0GFJmTqNAj976sb3JpZ1mfzNGN4ELM1EFBPZ2MiqhJThOIa2rRD9TFGU3O2QAJtBGIh8OSBVrrSDPfP6g6wz-bgJxtQsaH_cqbG-45jNQ29Tbez_pOGsBVE-I" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute top-0 left-0 right-0 p-4 pt-12 flex justify-between items-center z-10">
                    <button className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors border border-white/10">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <button className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-bold hover:bg-white/20 transition-colors flex items-center gap-2 border border-white/10">
                        <span className="material-symbols-outlined text-[16px]">edit_square</span>
                        Düzenle
                    </button>
                </div>
                <div className="absolute bottom-10 left-6 text-white z-10 w-full pr-6">
                    <h1 className="text-5xl font-extrabold tracking-tight mb-2 drop-shadow-lg">Pamuk</h1>
                    <div className="flex flex-wrap items-center gap-2 text-white/95 text-sm font-semibold">
                        <span className="bg-primary px-2.5 py-1 rounded-lg text-white text-xs shadow-sm flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">female</span> Dişi
                        </span>
                        <span className="w-1 h-1 bg-white rounded-full opacity-50"></span>
                        <span className="drop-shadow-md">British Shorthair</span>
                        <span className="w-1 h-1 bg-white rounded-full opacity-50"></span>
                        <span className="drop-shadow-md">İstanbul</span>
                    </div>
                </div>
            </div>
            <div className="relative -mt-6 rounded-t-[2.5rem] bg-background-light dark:bg-background-dark p-6 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] z-20">
                <div className="flex gap-4 mb-8 overflow-x-auto no-scrollbar pb-2">
                    <div className="flex-1 min-w-[100px] p-4 rounded-2xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center gap-1 hover:border-primary/30 transition-colors">
                        <span className="text-xs text-text-sub font-semibold uppercase tracking-wide">Yaş</span>
                        <span className="text-xl font-extrabold text-secondary">2 Yıl</span>
                    </div>
                    <div className="flex-1 min-w-[100px] p-4 rounded-2xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center gap-1 hover:border-primary/30 transition-colors">
                        <span className="text-xs text-text-sub font-semibold uppercase tracking-wide">Kilo</span>
                        <span className="text-xl font-extrabold text-secondary">4.2 kg</span>
                    </div>
                    <div className="flex-1 min-w-[100px] p-4 rounded-2xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center gap-1 hover:border-primary/30 transition-colors">
                        <span className="text-xs text-text-sub font-semibold uppercase tracking-wide">Karne No</span>
                        <span className="text-xl font-extrabold text-secondary">A-124</span>
                    </div>
                </div>
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-text-main dark:text-white mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[24px]">medical_services</span>
                        Sağlık &amp; Bakım
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                        <button className="flex items-center p-4 bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900 transition-all group active:scale-[0.98]">
                            <div className="h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-500 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">vaccines</span>
                            </div>
                            <div className="flex-1 text-left">
                                <h4 className="font-bold text-base text-text-main dark:text-white group-hover:text-blue-600 transition-colors">Aşı Takvimi</h4>
                                <p className="text-xs text-text-sub mt-0.5">Sonraki: Karma Aşı (2 gün)</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-full p-1 text-gray-400 group-hover:text-blue-500 transition-colors">
                                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                            </div>
                        </button>
                        <button className="flex items-center p-4 bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md hover:border-green-200 dark:hover:border-green-900 transition-all group active:scale-[0.98]">
                            <div className="h-12 w-12 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-500 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">restaurant</span>
                            </div>
                            <div className="flex-1 text-left">
                                <h4 className="font-bold text-base text-text-main dark:text-white group-hover:text-green-600 transition-colors">Beslenme Planı</h4>
                                <p className="text-xs text-text-sub mt-0.5">Günde 2 öğün • ProPlan Somon</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-full p-1 text-gray-400 group-hover:text-green-500 transition-colors">
                                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                            </div>
                        </button>
                        <button className="flex items-center p-4 bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md hover:border-purple-200 dark:hover:border-purple-900 transition-all group active:scale-[0.98]">
                            <div className="h-12 w-12 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-500 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">calendar_month</span>
                            </div>
                            <div className="flex-1 text-left">
                                <h4 className="font-bold text-base text-text-main dark:text-white group-hover:text-purple-600 transition-colors">Veteriner Randevuları</h4>
                                <p className="text-xs text-text-sub mt-0.5">Yaklaşan randevu yok</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-full p-1 text-gray-400 group-hover:text-purple-500 transition-colors">
                                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-text-main dark:text-white mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                        Kazandığı Ödüller
                    </h3>
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-5 border border-primary/20 relative overflow-hidden group">
                        <div className="absolute -top-4 -right-4 p-4 opacity-5 rotate-12 group-hover:scale-110 transition-transform duration-700">
                            <span className="material-symbols-outlined text-[120px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>trophy</span>
                        </div>
                        <div className="flex justify-between items-center relative z-10">
                            <div>
                                <p className="text-[10px] font-bold text-text-sub uppercase tracking-widest mb-1">Toplam CiciPuan</p>
                                <p className="text-4xl font-black text-primary drop-shadow-sm">2.450</p>
                            </div>
                            <div className="flex -space-x-3 items-center pl-4">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-b from-yellow-300 to-yellow-500 border-2 border-white dark:border-surface-dark flex items-center justify-center shadow-lg text-white transform hover:-translate-y-1 transition-transform z-30" title="Güzellik Yarışması 1.">
                                    <span className="material-symbols-outlined text-xl drop-shadow-md">trophy</span>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-gradient-to-b from-gray-200 to-gray-400 border-2 border-white dark:border-surface-dark flex items-center justify-center shadow-md text-gray-600 transform hover:-translate-y-1 transition-transform z-20" title="Hız Yarışması 2.">
                                    <span className="material-symbols-outlined text-xl drop-shadow-sm">trophy</span>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-gradient-to-b from-orange-200 to-orange-400 border-2 border-white dark:border-surface-dark flex items-center justify-center shadow-md text-white transform hover:-translate-y-1 transition-transform z-10" title="Sadakat Rozeti">
                                    <span className="material-symbols-outlined text-xl drop-shadow-md">workspace_premium</span>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-white dark:bg-surface-dark border-2 border-primary/20 flex items-center justify-center shadow-sm text-primary text-xs font-bold z-0 ml-1">
                                    +4
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 pt-4 border-t border-primary/10 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary-dark text-sm">stars</span>
                            <span className="text-xs font-semibold text-primary-dark">Son Başarı: En Fotojenik Kedi (Ekim '23)</span>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pb-8">
                    <button className="relative overflow-hidden flex flex-col items-center justify-center gap-2 p-5 bg-secondary text-white rounded-3xl shadow-lg shadow-secondary/30 hover:bg-teal-700 transition-all active:scale-95 group">
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-3xl"></div>
                        <span className="material-symbols-outlined text-3xl">pets</span>
                        <span className="text-sm font-bold tracking-wide">İlan Oluştur</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-2 p-5 bg-white dark:bg-surface-dark text-text-main dark:text-white border border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-95">
                        <span className="material-symbols-outlined text-3xl text-primary">clinical_notes</span>
                        <span className="text-sm font-bold tracking-wide">Sağlık Karnesi</span>
                    </button>
                </div>
            </div>
        </main>
    );
}
