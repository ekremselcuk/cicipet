
export default function IlanlarPage() {
    return (
        <main className="pb-24">
            <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="flex items-center justify-between p-4 pb-2">
                    <div className="flex items-center gap-3">
                        <button className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-text-main dark:text-white transition-colors">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <h2 className="text-lg font-extrabold tracking-tight text-text-main dark:text-white truncate">Eş, Yuva &amp; Kayıp</h2>
                    </div>
                    <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-text-main dark:text-white transition-colors">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border border-white dark:border-surface-dark"></span>
                    </button>
                </div>
                <div className="px-4 pb-3">
                    <div className="flex bg-gray-100 dark:bg-surface-dark p-1 rounded-xl gap-1">
                        <button className="flex-1 py-2 text-[11px] sm:text-xs font-semibold rounded-lg text-gray-500 dark:text-gray-400 hover:text-text-main dark:hover:text-white transition-all whitespace-nowrap">
                            Eş Bulma
                        </button>
                        <button className="flex-1 py-2 text-[11px] sm:text-xs font-semibold rounded-lg text-gray-500 dark:text-gray-400 hover:text-text-main dark:hover:text-white transition-all whitespace-nowrap">
                            Sahiplendirme
                        </button>
                        <button className="flex-1 py-2 text-[11px] sm:text-xs font-bold rounded-lg bg-white dark:bg-gray-700 shadow-sm text-danger dark:text-red-400 transition-all whitespace-nowrap">
                            Kayıp İlanları
                        </button>
                    </div>
                </div>
                <div className="px-4 pb-3 flex gap-3">
                    <div className="relative flex-1 h-11 rounded-xl bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden group focus-within:ring-2 focus-within:ring-primary/50 transition-all flex items-center">
                        <div className="grid place-items-center h-full w-10 text-text-sub pl-1">
                            <span className="material-symbols-outlined text-[20px]">search</span>
                        </div>
                        <input className="peer h-full w-full outline-none text-sm text-text-main dark:text-white pr-2 bg-transparent placeholder:text-text-sub/70" id="search" placeholder="Irk, yaş veya şehir ara..." type="text" />
                    </div>
                    <button className="h-11 px-4 bg-secondary text-white rounded-xl font-bold text-sm shadow-md shadow-secondary/20 hover:bg-teal-700 transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">tune</span>
                        Filtrele
                    </button>
                </div>
            </header>
            <div className="p-4 pt-2 space-y-6">
                <section>
                    <div className="flex items-center justify-between mb-3 px-1">
                        <h3 className="text-lg font-bold text-text-main dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-danger text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>priority_high</span>
                            Acil Kayıplar
                        </h3>
                    </div>
                    <div className="relative w-full h-40 rounded-2xl overflow-hidden shadow-lg group cursor-pointer border-2 border-danger/20">
                        <img alt="Featured Pet" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLpXXIP2idRltVqnVLypiqDxnwj7SGWLjOgLqyB01W60cA4Sj-6TpVYhMVTyTHJKqqJdgf-mY85_IpTKDD81z3JSMquPIM1HtVqqGy38SQNPxQ0DX-7lXsSYFxnMov07GiboJYBiHwJ5U-dB_oap2-Q1FJL9HUcWWdYlRxRaM4W-x9lBQmW--qMWKgB9dbwu2fVf1WqDY5iRfixJlbzLHb_KfnynX2v3TerGsk6mlxvhGb4egJ_vyZ6-ZYEAysRQzH0XMLgPt8qzc" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center p-5">
                            <span className="bg-danger text-white text-[10px] font-bold px-2 py-0.5 rounded-md w-fit mb-2 animate-pulse">ACİL KAYIP!</span>
                            <h4 className="text-white text-xl font-extrabold mb-1">Duman Kayboldu!</h4>
                            <p className="text-white/90 text-xs mb-3 max-w-[70%]">Golden, boynunda kırmızı tasma var. En son Bebek parkında görüldü.</p>
                            <button className="bg-danger hover:bg-red-600 text-white border-none text-xs font-bold py-1.5 px-3 rounded-lg w-fit transition-all shadow-lg shadow-red-500/30 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">visibility</span>
                                Gördüm!
                            </button>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-surface-dark rounded-2xl p-2 shadow-sm border border-red-100 dark:border-red-900/30 hover:shadow-md transition-shadow">
                            <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                                <img alt="Lost Cat" className="w-full h-full object-cover grayscale-[20%]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeKabjMNCgA043Na8n0sLGuV9D2ty6g1FvAys61JW-y1VfGl5P8qH2rsBCLpnDf0KKWxYtGA6h5rKxHG0QUrkWZ6foDavFn-rQb02nk_16nL2gL3z4KwmF5xPTA60y1_nywVEJAN1lENN1FnoM6z0GFJmTqNAj976sb3JpZ1mfzNGN4ELM1EFBPZ2MiqhJThOIa2rRD9TFGU3O2QAJtBGIh8OSBVrrSDPfP6g6wz-bgJxtQsaH_cqbG-45jNQ29Tbez_pOGsBVE-I" />
                                <div className="absolute top-2 left-2 bg-danger/90 backdrop-blur-sm px-2 py-0.5 rounded-md shadow-sm">
                                    <span className="text-[10px] font-bold text-white uppercase flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[10px]">warning</span> Kayıp
                                    </span>
                                </div>
                                <button className="absolute top-2 right-2 p-1.5 bg-white/60 dark:bg-black/40 backdrop-blur-sm rounded-full text-gray-600 dark:text-gray-200 hover:text-red-500 hover:scale-110 transition-all">
                                    <span className="material-symbols-outlined text-[18px]">share</span>
                                </button>
                            </div>
                            <div className="px-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-text-main dark:text-white truncate">Pamuk</h4>
                                    <span className="text-[10px] font-medium bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded text-red-500 dark:text-red-300">Ödüllü</span>
                                </div>
                                <p className="text-xs text-secondary font-medium mb-1 truncate">British Shorthair</p>
                                <div className="flex items-center gap-1 text-red-500 mb-3 font-medium">
                                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                                    <span className="text-[10px]">Kadıköy, Moda</span>
                                </div>
                                <button className="w-full py-2 bg-danger hover:bg-red-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-red-200 dark:shadow-none">
                                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                                    Gördüm!
                                </button>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-surface-dark rounded-2xl p-2 shadow-sm border border-red-100 dark:border-red-900/30 hover:shadow-md transition-shadow">
                            <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                                <img alt="Lost Dog" className="w-full h-full object-cover grayscale-[20%]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBANMbdVnwHzX-3UPHBnC7ED_7WtAOp8QpcKqrRs1QPb9kLw1bmshjUNfS0N9_jmxK1HPbiwB2LA--eAJugL3cR9imJxpMLS9O0DND4LcEGjvBLSBoL6Bl2eQuLrC2m1AEGVsLYisLHFpxrchsFi1Aw1AAtMJVtLxAD3Eo7zpSyaf2BVg2qXrbXXgWj3ZrVBlqKkbhBT4Guh9TB6jOl63EctH00BbMoqb-ucVYV8dNaVDBL9AqsCOzHKHtW8DFWseEJpnlnda2rGq4" />
                                <div className="absolute top-2 left-2 bg-danger/90 backdrop-blur-sm px-2 py-0.5 rounded-md shadow-sm">
                                    <span className="text-[10px] font-bold text-white uppercase flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[10px]">warning</span> Kayıp
                                    </span>
                                </div>
                                <button className="absolute top-2 right-2 p-1.5 bg-white/60 dark:bg-black/40 backdrop-blur-sm rounded-full text-gray-600 dark:text-gray-200 hover:text-red-500 hover:scale-110 transition-all">
                                    <span className="material-symbols-outlined text-[18px]">share</span>
                                </button>
                            </div>
                            <div className="px-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-text-main dark:text-white truncate">Badem</h4>
                                    <span className="text-[10px] font-medium bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-gray-500 dark:text-gray-300">3 gündür</span>
                                </div>
                                <p className="text-xs text-secondary font-medium mb-1 truncate">Terrier Mix</p>
                                <div className="flex items-center gap-1 text-red-500 mb-3 font-medium">
                                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                                    <span className="text-[10px]">Beşiktaş, Çarşı</span>
                                </div>
                                <button className="w-full py-2 bg-white border border-danger text-danger hover:bg-red-50 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5">
                                    <span className="material-symbols-outlined text-[16px]">campaign</span>
                                    Haber Ver
                                </button>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-surface-dark rounded-2xl p-2 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow opacity-60 grayscale filter">
                            <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                                <img alt="Cat" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9HQsJt2bpMwKNBqssdTUu3kNrVZD8D1j1S_8aJQz333V_W2VCjHwAaCax9ntqN82zjZ1OXYji7ld0ZlpJo4wP7n7u6uMWkug1cw7ETLWQ8p7kfAE-RO10wjk1vjIjfbkElHS5i4LhijcurX5ewn71xo-1AeVH27wCzGTXuc8YtISFNzwzx3C9IULa_UGtIIVCvDcDMcibB-zye3RMDy9R4_-5cu3mETwofnBR7xL8MUAX4zHAmjlstYHbdXvoue68UkTtxbjvrh0" />
                                <div className="absolute top-2 left-2 bg-gray-500 backdrop-blur-sm px-2 py-0.5 rounded-md shadow-sm">
                                    <span className="text-[10px] font-bold text-white">Eş Arıyor</span>
                                </div>
                                <button className="absolute top-2 right-2 p-1.5 bg-white/60 dark:bg-black/40 backdrop-blur-sm rounded-full text-gray-600 dark:text-gray-200 hover:text-red-500 hover:scale-110 transition-all">
                                    <span className="material-symbols-outlined text-[18px]">favorite</span>
                                </button>
                            </div>
                            <div className="px-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-text-main dark:text-white truncate">Mia</h4>
                                    <span className="text-[10px] font-medium bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-gray-500 dark:text-gray-300">1.5 Yaş</span>
                                </div>
                                <p className="text-xs text-secondary font-medium mb-1 truncate">Scottish Fold</p>
                                <div className="flex items-center gap-1 text-gray-400 mb-3">
                                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                                    <span className="text-[10px]">Çankaya, Ank</span>
                                </div>
                                <button className="w-full py-2 bg-gray-100 text-gray-400 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-not-allowed">
                                    <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
                                    Mesaj At
                                </button>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-surface-dark rounded-2xl p-2 shadow-sm border border-red-100 dark:border-red-900/30 hover:shadow-md transition-shadow">
                            <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                                <img alt="Dog" className="w-full h-full object-cover grayscale-[20%]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcnAWYs9BhTNJqOIuXUjh7lH3gimqzrooJvTJL084qMiSzezCvV8EY5AAMskZbngzfPFX0J1nC6V2j1Qw1nyafOmWzqoqCg5YXsN9TvQblPLZc9AGHecu9mfRCfbrwqiuTUK0zfqDRNVrmqs6ei0lswuScKzwiW8LRMXDcjRauQgJ_KkXLxGBOEt1etR3shNFL0RIVayFUYvjGl1LE8glz4P3HiA-wpK2tS6LZbQK6PNXF1CvqkYpP6Sm0zgcwqfQZ0bQHXjVNXCk" />
                                <div className="absolute top-2 left-2 bg-danger/90 backdrop-blur-sm px-2 py-0.5 rounded-md shadow-sm">
                                    <span className="text-[10px] font-bold text-white uppercase flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[10px]">warning</span> Kayıp
                                    </span>
                                </div>
                                <button className="absolute top-2 right-2 p-1.5 bg-white/60 dark:bg-black/40 backdrop-blur-sm rounded-full text-gray-600 dark:text-gray-200 hover:text-red-500 hover:scale-110 transition-all">
                                    <span className="material-symbols-outlined text-[18px]">share</span>
                                </button>
                            </div>
                            <div className="px-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-text-main dark:text-white truncate">Çiko</h4>
                                    <span className="text-[10px] font-medium bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-gray-500 dark:text-gray-300">1 haftadır</span>
                                </div>
                                <p className="text-xs text-secondary font-medium mb-1 truncate">French Bulldog</p>
                                <div className="flex items-center gap-1 text-red-500 mb-3 font-medium">
                                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                                    <span className="text-[10px]">Bornova, Park</span>
                                </div>
                                <button className="w-full py-2 bg-danger hover:bg-red-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-red-200 dark:shadow-none">
                                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                                    Gördüm!
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <button className="fixed bottom-24 right-4 z-40 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full px-5 py-3 shadow-xl shadow-primary/30 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all">
                <span className="material-symbols-outlined text-[24px]">add</span>
                <span className="text-sm font-bold">İlan Ver</span>
            </button>
        </main>
    );
}
