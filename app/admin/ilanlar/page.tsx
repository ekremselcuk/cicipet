import { requireAuth } from "@/utils/supabase/check-auth";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import MenuTrigger from "@/components/admin/MenuTrigger";
import Pagination from "@/components/admin/Pagination";

export const dynamic = 'force-dynamic';

export default async function AdminAdsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    await requireAuth();
    const supabase = await createClient();

    const searchParamsVal = await searchParams;
    const typeFilter = searchParamsVal?.type;
    const limit = parseInt(searchParamsVal?.limit as string) || 20;
    const offset = parseInt(searchParamsVal?.offset as string) || 0;

    let query = supabase
        .from('ads')
        .select(`
            *,
            profiles (
                id,
                full_name,
                email
            )
        `, { count: 'exact' });

    if (typeFilter) {
        query = query.eq('type', typeFilter);
    }

    const { data: ads, count, error } = await query
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false });

    if (error) {
        return (
            <div className="bg-background-light dark:bg-background-dark min-h-screen p-4">
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    <h3 className="font-bold">Veri Çekme Hatası</h3>
                    <p className="font-mono text-sm mt-2">{JSON.stringify(error, null, 2)}</p>
                </div>
            </div>
        )
    }

    const adsList = ads || [];
    const totalCount = count || 0;

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased selection:bg-primary selection:text-black pb-24 min-h-screen">
            {/* Top Header */}
            <header className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-white/5 px-4 pt-4 pb-2">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        {/* Mobile Menu Trigger */}
                        <div className="md:hidden">
                            <MenuTrigger />
                        </div>
                        <Link
                            href="/admin"
                            className="p-2 -ml-2 text-slate-600 dark:text-gray-300 hover:text-primary transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5"
                        >
                            <span className="material-symbols-outlined text-[28px]">arrow_back</span>
                        </Link>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-center flex-1">
                        İlan Yönetimi
                    </h1>
                    <div className="flex gap-2 w-10 justify-end"></div>
                </div>

                {/* Top Level Category Filters */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                    <Link
                        href="/admin/ilanlar?type=es-bulma"
                        className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${typeFilter === 'es-bulma' ? 'bg-pink-50 border-pink-200 dark:bg-pink-900/20 dark:border-pink-900/50' : 'bg-white dark:bg-surface-dark border-gray-200 dark:border-white/10'}`}
                    >
                        <span className={`material-symbols-outlined mb-1 ${typeFilter === 'es-bulma' ? 'text-pink-500' : 'text-gray-400'}`}>favorite</span>
                        <span className={`text-[10px] font-bold ${typeFilter === 'es-bulma' ? 'text-pink-700 dark:text-pink-300' : 'text-gray-500'}`}>Eş Bulma</span>
                    </Link>
                    <Link
                        href="/admin/ilanlar?type=sahiplendirme"
                        className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${typeFilter === 'sahiplendirme' ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900/50' : 'bg-white dark:bg-surface-dark border-gray-200 dark:border-white/10'}`}
                    >
                        <span className={`material-symbols-outlined mb-1 ${typeFilter === 'sahiplendirme' ? 'text-green-500' : 'text-gray-400'}`}>pets</span>
                        <span className={`text-[10px] font-bold ${typeFilter === 'sahiplendirme' ? 'text-green-700 dark:text-green-300' : 'text-gray-500'}`}>Sahiplendirme</span>
                    </Link>
                    <Link
                        href="/admin/ilanlar?type=kayip"
                        className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${typeFilter === 'kayip' ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-900/50' : 'bg-white dark:bg-surface-dark border-gray-200 dark:border-white/10'}`}
                    >
                        <span className={`material-symbols-outlined mb-1 ${typeFilter === 'kayip' ? 'text-red-500' : 'text-gray-400'}`}>campaign</span>
                        <span className={`text-[10px] font-bold ${typeFilter === 'kayip' ? 'text-red-700 dark:text-red-300' : 'text-gray-500'}`}>Kayıp</span>
                    </Link>
                </div>

                {typeFilter && (
                    <div className="flex justify-center mb-2">
                        <Link href="/admin/ilanlar" className="text-xs text-red-500 font-bold hover:underline flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">close</span>
                            Filtreyi Temizle
                        </Link>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex flex-col gap-6 p-4">
                {/* Data List */}
                <section className="flex flex-col gap-4">
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest pl-1 flex justify-between items-center">
                        <span>İlan Listesi ({totalCount})</span>
                    </h2>

                    {adsList.length === 0 ? (
                        <div className="text-center p-8 bg-white dark:bg-surface-dark rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                            <p className="text-gray-500">Henüz kayıtlı ilan bulunmamaktadır.</p>
                        </div>
                    ) : (
                        adsList.map((ad) => (
                            <div key={ad.id} className="bg-white dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-gray-200 dark:border-white/5 flex flex-col gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="relative shrink-0">
                                        <div
                                            className="w-16 h-16 rounded-lg bg-cover bg-center shadow-inner"
                                            style={{
                                                backgroundImage: `url('${ad.photo_url || 'https://via.placeholder.com/150'}')`,
                                            }}
                                        ></div>
                                        <div className="absolute top-0 right-0">
                                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded text-white ${ad.status === 'approved' ? 'bg-green-500' : 'bg-orange-500'}`}>
                                                {ad.status === 'approved' ? 'ONAYLI' : 'BEKLEMEDE'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight line-clamp-1">
                                                    {ad.title}
                                                </h3>
                                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase
                                                        ${ad.type === 'kayip' ? 'bg-red-100 text-red-600 dark:bg-red-900/30' :
                                                            ad.type === 'sahiplendirme' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' :
                                                                'bg-pink-100 text-pink-600 dark:bg-pink-900/30'}`}>
                                                        {ad.type}
                                                    </span>
                                                    <span>•</span>
                                                    <span>{ad.category}</span>
                                                    <span>•</span>
                                                    <span>{new Date(ad.created_at).toLocaleDateString('tr-TR')}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Link href={ad.profiles?.id ? `/admin/kullanicilar/${ad.profiles.id}` : '#'} className="mt-2 flex items-center gap-1 text-sm text-primary hover:underline w-fit">
                                            <span className="material-symbols-outlined text-[16px]">
                                                person
                                            </span>
                                            {ad.profiles?.full_name || ad.profiles?.email || 'Bilinmeyen Sahip'}
                                        </Link>
                                    </div>
                                </div>
                                <div className="border-t border-gray-100 dark:border-white/5 pt-3 flex items-center justify-between gap-2">
                                    <Link
                                        href={`/admin/ilanlar/${ad.id}`}
                                        className="flex-1 h-9 flex items-center justify-center gap-2 rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-xs font-semibold text-slate-600 dark:text-gray-300 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            visibility
                                        </span>
                                        Detayı Gör
                                    </Link>
                                    <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-red-500/20 hover:text-red-500 text-slate-600 dark:text-gray-300 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">
                                            delete
                                        </span>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}

                    <Pagination total={totalCount} currentLimit={limit} currentOffset={offset} />
                </section>
            </main>
            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-background-light dark:bg-surface-dark border-t border-gray-200 dark:border-white/5 z-30 pb-safe">
                <div className="flex justify-around items-center h-16">
                    <Link
                        href="/admin"
                        className="flex flex-col items-center justify-center gap-1 w-full h-full text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                        <span className="material-symbols-outlined text-[24px]">
                            dashboard
                        </span>
                        <span className="text-[10px] font-medium">Panel</span>
                    </Link>
                    <Link
                        href="/admin/ilanlar"
                        className="flex flex-col items-center justify-center gap-1 w-full h-full text-primary relative"
                    >
                        <span
                            className="material-symbols-outlined text-[24px] fill-current"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            campaign
                        </span>
                        <span className="text-[10px] font-medium">İlanlar</span>
                        <span className="absolute top-0 w-full h-0.5 bg-primary"></span>
                    </Link>
                    <Link
                        href="/admin/kullanicilar"
                        className="flex flex-col items-center justify-center gap-1 w-full h-full text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                        <span className="material-symbols-outlined text-[24px]">group</span>
                        <span className="text-[10px] font-medium">Kullanıcılar</span>
                    </Link>
                    <Link
                        href="/admin/yarisma"
                        className="flex flex-col items-center justify-center gap-1 w-full h-full text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                        <span className="material-symbols-outlined text-[24px]">
                            trophy
                        </span>
                        <span className="text-[10px] font-medium">Yarışmalar</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
}
