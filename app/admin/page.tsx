import { requireAdmin } from "@/utils/supabase/check-auth";
import MenuTrigger from "@/components/admin/MenuTrigger";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function AdminPage() {
    await requireAdmin();
    const supabase = await createClient();

    // Fetch Stats
    const { count: userCount } = await supabase.from('users').select('*', { count: 'exact', head: true });
    const { count: petCount } = await supabase.from('pets').select('*', { count: 'exact', head: true });
    const { count: adCount } = await supabase.from('ads').select('*', { count: 'exact', head: true });

    const { count: pendingPetCount } = await supabase.from('pets').select('*', { count: 'exact', head: true }).eq('status', 'pending');
    const { count: pendingAdCount } = await supabase.from('ads').select('*', { count: 'exact', head: true }).eq('status', 'pending');


    return (
        <div className="relative flex min-h-screen w-full flex-col pb-24 bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-x-hidden antialiased">
            {/* Top App Bar - Admin */}
            <header className="sticky top-0 z-50 flex items-center justify-between bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 pb-2 border-b border-black/5 dark:border-[#362b1b]">
                <div className="flex items-center gap-4">
                    <MenuTrigger />
                    <h1 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">Admin Paneli</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button className="relative flex items-center justify-center rounded-full p-2 text-slate-600 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-2xl">notifications</span>
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
                    </button>
                    <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary cursor-pointer">
                        <img
                            alt="Admin Profile Picture"
                            className="h-full w-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZ94qgkbollPIvN49rtKnnkvvMZ-_pA4dd8xXSs2W-0VLnAVLS61R_P7-ufL0cZUWaXs_uz0FtHFI2IWOid9tdUBLgmnmsytbn72Z-GaXnWu7_xhgrOaRMGyUXdr3vOd2yH4TxCYgbMapVfeYlE1ZcKdQ7xXhCgTo6wbqbqAa2ehFwvY2O_P4D8PtgM9GgfNj8l6jQyYdD0QPMt1WLFgFsWH9G5bTJ21MfT5x9OVGwOtwNI6orxVhgBidITVShGVZBZGj0-WxwC88"
                        />
                    </div>
                </div>
            </header>

            {/* Search Bar */}
            <div className="px-4 py-4">
                <div className="relative flex w-full items-center rounded-xl bg-[#362b1b] h-12">
                    <div className="flex items-center justify-center pl-4 text-[#cbb690]">
                        <span className="material-symbols-outlined text-2xl">search</span>
                    </div>
                    <input
                        className="flex w-full flex-1 bg-transparent px-4 py-2 text-base text-white placeholder-[#cbb690] focus:outline-none focus:ring-0 border-none rounded-xl"
                        placeholder="Kullanıcı, Pet veya Yarışma ara..."
                        type="text"
                    />
                </div>
            </div>

            {/* Section: Genel Bakış (Stats) */}
            <div className="px-4 pb-2">
                <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight mb-4">Genel Bakış</h2>
                <div className="grid grid-cols-2 gap-3">
                    {/* Stat Card 1 - Users */}
                    <Link href="/admin/kullanicilar" className="flex flex-col gap-2 rounded-xl bg-white dark:bg-[#362b1b] p-4 shadow-sm border border-black/5 dark:border-transparent hover:border-primary/50 transition-colors">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                                <span className="material-symbols-outlined text-lg">group</span>
                            </div>
                            <p className="text-slate-500 dark:text-[#cbb690] text-sm font-medium">Kullanıcılar</p>
                        </div>
                        <div>
                            <p className="text-slate-900 dark:text-white text-2xl font-bold">{userCount || 0}</p>
                            <p className="text-[#0bda19] text-xs font-medium flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">trending_up</span> Aktif
                            </p>
                        </div>
                    </Link>
                    {/* Stat Card 2 - Pets */}
                    <Link href="/admin/petler" className="flex flex-col gap-2 rounded-xl bg-white dark:bg-[#362b1b] p-4 shadow-sm border border-black/5 dark:border-transparent hover:border-primary/50 transition-colors">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                                <span className="material-symbols-outlined text-lg">pets</span>
                            </div>
                            <p className="text-slate-500 dark:text-[#cbb690] text-sm font-medium">Petler</p>
                        </div>
                        <div>
                            <p className="text-slate-900 dark:text-white text-2xl font-bold">{petCount || 0}</p>
                            <p className="text-slate-400 dark:text-gray-400 text-xs font-medium flex items-center gap-1">
                                {(pendingPetCount || 0) > 0 ? (
                                    <span className="text-orange-500 font-bold">{pendingPetCount} Onay Bekliyor</span>
                                ) : (
                                    <span>Tümü Onaylı</span>
                                )}
                            </p>
                        </div>
                    </Link>
                    {/* Stat Card 3 - Ads */}
                    <Link href="/admin/moderasyon" className="flex flex-col gap-2 rounded-xl bg-white dark:bg-[#362b1b] p-4 shadow-sm border border-black/5 dark:border-transparent hover:border-primary/50 transition-colors">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                                <span className="material-symbols-outlined text-lg">campaign</span>
                            </div>
                            <p className="text-slate-500 dark:text-[#cbb690] text-sm font-medium">İlanlar</p>
                        </div>
                        <div>
                            <p className="text-slate-900 dark:text-white text-2xl font-bold">{adCount || 0}</p>
                            <p className="text-slate-400 dark:text-gray-400 text-xs font-medium flex items-center gap-1">
                                {(pendingAdCount || 0) > 0 ? (
                                    <span className="text-orange-500 font-bold">{pendingAdCount} Onay Bekliyor</span>
                                ) : (
                                    <span>Tümü Onaylı</span>
                                )}
                            </p>
                        </div>
                    </Link>
                    {/* Stat Card 4 - Contests (Static) */}
                    <div className="flex flex-col gap-2 rounded-xl bg-white dark:bg-[#362b1b] p-4 shadow-sm border border-black/5 dark:border-transparent">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                                <span className="material-symbols-outlined text-lg">emoji_events</span>
                            </div>
                            <p className="text-slate-500 dark:text-[#cbb690] text-sm font-medium">Yarışmalar</p>
                        </div>
                        <div>
                            <p className="text-slate-900 dark:text-white text-2xl font-bold">0</p>
                            <p className="text-[#cbb690] text-xs font-medium">Yakında</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-4 h-px w-full bg-[#362b1b]"></div>

            {/* Section: Kullanıcı & Pet Yönetimi */}
            <div className="px-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold">Kullanıcı &amp; Pet Yönetimi</h3>
                    <button className="text-primary text-sm font-semibold">Tümünü Gör</button>
                </div>
                {/* List of Users */}
                <div className="flex flex-col gap-3">
                    {/* User Item 1 */}
                    <div className="flex items-center justify-between rounded-xl bg-[#362b1b] p-3 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 shrink-0">
                                <img
                                    alt="User Avatar"
                                    className="h-full w-full rounded-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs2cbNBHK97Ej-M50cCg7u1diWnA981vfjlhaupNK__mFoCaGpwDh_5LkrEEXeubb2p0pRRGgXdlXG_WTi-SJMpTZysFfaCH8_wla5uCgg_cHDdZGEW4UfCKw06ZShd_ZOGuIIZp0sL6WApYAHwC7L7Fqgv2srd_8ZoLcXu6T1olqf4K8aB6vJLhkXNKZLXUGkEMuLzhT1eN8pGZ2e5xYM6TM2jp1AKPu6GQf5TIdfLxXP3acDHJUXyZFAIlAqv9sieEOI3lTSt9k"
                                />
                                <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-background-dark ring-2 ring-background-dark">
                                    <span className="material-symbols-outlined text-[14px] text-primary filled">pets</span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-white text-sm font-bold">Ayşe Yılmaz</p>
                                <p className="text-[#cbb690] text-xs">Pamuk (Van Kedisi)</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="rounded-full bg-[#0bda19]/20 px-2 py-1 text-xs font-medium text-[#0bda19]">
                                Aktif
                            </span>
                            <button className="text-[#cbb690] hover:text-white">
                                <span className="material-symbols-outlined">more_vert</span>
                            </button>
                        </div>
                    </div>
                    {/* User Item 2 */}
                    <div className="flex items-center justify-between rounded-xl bg-[#362b1b] p-3 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 shrink-0">
                                <img
                                    alt="User Avatar"
                                    className="h-full w-full rounded-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLQ-4cLdHgi_UPUAuhCx8bbZ1fmQrg38JZIBjwDwrEAh3DR6741FRBHMey7KPIzwt0nHrGSc-pSgNpGToL9hILS5QWqIhNPD_tfekaLVlC-uk_OMMav2ecOWBEg0TQJJkTVRXX85N6kKIMpbwyLLDv-ZzWBT2oXlPO2fKeaeyvAvgnljxd7jt6Bxajq7Pb8bH0f-FK3gkLglnGcDNEZ4tV8bW9Uqb4m0U1vkrq15LPnnKXUumgR4BmCseVHRfiUwuV357YIBVCCBY"
                                />
                                <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-background-dark ring-2 ring-background-dark">
                                    <span className="material-symbols-outlined text-[14px] text-primary filled">pets</span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-white text-sm font-bold">Mehmet Demir</p>
                                <p className="text-[#cbb690] text-xs">Karabaş (Sivas Kangal)</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="rounded-full bg-red-500/20 px-2 py-1 text-xs font-medium text-red-500">
                                Yasaklı
                            </span>
                            <button className="text-[#cbb690] hover:text-white">
                                <span className="material-symbols-outlined">more_vert</span>
                            </button>
                        </div>
                    </div>
                    {/* User Item 3 */}
                    <div className="flex items-center justify-between rounded-xl bg-[#362b1b] p-3 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 shrink-0">
                                <img
                                    alt="User Avatar"
                                    className="h-full w-full rounded-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAM-XGEwHcQPGPyLxaOV6O4focHaDMM4mg_PjAXCqaaX9yiHggysQkwPbjWrPvkf7m0pLrVsZLdXbaLVgxMjMnNQljp4jCt98rbVthBJzKVFajzTQJ7I-98i2keS-5zKOVHACqsyoAmxcLOF-i7d-XFNh7RQhhQvNzp8CEvYZKQFdEdC014iyFrfoaFmJsDdfRJCQQ5GSzV2KEw06rD9qA3nAZMXXDzHLTPdsmZh0CrPj7NE-cRTTDHhI6blj404AVWnGnQbMsOtHE"
                                />
                                <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-background-dark ring-2 ring-background-dark">
                                    <span className="material-symbols-outlined text-[14px] text-primary filled">pets</span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-white text-sm font-bold">Zeynep Kaya</p>
                                <p className="text-[#cbb690] text-xs">Maviş (Muhabbet Kuşu)</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="rounded-full bg-[#0bda19]/20 px-2 py-1 text-xs font-medium text-[#0bda19]">
                                Aktif
                            </span>
                            <button className="text-[#cbb690] hover:text-white">
                                <span className="material-symbols-outlined">more_vert</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-4 h-px w-full bg-[#362b1b]"></div>

            {/* Section: Devam Eden Yarışmalar */}
            <div className="px-4 pb-4">
                <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-4">Devam Eden Yarışmalar</h3>
                <div className="flex overflow-x-auto gap-4 pb-2 snap-x hide-scrollbar">
                    {/* Contest Card 1 */}
                    <div className="min-w-[280px] snap-center rounded-xl bg-[#362b1b] overflow-hidden flex flex-col shadow-sm">
                        <div className="h-32 w-full relative">
                            <img
                                alt="Cat Contest"
                                className="h-full w-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEeFiKowFyaSB3s-QDc7eGUl_gNymOTk5NsWpl3-MVc2KYD07Pp5iXtXb7tYzWxuLqLun1GG2EUKRCBz99VAAt5cFh5i_roRtckdCl_BPFOezmpaACFK0EajkyM6nJyjvhdWgEYvwnKEL_Vjo4Dch7EUNJJlU6jNkIt6fLTf8zSaKUcr97MN9CeSTSt2pfB7TpBT9cVEo2dHGD3kJG23ey4BhKrsqxXja25mOR0TZWQtY8udxKb_DzOSQpgSrplkaPc9Phm2bFA_M"
                            />
                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium text-white flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">schedule</span> 3 Gün Kaldı
                            </div>
                        </div>
                        <div className="p-4 flex flex-col gap-3">
                            <div>
                                <h4 className="text-white font-bold text-base">En Güzel Kedi Yarışması</h4>
                                <p className="text-[#cbb690] text-xs mt-1">Katılımcı: 1,240 Pet</p>
                            </div>
                            <div className="w-full bg-[#221c10] h-2 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[75%] rounded-full"></div>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                                <div className="flex -space-x-2">
                                    <img
                                        alt="participant"
                                        className="w-6 h-6 rounded-full border border-[#362b1b]"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMnNgYCL_IW-disff0GmyVB3K4OrZ12GjGP99Fwnb4qIysiAVqNoYVvRfsbekwYYF_b-tJTVcefyJiw1xkHWb_gAMzsF5xpVHkz2IhTMrKHduIkvKNPNVyKpoa142K38TcfG7P4NORN2xxSAhZMC5DlvMME3aSJIea1-fEbouxvmVLP-91JlmjlmWtZfp_UxddZaAGJ0vtt211Eh2Lc7e-asEGTTjq8VIwvqKX0BJSjS1DyrkxLchbLzCLlsNnlARlpybW9ajZSr0"
                                    />
                                    <img
                                        alt="participant"
                                        className="w-6 h-6 rounded-full border border-[#362b1b]"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_VMArHAvuUaONZZNoktbKvYzrYJ8BER5xWtlVMUiyZ5F1eCFR9qAOBwFOoZu28mJMSbbJDudXrtT31r8PmJ1FEM6knyPgNHnsEDtVPYFI9wegWbIjRX0mF7Xq4Wds_G9tUVZeoZNkdULBqlnZJVR5xFyragJjVO5R6fxTEFxmCAR5W4wbSUThS_DFu7alx5iDO_mpTMIzl1TO_EtOfzmyaawTRSaLn_eL250X_PJc2MGrmKW9HkT8MtR7kflAG8weiApcyrjouTY"
                                    />
                                    <img
                                        alt="participant"
                                        className="w-6 h-6 rounded-full border border-[#362b1b]"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTfXmvm3GivpzrlVD0ys7SSxsNH1VME6qvc4vsUWxsKA1um5OAVpXsd1lMid3y8T3pIFAVPBpJd8bJFJhfZU0GqLyHheTaD13dTcF3ahuP9ZAduWrbx8N2DLPpJ2mrCCv0O25LnhqvUYD_MCxPt9XpHonOLvgKR57P28l5xFckQRQK6nkECDTlIZZvg5n3cXdynTR3Cheg5RHzTEURZOgvJ3lMdpMOGehDLyAvz4bAtxSmpjjnZG0vfJwECkPL0n8l5y69ZjxrXrM"
                                    />
                                    <div className="w-6 h-6 rounded-full border border-[#362b1b] bg-[#493b22] text-[10px] flex items-center justify-center text-white font-bold">
                                        +1K
                                    </div>
                                </div>
                                <Link href="/admin/yarisma" className="text-primary text-xs font-bold hover:underline">
                                    Yönet
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* Contest Card 2 */}
                    <div className="min-w-[280px] snap-center rounded-xl bg-[#362b1b] overflow-hidden flex flex-col shadow-sm">
                        <div className="h-32 w-full relative">
                            <img
                                alt="Dog Contest"
                                className="h-full w-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrAa1d-uCpz0yIIGsowN1hkJPjnfSsEYNjWPB7J-xuFGuogZLBYRe2Kj-AfAZy97L9-W-LTVykk7JFoSj0itVDGrtpqxdKNEeJE_Cl_sCedfiXj1c8TmYWoO28AMk3rABkHt1B0i02gsgAes1-AxU0TR-f2k0mjxWfmnbV7aUQ7G-285eJqnKPLn9rq7HCn5O9uMPUZvNtL2_oSTcKCA5-a1Gi85MxWkj4Eci93zXiVegg4XsZwmaTNDv0BZGFax8Zzr_GD43XBTg"
                            />
                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium text-white flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">schedule</span> 12 Saat
                            </div>
                        </div>
                        <div className="p-4 flex flex-col gap-3">
                            <div>
                                <h4 className="text-white font-bold text-base">En Yetenekli Köpek</h4>
                                <p className="text-[#cbb690] text-xs mt-1">Katılımcı: 850 Pet</p>
                            </div>
                            <div className="w-full bg-[#221c10] h-2 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[90%] rounded-full"></div>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                                <div className="flex -space-x-2">
                                    <img
                                        alt="participant"
                                        className="w-6 h-6 rounded-full border border-[#362b1b]"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxlxeBmxVN8w7pmUNcrixPdM0FfWB7YTmUxoJq4nC48KnEHMfU6GgJDVJqf4WKiDeFB3863GgFZKO48LaK0-fv7cMniZ2JAFu2bu6USqkTabbZoppwVVy888FEUU8rJuOFfg9wcBV0MScJe9VFPBR1EhqH38mg3D370SOnxbGXfA-J8EXXSrsLfEyRiUdOzt3Ci7eaUf6StIJezRnfij2gny0H5YlCMoC22fwIbJbufhM-j_ia7GvmBA2Cqv5kD489ZOGqsThJpu8"
                                    />
                                    <img
                                        alt="participant"
                                        className="w-6 h-6 rounded-full border border-[#362b1b]"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCerSp4q4gPsXZjAvPHpHb2s3KylmkzFI41X2TiuKYz4PW73lnvFSZ16mBqksyJQzru68s9YVmdSPtR-PephGIWuSQPRwbLiYW1bH91oPuVkLQXFhMbp5UpMKmGe2HL4YddD0yReXNpN5EL9XPEF6Fw1HFTA_-gIKduvyMnG5jSxy8j9408mMPzuui-RHTZfP98OCqG7fn7Jr4XHT-nhuo7euSXBFEPL3BlPnXDrrc_ejNw8oQK_sP3_swxegjCzE5tWPjKnujKwQw"
                                    />
                                    <div className="w-6 h-6 rounded-full border border-[#362b1b] bg-[#493b22] text-[10px] flex items-center justify-center text-white font-bold">
                                        +800
                                    </div>
                                </div>
                                <Link href="/admin/yarisma" className="text-primary text-xs font-bold hover:underline">
                                    Yönet
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Action Button */}
            <button className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-[#221c10] shadow-lg shadow-black/40 hover:scale-105 transition-transform z-50">
                <span className="material-symbols-outlined text-3xl font-bold">add</span>
            </button>
        </div>
    );
}
