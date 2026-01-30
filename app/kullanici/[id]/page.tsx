
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import FollowButton from "@/components/social/FollowButton";
import ShareButton from "@/components/social/ShareButton";

export default async function PublicProfilePage({ params }: { params: { id: string } }) {
    const supabase = await createClient();
    const { id } = params;

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

    // Fallback if profile not found might mean just auth user table check, but profiles should exist. 
    // If null, we might show basic info or 404.

    // Check if user exists in auth (harder from client side, but we relying on profiles table)
    // If no profile, we can try to get metadata if we were admin, but safe to 404 or show empty.

    const userId = id;

    // Fetch Pets
    const { data: pets } = await supabase
        .from('pets')
        .select('*')
        .eq('owner_id', userId)
        .order('created_at', { ascending: false });

    // Fetch Ads
    const { data: ads } = await supabase
        .from('ads')
        .select('*')
        .eq('owner_id', userId)
        .order('created_at', { ascending: false });

    // Fetch Stats
    const { count: followersCount } = await supabase
        .from('follows')
        .select('*', { count: 'exact', head: true })
        .eq('following_id', userId);

    const { count: followingCount } = await supabase
        .from('follows')
        .select('*', { count: 'exact', head: true })
        .eq('follower_id', userId);

    // Calculate Total Likes
    const totalLikes = (pets || []).reduce((acc: number, p: any) => acc + (p.likes_count || 0), 0) +
        (ads || []).reduce((acc: number, a: any) => acc + (a.likes_count || 0), 0);

    const displayName = profile?.full_name || "Kullanıcı";
    const avatarUrl = profile?.avatar_url || "https://via.placeholder.com/150";

    return (
        <main className="pb-24 min-h-screen bg-background-light dark:bg-background-dark font-display">
            {/* Header / Cover */}
            <div className="relative h-48 bg-gradient-to-br from-indigo-500 to-purple-500">
                <div className="absolute top-4 left-4 z-10">
                    <Link href="/" className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                </div>
                <div className="absolute top-4 right-4 z-10">
                    <ShareButton title={`CiciPet: ${displayName}`} text={`${displayName} profili CiciPet'te!`} url={`/kullanici/${userId}`} />
                </div>
            </div>

            {/* Profile Info */}
            <div className="px-4 -mt-16 relative z-10 flex flex-col items-center">
                <div className="w-32 h-32 p-1.5 rounded-full bg-white dark:bg-surface-dark shadow-xl overflow-hidden mb-3">
                    <img alt="Profile" className="w-full h-full rounded-full object-cover border border-gray-100 dark:border-white/10" src={avatarUrl} />
                </div>

                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1">{displayName}</h1>
                <div className="mb-6 flex items-center gap-4">
                    <FollowButton targetUserId={userId} />
                </div>

                {/* Stats */}
                <div className="flex items-center gap-8 mb-8">
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-lg text-slate-900 dark:text-white">{followersCount || 0}</span>
                        <span className="text-xs text-gray-500 uppercase tracking-wide">Takipçi</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-lg text-slate-900 dark:text-white">{followingCount || 0}</span>
                        <span className="text-xs text-gray-500 uppercase tracking-wide">Takip</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-lg text-slate-900 dark:text-white">{totalLikes}</span>
                        <span className="text-xs text-gray-500 uppercase tracking-wide">Beğeni</span>
                    </div>
                </div>

                {/* Content */}
                <div className="w-full">
                    {/* Pets */}
                    <div className="mb-8">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 px-2">Petler ({pets?.length || 0})</h2>
                        <div className="grid grid-cols-2 gap-3">
                            {pets?.map((pet: any) => (
                                <Link href={`/pet/${pet.id}`} key={pet.id} className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 dark:bg-surface-dark">
                                    <img src={pet.image_url} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                                        <span className="text-white font-bold">{pet.name}</span>
                                    </div>
                                </Link>
                            ))}
                            {(!pets || pets.length === 0) && (
                                <div className="col-span-2 text-center py-8 text-gray-400 text-sm">Hiç pet eklenmemiş.</div>
                            )}
                        </div>
                    </div>

                    {/* Ads */}
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 px-2">İlanlar ({ads?.length || 0})</h2>
                        <div className="grid grid-cols-2 gap-3">
                            {ads?.map((ad: any) => (
                                <Link href={`/ilanlar/${ad.id}`} key={ad.id} className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-surface-dark">
                                    <img src={ad.photo_url || 'https://via.placeholder.com/300'} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-white/90 dark:bg-black/60 backdrop-blur-sm">
                                        <p className="text-xs font-bold truncate text-slate-900 dark:text-white">{ad.title}</p>
                                    </div>
                                </Link>
                            ))}
                            {(!ads || ads.length === 0) && (
                                <div className="col-span-2 text-center py-8 text-gray-400 text-sm">Hiç ilan verilmemiş.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
