
import { requireAuth } from "@/utils/supabase/check-auth";
import { createClient } from "@/utils/supabase/server";
import SignOutButton from "@/components/auth/SignOutButton";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfilPage() {
    const supabase = await createClient();

    let user = null;
    let pets = [];
    let userProfile = null;

    try {
        const authData = await requireAuth();
        user = authData;

        // Fetch User Profile
        const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single();
        userProfile = profile;

        // Fetch Pets
        const { data: userPets } = await supabase
            .from('pets')
            .select('*')
            .eq('owner_id', user.id);
        pets = userPets || [];

    } catch (error) {
        console.error("Profile load error:", error);
        // If critical auth error, likely redirected already by requireAuth
        // If just db error, we show default empty states
    }

    if (!user) return null; // Should not trigger due to requireAuth, but safety.


    // Fallback data if DB fetch fails or is empty (for demo continuity if migrations aren't perfect)
    const displayName = userProfile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || "Kullanıcı";
    const avatarUrl = userProfile?.avatar_url || user.user_metadata?.avatar_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuACdszP9Owo_giuD_cOFvDCsciUgRRjCl0ttEGK3iHXjRAhptbmyrguHv_21pMgTgv_Xodgo5ttPM5uce6UG2OXLM1Af-B7w3hzhZWDAlzu_DtLvxvUVsqJdBk01qAExuoaIDNx-zYh7UsvHr9QiiXKjXtn2RE6uKGGDLiCR387D6wmRHWR46SCtAlSm2scpx9_ShOKTMsrBvfT-HlFN3RofYqmBYTQD_6oHBzkn_z5W-Z2EQo82YaqmbmLDc66RiqsVPVpVrS6-u4";
    const ciciPoints = userProfile?.cicipoints || 0;

    // Default stats (placeholders until we have tables for posts/donations/contests)
    const stats = {
        posts: 0,
        donations: 0,
        contests: 0
    };

    return (
        <main className="pb-24">
            <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm pt-safe px-4 py-3 flex items-center justify-between">
                <h1 className="text-2xl font-extrabold tracking-tight text-text-main dark:text-white">Profilim</h1>
                <Link href="/profil/ayarlar" className="p-2 bg-white dark:bg-surface-dark rounded-full shadow-sm border border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">settings</span>
                </Link>
            </header>
            <div className="px-4 space-y-6 pt-2">
                <section className="flex flex-col items-center pt-2 pb-4">
                    <div className="relative mb-3 group">
                        <div className="w-28 h-28 p-1 rounded-full bg-gradient-to-tr from-primary to-secondary shadow-lg shadow-primary/20">
                            <img alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-white dark:border-surface-dark bg-white" src={avatarUrl} />
                        </div>
                        <Link href="/profil/ayarlar" className="absolute bottom-1 right-1 bg-secondary text-white p-1.5 rounded-full border-4 border-white dark:border-surface-dark shadow-sm hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-[16px]">edit</span>
                        </Link>
                    </div>
                    <h2 className="text-xl font-extrabold text-text-main dark:text-white mb-1">{displayName}</h2>
                    <div className="mt-2 flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-surface-dark rounded-full border border-primary/20 shadow-sm">
                        <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
                        <span className="text-primary-dark dark:text-primary font-bold text-sm tracking-wide">{ciciPoints} CP</span>
                    </div>
                </section>
                <section className="grid grid-cols-3 gap-3">
                    <div className="bg-white dark:bg-surface-dark p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center gap-1 hover:border-primary/30 transition-colors">
                        <span className="text-2xl font-extrabold text-text-main dark:text-white">{stats.posts}</span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase text-center leading-tight">Paylaşımlarım</span>
                    </div>
                    <div className="bg-white dark:bg-surface-dark p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center gap-1 hover:border-primary/30 transition-colors">
                        <span className="text-2xl font-extrabold text-secondary">{stats.donations}</span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase text-center leading-tight">Bağışlarım (kg)</span>
                    </div>
                    <div className="bg-white dark:bg-surface-dark p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center gap-1 hover:border-primary/30 transition-colors">
                        <span className="text-2xl font-extrabold text-primary">{stats.contests}</span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase text-center leading-tight">Yarışmalarım</span>
                    </div>
                </section>
                <section>
                    <div className="flex items-center justify-between mb-3 px-1">
                        <h3 className="text-lg font-bold text-text-main dark:text-white">Petlerim</h3>
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
                                            onError={(e) => {
                                                // Fallback if image fails
                                                (e.target as HTMLImageElement).src = "https://via.placeholder.com/150";
                                            }}
                                        />
                                    </div>
                                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{pet.name}</span>
                                </Link>
                            ))
                        ) : null}


                        <Link href="/pet/ekle" className="flex-shrink-0 flex flex-col items-center gap-2 group cursor-pointer">
                            <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-surface-dark flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:border-primary group-hover:bg-primary/5 transition-all">
                                <span className="material-symbols-outlined text-[28px]">add</span>
                            </div>
                            <span className="text-xs font-bold text-gray-400 group-hover:text-primary transition-colors">Yeni Pet Ekle</span>
                        </Link>
                    </div>
                </section>
                <section className="bg-white dark:bg-surface-dark rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <Link href="/cuzdan" className="w-full flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5 active:bg-gray-100 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">account_balance_wallet</span>
                            </div>
                            <span className="font-bold text-text-main dark:text-white text-sm">CiciCüzdanım</span>
                        </div>
                        <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors">chevron_right</span>
                    </Link>
                    <Link href="/ilanlar" className="w-full flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5 active:bg-gray-100 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">campaign</span>
                            </div>
                            <span className="font-bold text-text-main dark:text-white text-sm">İlanlarım</span>
                        </div>
                        <span className="material-symbols-outlined text-gray-300 group-hover:text-secondary transition-colors">chevron_right</span>
                    </Link>
                    <Link href="/favoriler" className="w-full flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5 active:bg-gray-100 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-danger group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                            </div>
                            <span className="font-bold text-text-main dark:text-white text-sm">Favorilerim</span>
                        </div>
                        <span className="material-symbols-outlined text-gray-300 group-hover:text-danger transition-colors">chevron_right</span>
                    </Link>
                    <Link href="/yardim" className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 active:bg-gray-100 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">support_agent</span>
                            </div>
                            <span className="font-bold text-text-main dark:text-white text-sm">Yardım &amp; Destek</span>
                        </div>
                        <span className="material-symbols-outlined text-gray-300 group-hover:text-gray-500 transition-colors">chevron_right</span>
                    </Link>
                </section>

                <SignOutButton />
            </div>
        </main>
    );
}
