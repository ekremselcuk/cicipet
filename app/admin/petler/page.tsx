import { requireAuth } from "@/utils/supabase/check-auth";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import MenuTrigger from "@/components/admin/MenuTrigger";
import Pagination from "@/components/admin/Pagination";
import PetFilters from "@/components/admin/PetFilters";
import DeletePetButton from "@/components/admin/DeletePetButton";

export const dynamic = 'force-dynamic';

export default async function PetlerPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    await requireAuth();
    const supabase = await createClient();

    const searchParamsVal = await searchParams;
    const typeFilter = searchParamsVal?.type as string;
    const breedFilter = searchParamsVal?.breed as string;
    const ageFilter = searchParamsVal?.age as string;
    const statusFilter = searchParamsVal?.status as string;
    // City filter requires inner join which is complex, we will filter by profile city using !inner if possible, or skip for now to keep it simple and fast
    // PostgREST 9+ supports nested filtering. Let's try simple join filtering first.

    const limit = parseInt(searchParamsVal?.limit as string) || 20;
    const offset = parseInt(searchParamsVal?.offset as string) || 0;

    // 1. Fetch Stats (Parallel)
    const [
        { count: catCount },
        { count: dogCount },
        { count: birdCount },
        { count: reptileCount },
        { count: otherCount }
    ] = await Promise.all([
        supabase.from('pets').select('*', { count: 'exact', head: true }).ilike('type', 'kedi'),
        supabase.from('pets').select('*', { count: 'exact', head: true }).ilike('type', 'köpek'),
        supabase.from('pets').select('*', { count: 'exact', head: true }).ilike('type', 'kuş'),
        supabase.from('pets').select('*', { count: 'exact', head: true }).ilike('type', 'sürüngen'),
        supabase.from('pets').select('*', { count: 'exact', head: true }).not('type', 'in', '("kedi","köpek","kuş","sürüngen")') // Rough approx for 'other'
    ]);

    // 2. Build List Query
    let query = supabase
        .from('pets')
        .select(`
            *,
            profiles!inner (
                id,
                full_name,
                city
            )
        `, { count: 'exact' });

    if (typeFilter) {
        if (typeFilter === 'other') {
            query = query.not('type', 'in', '("kedi","köpek","kuş","sürüngen")');
        } else {
            query = query.ilike('type', `%${typeFilter}%`);
        }
    }
    if (breedFilter) query = query.ilike('breed', `%${breedFilter}%`);
    if (ageFilter) query = query.eq('age', ageFilter);
    if (statusFilter) {
        query = query.eq('status', statusFilter);
    }
    // Default: Show all statuses so stats and list match

    // City filter (if param exists)
    if (searchParamsVal?.city) {
        query = query.ilike('profiles.city', `%${searchParamsVal.city}%`);
    }

    const { data: pets, count, error } = await query
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching pets:", error);
    }

    const petsList = pets || [];
    const totalPets = count || 0;

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
                        Pet Yönetimi
                    </h1>
                    <div className="flex gap-2">
                        <button className="relative p-2 -mr-2 text-slate-600 dark:text-gray-300 hover:text-primary transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5">
                            <span className="material-symbols-outlined text-[24px]">
                                notifications
                            </span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background-dark"></span>
                        </button>
                    </div>
                </div>
                {/* Search Bar */}
                <div className="relative w-full mb-2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-gray-400">
                            search
                        </span>
                    </div>
                    <input
                        className="block w-full pl-10 pr-3 py-3 border-none rounded-xl text-sm font-medium bg-white dark:bg-surface-dark text-slate-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-surface-dark transition-all shadow-sm"
                        placeholder="İsim, ID veya Sahip ara..."
                        type="text"
                    />
                </div>
            </header>
            {/* Main Content */}
            <main className="flex flex-col gap-6 p-4">
                {/* Stats Summary */}
                <section className="flex gap-3 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 snap-x">
                    <Link href="/admin/petler" className={`snap-center shrink-0 min-w-[140px] flex-1 p-4 rounded-xl shadow-sm border flex flex-col gap-1 transition-all
                        ${!typeFilter ? 'bg-primary text-black border-primary' : 'bg-white dark:bg-surface-dark border-gray-100 dark:border-white/5 text-gray-500 hover:border-primary/50'}`}>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="material-symbols-outlined text-[20px]">apps</span>
                            <span className="text-xs font-semibold uppercase tracking-wider">Tümü</span>
                        </div>
                        <p className="text-2xl font-bold">{totalPets}</p>
                    </Link>

                    <StatCardLink active={typeFilter === 'kedi'} type="kedi" icon="pets" label="Kedi" count={catCount || 0} color="text-primary" />
                    <StatCardLink active={typeFilter === 'köpek'} type="köpek" icon="pet_supplies" label="Köpek" count={dogCount || 0} color="text-blue-400" />
                    <StatCardLink active={typeFilter === 'kuş'} type="kuş" icon="flutter_dash" label="Kuş" count={birdCount || 0} color="text-yellow-400" />
                    <StatCardLink active={typeFilter === 'sürüngen'} type="sürüngen" icon="pest_control" label="Sürüngen" count={reptileCount || 0} color="text-green-400" />
                    <StatCardLink active={!!typeFilter && !['kedi', 'köpek', 'kuş', 'sürüngen'].includes(typeFilter)} type="other" icon="cruelty_free" label="Diğer" count={otherCount || 0} color="text-purple-400" />
                </section>

                {/* Filters */}
                <PetFilters />

                {/* Data List */}
                <section className="flex flex-col gap-4">
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest pl-1 flex justify-between items-center">
                        <span>Pet Listesi ({totalPets})</span>
                    </h2>

                    {petsList.length === 0 ? (
                        <div className="text-center p-8 bg-white dark:bg-surface-dark rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                            <p className="text-gray-500">Henüz kayıtlı pet bulunmamaktadır.</p>
                        </div>
                    ) : (
                        petsList.map((pet) => (
                            <div key={pet.id} className="bg-white dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-gray-200 dark:border-white/5 flex flex-col gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="relative shrink-0">
                                        <div
                                            className="w-16 h-16 rounded-lg bg-cover bg-center shadow-inner"
                                            style={{
                                                backgroundImage: `url('${pet.image_url || 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop'}')`,
                                            }}
                                        ></div>
                                        <div className="absolute -bottom-1.5 -right-1.5 bg-background-light dark:bg-surface-dark p-0.5 rounded-full">
                                            <div className={`w-3 h-3 rounded-full border-2 border-white dark:border-surface-dark ${pet.status === 'pending' ? 'bg-orange-500' : 'bg-emerald-500'}`}></div>
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                                                    {pet.name}
                                                </h3>
                                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                                    <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">
                                                        {pet.type}
                                                    </span>
                                                    <span>•</span>
                                                    <span>{pet.breed || 'Bilinmiyor'}</span>
                                                    <span>•</span>
                                                    <span>{pet.age ? `${pet.age} Yaşında` : '?'}</span>
                                                </div>
                                                {pet.profiles?.city && (
                                                    <div className="text-xs text-gray-400 mt-1 flex items-center">
                                                        <span className="material-symbols-outlined text-[14px] mr-0.5">location_on</span>
                                                        {pet.profiles.city}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <Link href={pet.profiles?.id ? `/admin/kullanicilar/${pet.profiles.id}` : '#'} className="mt-2 flex items-center gap-1 text-sm text-primary hover:underline w-fit">
                                            <span className="material-symbols-outlined text-[16px]">
                                                person
                                            </span>
                                            {pet.profiles?.full_name || 'Bilinmeyen Sahip'}
                                        </Link>
                                    </div>
                                </div>
                                <div className="border-t border-gray-100 dark:border-white/5 pt-3 flex items-center justify-between gap-2">
                                    <Link
                                        href={`/admin/petler/${pet.id}`}
                                        className="flex-1 h-9 flex items-center justify-center gap-2 rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-xs font-semibold text-slate-600 dark:text-gray-300 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            visibility
                                        </span>
                                        Profili Gör
                                    </Link>
                                    <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-primary/20 hover:text-primary text-slate-600 dark:text-gray-300 transition-colors opacity-0 cursor-default">
                                        <span className="material-symbols-outlined text-[18px]">
                                            edit
                                        </span>
                                    </button>
                                    <DeletePetButton id={pet.id} />
                                </div>
                            </div>
                        ))
                    )}

                    <Pagination total={totalPets} currentLimit={limit} currentOffset={offset} />
                </section>
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
                        className="flex flex-col items-center justify-center gap-1 w-full h-full text-primary relative"
                    >
                        <span
                            className="material-symbols-outlined text-[24px] fill-current"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            pets
                        </span>
                        <span className="text-[10px] font-bold">Petler</span>
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

function StatCardLink({ active, type, icon, label, count, color }: { active: boolean, type: string, icon: string, label: string, count: number, color: string }) {
    return (
        <Link href={active ? '/admin/petler' : `/admin/petler?type=${type}`} className={`snap-center shrink-0 min-w-[140px] flex-1 p-4 rounded-xl shadow-sm border flex flex-col gap-1 transition-all group
            ${active ? 'bg-primary text-black border-primary' : 'bg-white dark:bg-surface-dark border-gray-100 dark:border-white/5 hover:border-primary/50'}`}>
            <div className={`flex items-center gap-2 mb-1 ${active ? 'text-black' : 'text-gray-500 dark:text-gray-400'}`}>
                <span className={`material-symbols-outlined text-[20px] ${active ? 'text-black' : color}`}>
                    {icon}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider">
                    {label}
                </span>
            </div>
            <p className={`text-2xl font-bold ${active ? 'text-black' : 'text-slate-900 dark:text-white'}`}>
                {count}
            </p>
        </Link>
    )
}
