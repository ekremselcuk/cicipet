
import MenuTrigger from "@/components/admin/MenuTrigger";
import { requireAdmin } from "@/utils/supabase/check-auth"; // Server-side check

export default async function AdminModerationPage() {
    await requireAdmin();

    return (
        <div className="relative min-h-screen bg-[#f5f8f8] dark:bg-[#101f22] text-[#0d191c] dark:text-white font-sans">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 backdrop-blur-[10px] bg-[rgba(245,248,248,0.8)] dark:bg-[rgba(16,31,34,0.8)]">
                <div className="flex items-center p-4 pb-2 justify-between">
                    <div className="flex items-center gap-2">
                        {/* Replaced ArrowBack with MenuTrigger for Sidebar support, or kept alongside? 
                        The user asked for this code explicitly. But also asked to link it. 
                        I'll use MenuTrigger as the "Back/Menu" interaction point for consistency with the layout I built. 
                    */}
                        <MenuTrigger />
                        {/* <span className="material-symbols-outlined text-[#0d191c] dark:text-white" data-icon="ArrowBack">arrow_back</span> */}
                        <h1 className="text-lg font-bold leading-tight tracking-tight">Pet Moderasyonu</h1>
                    </div>
                    <button className="text-[#0dccf2] text-base font-semibold leading-normal">Seç</button>
                </div>
                {/* Quick Stats Overlay (Mini Stats) */}
                <div className="px-4 pb-3">
                    <div className="flex items-center gap-2 bg-[#0dccf2]/10 dark:bg-[#0dccf2]/20 px-3 py-2 rounded-lg inline-flex">
                        <span className="material-symbols-outlined text-[#0dccf2] text-sm">history</span>
                        <p className="text-[#0dccf2] text-xs font-bold uppercase tracking-wider">42 Onay Bekliyor</p>
                    </div>
                </div>
            </header>

            <main className="relative pb-32">
                {/* Search & Filter Section */}
                <div className="sticky top-[96px] z-40 bg-[#f5f8f8]/95 dark:bg-[#101f22]/95 px-4 py-2 space-y-2">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span className="material-symbols-outlined text-gray-400 text-lg">search</span>
                        </div>
                        <input className="block w-full pl-10 pr-3 py-2.5 bg-gray-100 dark:bg-gray-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#0dccf2]/50 placeholder:text-gray-400" placeholder="Pet veya kullanıcı ara..." type="text" />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar hide-scrollbar">
                        <button className="flex h-8 shrink-0 items-center justify-center gap-x-1 rounded-full bg-[#0dccf2] text-white px-4 text-xs font-medium">
                            Hepsi
                        </button>
                        <button className="flex h-8 shrink-0 items-center justify-center gap-x-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-4 text-xs font-medium">
                            Kedi <span className="material-symbols-outlined text-[16px]">expand_more</span>
                        </button>
                        <button className="flex h-8 shrink-0 items-center justify-center gap-x-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-4 text-xs font-medium">
                            Köpek <span className="material-symbols-outlined text-[16px]">expand_more</span>
                        </button>
                        <button className="flex h-8 shrink-0 items-center justify-center gap-x-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-4 text-xs font-medium">
                            Acil <span className="material-symbols-outlined text-[16px]">expand_more</span>
                        </button>
                    </div>
                </div>

                {/* Moderation Grid */}
                <div className="grid grid-cols-2 gap-3 p-4">
                    {/* Card 1 */}
                    <div className="flex flex-col bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
                        <div className="relative w-full aspect-square bg-center bg-no-repeat bg-cover" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCUAmvo7YTYVjC1lQao7LeceqgjvSbe0fyRLEzAEiNPFrtRmndgLNT71-gijWBhztI90fNEEdrj4-U5VMJTtibLWvMIEAXGwe2AzS6wGW0IImDrQ__DS4pIyV4ALk3WqVB9a5Aa8o7kFZ6XdGUUmadRpxmhBo8hzAwpGO6_6X8ypWcJ-TrHHUP3Jv7TEhJ-5yL1XIc3cgJyI06O026Trg71W7fZguiTe5yzrfVO4k9xmA3mkfRMspm0CpyJo-xODZc2FUkSu9m1V0M")' }}>
                            <div className="absolute top-2 left-2">
                                <div className="w-5 h-5 rounded border-2 border-white/50 bg-black/20 flex items-center justify-center">
                                    {/* Selected checkbox indicator (hidden by default) */}
                                </div>
                            </div>
                        </div>
                        <div className="p-3 space-y-1">
                            <div className="flex justify-between items-start">
                                <p className="font-bold text-sm truncate">Pamuk</p>
                                <span className="text-[10px] bg-[#0dccf2]/10 text-[#0dccf2] px-1.5 rounded">KEDİ</span>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-[11px] truncate">Ahmet Yılmaz</p>
                            <p className="text-gray-400 text-[10px]">2 saat önce</p>
                            <div className="flex gap-2 pt-2">
                                <button className="flex-1 bg-[#22c55e] text-white py-1.5 rounded-lg flex items-center justify-center">
                                    <span className="material-symbols-outlined text-sm">check</span>
                                </button>
                                <button className="flex-1 bg-[#ef4444] text-white py-1.5 rounded-lg flex items-center justify-center">
                                    <span className="material-symbols-outlined text-sm">close</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="flex flex-col bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
                        <div className="relative w-full aspect-square bg-center bg-no-repeat bg-cover" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAnLEykf_jW6kowf6oISTaUimFCqyGZ6J6r4QLKJSghKFPC-DKcR9W8mb-Sd42s82AqUu7_Uop0pSPcONvrojB-2JT08JnFKd5SOPeT-lAaOwuUtKR5MH1uT-5iYi-yKjuIM5uA2j3Ke2QLU1rb4evjs9C5otGWCCKgGmN6NcELFrhkKPK2B7Kt2Lm1WO1K-tYtGk6MYgYugM-8mskwdo5OEDqNM-IPdqcjkADRW4QyER6ctL2Jk5S_6wEm9Lkg-C6h_jGpHnifTeM")' }}>
                            <div className="absolute top-2 left-2">
                                <div className="w-5 h-5 rounded border-2 border-white/50 bg-black/20"></div>
                            </div>
                        </div>
                        <div className="p-3 space-y-1">
                            <div className="flex justify-between items-start">
                                <p className="font-bold text-sm truncate">Haydut</p>
                                <span className="text-[10px] bg-[#0dccf2]/10 text-[#0dccf2] px-1.5 rounded">KÖPEK</span>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-[11px] truncate">Elif Kaya</p>
                            <p className="text-gray-400 text-[10px]">4 saat önce</p>
                            <div className="flex gap-2 pt-2">
                                <button className="flex-1 bg-[#22c55e] text-white py-1.5 rounded-lg flex items-center justify-center">
                                    <span className="material-symbols-outlined text-sm">check</span>
                                </button>
                                <button className="flex-1 bg-[#ef4444] text-white py-1.5 rounded-lg flex items-center justify-center">
                                    <span className="material-symbols-outlined text-sm">close</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="flex flex-col bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
                        <div className="relative w-full aspect-square bg-center bg-no-repeat bg-cover" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCdxtxzJffkLoWM3v8bIKs-u4ZoP4FXAMp-GIseJRDm7ankHp5DSMgY6TEwuxIaEVhnJjAG5nwwNH6YAknh2ELewnEk1VfLtnGK-eSe4KcWdZr_Bw3QpSTf3NvgAm8fZ_pZct0w4fxJhk1NEIhsNLVMC6whhR9BWyx1vuSrO1EtFR5bBSZBZsLSnt2txfm3Ax2sxTGAWeYYj-rEeZlPM5HCpfPO_gM4OATmZSi3JA93vtOqpPMtKbu79ui99160TviPoeVr2WTdT80")' }}>
                            <div className="absolute top-2 left-2">
                                <div className="w-5 h-5 rounded border-2 border-white/50 bg-black/20"></div>
                            </div>
                        </div>
                        <div className="p-3 space-y-1">
                            <div className="flex justify-between items-start">
                                <p className="font-bold text-sm truncate">Mavi</p>
                                <span className="text-[10px] bg-[#0dccf2]/10 text-[#0dccf2] px-1.5 rounded">KEDİ</span>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-[11px] truncate">Can Demir</p>
                            <p className="text-gray-400 text-[10px]">5 saat önce</p>
                            <div className="flex gap-2 pt-2">
                                <button className="flex-1 bg-[#22c55e] text-white py-1.5 rounded-lg flex items-center justify-center">
                                    <span className="material-symbols-outlined text-sm">check</span>
                                </button>
                                <button className="flex-1 bg-[#ef4444] text-white py-1.5 rounded-lg flex items-center justify-center">
                                    <span className="material-symbols-outlined text-sm">close</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Card 4 */}
                    <div className="flex flex-col bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
                        <div className="relative w-full aspect-square bg-center bg-no-repeat bg-cover" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuARvUm7ayVhKJDiSjMHDzgQvq74b-SP1_W6ojxgbaq3-M8tzWasqQunBX0CMY12iN3Opf74zqmZDDBjh_6bKMNPBR54z2TzXyIdVr78tDua5Mkgz-ph0LKyZCftH7c_R6RhasFDlpXBYgj1w5Yef4csrU3JbD1PDq_EYf2EyunWwkgQIbtjLzo-u0xpoF73CI3ayenUVAyQflc2Ekbcz8dnQx_5nWeyF79ijaN_Zw3UZceRbKVUv08fIJ-exRjuFytCnet_YWppNSA")' }}>
                            <div className="absolute top-2 left-2">
                                <div className="w-5 h-5 rounded border-2 border-white/50 bg-black/20"></div>
                            </div>
                        </div>
                        <div className="p-3 space-y-1">
                            <div className="flex justify-between items-start">
                                <p className="font-bold text-sm truncate">Fıstık</p>
                                <span className="text-[10px] bg-[#0dccf2]/10 text-[#0dccf2] px-1.5 rounded">KÖPEK</span>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-[11px] truncate">Sibel Mert</p>
                            <p className="text-gray-400 text-[10px]">Bugün</p>
                            <div className="flex gap-2 pt-2">
                                <button className="flex-1 bg-[#22c55e] text-white py-1.5 rounded-lg flex items-center justify-center">
                                    <span className="material-symbols-outlined text-sm">check</span>
                                </button>
                                <button className="flex-1 bg-[#ef4444] text-white py-1.5 rounded-lg flex items-center justify-center">
                                    <span className="material-symbols-outlined text-sm">close</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-24"></div>
            </main>

            {/* Bulk Action Toolbar (Floating) */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-30">
                <div className="bg-[#0d191c] text-white rounded-2xl p-4 shadow-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#0dccf2]/20 p-2 rounded-lg">
                            <span className="text-[#0dccf2] font-bold text-sm">0</span>
                        </div>
                        <p className="text-xs font-medium">Seçilen Kayıt</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg text-xs font-bold transition-colors">Hepsini Reddet</button>
                        <button className="bg-[#0dccf2] text-white px-3 py-2 rounded-lg text-xs font-bold transition-colors">Hepsini Onayla</button>
                    </div>
                </div>
            </div>

            {/* Rejection Modal Overlay (Hidden) */}
            <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm hidden">
                <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="p-6">
                        <h3 className="text-lg font-bold mb-1">Reddetme Nedeni</h3>
                        <p className="text-sm text-gray-500 mb-4">Lütfen reddetme nedenini seçin. Kullanıcıya bildirim gönderilecektir.</p>
                        <div className="space-y-2">
                            <label className="flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                                <span className="text-sm">Uygunsuz Fotoğraf</span>
                                <input className="text-[#0dccf2] focus:ring-[#0dccf2] h-4 w-4" name="reason" type="radio" />
                            </label>
                            <label className="flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-gray-700">
                                <span className="text-sm">Hatalı Bilgi</span>
                                <input className="text-[#0dccf2] focus:ring-[#0dccf2] h-4 w-4" name="reason" type="radio" />
                            </label>
                            <label className="flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-gray-700">
                                <span className="text-sm">Spam/Reklam</span>
                                <input className="text-[#0dccf2] focus:ring-[#0dccf2] h-4 w-4" name="reason" type="radio" />
                            </label>
                            <label className="flex flex-col gap-2 p-3 rounded-xl border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Diğer</span>
                                    <input className="text-[#0dccf2] focus:ring-[#0dccf2] h-4 w-4" name="reason" type="radio" />
                                </div>
                                <textarea className="w-full mt-1 p-2 bg-transparent border border-gray-200 dark:border-gray-700 rounded-lg text-xs" placeholder="Detaylı açıklama yazın..."></textarea>
                            </label>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button className="flex-1 py-3 text-sm font-bold text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-xl">İptal</button>
                            <button className="flex-1 py-3 text-sm font-bold text-white bg-[#ef4444] rounded-xl">Reddet</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
