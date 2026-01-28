import Header from "@/components/layout/Header";

export default function PazarPage() {
    return (
        <main className="pb-24">
            <Header />
            <div className="px-4 py-3">
                <div className="relative flex items-center w-full h-11 rounded-xl bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden group focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                    <div className="grid place-items-center h-full w-10 text-text-sub pl-1">
                        <span className="material-symbols-outlined text-[20px]">search</span>
                    </div>
                    <input
                        className="peer h-full w-full outline-none text-sm text-text-main dark:text-white pr-2 bg-transparent placeholder:text-text-sub/70"
                        id="search"
                        placeholder="Mama, oyuncak veya bakım ürünleri..."
                        type="text"
                    />
                </div>
            </div>
            <div className="px-4 pb-2">
                <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar">
                    <span className="text-[10px] font-bold text-text-sub whitespace-nowrap mr-1">Partnerler:</span>
                    <div className="h-8 w-8 rounded-full border border-gray-200 bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                        <div
                            className="w-full h-full bg-contain bg-center bg-no-repeat"
                            style={{
                                backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAwjG6SqdG07d-RliXz4ManFg6-iAWeSdoo3rZRBfSlQq3PNmSeAA7YRzhVQioKiDPdbybszBlXMheWg5ufiTUze3GlffNtDubFsLBpnHhyjGD0M7Tj7YWu_HEDl0SAfzr88g9HWbuaX944cWgSh6vt4FPMPZOXJW1JHy5_FnxmZMr4yCUSEwtkv20OKrzeZqTIQpdI23DCJmqDVMiMkJcu_TxAg_R71ag8Ue19Akxr29UbivTmO1q4iWZLWg-AJ9s2DblEfBWK6Jk')",
                            }}
                        ></div>
                    </div>
                    <div className="h-8 w-8 rounded-full border border-gray-200 bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                        <div
                            className="w-[80%] h-[80%] bg-contain bg-center bg-no-repeat"
                            style={{
                                backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAyFEGSp4ZENQtqKI9oXcECNPJFNSeBXcybMCu769US4fx5y5mgR6a5Q6ugwn1Zm2_10WqQ3v-qs8QNuBpf4PDQL4SEnyx7GTqUNromUmJsiv_gShO9e5YQ0d86kqoGbM2IP8YvNoPlskEHL3gk0SF4B_kuogTCGjIxwZ2M378tCFeATqMIijVlcAMjK3CdG3X4OXFvNKUrbQaxIHjdsqz6UB6G-lzFRbJpAv2iZtuKaEfY7RetvyVlf8JqyeTYueTfu8_2roSPvLQ')",
                            }}
                        ></div>
                    </div>
                    <div className="h-8 w-8 rounded-full border border-gray-200 bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                        <div
                            className="w-[70%] h-[70%] bg-contain bg-center bg-no-repeat"
                            style={{
                                backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBaHjXrOpqKIbiBhsbDpOUDsez-3GFHmwzVSr-DB8zvwMhkWEGxatkcDTb3FdBjLrQXMRwF6Zw8utXngUlXGWds_4q8iqaVpNN0ITll9kvmk1dM_Z5209JA7NV6XZmmi3x-8KedbdZt7VMht9P5_bVFDQ2x3-hSvSwy5uhZR1w8DrvN2JoaOFjjYu8PjQxoX15wecOzXomc448zIuDKIgnPImSgeWer24eWXu-9JDO9AX-uZ53VwzGjeT_JJxloSxlkFjIcMj3g0Zo')",
                            }}
                        ></div>
                    </div>
                    <div className="h-8 px-3 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold text-primary">+5 Mağaza</span>
                    </div>
                </div>
            </div>
            <section className="py-4 border-b border-gray-100/50 dark:border-gray-800/50">
                <div className="flex gap-2 px-4 overflow-x-auto hide-scrollbar">
                    <button className="flex h-9 shrink-0 items-center justify-center px-4 rounded-full bg-primary text-white text-sm font-semibold shadow-md shadow-primary/20">
                        Yiyecek
                    </button>
                    <button className="flex h-9 shrink-0 items-center justify-center px-4 rounded-full bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-text-main dark:text-white text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
                        Barınma
                    </button>
                    <button className="flex h-9 shrink-0 items-center justify-center px-4 rounded-full bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-text-main dark:text-white text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
                        Aksesuar
                    </button>
                    <button className="flex h-9 shrink-0 items-center justify-center px-4 rounded-full bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-text-main dark:text-white text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
                        Bakım
                    </button>
                    <button className="flex h-9 shrink-0 items-center justify-center px-4 rounded-full bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-text-main dark:text-white text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
                        Sağlık
                    </button>
                </div>
            </section>
            <section className="py-6">
                <div className="px-4 mb-3 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-text-main dark:text-white flex items-center gap-2">
                            Patinize Özel
                            <span
                                className="material-symbols-outlined text-secondary text-xl"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                pets
                            </span>
                        </h3>
                        <p className="text-xs text-text-sub mt-0.5">Boncuk (3 aylık Golden) için seçtik</p>
                    </div>
                    <button className="text-xs font-bold text-secondary hover:text-secondary/80">Tümü</button>
                </div>
                <div className="flex gap-4 overflow-x-auto hide-scrollbar px-4 pb-2 snap-x snap-mandatory">
                    <div className="snap-start shrink-0 w-[160px] flex flex-col gap-2">
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 dark:border-gray-800">
                            <img
                                alt="Puppy Toy"
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9HQsJt2bpMwKNBqssdTUu3kNrVZD8D1j1S_8aJQz333V_W2VCjHwAaCax9ntqN82zjZ1OXYji7ld0ZlpJo4wP7n7u6uMWkug1cw7ETLWQ8p7kfAE-RO10wjk1vjIjfbkElHS5i4LhijcurX5ewn71xo-1AeVH27wCzGTXuc8YtISFNzwzx3C9IULa_UGtIIVCvDcDMcibB-zye3RMDy9R4_-5cu3mETwofnBR7xL8MUAX4zHAmjlstYHbdXvoue68UkTtxbjvrh0"
                            />
                            <div className="absolute top-2 left-2 bg-secondary/90 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                                <span className="material-symbols-outlined text-white text-[10px]">stars</span>
                                <span className="text-[9px] font-bold text-white">+50 Puan</span>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-text-main dark:text-white line-clamp-2 h-10 leading-tight">
                                Yavru Köpek Diş Kaşıma Oyuncağı
                            </h4>
                            <div className="flex items-center justify-between mt-1">
                                <span className="font-bold text-primary">129 TL</span>
                            </div>
                            <button className="w-full mt-2 bg-surface-light dark:bg-surface-dark border border-primary/20 text-primary hover:bg-primary hover:text-white text-[10px] font-bold py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1">
                                <span>Amazonda Gör</span>
                                <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                            </button>
                        </div>
                    </div>
                    <div className="snap-start shrink-0 w-[160px] flex flex-col gap-2">
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 dark:border-gray-800">
                            <img
                                alt="Puppy Food"
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeKabjMNCgA043Na8n0sLGuV9D2ty6g1FvAys61JW-y1VfGl5P8qH2rsBCLpnDf0KKWxYtGA6h5rKxHG0QUrkWZ6foDavFn-rQb02nk_16nL2gL3z4KwmF5xPTA60y1_nywVEJAN1lENN1FnoM6z0GFJmTqNAj976sb3JpZ1mfzNGN4ELM1EFBPZ2MiqhJThOIa2rRD9TFGU3O2QAJtBGIh8OSBVrrSDPfP6g6wz-bgJxtQsaH_cqbG-45jNQ29Tbez_pOGsBVE-I"
                            />
                            <div className="absolute top-2 left-2 bg-secondary/90 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                                <span className="material-symbols-outlined text-white text-[10px]">stars</span>
                                <span className="text-[9px] font-bold text-white">+100 Puan</span>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-text-main dark:text-white line-clamp-2 h-10 leading-tight">
                                Pro Plan Medium Puppy Tavuklu 3kg
                            </h4>
                            <div className="flex items-center justify-between mt-1">
                                <span className="font-bold text-primary">420 TL</span>
                            </div>
                            <button className="w-full mt-2 bg-surface-light dark:bg-surface-dark border border-primary/20 text-primary hover:bg-primary hover:text-white text-[10px] font-bold py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1">
                                <span>Trendyolda Gör</span>
                                <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                            </button>
                        </div>
                    </div>
                    <div className="snap-start shrink-0 w-[160px] flex flex-col gap-2">
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 dark:border-gray-800">
                            <img
                                alt="Bed"
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBANMbdVnwHzX-3UPHBnC7ED_7WtAOp8QpcKqrRs1QPb9kLw1bmshjUNfS0N9_jmxK1HPbiwB2LA--eAJugL3cR9imJxpMLS9O0DND4LcEGjvBLSBoL6Bl2eQuLrC2m1AEGVsLYisLHFpxrchsFi1Aw1AAtMJVtLxAD3Eo7zpSyaf2BVg2qXrbXXgWj3ZrVBlqKkbhBT4Guh9TB6jOl63EctH00BbMoqb-ucVYV8dNaVDBL9AqsCOzHKHtW8DFWseEJpnlnda2rGq4"
                            />
                            <div className="absolute top-2 left-2 bg-secondary/90 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                                <span className="material-symbols-outlined text-white text-[10px]">stars</span>
                                <span className="text-[9px] font-bold text-white">+200 Puan</span>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-text-main dark:text-white line-clamp-2 h-10 leading-tight">
                                Ortopedik Sünger Yatak - Gri XL
                            </h4>
                            <div className="flex items-center justify-between mt-1">
                                <span className="font-bold text-primary">850 TL</span>
                            </div>
                            <button className="w-full mt-2 bg-surface-light dark:bg-surface-dark border border-primary/20 text-primary hover:bg-primary hover:text-white text-[10px] font-bold py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1">
                                <span>Hepsiburadada Gör</span>
                                <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-6 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-surface-dark dark:to-surface-dark border-y border-orange-100 dark:border-gray-800">
                <div className="px-4 mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span
                            className="material-symbols-outlined text-primary animate-pulse"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            bolt
                        </span>
                        <h3 className="text-lg font-bold text-text-main dark:text-white">Flaş Mama Fırsatları</h3>
                    </div>
                    <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                        <span className="material-symbols-outlined text-[14px]">timer</span>
                        02:14:50
                    </div>
                </div>
                <div className="flex gap-4 overflow-x-auto hide-scrollbar px-4 pb-2 snap-x snap-mandatory">
                    <div className="snap-center shrink-0 w-[260px] bg-white dark:bg-surface-dark rounded-xl p-3 shadow-sm border border-orange-100 dark:border-gray-700 relative">
                        <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-xl rounded-tr-xl z-10">
                            %30 İndirim
                        </div>
                        <div className="flex gap-3">
                            <div className="w-24 h-24 rounded-lg bg-gray-50 shrink-0 overflow-hidden relative">
                                <img
                                    className="w-full h-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcnAWYs9BhTNJqOIuXUjh7lH3gimqzrooJvTJL084qMiSzezCvV8EY5AAMskZbngzfPFX0J1nC6V2j1Qw1nyafOmWzqoqCg5YXsN9TvQblPLZc9AGHecu9mfRCfbrwqiuTUK0zfqDRNVrmqs6ei0lswuScKzwiW8LRMXDcjRauQgJ_KkXLxGBOEt1etR3shNFL0RIVayFUYvjGl1LE8glz4P3HiA-wpK2tS6LZbQK6PNXF1CvqkYpP6Sm0zgcwqfQZ0bQHXjVNXCk"
                                />
                                <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-white p-0.5 shadow-sm">
                                    <img
                                        className="w-full h-full object-contain"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSOObUho4G_h5kq_qXmTcULJHABYHMXIn4_N6XEXsqQBzpSFdI8_LF_A_iiDdGfLdBfPkCv4HqeYhDCrWrdoqkZBCUV7YOU-wk-WHZyRfMCQF4oH-Ki_SEuBLM43oOB34xhZHKEji1xdvwQJeEtm_kqKlQZVZ6qNeaOELtz_pU1g6WsgDwD5RI2OuUR555naSi21BtBw0JLNbFwkdwmRgLtyMC9Gghcz9RvHCSGjySkG4ZYQ-Z7s2ykCCqwZf1934P0r1OJxTt4OI"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col justify-between py-1 w-full">
                                <h4 className="text-sm font-semibold line-clamp-2 text-text-main dark:text-white leading-tight">
                                    Royal Canin Maxi Adult 15 Kg
                                </h4>
                                <div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xs text-gray-400 line-through">1.250 TL</span>
                                        <span className="text-base font-bold text-primary">875 TL</span>
                                    </div>
                                    <div className="mt-2 flex items-center gap-1 text-[10px] text-secondary font-bold bg-secondary-light dark:bg-secondary/20 w-fit px-2 py-0.5 rounded-full">
                                        <span className="material-symbols-outlined text-[12px]">stars</span> CiciPuan Kazan
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="w-full mt-3 bg-primary text-white font-bold py-2 rounded-lg text-xs hover:bg-primary-dark transition-colors flex items-center justify-center gap-1">
                            Trendyolda Fırsatı Yakala <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </button>
                    </div>
                    <div className="snap-center shrink-0 w-[260px] bg-white dark:bg-surface-dark rounded-xl p-3 shadow-sm border border-orange-100 dark:border-gray-700 relative">
                        <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-xl rounded-tr-xl z-10">
                            %15 İndirim
                        </div>
                        <div className="flex gap-3">
                            <div className="w-24 h-24 rounded-lg bg-gray-50 shrink-0 overflow-hidden relative">
                                <img
                                    className="w-full h-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeKabjMNCgA043Na8n0sLGuV9D2ty6g1FvAys61JW-y1VfGl5P8qH2rsBCLpnDf0KKWxYtGA6h5rKxHG0QUrkWZ6foDavFn-rQb02nk_16nL2gL3z4KwmF5xPTA60y1_nywVEJAN1lENN1FnoM6z0GFJmTqNAj976sb3JpZ1mfzNGN4ELM1EFBPZ2MiqhJThOIa2rRD9TFGU3O2QAJtBGIh8OSBVrrSDPfP6g6wz-bgJxtQsaH_cqbG-45jNQ29Tbez_pOGsBVE-I"
                                />
                                <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-white p-0.5 shadow-sm">
                                    <img
                                        className="w-full h-full object-contain"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5-wO4ACDjzaKAySei0kKQs2fbE5962ihIxzG7AiETqJPON7yz5KkPBfJVKBJeXDdCJABYbbM0FbxUryWLp6UBO6Yt6jhQkrOthrqRiSO_wyyY4eY0PLQsNFW2GqNEn5CDSqSUREcNioI1RdfaP2U9at3vZM_KcC9-rhS140sHmjPSga8Eat11UcZc7iscvgSkpdSN2lj4PawNtGUXrxkETI5qsom597VGY8G68sLQ4nclNQ5Lzz_I2ZhEP2l7a04SRmH6-ahOpAg"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col justify-between py-1 w-full">
                                <h4 className="text-sm font-semibold line-clamp-2 text-text-main dark:text-white leading-tight">
                                    Hills Science Plan Kitten 1.5kg
                                </h4>
                                <div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xs text-gray-400 line-through">450 TL</span>
                                        <span className="text-base font-bold text-primary">382 TL</span>
                                    </div>
                                    <div className="mt-2 flex items-center gap-1 text-[10px] text-secondary font-bold bg-secondary-light dark:bg-secondary/20 w-fit px-2 py-0.5 rounded-full">
                                        <span className="material-symbols-outlined text-[12px]">stars</span> CiciPuan Kazan
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="w-full mt-3 bg-primary text-white font-bold py-2 rounded-lg text-xs hover:bg-primary-dark transition-colors flex items-center justify-center gap-1">
                            Hepsiburadada Fırsatı Yakala <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </section>
            <section className="py-6 border-b border-gray-100 dark:border-gray-800">
                <div className="px-4 mb-3 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-text-main dark:text-white">Aksesuar &amp; Gereçler</h3>
                    <button className="text-xs font-bold text-gray-400 hover:text-primary">Tümünü Gör</button>
                </div>
                <div className="flex gap-3 overflow-x-auto hide-scrollbar px-4 pb-2">
                    <div className="shrink-0 w-[140px]">
                        <div className="aspect-[4/5] rounded-xl overflow-hidden mb-2 relative group">
                            <img
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLpXXIP2idRltVqnVLypiqDxnwj7SGWLjOgLqyB01W60cA4Sj-6TpVYhMVTyTHJKqqJdgf-mY85_IpTKDD81z3JSMquPIM1HtVqqGy38SQNPxQ0DX-7lXsSYFxnMov07GiboJYBiHwJ5U-dB_oap2-Q1FJL9HUcWWdYlRxRaM4W-x9lBQmW--qMWKgB9dbwu2fVf1WqDY5iRfixJlbzLHb_KfnynX2v3TerGsk6mlxvhGb4egJ_vyZ6-ZYEAysRQzH0XMLgPt8qzc"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 pt-8">
                                <span className="text-white text-[10px] font-bold bg-secondary px-2 py-0.5 rounded-full inline-block mb-1">
                                    CiciPuan Kazan
                                </span>
                            </div>
                        </div>
                        <h4 className="text-xs font-semibold text-text-main dark:text-white line-clamp-1">Kedi Tüneli Oyun Seti</h4>
                        <div className="flex justify-between items-center mt-1">
                            <span className="text-sm font-bold text-text-main dark:text-white">300 TL</span>
                            <button className="text-[10px] font-bold text-primary border border-primary/30 px-2 py-1 rounded-md">
                                Trendyol
                            </button>
                        </div>
                    </div>
                    <div className="shrink-0 w-[140px]">
                        <div className="aspect-[4/5] rounded-xl overflow-hidden mb-2 relative group">
                            <img
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBANMbdVnwHzX-3UPHBnC7ED_7WtAOp8QpcKqrRs1QPb9kLw1bmshjUNfS0N9_jmxK1HPbiwB2LA--eAJugL3cR9imJxpMLS9O0DND4LcEGjvBLSBoL6Bl2eQuLrC2m1AEGVsLYisLHFpxrchsFi1Aw1AAtMJVtLxAD3Eo7zpSyaf2BVg2qXrbXXgWj3ZrVBlqKkbhBT4Guh9TB6jOl63EctH00BbMoqb-ucVYV8dNaVDBL9AqsCOzHKHtW8DFWseEJpnlnda2rGq4"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 pt-8">
                                <span className="text-white text-[10px] font-bold bg-secondary px-2 py-0.5 rounded-full inline-block mb-1">
                                    CiciPuan Kazan
                                </span>
                            </div>
                        </div>
                        <h4 className="text-xs font-semibold text-text-main dark:text-white line-clamp-1">Konforlu Yatak Gri</h4>
                        <div className="flex justify-between items-center mt-1">
                            <span className="text-sm font-bold text-text-main dark:text-white">850 TL</span>
                            <button className="text-[10px] font-bold text-primary border border-primary/30 px-2 py-1 rounded-md">
                                Petlebi
                            </button>
                        </div>
                    </div>
                    <div className="shrink-0 w-[140px]">
                        <div className="aspect-[4/5] rounded-xl overflow-hidden mb-2 relative group bg-gray-100 flex items-center justify-center">
                            <span className="material-symbols-outlined text-4xl text-gray-300">pets</span>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 pt-8">
                                <span className="text-white text-[10px] font-bold bg-secondary px-2 py-0.5 rounded-full inline-block mb-1">
                                    CiciPuan Kazan
                                </span>
                            </div>
                        </div>
                        <h4 className="text-xs font-semibold text-text-main dark:text-white line-clamp-1">Otomatik Kayış 5m</h4>
                        <div className="flex justify-between items-center mt-1">
                            <span className="text-sm font-bold text-text-main dark:text-white">210 TL</span>
                            <button className="text-[10px] font-bold text-primary border border-primary/30 px-2 py-1 rounded-md">
                                Amazon
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-6 bg-surface-light dark:bg-surface-dark">
                <div className="px-4 mb-3 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-lg">soap</span>
                    </div>
                    <h3 className="text-lg font-bold text-text-main dark:text-white">Pet Bakım Dünyası</h3>
                </div>
                <div className="grid grid-cols-2 gap-3 px-4">
                    <div className="flex gap-3 bg-background-light dark:bg-background-dark p-2 rounded-xl border border-gray-100 dark:border-gray-700">
                        <div className="w-16 h-16 rounded-lg bg-white overflow-hidden shrink-0">
                            <img
                                className="w-full h-full object-cover opacity-80 mix-blend-multiply"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9HQsJt2bpMwKNBqssdTUu3kNrVZD8D1j1S_8aJQz333V_W2VCjHwAaCax9ntqN82zjZ1OXYji7ld0ZlpJo4wP7n7u6uMWkug1cw7ETLWQ8p7kfAE-RO10wjk1vjIjfbkElHS5i4LhijcurX5ewn71xo-1AeVH27wCzGTXuc8YtISFNzwzx3C9IULa_UGtIIVCvDcDMcibB-zye3RMDy9R4_-5cu3mETwofnBR7xL8MUAX4zHAmjlstYHbdXvoue68UkTtxbjvrh0"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h4 className="text-xs font-bold text-text-main dark:text-white mb-1">Tüy Toplayıcı</h4>
                            <div className="text-[10px] bg-secondary/10 text-secondary font-bold px-1.5 py-0.5 rounded w-fit mb-1">
                                +15 Puan
                            </div>
                            <a className="text-[10px] font-bold text-gray-400 hover:text-primary flex items-center" href="#">
                                Trendyolda Gör <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                            </a>
                        </div>
                    </div>
                    <div className="flex gap-3 bg-background-light dark:bg-background-dark p-2 rounded-xl border border-gray-100 dark:border-gray-700">
                        <div className="w-16 h-16 rounded-lg bg-white overflow-hidden shrink-0 flex items-center justify-center text-gray-300">
                            <span className="material-symbols-outlined text-3xl">brush</span>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h4 className="text-xs font-bold text-text-main dark:text-white mb-1">Kedi Şampuanı</h4>
                            <div className="text-[10px] bg-secondary/10 text-secondary font-bold px-1.5 py-0.5 rounded w-fit mb-1">
                                +20 Puan
                            </div>
                            <a className="text-[10px] font-bold text-gray-400 hover:text-primary flex items-center" href="#">
                                Amazonda Gör <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-6 px-4">
                <h3 className="text-lg font-bold text-text-main dark:text-white mb-3">Özel Koleksiyonlar</h3>
                <div className="space-y-4">
                    <div className="relative w-full h-40 rounded-2xl overflow-hidden group">
                        <img
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLpXXIP2idRltVqnVLypiqDxnwj7SGWLjOgLqyB01W60cA4Sj-6TpVYhMVTyTHJKqqJdgf-mY85_IpTKDD81z3JSMquPIM1HtVqqGy38SQNPxQ0DX-7lXsSYFxnMov07GiboJYBiHwJ5U-dB_oap2-Q1FJL9HUcWWdYlRxRaM4W-x9lBQmW--qMWKgB9dbwu2fVf1WqDY5iRfixJlbzLHb_KfnynX2v3TerGsk6mlxvhGb4egJ_vyZ6-ZYEAysRQzH0XMLgPt8qzc"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent flex flex-col justify-center px-6">
                            <span className="text-secondary font-bold text-xs uppercase tracking-wider mb-1">Yeni Başlayanlar</span>
                            <h4 className="text-white font-extrabold text-xl w-2/3 leading-tight mb-2">Yavru Kedi Başlangıç Seti</h4>
                            <button className="bg-white text-text-main text-xs font-bold py-2 px-4 rounded-full w-fit hover:bg-gray-100 transition-colors">
                                İncele
                            </button>
                        </div>
                    </div>
                    <div className="relative w-full h-40 rounded-2xl overflow-hidden group">
                        <img
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBANMbdVnwHzX-3UPHBnC7ED_7WtAOp8QpcKqrRs1QPb9kLw1bmshjUNfS0N9_jmxK1HPbiwB2LA--eAJugL3cR9imJxpMLS9O0DND4LcEGjvBLSBoL6Bl2eQuLrC2m1AEGVsLYisLHFpxrchsFi1Aw1AAtMJVtLxAD3Eo7zpSyaf2BVg2qXrbXXgWj3ZrVBlqKkbhBT4Guh9TB6jOl63EctH00BbMoqb-ucVYV8dNaVDBL9AqsCOzHKHtW8DFWseEJpnlnda2rGq4"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/80 via-primary/40 to-transparent flex flex-col justify-center px-6">
                            <span className="text-white/80 font-bold text-xs uppercase tracking-wider mb-1">Tatil Zamanı</span>
                            <h4 className="text-white font-extrabold text-xl w-2/3 leading-tight mb-2">Seyahat &amp; Taşıma Kitleri</h4>
                            <button className="bg-white/20 backdrop-blur-md border border-white/40 text-white text-xs font-bold py-2 px-4 rounded-full w-fit hover:bg-white/30 transition-colors">
                                Keşfet
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
