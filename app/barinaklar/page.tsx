
export default function BarinaklarPage() {
    return (
        <main className="pb-24">
            <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 pb-2 shadow-sm">
                <div className="flex items-center justify-between p-4 pb-2">
                    <div className="flex items-center gap-3">
                        <button className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-text-main dark:text-white transition-colors">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <h2 className="text-xl font-extrabold tracking-tight text-text-main dark:text-white">Barınaklar ve Bağış</h2>
                    </div>
                    <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-text-main dark:text-white transition-colors">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border border-white dark:border-surface-dark"></span>
                    </button>
                </div>
                <div className="px-4 pb-3">
                    <div className="relative flex items-center w-full h-11 rounded-xl bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden group focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                        <div className="grid place-items-center h-full w-10 text-text-sub pl-1">
                            <span className="material-symbols-outlined text-[20px]">search</span>
                        </div>
                        <input className="peer h-full w-full outline-none text-sm text-text-main dark:text-white pr-2 bg-transparent placeholder:text-text-sub/70" id="search" placeholder="Barınak adı veya şehir ara..." type="text" />
                        <div className="pr-3 text-text-sub">
                            <span className="material-symbols-outlined text-[20px]">tune</span>
                        </div>
                    </div>
                </div>
            </header>
            <section className="p-4 pt-2">
                <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-r from-secondary to-teal-700 shadow-lg shadow-secondary/20">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                    <div className="relative p-5 flex flex-col items-center text-center">
                        <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full mb-3">
                            <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>volunteer_activism</span>
                        </div>
                        <h3 className="text-white text-2xl font-extrabold mb-1">14.500 KG</h3>
                        <p className="text-white/90 text-sm font-medium mb-3">Toplam Bağışlanan Mama</p>
                        <div className="w-full bg-white/20 h-1.5 rounded-full mb-3 overflow-hidden">
                            <div className="bg-primary h-full rounded-full w-[75%] shadow-[0_0_10px_rgba(244,171,37,0.5)]"></div>
                        </div>
                        <p className="text-xs text-white/80">Bu ay hedefimizin %75'ine ulaştık. <span className="font-bold text-white underline decoration-primary decoration-2 underline-offset-2">Barınaklara destek ol!</span></p>
                    </div>
                </div>
            </section>
            <section className="px-4 pb-4">
                <div className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 pointer-events-none"></div>
                    <div className="flex-1 flex flex-col justify-center z-10">
                        <div className="flex items-center gap-2 mb-1.5">
                            <div className="p-1.5 rounded-lg bg-secondary/10 text-secondary">
                                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>soup_kitchen</span>
                            </div>
                            <h3 className="text-lg font-bold text-text-main dark:text-white">Askıda Mama</h3>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-snug">
                            Birlikten kuvvet doğar! Küçük puanlarla havuza destek ol, dostlarımız doysun.
                        </p>
                        <button className="w-fit px-4 py-2.5 bg-secondary hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-md shadow-secondary/20 hover:shadow-lg transition-all flex items-center gap-2 active:scale-95">
                            <span className="material-symbols-outlined text-[16px]">add_circle</span>
                            Katıl
                            <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] ml-1">-50 CP</span>
                        </button>
                    </div>
                    <div className="relative shrink-0 flex flex-col items-center z-10">
                        <div className="relative w-24 h-24">
                            <svg className="w-full h-full -rotate-90 transform">
                                <circle className="text-gray-100 dark:text-gray-800" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="8"></circle>
                                <circle className="text-primary" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="62" strokeLinecap="round" strokeWidth="8"></circle>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-xl font-extrabold text-text-main dark:text-white">75%</span>
                            </div>
                        </div>
                        <div className="mt-1 text-center bg-gray-50 dark:bg-white/5 px-2 py-1 rounded-md">
                            <span className="text-[10px] font-bold text-text-sub">3.750 / 5.000</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-4 border-t border-gray-100 dark:border-gray-800 bg-orange-50/50 dark:bg-surface-dark/30">
                <div className="px-4 mb-3 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-text-main dark:text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-red-500 animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
                        Acil İhtiyaçlar
                    </h3>
                    <button className="text-xs font-bold text-primary hover:text-primary-dark">Tüm Liste</button>
                </div>
                <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 pb-2 snap-x snap-mandatory">
                    <div className="snap-start shrink-0 w-[140px] flex flex-col gap-2 group">
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-gray-100 dark:border-gray-700 shadow-sm">
                            <img alt="Kitten Food" className="w-full h-full object-cover group-hover:scale-105 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeKabjMNCgA043Na8n0sLGuV9D2ty6g1FvAys61JW-y1VfGl5P8qH2rsBCLpnDf0KKWxYtGA6h5rKxHG0QUrkWZ6foDavFn-rQb02nk_16nL2gL3z4KwmF5xPTA60y1_nywVEJAN1lENN1FnoM6z0GFJmTqNAj976sb3JpZ1mfzNGN4ELM1EFBPZ2MiqhJThOIa2rRD9TFGU3O2QAJtBGIh8OSBVrrSDPfP6g6wz-bgJxtQsaH_cqbG-45jNQ29Tbez_pOGsBVE-I" />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 pt-6">
                                <div className="text-[10px] font-bold text-white bg-red-500 w-fit px-1.5 py-0.5 rounded">Çok Acil</div>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-text-main dark:text-white line-clamp-2 leading-tight mb-1">Yavru Kedi Maması</h4>
                            <p className="text-[10px] text-text-sub mb-2">Kadıköy Barınağı</p>
                            <button className="w-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white text-[10px] font-bold py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1">
                                Hemen Al &amp; Gönder
                            </button>
                        </div>
                    </div>
                    <div className="snap-start shrink-0 w-[140px] flex flex-col gap-2 group">
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-gray-100 dark:border-gray-700 shadow-sm">
                            <img alt="Blanket" className="w-full h-full object-cover group-hover:scale-105 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBANMbdVnwHzX-3UPHBnC7ED_7WtAOp8QpcKqrRs1QPb9kLw1bmshjUNfS0N9_jmxK1HPbiwB2LA--eAJugL3cR9imJxpMLS9O0DND4LcEGjvBLSBoL6Bl2eQuLrC2m1AEGVsLYisLHFpxrchsFi1Aw1AAtMJVtLxAD3Eo7zpSyaf2BVg2qXrbXXgWj3ZrVBlqKkbhBT4Guh9TB6jOl63EctH00BbMoqb-ucVYV8dNaVDBL9AqsCOzHKHtW8DFWseEJpnlnda2rGq4" />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 pt-6">
                                <div className="text-[10px] font-bold text-white bg-orange-500 w-fit px-1.5 py-0.5 rounded">Kış Desteği</div>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-text-main dark:text-white line-clamp-2 leading-tight mb-1">Polar Battaniye</h4>
                            <p className="text-[10px] text-text-sub mb-2">Yedikule Barınağı</p>
                            <button className="w-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white text-[10px] font-bold py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1">
                                Hemen Al &amp; Gönder
                            </button>
                        </div>
                    </div>
                    <div className="snap-start shrink-0 w-[140px] flex flex-col gap-2 group">
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-center">
                            <img alt="Medicine" className="w-full h-full object-cover group-hover:scale-105 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9HQsJt2bpMwKNBqssdTUu3kNrVZD8D1j1S_8aJQz333V_W2VCjHwAaCax9ntqN82zjZ1OXYji7ld0ZlpJo4wP7n7u6uMWkug1cw7ETLWQ8p7kfAE-RO10wjk1vjIjfbkElHS5i4LhijcurX5ewn71xo-1AeVH27wCzGTXuc8YtISFNzwzx3C9IULa_UGtIIVCvDcDMcibB-zye3RMDy9R4_-5cu3mETwofnBR7xL8MUAX4zHAmjlstYHbdXvoue68UkTtxbjvrh0" />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 pt-6">
                                <div className="text-[10px] font-bold text-white bg-red-500 w-fit px-1.5 py-0.5 rounded">Tıbbi</div>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-text-main dark:text-white line-clamp-2 leading-tight mb-1">Dış Parazit İlacı</h4>
                            <p className="text-[10px] text-text-sub mb-2">Üsküdar Barınağı</p>
                            <button className="w-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white text-[10px] font-bold py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1">
                                Hemen Al &amp; Gönder
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-4 px-4 pb-8 space-y-4">
                <h3 className="text-lg font-bold text-text-main dark:text-white">Barınaklar</h3>
                <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="relative h-48 w-full">
                        <img alt="Yedikule" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLpXXIP2idRltVqnVLypiqDxnwj7SGWLjOgLqyB01W60cA4Sj-6TpVYhMVTyTHJKqqJdgf-mY85_IpTKDD81z3JSMquPIM1HtVqqGy38SQNPxQ0DX-7lXsSYFxnMov07GiboJYBiHwJ5U-dB_oap2-Q1FJL9HUcWWdYlRxRaM4W-x9lBQmW--qMWKgB9dbwu2fVf1WqDY5iRfixJlbzLHb_KfnynX2v3TerGsk6mlxvhGb4egJ_vyZ6-ZYEAysRQzH0XMLgPt8qzc" />
                        <div className="absolute top-3 left-3 bg-secondary/90 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                            <span className="material-symbols-outlined text-white text-[14px]">verified</span>
                            <span className="text-[10px] font-bold text-white uppercase tracking-wide">Onaylı Barınak</span>
                        </div>
                        <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1">
                            <span className="material-symbols-outlined text-white text-[12px]">location_on</span>
                            <span className="text-[10px] font-medium text-white">2.4 km uzakta</span>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="text-lg font-bold text-text-main dark:text-white">Yedikule Hayvan Barınağı</h4>
                                <p className="text-sm text-text-sub flex items-center gap-1 mt-0.5">
                                    <span className="material-symbols-outlined text-[16px]">map</span> Fatih, İstanbul
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                            3000'den fazla dostumuza ev sahipliği yapıyoruz. Kış hazırlıkları için mama ve battaniye desteğine ihtiyacımız var.
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 bg-secondary/10 hover:bg-secondary/20 text-secondary border border-secondary/20 font-bold py-2.5 rounded-xl text-xs transition-colors">
                                <span className="material-symbols-outlined text-[16px]">savings</span>
                                CiciPuan Bağışla
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-lg shadow-primary/30">
                                <span className="material-symbols-outlined text-[16px]">pets</span>
                                Mama Gönder
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="relative h-48 w-full">
                        <img alt="Beykoz" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBANMbdVnwHzX-3UPHBnC7ED_7WtAOp8QpcKqrRs1QPb9kLw1bmshjUNfS0N9_jmxK1HPbiwB2LA--eAJugL3cR9imJxpMLS9O0DND4LcEGjvBLSBoL6Bl2eQuLrC2m1AEGVsLYisLHFpxrchsFi1Aw1AAtMJVtLxAD3Eo7zpSyaf2BVg2qXrbXXgWj3ZrVBlqKkbhBT4Guh9TB6jOl63EctH00BbMoqb-ucVYV8dNaVDBL9AqsCOzHKHtW8DFWseEJpnlnda2rGq4" />
                        <div className="absolute top-3 left-3 bg-red-500/90 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                            <span className="material-symbols-outlined text-white text-[14px]">warning</span>
                            <span className="text-[10px] font-bold text-white uppercase tracking-wide">Acil Destek</span>
                        </div>
                        <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1">
                            <span className="material-symbols-outlined text-white text-[12px]">location_on</span>
                            <span className="text-[10px] font-medium text-white">12 km uzakta</span>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="text-lg font-bold text-text-main dark:text-white">Beykoz Orman Beslemesi</h4>
                                <p className="text-sm text-text-sub flex items-center gap-1 mt-0.5">
                                    <span className="material-symbols-outlined text-[16px]">map</span> Beykoz, İstanbul
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                            Ormanlık alandaki yüzlerce köpeğin düzenli beslenmesi için gönüllü ve mama desteği bekliyoruz.
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 bg-secondary/10 hover:bg-secondary/20 text-secondary border border-secondary/20 font-bold py-2.5 rounded-xl text-xs transition-colors">
                                <span className="material-symbols-outlined text-[16px]">savings</span>
                                CiciPuan Bağışla
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-lg shadow-primary/30">
                                <span className="material-symbols-outlined text-[16px]">pets</span>
                                Mama Gönder
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden opacity-90">
                    <div className="relative h-48 w-full">
                        <img alt="Kadikoy" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcnAWYs9BhTNJqOIuXUjh7lH3gimqzrooJvTJL084qMiSzezCvV8EY5AAMskZbngzfPFX0J1nC6V2j1Qw1nyafOmWzqoqCg5YXsN9TvQblPLZc9AGHecu9mfRCfbrwqiuTUK0zfqDRNVrmqs6ei0lswuScKzwiW8LRMXDcjRauQgJ_KkXLxGBOEt1etR3shNFL0RIVayFUYvjGl1LE8glz4P3HiA-wpK2tS6LZbQK6PNXF1CvqkYpP6Sm0zgcwqfQZ0bQHXjVNXCk" />
                        <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1">
                            <span className="material-symbols-outlined text-white text-[12px]">location_on</span>
                            <span className="text-[10px] font-medium text-white">5 km uzakta</span>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="text-lg font-bold text-text-main dark:text-white">Kadıköy Geçici Bakımevi</h4>
                                <p className="text-sm text-text-sub flex items-center gap-1 mt-0.5">
                                    <span className="material-symbols-outlined text-[16px]">map</span> Kadıköy, İstanbul
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                            Tedavi gören sokak hayvanlarımız için ilaç ve özel mama ihtiyaçlarımız bulunmaktadır.
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 bg-secondary/10 hover:bg-secondary/20 text-secondary border border-secondary/20 font-bold py-2.5 rounded-xl text-xs transition-colors">
                                <span className="material-symbols-outlined text-[16px]">savings</span>
                                CiciPuan Bağışla
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-lg shadow-primary/30">
                                <span className="material-symbols-outlined text-[16px]">pets</span>
                                Mama Gönder
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
