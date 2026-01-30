'use client';

import { createClient } from "@/utils/supabase/client";
import SignOutButton from "@/components/auth/SignOutButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LikeButton from "@/components/social/LikeButton";
import ShareButton from "@/components/social/ShareButton";

export default function ProfilPage() {
    const supabase = createClient();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [userProfile, setUserProfile] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'pets' | 'ads'>('pets');

    // Data States
    const [pets, setPets] = useState<any[]>([]);
    const [ads, setAds] = useState<any[]>([]);
    const [stories, setStories] = useState<any[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                // 1. Check Auth
                const { data: { user: currentUser }, error: authError } = await supabase.auth.getUser();

                if (authError || !currentUser) {
                    router.push('/auth/login');
                    return;
                }
                setUser(currentUser);

                // 2. Fetch Profile
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', currentUser.id)
                    .single();
                setUserProfile(profile || {}); // Handle missing profile gracefully

                // 3. Fetch Pets
                const { data: userPets } = await supabase
                    .from('pets')
                    .select('*')
                    .eq('owner_id', currentUser.id)
                    .order('created_at', { ascending: false });
                setPets(userPets || []);

                // 4. Fetch Ads
                const { data: userAds } = await supabase
                    .from('ads')
                    .select('*')
                    .eq('owner_id', currentUser.id)
                    .order('created_at', { ascending: false });
                setAds(userAds || []);

                // 5. Fetch Stories (Mock or Real)
                // For now mocking or assuming empty as table might be empty
                setStories([]);

            } catch (err) {
                console.error("Data load error:", err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [router, supabase]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
                <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
            </div>
        );
    }

    if (!user) return null;

    const displayName = userProfile?.full_name || user.email?.split('@')[0] || "Kullanıcı";
    const avatarUrl = userProfile?.avatar_url || "https://via.placeholder.com/150";
    const ciciPoints = userProfile?.cicipoints || 0;

    // Social Stats (Mocked for now until we have counters in DB populated)
    const socialStats = {
        followers: 120, // Example
        following: 45,
        likesReceived: 350
    };

    return (
        <main className="pb-24 min-h-screen bg-background-light dark:bg-background-dark font-display">
            {/* Header / Cover */}
            <div className="relative h-48 bg-gradient-to-br from-purple-500 to-primary">
                <div className="absolute top-4 right-4 z-10">
                    <Link href="/profil/ayarlar" className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
                        <span className="material-symbols-outlined">settings</span>
                    </Link>
                </div>
            </div>

            {/* Profile Info */}
            <div className="px-4 -mt-16 relative z-10 flex flex-col items-center">
                <div className="relative mb-3">
                    <div className="w-32 h-32 p-1.5 rounded-full bg-white dark:bg-surface-dark shadow-xl">
                        <img alt="Profile" className="w-full h-full rounded-full object-cover border border-gray-100 dark:border-white/10" src={avatarUrl} />
                    </div>
                    {/* Add Story Button (Mock) */}
                    <button className="absolute bottom-1 right-1 bg-blue-500 text-white p-2 rounded-full border-4 border-white dark:border-surface-dark shadow-sm hover:scale-110 transition-transform" title="Story Ekle">
                        <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
                </div>

                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1">{displayName}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">@{user.email?.split('@')[0]}</p>

                {/* Social Stats Row */}
                <div className="flex items-center gap-8 mb-6">
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-lg text-slate-900 dark:text-white">{socialStats.followers}</span>
                        <span className="text-xs text-gray-500 uppercase tracking-wide">Takipçi</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-lg text-slate-900 dark:text-white">{socialStats.following}</span>
                        <span className="text-xs text-gray-500 uppercase tracking-wide">Takip</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-lg text-slate-900 dark:text-white">{socialStats.likesReceived}</span>
                        <span className="text-xs text-gray-500 uppercase tracking-wide">Beğeni</span>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-8">
                    <Link href="/pet/ekle" className="flex items-center justify-center gap-2 p-3 bg-primary text-black font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors">
                        <span className="material-symbols-outlined">pets</span>
                        Pet Ekle
                    </Link>
                    <Link href="/ilanlar/ekle" className="flex items-center justify-center gap-2 p-3 bg-white dark:bg-surface-dark text-slate-900 dark:text-white font-bold rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <span className="material-symbols-outlined">campaign</span>
                        İlan Ver
                    </Link>
                </div>
            </div>

            {/* Stories Section (Horizontal Scroll) */}
            <div className="mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
                <div className="flex gap-4 overflow-x-auto px-4 hide-scrollbar snap-x">
                    {/* Add Story Card */}
                    <div className="flex flex-col items-center gap-2 snap-center shrink-0">
                        <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 bg-gray-50 dark:bg-white/5">
                            <span className="material-symbols-outlined">history_edu</span>
                        </div>
                        <span className="text-xs text-gray-500">Story Ekle</span>
                    </div>
                    {/* Sample Stories (Mock) */}
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex flex-col items-center gap-2 snap-center shrink-0">
                            <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-pink-500 to-orange-500">
                                <img src={`https://picsum.photos/seed/${i}/100`} className="w-full h-full rounded-full object-cover border-2 border-white dark:border-black" />
                            </div>
                            <span className="text-xs text-slate-700 dark:text-gray-300">Hikaye {i}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Content Tabs */}
            <div className="px-4">
                <div className="flex items-center gap-6 border-b border-gray-200 dark:border-white/10 mb-6">
                    <button
                        onClick={() => setActiveTab('pets')}
                        className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'pets' ? 'border-black dark:border-white text-black dark:text-white' : 'border-transparent text-gray-400'}`}
                    >
                        Petlerim ({pets.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('ads')}
                        className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'ads' ? 'border-black dark:border-white text-black dark:text-white' : 'border-transparent text-gray-400'}`}
                    >
                        İlanlarım ({ads.length})
                    </button>
                    <Link href="/favoriler" className="pb-3 text-sm font-bold border-b-2 border-transparent text-gray-400 flex items-center gap-1">
                        Favorilerim <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                    </Link>
                </div>

                {/* Tab Content */}
                <div className="grid grid-cols-2 gap-4">
                    {activeTab === 'pets' && (
                        pets.length > 0 ? pets.map(pet => (
                            <Link href={`/pet/${pet.id}`} key={pet.id} className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 dark:bg-surface-dark">
                                <img src={pet.image_url} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                                    <span className="text-white font-bold">{pet.name}</span>
                                    <div className="flex items-center gap-3 mt-1 text-white/90">
                                        <div className="flex items-center gap-1 text-xs">
                                            <span className="material-symbols-outlined text-[14px]">favorite</span>
                                            {pet.likes_count || 0}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )) : (
                            <div className="col-span-2 text-center py-12 text-gray-400 bg-gray-50 dark:bg-white/5 rounded-xl border border-dashed border-gray-200 dark:border-white/10">
                                <span className="material-symbols-outlined text-4xl mb-2">pets</span>
                                <p>Henüz pet eklemediniz.</p>
                                <Link href="/pet/ekle" className="text-primary font-bold hover:underline mt-2 inline-block">Şimdi Ekle</Link>
                            </div>
                        )
                    )}

                    {activeTab === 'ads' && (
                        ads.length > 0 ? ads.map(ad => (
                            <Link href={`/ilanlar/${ad.id}`} key={ad.id} className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-surface-dark">
                                <img src={ad.photo_url || 'https://via.placeholder.com/300'} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] uppercase font-bold backdrop-blur-sm">
                                    {ad.type}
                                </div>
                                <div className="absolute inset-x-0 bottom-0 p-3 bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-white/5">
                                    <h4 className="font-bold text-sm truncate">{ad.title}</h4>
                                    <div className="flex items-center justify-between mt-2">
                                        <ShareButton title={ad.title} text={ad.description} url={`/ilanlar/${ad.id}`} />
                                    </div>
                                </div>
                            </Link>
                        )) : (
                            <div className="col-span-2 text-center py-12 text-gray-400 bg-gray-50 dark:bg-white/5 rounded-xl border border-dashed border-gray-200 dark:border-white/10">
                                <span className="material-symbols-outlined text-4xl mb-2">campaign</span>
                                <p>Henüz ilan vermediniz.</p>
                                <Link href="/ilanlar/ekle" className="text-primary font-bold hover:underline mt-2 inline-block">İlan Ver</Link>
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 bg-background-light dark:bg-surface-dark border-t border-gray-200 dark:border-white/5 z-30 pb-safe">
                <div className="flex justify-around items-center h-16">
                    <Link href="/" className="flex flex-col items-center justify-center gap-1 w-full h-full text-gray-400 dark:text-gray-500 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[24px]">home</span>
                    </Link>
                    <Link href="/ilanlar" className="flex flex-col items-center justify-center gap-1 w-full h-full text-gray-400 dark:text-gray-500 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[24px]">search</span>
                    </Link>
                    <div className="w-full relative flex justify-center">
                        <Link href="/pet/ekle" className="absolute -top-6 h-14 w-14 rounded-full bg-primary shadow-lg shadow-primary/30 flex items-center justify-center text-black hover:bg-primary/90 transition-transform hover:scale-105">
                            <span className="material-symbols-outlined text-[28px]">add</span>
                        </Link>
                    </div>
                    <Link href="/favoriler" className="flex flex-col items-center justify-center gap-1 w-full h-full text-gray-400 dark:text-gray-500 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[24px]">favorite</span>
                    </Link>
                    <Link href="/profil" className="flex flex-col items-center justify-center gap-1 w-full h-full text-primary">
                        <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                    </Link>
                </div>
            </nav>
        </main>
    );
}
