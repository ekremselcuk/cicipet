import MenuTrigger from "@/components/admin/MenuTrigger";
import { requireAdmin } from "@/utils/supabase/check-auth";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Pagination from "@/components/admin/Pagination";

export const dynamic = 'force-dynamic';

export default async function AdminContestsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    await requireAdmin();
    const supabase = await createClient();

    const searchParamsVal = await searchParams;
    const categoryFilter = searchParamsVal?.category as string;
    const statusFilter = searchParamsVal?.status as string;
    const limit = parseInt(searchParamsVal?.limit as string) || 20;
    const offset = parseInt(searchParamsVal?.offset as string) || 0;

    let query = supabase
        .from('contests')
        .select('*', { count: 'exact' });

    if (categoryFilter) query = query.eq('category', categoryFilter);
    if (statusFilter) query = query.eq('status', statusFilter);

    const { data: contests, count, error } = await query
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false });

    const contestList = contests || [];
    const totalContests = count || 0;

    return (
        <div className="relative flex flex-col h-full min-h-screen pb-24 bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
            {/* Top Header */}
            <header className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-white/5 px-4 pt-4 pb-2">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
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
                    <h1 className="text-xl font-bold tracking-tight text-center flex-1">Yarışma Yönetimi</h1>
                    <div className="flex gap-2">
                        <button className="relative p-2 -mr-2 text-slate-600 dark:text-gray-300 hover:text-primary transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5">
                            <span className="material-symbols-outlined text-[24px]">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background-dark"></span>
                        </button>
                    </div>
                </div>

                <div className="flex justify-end mb-2">
                    <Link href="/admin/yarisma/ekle" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">add</span>
                        Yeni Yarışma Ekle
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="relative w-full mb-2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-gray-400">search</span>
                    </div>
                    <input className="block w-full pl-10 pr-3 py-3 border-none rounded-xl text-sm font-medium bg-white dark:bg-surface-dark text-slate-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-surface-dark transition-all shadow-sm" placeholder="Yarışma ara..." type="text" />
                </div>
            </header>

            <main className="flex flex-col gap-6 p-4">
                {/* Filters */}
                <section className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4">
                    <Link href="/admin/yarisma" className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold shrink-0 transition-transform active:scale-95 ${!statusFilter ? 'bg-primary text-black' : 'bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10'}`}>
                        <span className="material-symbols-outlined text-[18px]">filter_list</span>
                        Tümü
                    </Link>
                    <Link href="/admin/yarisma?status=active" className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium shrink-0 whitespace-nowrap border transition-colors ${statusFilter === 'active' ? 'bg-green-100 border-green-500 text-green-700' : 'bg-white dark:bg-surface-dark border-gray-200 dark:border-white/10 text-slate-700 dark:text-gray-300'}`}>
                        Aktif
                    </Link>
                    <Link href="/admin/yarisma?status=upcoming" className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium shrink-0 whitespace-nowrap border transition-colors ${statusFilter === 'upcoming' ? 'bg-orange-100 border-orange-500 text-orange-700' : 'bg-white dark:bg-surface-dark border-gray-200 dark:border-white/10 text-slate-700 dark:text-gray-300'}`}>
                        Yaklaşan
                    </Link>
                    <Link href="/admin/yarisma?status=ended" className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium shrink-0 whitespace-nowrap border transition-colors ${statusFilter === 'ended' ? 'bg-gray-100 border-gray-500 text-gray-700' : 'bg-white dark:bg-surface-dark border-gray-200 dark:border-white/10 text-slate-700 dark:text-gray-300'}`}>
                        Biten
                    </Link>
                </section>

                {/* Data List */}
                <section className="flex flex-col gap-4">
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest pl-1">Yarışma Listesi ({totalContests})</h2>

                    {contestList.length === 0 ? (
                        <div className="text-center p-8 bg-white dark:bg-surface-dark rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                            <p className="text-gray-500">Henüz kayıtlı yarışma bulunmamaktadır.</p>
                        </div>
                    ) : (
                        contestList.map((contest: any) => (
                            <div key={contest.id} className="bg-white dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-gray-200 dark:border-white/5 flex flex-col gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="relative shrink-0">
                                        <div className="w-16 h-16 rounded-lg bg-cover bg-center shadow-inner" style={{ backgroundImage: `url('${contest.image_url || 'https://via.placeholder.com/150'}' )` }}></div>
                                        <div className="absolute -bottom-1.5 -right-1.5 bg-background-light dark:bg-surface-dark p-0.5 rounded-full">
                                            <div className={`w-3 h-3 rounded-full border-2 border-white dark:border-surface-dark ${contest.status === 'active' ? 'bg-emerald-500' : 'bg-gray-400'}`}></div>
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{contest.title}</h3>
                                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${contest.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-gray-100 text-gray-600'}`}>
                                                        {contest.status === 'active' ? 'Aktif' : contest.status}
                                                    </span>
                                                    <span>•</span>
                                                    <span>{new Date(contest.start_date).toLocaleDateString()} - {new Date(contest.end_date).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
                                                <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
                                                <span className="text-xs font-bold text-primary">0</span>
                                                {/* Participation count would require another query or relation count */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-gray-100 dark:border-white/5 pt-3 flex items-center justify-between gap-2">
                                    <Link href={`/admin/yarisma/${contest.id}`} className="flex-1 h-9 flex items-center justify-center gap-2 rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-xs font-semibold text-slate-600 dark:text-gray-300 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                                        Detayı Gör
                                    </Link>
                                    <Link href={`/admin/yarisma/${contest.id}`} className="h-9 w-9 flex items-center justify-center rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-primary/20 hover:text-primary text-slate-600 dark:text-gray-300 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">edit</span>
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}

                    <Pagination total={totalContests} currentLimit={limit} currentOffset={offset} />
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
                        href="/admin/petler"
                        className="flex flex-col items-center justify-center gap-1 w-full h-full text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                        <span className="material-symbols-outlined text-[24px]">
                            pets
                        </span>
                        <span className="text-[10px] font-medium">Petler</span>
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
                        className="flex flex-col items-center justify-center gap-1 w-full h-full text-primary relative"
                    >
                        <span
                            className="material-symbols-outlined text-[24px] fill-current"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            trophy
                        </span>
                        <span className="text-[10px] font-medium">Yarışmalar</span>
                        <span className="absolute top-0 w-full h-0.5 bg-primary"></span>
                    </Link>
                </div>
            </nav>
        </div>
    );
}
