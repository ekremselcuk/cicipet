
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function PublicProfilePage({ params }: { params: { id: string } }) {
    const supabase = await createClient();
    const { id } = params;

    // Fetch User Profile
    const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

    if (profileError || !profile) {
        return notFound();
    }

    // Fetch User's Pets (Approved only)
    const { data: pets } = await supabase
        .from('pets')
        .select('*')
        .eq('owner_id', id)
        .eq('status', 'approved');

    // Fetch User's Ads (Approved only)
    const { data: ads } = await supabase
        .from('ads')
        .select('*')
        .eq('user_id', id)
        .eq('status', 'approved');

    // Default Avatar
    const avatarUrl = profile.avatar_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuACdszP9Owo_giuD_cOFvDCsciUgRRjCl0ttEGK3iHXjRAhptbmyrguHv_21pMgTgv_Xodgo5ttPM5uce6UG2OXLM1Af-B7w3hzhZWDAlzu_DtLvxvUVsqJdBk01qAExuoaIDNx-zYh7UsvHr9QiiXKjXtn2RE6uKGGDLiCR387D6wmRHWR46SCtAlSm2scpx9_ShOKTMsrBvfT-HlFN3RofYqmBYTQD_6oHBzkn_z5W-Z2EQo82YaqmbnLDc66RiqsVPVpVrS6-u4";
    const displayName = profile.full_name || "Kullanıcı";

    return (
        <main className="pb-24 min-h-screen bg-background-light dark:bg-background-dark">
            <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm pt-safe px-4 py-3 flex items-center gap-3 border-b border-gray-100 dark:border-white/5">
                <Link href="/" className="p-1 -ml-1 text-slate-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">Profil</h1>
            </header>

            <div className="px-4 space-y-6 pt-4">
                {/* User Header */}
                <section className="flex flex-col items-center pt-2 pb-4">
                    <div className="w-28 h-28 p-1 rounded-full bg-gradient-to-tr from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 shadow-lg mb-3">
                        <img alt={displayName} className="w-full h-full rounded-full object-cover border-4 border-white dark:border-surface-dark bg-white" src={avatarUrl} />
                    </div>
                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">{displayName}</h2>
                    <div className="mt-2 flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-surface-dark rounded-full border border-gray-100 dark:border-white/10 shadow-sm">
                        <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
                        <span className="text-slate-600 dark:text-gray-300 font-bold text-sm tracking-wide">{profile.cicipoints || 0} CP</span>
                    </div>
                </section>

                {/* Stats */}
                <section className="grid grid-cols-3 gap-3">
                    <div className="bg-white dark:bg-surface-dark p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center gap-1">
                        <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{pets?.length || 0}</span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase text-center">Petler</span>
                    </div>
                    <div className="bg-white dark:bg-surface-dark p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center gap-1">
                        <span className="text-2xl font-extrabold text-secondary">{ads?.length || 0}</span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase text-center">İlanlar</span>
                    </div>
                    <div className="bg-white dark:bg-surface-dark p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center gap-1">
                        <span className="text-2xl font-extrabold text-primary">0</span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase text-center">Yarışmalar</span>
                    </div>
                </section>

                {/* Pets */}
                <section>
                    <div className="flex items-center justify-between mb-3 px-1">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Petleri</h3>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar">
                        {pets && pets.length > 0 ? (
                            pets.map((pet: any) => (
                                <Link href={`/pet/${pet.id}`} key={pet.id} className="flex-shrink-0 flex flex-col items-center gap-2 group cursor-pointer">
                                    <div className="w-20 h-20 rounded-2xl p-[2px] border-2 border-transparent group-hover:border-primary transition-colors">
                                        <img
                                            alt={pet.name}
                                            className="w-full h-full rounded-[14px] object-cover shadow-md"
                                            src={pet.image_url || "https://via.placeholder.com/150"}
                                        />
                                    </div>
                                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{pet.name}</span>
                                </Link>
                            ))
                        ) : (
                            <div className="w-full text-center py-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-dashed border-gray-200 dark:border-white/10 text-gray-400 text-sm">
                                Görüntülenecek pet yok.
                            </div>
                        )}
                    </div>
                </section>

                {/* Ads */}
                <section>
                    <div className="flex items-center justify-between mb-3 px-1">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">İlanları</h3>
                    </div>
                    <div className="flex flex-col gap-3">
                        {ads && ads.length > 0 ? (
                            ads.map((ad: any) => (
                                <Link href={`/ilan/${ad.id}`} key={ad.id} className="bg-white dark:bg-surface-dark p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex gap-3 hover:border-primary/50 transition-colors">
                                    <div className="w-20 h-20 rounded-lg bg-gray-200 dark:bg-white/10 flex-shrink-0 overflow-hidden">
                                        <img src={ad.photo_url || "https://via.placeholder.com/150"} alt="Ilan" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center">
                                        <span className="text-xs font-bold text-primary uppercase tracking-wide mb-1">{ad.type}</span>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">{ad.description || 'Detay yok'}</h4>
                                        <span className="text-xs text-slate-500 dark:text-gray-400 mt-1">{ad.city || 'Konum Yok'}</span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="w-full text-center py-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-dashed border-gray-200 dark:border-white/10 text-gray-400 text-sm">
                                Görüntülenecek ilan yok.
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}
